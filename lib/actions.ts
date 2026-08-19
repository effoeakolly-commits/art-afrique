"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "./supabase/server";
import type { CategorieArtwork } from "./types";

// ============================================
// AUTHENTIFICATION
// ============================================

export async function inscription(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const nomComplet = formData.get("nom_complet") as string;
  const role = (formData.get("role") as string) || "artist";

  if (!email || !password || !nomComplet) {
    redirect("/inscription?erreur=missing-fields");
  }

  const [firstName, ...lastNameParts] = nomComplet.trim().split(" ");
  const lastName = lastNameParts.join(" ") || null;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
        role,
      },
    },
  });

  if (error) {
    redirect(`/inscription?erreur=${encodeURIComponent(error.message)}`);
  }

  if (data.session) {
    redirect("/tableau-de-bord");
  }

  // Si l'email de confirmation est requis
  redirect("/connexion?message=verifiez-votre-email");
}

export async function connexion(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    redirect("/connexion?erreur=missing-fields");
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirect(`/connexion?erreur=${encodeURIComponent(error.message)}`);
  }

  redirect("/tableau-de-bord");
}

export async function deconnexion() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

// ============================================
// PROFIL ARTISTE
// ============================================

export async function mettreAJourProfil(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/connexion");
  }

  const nomComplet = formData.get("nom_complet") as string;
  const bio = formData.get("bio") as string;
  const pays = formData.get("pays") as string;
  const fichierPhoto = formData.get("photo") as File;
  const redirectTo = (formData.get("redirect_to") as string) || "/tableau-de-bord";

  if (!nomComplet) {
    redirect(`${redirectTo}?erreur=missing-fields`);
  }

  // Récupérer le profil actuel pour connaître la photo existante
  const { data: profilActuel } = await supabase
    .from("profiles")
    .select("avatar_url")
    .eq("id", user.id)
    .single();

  let photoUrl = profilActuel?.avatar_url || null;

  // Upload de la nouvelle photo de profil si fournie
  if (fichierPhoto && fichierPhoto.size > 0) {
    const cheminFichier = `${user.id}/avatar-${Date.now()}.${fichierPhoto.name
      .split(".")
      .pop()
      ?.replace(/[^a-zA-Z0-9]/g, "") || "jpg"}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(cheminFichier, fichierPhoto, { upsert: true });

    if (uploadError) {
      redirect(
        `${redirectTo}?erreur=${encodeURIComponent(uploadError.message)}`
      );
    }

    const { data: urlData } = supabase.storage
      .from("avatars")
      .getPublicUrl(cheminFichier);

    photoUrl = urlData.publicUrl;

    // Supprimer l'ancienne photo si elle existe dans le bucket avatars
    if (profilActuel?.avatar_url) {
      const ancienChemin = profilActuel.avatar_url.split("/avatars/")[1];
      if (ancienChemin) {
        await supabase.storage.from("avatars").remove([ancienChemin]);
      }
    }
  }

  const [firstName, ...lastNameParts] = nomComplet.trim().split(" ");
  const lastName = lastNameParts.join(" ") || null;

  // Mettre à jour le profil dans la table profiles
  const { error: profilError } = await supabase
    .from("profiles")
    .update({
      first_name: firstName,
      last_name: lastName,
      country: pays || null,
      avatar_url: photoUrl,
    })
    .eq("id", user.id);

  if (profilError) {
    redirect(`${redirectTo}?erreur=${encodeURIComponent(profilError.message)}`);
  }

  // Créer ou mettre à jour le profil artiste
  const { data: artisteExistant } = await supabase
    .from("artists")
    .select("id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (artisteExistant?.id) {
    const { error: artisteError } = await supabase
      .from("artists")
      .update({
        display_name: nomComplet,
        bio: bio || null,
        country: pays || "Autre",
        profile_image_url: photoUrl,
      })
      .eq("id", artisteExistant.id);

    if (artisteError) {
      redirect(`${redirectTo}?erreur=${encodeURIComponent(artisteError.message)}`);
    }
  } else {
    const { error: artisteError } = await supabase.from("artists").insert({
      user_id: user.id,
      display_name: nomComplet,
      bio: bio || null,
      country: pays || "Autre",
      profile_image_url: photoUrl,
      is_approved: true,
    });

    if (artisteError) {
      redirect(`${redirectTo}?erreur=${encodeURIComponent(artisteError.message)}`);
    }
  }

  revalidatePath("/tableau-de-bord");
  revalidatePath("/tableau-de-bord/parametres");
  revalidatePath(`/artistes/${user.id}`);
  revalidatePath("/");
  redirect(`${redirectTo}?message=profil-mis-a-jour`);
}

// ============================================
// ŒUVRES
// ============================================

export async function ajouterOeuvre(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/connexion");
  }

  const titre = formData.get("titre") as string;
  const description = formData.get("description") as string;
  const categorie = formData.get("categorie") as CategorieArtwork;
  const videoUrl = formData.get("video_url") as string;
  const fichierImage = formData.get("image") as File;

  if (!titre || !categorie || !fichierImage || fichierImage.size === 0) {
    redirect("/tableau-de-bord?erreur=champs-manquants");
  }

  // Récupérer l'ID de l'artiste
  const { data: artisteData } = await supabase
    .from("artists")
    .select("id")
    .eq("user_id", user.id)
    .maybeSingle();

  const artisteId = artisteData?.id;

  if (!artisteId) {
    redirect("/tableau-de-bord?erreur=profil-artiste-introuvable");
  }

  // Upload de l'image dans Supabase Storage
  const cheminFichier = `${user.id}/${Date.now()}-${fichierImage.name.replace(
    /[^a-zA-Z0-9.-]/g,
    "_"
  )}`;

  const { error: uploadError } = await supabase.storage
    .from("artworks")
    .upload(cheminFichier, fichierImage);

  if (uploadError) {
    redirect(
      `/tableau-de-bord?erreur=${encodeURIComponent(uploadError.message)}`
    );
  }

  const { data: urlData } = supabase.storage
    .from("artworks")
    .getPublicUrl(cheminFichier);

  const imageUrl = urlData.publicUrl;

  // Générer un slug à partir du titre
  const slug = titre
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "") || `oeuvre-${Date.now()}`;

  const { error } = await supabase.from("artworks").insert({
    artist_id: artisteId,
    title: titre,
    slug,
    description: description || null,
    category: categorie,
    primary_image_url: imageUrl,
    price_fcfa: 0,
    stock_quantity: 1,
    is_available: true,
    is_published: true,
  });

  if (error) {
    redirect(`/tableau-de-bord?erreur=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/");
  revalidatePath("/tableau-de-bord");
  revalidatePath("/tableau-de-bord/parametres");
  revalidatePath(`/artistes/${user.id}`);
  redirect("/tableau-de-bord?message=oeuvre-ajoutee");
}

export async function modifierOeuvre(id: string, formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/connexion");
  }

  const titre = formData.get("titre") as string;
  const description = formData.get("description") as string;
  const categorie = formData.get("categorie") as CategorieArtwork;
  const videoUrl = formData.get("video_url") as string;
  const fichierImage = formData.get("image") as File;

  if (!titre || !categorie) {
    redirect("/tableau-de-bord/parametres?erreur=champs-manquants");
  }

  // Récupérer l'ID de l'artiste
  const { data: artisteData } = await supabase
    .from("artists")
    .select("id")
    .eq("user_id", user.id)
    .maybeSingle();

  const artisteId = artisteData?.id;

  if (!artisteId) {
    redirect("/tableau-de-bord/parametres?erreur=profil-artiste-introuvable");
  }

  let imageUrl: string | null = null;

  // Upload d'une nouvelle image si fournie
  if (fichierImage && fichierImage.size > 0) {
    const cheminFichier = `${user.id}/${Date.now()}-${fichierImage.name.replace(
      /[^a-zA-Z0-9.-]/g,
      "_"
    )}`;

    const { error: uploadError } = await supabase.storage
      .from("artworks")
      .upload(cheminFichier, fichierImage);

    if (uploadError) {
      redirect(
        `/tableau-de-bord/parametres?erreur=${encodeURIComponent(uploadError.message)}`
      );
    }

    const { data: urlData } = supabase.storage
      .from("artworks")
      .getPublicUrl(cheminFichier);

    imageUrl = urlData.publicUrl;

    // Supprimer l'ancienne image
    const { data: ancienneOeuvre } = await supabase
      .from("artworks")
      .select("primary_image_url")
      .eq("id", id)
      .eq("artist_id", artisteId)
      .single();

    if (ancienneOeuvre?.primary_image_url) {
      const ancienChemin = ancienneOeuvre.primary_image_url.split("/artworks/")[1];
      if (ancienChemin) {
        await supabase.storage.from("artworks").remove([ancienChemin]);
      }
    }
  }

  // Construire l'objet de mise à jour
  const updateData: Record<string, unknown> = {
    title: titre,
    description: description || null,
    category: categorie,
  };

  if (imageUrl) {
    updateData.primary_image_url = imageUrl;
  }

  const { error } = await supabase
    .from("artworks")
    .update(updateData)
    .eq("id", id)
    .eq("artist_id", artisteId);

  if (error) {
    redirect(
      `/tableau-de-bord/parametres?erreur=${encodeURIComponent(error.message)}`
    );
  }

  revalidatePath("/");
  revalidatePath("/tableau-de-bord");
  revalidatePath("/tableau-de-bord/parametres");
  revalidatePath(`/oeuvres/${id}`);
  revalidatePath(`/artistes/${user.id}`);
  redirect("/tableau-de-bord/parametres?message=oeuvre-modifiee");
}

export async function supprimerOeuvre(id: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/connexion");
  }

  // Récupérer l'ID de l'artiste
  const { data: artisteData } = await supabase
    .from("artists")
    .select("id")
    .eq("user_id", user.id)
    .maybeSingle();

  const artisteId = artisteData?.id;

  if (!artisteId) {
    redirect("/connexion");
  }

  // Récupérer l'image à supprimer du storage
  const { data: oeuvre } = await supabase
    .from("artworks")
    .select("primary_image_url")
    .eq("id", id)
    .eq("artist_id", artisteId)
    .single();

  if (oeuvre?.primary_image_url) {
    const cheminImage = oeuvre.primary_image_url.split("/artworks/")[1];
    if (cheminImage) {
      await supabase.storage.from("artworks").remove([cheminImage]);
    }
  }

  const { error } = await supabase
    .from("artworks")
    .delete()
    .eq("id", id)
    .eq("artist_id", artisteId);

  if (error) {
    redirect(`/tableau-de-bord?erreur=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/");
  revalidatePath("/tableau-de-bord");
  revalidatePath("/tableau-de-bord/parametres");
  revalidatePath(`/artistes/${user.id}`);
  redirect("/tableau-de-bord/parametres?message=oeuvre-supprimee");
}

// ============================================
// SUPPRESSION DE COMPTE
// ============================================

export async function supprimerCompte() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/connexion");
  }

  // La suppression du profil déclenchera le cascade delete sur les artists,
  // artworks, comments, artwork_likes et follows (clé étrangère ON DELETE CASCADE).
  const { error } = await supabase
    .from("profiles")
    .delete()
    .eq("id", user.id);

  if (error) {
    redirect(`/tableau-de-bord/parametres?erreur=${encodeURIComponent(error.message)}`);
  }

  // Déconnexion pour invalider la session
  await supabase.auth.signOut();

  revalidatePath("/");
  redirect("/?message=compte-supprime");
}

// ============================================
// COMMENTAIRES
// ============================================

export async function ajouterCommentaire(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/connexion");
  }

  const oeuvreId = formData.get("oeuvre_id") as string;
  const contenu = formData.get("contenu") as string;

  if (!contenu.trim()) {
    return;
  }

  const { error } = await supabase.from("comments").insert({
    artwork_id: oeuvreId,
    author_id: user.id,
    content: contenu.trim(),
  });

  if (error) {
    redirect(`/oeuvres/${oeuvreId}?erreur=${encodeURIComponent(error.message)}`);
  }

  revalidatePath(`/oeuvres/${oeuvreId}`);
  revalidatePath("/");
}

// ============================================
// COUPS DE CŒUR (LIKES)
// ============================================

export async function ajouterCoupDeCoeur(oeuvreId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/connexion");
  }

  const { error } = await supabase.from("artwork_likes").insert({
    artwork_id: oeuvreId,
    user_id: user.id,
  });

  if (error) {
    console.error("Erreur like:", error.message);
  }

  revalidatePath(`/oeuvres/${oeuvreId}`);
  revalidatePath("/");
}

export async function retirerCoupDeCoeur(oeuvreId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/connexion");
  }

  const { error } = await supabase
    .from("artwork_likes")
    .delete()
    .eq("artwork_id", oeuvreId)
    .eq("user_id", user.id);

  if (error) {
    console.error("Erreur unlike:", error.message);
  }

  revalidatePath(`/oeuvres/${oeuvreId}`);
  revalidatePath("/");
}

// ============================================
// ABONNEMENTS (SUIVRE UN ARTISTE)
// ============================================

export async function suivreArtiste(artisteId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/connexion");
  }

  const { error } = await supabase.from("follows").insert({
    follower_id: user.id,
    artist_id: artisteId,
  });

  if (error) {
    console.error("Erreur abonnement:", error.message);
  }

  revalidatePath(`/artistes/${artisteId}`);
}

export async function nePlusSuivre(artisteId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/connexion");
  }

  const { error } = await supabase
    .from("follows")
    .delete()
    .eq("follower_id", user.id)
    .eq("artist_id", artisteId);

  if (error) {
    console.error("Erreur désabonnement:", error.message);
  }

  revalidatePath(`/artistes/${artisteId}`);
}
