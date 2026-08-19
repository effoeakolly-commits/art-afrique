import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import BoutonSuivre from "@/components/BoutonSuivre";
import BoutonLike from "@/components/BoutonLike";
import type { Oeuvre } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function generateMetadata(props: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await props.params;
  const supabase = await createClient();

  const { data: artiste } = await supabase
    .from("artists")
    .select("display_name, bio, country")
    .eq("id", id)
    .maybeSingle();

  if (!artiste) {
    return { title: "Artiste introuvable — ArtAfrique" };
  }

  return {
    title: `${artiste.display_name} — ArtAfrique`,
    description:
      artiste.bio?.slice(0, 160) ||
      `Découvrez les œuvres de ${artiste.display_name}${artiste.country ? `, artiste de ${artiste.country}` : ""} sur ArtAfrique.`,
  };
}

function formaterDate(date: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export default async function PageArtiste(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Récupérer le profil artiste
  const { data: artiste } = await supabase
    .from("artists")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!artiste) {
    notFound();
  }

  // Récupérer les œuvres de l'artiste avec les compteurs de likes
  const { data: oeuvresData } = await supabase
    .from("artworks")
    .select("*, artwork_likes(count)")
    .eq("artist_id", artiste.id)
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  const oeuvres: Oeuvre[] = (oeuvresData || []).map((o: any) => ({
    ...o,
    likes_count: o.artwork_likes?.[0]?.count ?? 0,
    artiste: artiste,
    primary_image_url: o.primary_image_url || "/images/placeholder.png",
  }));

  // Vérifier si l'utilisateur suit cet artiste
  let estSuivi = false;
  if (user && user.id !== artiste.user_id) {
    const { data: abonnementExistant } = await supabase
      .from("follows")
      .select("id")
      .eq("follower_id", user.id)
      .eq("artist_id", artiste.id)
      .maybeSingle();
    estSuivi = !!abonnementExistant;
  }

  // Compter les abonnés
  const { count: nombreAbonnes } = await supabase
    .from("follows")
    .select("id", { count: "exact", head: true })
    .eq("artist_id", artiste.id);

  // Compter le total de coups de cœur sur toutes les œuvres de l'artiste
  const { count: totalCoupsDeCoeur } = await supabase
    .from("artwork_likes")
    .select("id", { count: "exact", head: true })
    .in(
      "artwork_id",
      (oeuvresData || []).map((o: any) => o.id)
    );

  const displayName = artiste.display_name || "Artiste";
  const initiale = displayName.charAt(0) || "?";

  return (
    <div className="min-h-screen bg-background">
      {/* ============ BANNIÈRE ============ */}
      <header className="relative h-72 w-full overflow-hidden sm:h-80">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-[#d97706] to-[#8B4513]" />
        <div className="absolute inset-0 opacity-15 [background-image:radial-gradient(circle_at_15%_40%,white_1px,transparent_2px),radial-gradient(circle_at_85%_35%,white_1px,transparent_2px),radial-gradient(circle_at_50%_75%,white_1px,transparent_2px)] [background-size:60px_80px]" />

        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="font-serif italic text-4xl font-black text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] sm:text-5xl md:text-6xl">
            {displayName}
          </h1>
        </div>
      </header>

      {/* ============ PROFIL ============ */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-16 sm:-mt-20 flex flex-col items-center gap-6 sm:flex-row sm:items-end sm:gap-8">
          {artiste.profile_image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={artiste.profile_image_url}
              alt={`Photo de ${displayName}`}
              className="h-32 w-32 shrink-0 rounded-full border-4 border-background object-cover shadow-xl sm:h-40 sm:w-40"
            />
          ) : (
            <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-full border-4 border-background bg-primary/10 text-5xl font-bold text-primary uppercase shadow-xl sm:h-40 sm:w-40">
              {initiale}
            </div>
          )}

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-center sm:justify-start">
            <div>
              <p className="text-2xl font-bold text-foreground">{oeuvres.length}</p>
              <p className="text-xs text-foreground/50">
                {oeuvres.length > 1 ? "Œuvres" : "Œuvre"}
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {totalCoupsDeCoeur || 0}
              </p>
              <p className="text-xs text-foreground/50">Coups de cœur</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {nombreAbonnes || 0}
              </p>
              <p className="text-xs text-foreground/50">
                {nombreAbonnes && nombreAbonnes > 1 ? "Abonnés" : "Abonné"}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center sm:text-left">
          <p className="text-sm text-foreground/50">
            {artiste.country && (
              <span className="inline-flex items-center gap-1">
                📍 {artiste.country}
              </span>
            )}
          </p>

          {artiste.bio && (
            <p className="mt-4 max-w-xl whitespace-pre-line text-foreground/70">
              {artiste.bio}
            </p>
          )}

          {user && user.id !== artiste.user_id && (
            <div className="mt-4">
              <BoutonSuivre
                artisteId={artiste.id}
                estSuivi={estSuivi}
                nombreAbonnes={nombreAbonnes || 0}
                estConnecte={!!user}
                estProprietaire={false}
              />
            </div>
          )}
        </div>

        {/* ============ GALERIE ============ */}
        <section className="mt-12">
          <h2 className="mb-6 text-2xl font-bold tracking-tight">
            Galerie
            <span className="ml-2 text-base font-normal text-foreground/40">
              ({oeuvres.length})
            </span>
          </h2>

          {oeuvres.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {oeuvres.map((oeuvre) => (
                <Link
                  key={oeuvre.id}
                  href={`/oeuvres/${oeuvre.slug}`}
                  className="group relative block overflow-hidden rounded-2xl bg-white shadow-sm transition hover:shadow-xl"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={oeuvre.primary_image_url}
                      alt={oeuvre.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      loading="lazy"
                    />

                    <span className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur capitalize">
                      {oeuvre.category}
                    </span>

                    <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/40 to-transparent p-5 opacity-0 transition duration-300 group-hover:opacity-100">
                      <h3 className="text-lg font-semibold text-white">
                        {oeuvre.title}
                      </h3>
                      {oeuvre.description && (
                        <p className="mt-1.5 line-clamp-3 text-sm text-white/85">
                          {oeuvre.description}
                        </p>
                      )}
                      <div className="mt-3 flex items-center justify-between text-xs text-white/80">
                        <span className="inline-flex items-center gap-1">
                          ❤️ {oeuvre.likes_count ?? 0}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          🗓️ {formaterDate(oeuvre.created_at)}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border-2 border-dashed border-black/10 bg-white/50 p-16 text-center">
              <p className="text-4xl">🎨</p>
              <h3 className="mt-4 text-xl font-semibold">
                Aucune œuvre pour le moment
              </h3>
              <p className="mt-2 text-foreground/60">
                Cet artiste n'a pas encore publié d'œuvres. Revenez bientôt !
              </p>
            </div>
          )}
        </section>

        {/* Lien retour */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="text-sm font-medium text-primary hover:underline"
          >
            ← Retour à la découverte
          </Link>
        </div>
      </div>
    </div>
  );
}
