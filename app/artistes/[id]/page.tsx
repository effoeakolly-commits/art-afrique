import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import OeuvreCard from "@/components/OeuvreCard";
import BoutonSuivre from "@/components/BoutonSuivre";
import type { Oeuvre } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function generateMetadata(props: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await props.params;
  const supabase = await createClient();

  const { data: artiste } = await supabase
    .from("profils")
    .select("nom_complet, bio, pays")
    .eq("id", id)
    .single();

  if (!artiste) {
    return { title: "Artiste introuvable — ArtAfrique" };
  }

  return {
    title: `${artiste.nom_complet} — ArtAfrique`,
    description:
      artiste.bio?.slice(0, 160) ||
      `Découvrez les œuvres de ${artiste.nom_complet}${artiste.pays ? `, artiste de ${artiste.pays}` : ""} sur ArtAfrique.`,
  };
}

export default async function PageArtiste(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Récupérer le profil de l'artiste
  const { data: artiste, error } = await supabase
    .from("profils")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !artiste) {
    notFound();
  }

  // Récupérer les œuvres de l'artiste avec les compteurs de likes
  const { data: oeuvres } = await supabase
    .from("oeuvres")
    .select(`*, coups_de_coeur(count)`)
    .eq("artiste_id", id)
    .order("created_at", { ascending: false });

  const oeuvresNormalisees: Oeuvre[] = (oeuvres || []).map((o: any) => ({
    ...o,
    artiste: artiste,
    coups_de_coeur_count: o.coups_de_coeur?.[0]?.count ?? 0,
  }));

  // Vérifier si l'utilisateur suit cet artiste
  let estSuivi = false;
  if (user && user.id !== id) {
    const { data: abonnementExistant } = await supabase
      .from("abonnements")
      .select("id")
      .eq("abonne_id", user.id)
      .eq("artiste_id", id)
      .maybeSingle();
    estSuivi = !!abonnementExistant;
  }

  // Compter les abonnés
  const { count: nombreAbonnes } = await supabase
    .from("abonnements")
    .select("id", { count: "exact", head: true })
    .eq("artiste_id", id);

  const initiale = artiste.nom_complet?.charAt(0) || "?";

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* En-tête du profil */}
      <div className="mb-10 flex flex-col items-center gap-6 rounded-3xl bg-white p-8 shadow-sm sm:flex-row sm:items-start">
        {/* Avatar */}
        {artiste.photo_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={artiste.photo_url}
            alt={`Photo de ${artiste.nom_complet}`}
            className="h-24 w-24 shrink-0 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-primary/10 text-4xl font-bold text-primary uppercase">
            {initiale}
          </div>
        )}

        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-3xl font-bold tracking-tight">
            {artiste.nom_complet}
          </h1>

          <div className="mt-2 flex flex-wrap items-center justify-center gap-3 text-sm text-foreground/60 sm:justify-start">
            {artiste.pays && <span>📍 {artiste.pays}</span>}
            <span>
              {oeuvresNormalisees.length} œuvre
              {oeuvresNormalisees.length > 1 ? "s" : ""}
            </span>
            <span>
              {nombreAbonnes || 0} abonné{(nombreAbonnes || 0) > 1 ? "s" : ""}
            </span>
          </div>

          {artiste.bio && (
            <p className="mt-4 whitespace-pre-line text-foreground/70">
              {artiste.bio}
            </p>
          )}

          <div className="mt-4">
            <BoutonSuivre
              artisteId={id}
              estSuivi={estSuivi}
              nombreAbonnes={nombreAbonnes || 0}
              estConnecte={!!user}
              estProprietaire={user?.id === id}
            />
          </div>
        </div>
      </div>

      {/* Œuvres de l'artiste */}
      <h2 className="mb-6 text-2xl font-bold tracking-tight">
        Ses œuvres
      </h2>

      {oeuvresNormalisees.length > 0 ? (
        <div className="masonry-grid">
          {oeuvresNormalisees.map((oeuvre) => (
            <OeuvreCard key={oeuvre.id} oeuvre={oeuvre} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border-2 border-dashed border-black/10 bg-white/50 p-16 text-center">
          <p className="text-4xl">🎨</p>
          <h3 className="mt-4 text-xl font-semibold">
            Aucune œuvre pour le moment
          </h3>
          <p className="mt-2 text-foreground/60">
            Cet artiste n'a pas encore publié d'œuvres.
          </p>
        </div>
      )}

      <div className="mt-10 text-center">
        <Link
          href="/"
          className="text-sm font-medium text-primary hover:underline"
        >
          ← Retour à la découverte
        </Link>
      </div>
    </div>
  );
}