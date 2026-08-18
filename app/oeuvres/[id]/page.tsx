import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import BoutonLike from "@/components/BoutonLike";
import SectionCommentaires from "@/components/SectionCommentaires";
import BoutonSuivre from "@/components/BoutonSuivre";

export const dynamic = "force-dynamic";

export async function generateMetadata(props: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await props.params;
  const supabase = await createClient();

  const { data: oeuvre } = await supabase
    .from("oeuvres")
    .select("titre, description, image_url, artiste:profils(nom_complet)")
    .eq("id", id)
    .single();

  if (!oeuvre) {
    return { title: "Œuvre introuvable — ArtAfrique" };
  }

  const artiste = (oeuvre as any).artiste?.[0] || (oeuvre as any).artiste;
  const nomArtiste = artiste?.nom_complet || "un artiste africain";

  return {
    title: `${oeuvre.titre} — ArtAfrique`,
    description:
      oeuvre.description?.slice(0, 160) ||
      `Découvrez « ${oeuvre.titre} » par ${nomArtiste} sur ArtAfrique.`,
    openGraph: {
      title: `${oeuvre.titre} — ArtAfrique`,
      description:
        oeuvre.description?.slice(0, 160) ||
        `Découvrez « ${oeuvre.titre} » par ${nomArtiste} sur ArtAfrique.`,
      images: oeuvre.image_url ? [{ url: oeuvre.image_url }] : [],
    },
  };
}

export default async function PageOeuvre(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Récupérer l'œuvre avec l'artiste et les commentaires
  const { data: oeuvre, error } = await supabase
    .from("oeuvres")
    .select(
      `*, artiste:profils(*), commentaires(*, auteur:profils(nom_complet)), coups_de_coeur(count)`
    )
    .eq("id", id)
    .single();

  if (error || !oeuvre) {
    notFound();
  }

  // Vérifier si l'utilisateur connecté a liké cette œuvre
  let estAime = false;
  if (user) {
    const { data: likeExistant } = await supabase
      .from("coups_de_coeur")
      .select("id")
      .eq("oeuvre_id", id)
      .eq("utilisateur_id", user.id)
      .maybeSingle();
    estAime = !!likeExistant;
  }

  // Vérifier si l'utilisateur connecté suit cet artiste
  let estSuivi = false;
  if (user && user.id !== oeuvre.artiste_id) {
    const { data: abonnementExistant } = await supabase
      .from("abonnements")
      .select("id")
      .eq("abonne_id", user.id)
      .eq("artiste_id", oeuvre.artiste_id)
      .maybeSingle();
    estSuivi = !!abonnementExistant;
  }

  // Compter les abonnés
  const { count: nombreAbonnes } = await supabase
    .from("abonnements")
    .select("id", { count: "exact", head: true })
    .eq("artiste_id", oeuvre.artiste_id);

  const nombreLikes = oeuvre.coups_de_coeur?.[0]?.count ?? 0;
  const commentaires = oeuvre.commentaires || [];

  // Extraire l'ID YouTube si la vidéo est un lien YouTube
  let youtubeId: string | null = null;
  if (oeuvre.video_url) {
    const match = oeuvre.video_url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    youtubeId = match?.[1] || null;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Image de l'œuvre */}
        <div>
          <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={oeuvre.image_url}
              alt={oeuvre.titre}
              className="w-full object-cover"
            />
          </div>

          {/* Vidéo YouTube du processus créatif */}
          {youtubeId && (
            <div className="mt-6">
              <h2 className="mb-3 text-lg font-semibold">
                🎬 Le processus créatif
              </h2>
              <div className="overflow-hidden rounded-2xl bg-black shadow-sm">
                <iframe
                  src={`https://www.youtube.com/embed/${youtubeId}`}
                  title={`Processus créatif - ${oeuvre.titre}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="aspect-video w-full"
                />
              </div>
            </div>
          )}
        </div>

        {/* Détails de l'œuvre */}
        <div>
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium capitalize text-primary">
            {oeuvre.categorie}
          </span>

          <h1 className="mt-3 text-3xl font-bold tracking-tight">
            {oeuvre.titre}
          </h1>

          {/* Artiste */}
          {oeuvre.artiste && (
            <div className="mt-4 flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm">
              <Link
                href={`/artistes/${oeuvre.artiste_id}`}
                className="flex items-center gap-3"
              >
                {oeuvre.artiste.photo_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={oeuvre.artiste.photo_url}
                    alt={`Photo de ${oeuvre.artiste.nom_complet}`}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                ) : (
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-lg font-semibold text-primary uppercase">
                    {oeuvre.artiste.nom_complet?.charAt(0) || "?"}
                  </span>
                )}
                <div>
                  <p className="font-semibold hover:text-primary">
                    {oeuvre.artiste.nom_complet}
                  </p>
                  {oeuvre.artiste.pays && (
                    <p className="text-sm text-foreground/50">
                      📍 {oeuvre.artiste.pays}
                    </p>
                  )}
                </div>
              </Link>

              <BoutonSuivre
                artisteId={oeuvre.artiste_id}
                estSuivi={estSuivi}
                nombreAbonnes={nombreAbonnes || 0}
                estConnecte={!!user}
                estProprietaire={user?.id === oeuvre.artiste_id}
              />
            </div>
          )}

          {/* Description */}
          {oeuvre.description && (
            <div className="mt-6">
              <h2 className="mb-2 text-lg font-semibold">Description</h2>
              <p className="whitespace-pre-line text-foreground/80">
                {oeuvre.description}
              </p>
            </div>
          )}

          {/* Date de publication */}
          <p className="mt-4 text-sm text-foreground/40">
            Publié le{" "}
            {new Date(oeuvre.created_at).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>

          {/* Bouton like */}
          <div className="mt-6">
            <BoutonLike
              oeuvreId={oeuvre.id}
              estAime={estAime}
              nombreLikes={nombreLikes}
              estConnecte={!!user}
            />
          </div>

          {/* Commentaires */}
          <SectionCommentaires
            oeuvreId={oeuvre.id}
            commentaires={commentaires}
            estConnecte={!!user}
          />
        </div>
      </div>
    </div>
  );
}