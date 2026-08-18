"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "./supabase/server";
import type { Categorie } from "./types";

// ============================================
// AUTHENTIFICATION
// ============================================

export async function inscription(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const nomComplet = formData.get("nom_complet") as string;

  if (!email || !password || !nomComplet) {
    redirect("/inscription?erreur=missing-fields");
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        nom_complet: nomComplet,
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

  // Récupérer le profil actuel pour connaître la photo existante
  const { data: profilActuel } = await supabase
    .from("profils")
    .select("photo_url")
    .eq("id", user.id)
    .single();

  let photoUrl = profilActuel?.photo_url || null;

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
        `/tableau-de-bord?erreur=${encodeURIComponent(uploadError.message)}`
      );
    }

    const { data: urlData } = supabase.storage
      .from("avatars")
      .getPublicUrl(cheminFichier);

    photoUrl = urlData.publicUrl;

    // Supprimer l'ancienne photo si elle existe dans le bucket avatars
    if (profilActuel?.photo_url) {
      const ancienChemin = profilActuel.photo_url.split("/avatars/")[1];
      if (ancienChemin) {
        await supabase.storage.from("avatars").remove([ancienChemin]);
      }
    }
  }

  const { error } = await supabase
    .from("profils")
    .update({
      nom_complet: nomComplet,
      bio: bio,
      pays: pays,
      photo_url: photoUrl,
    })
    .eq("id", user.id);

  if (error) {
    redirect(`/tableau-de-bord?erreur=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/tableau-de-bord");
  revalidatePath(`/artistes/${user.id}`);
  revalidatePath("/");
  redirect("/tableau-de-bord?message=profil-mis-a-jour");
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
  const categorie = formData.get("categorie") as Categorie;
  const videoUrl = formData.get("video_url") as string;
  const fichierImage = formData.get("image") as File;

  if (!titre || !categorie || !fichierImage || fichierImage.size === 0) {
    redirect("/tableau-de-bord?erreur=champs-manquants");
  }

  // Upload de l'image dans Supabase Storage
  const cheminFichier = `${user.id}/${Date.now()}-${fichierImage.name.replace(
    /[^a-zA-Z0-9.-]/g,
    "_"
  )}`;

  const { error: uploadError } = await supabase.storage
    .from("oeuvres")
    .upload(cheminFichier, fichierImage);

  if (uploadError) {
    redirect(
      `/tableau-de-bord?erreur=${encodeURIComponent(uploadError.message)}`
    );
  }

  const { data: urlData } = supabase.storage
    .from("oeuvres")
    .getPublicUrl(cheminFichier);

  const imageUrl = urlData.publicUrl;

  const { error } = await supabase.from("oeuvres").insert({
    artiste_id: user.id,
    titre,
    description: description || null,
    categorie,
    image_url: imageUrl,
    video_url: videoUrl || null,
  });

  if (error) {
    redirect(`/tableau-de-bord?erreur=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/");
  revalidatePath("/tableau-de-bord");
  redirect("/tableau-de-bord?message=oeuvre-ajoutee");
}

export async function supprimerOeuvre(id: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/connexion");
  }

  const { error } = await supabase
    .from("oeuvres")
    .delete()
    .eq("id", id)
    .eq("artiste_id", user.id);

  if (error) {
    redirect(`/tableau-de-bord?erreur=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/");
  revalidatePath("/tableau-de-bord");
  redirect("/tableau-de-bord?message=oeuvre-supprimee");
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

  const { error } = await supabase.from("commentaires").insert({
    oeuvre_id: oeuvreId,
    auteur_id: user.id,
    contenu: contenu.trim(),
  });

  if (error) {
    redirect(`/oeuvres/${oeuvreId}?erreur=${encodeURIComponent(error.message)}`);
  }

  revalidatePath(`/oeuvres/${oeuvreId}`);
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

  const { error } = await supabase.from("coups_de_coeur").insert({
    oeuvre_id: oeuvreId,
    utilisateur_id: user.id,
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
    .from("coups_de_coeur")
    .delete()
    .eq("oeuvre_id", oeuvreId)
    .eq("utilisateur_id", user.id);

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

  const { error } = await supabase.from("abonnements").insert({
    abonne_id: user.id,
    artiste_id: artisteId,
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
    .from("abonnements")
    .delete()
    .eq("abonne_id", user.id)
    .eq("artiste_id", artisteId);

  if (error) {
    console.error("Erreur désabonnement:", error.message);
  }

  revalidatePath(`/artistes/${artisteId}`);
}