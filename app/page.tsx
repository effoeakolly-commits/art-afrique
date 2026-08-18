import { createClient } from "@/lib/supabase/server";
import OeuvreCard from "@/components/OeuvreCard";
import Filtres from "@/components/Filtres";
import type { Oeuvre } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function PageAccueil(props: {
  searchParams: Promise<{
    q?: string;
    categorie?: string;
    pays?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const supabase = await createClient();

  const q = searchParams.q?.trim() || "";
  const categorie = searchParams.categorie || "";
  const pays = searchParams.pays || "";

  // Construire la requête
  let requete = supabase
    .from("oeuvres")
    .select(
      `*, artiste:profils(nom_complet, pays, photo_url), coups_de_coeur(count)`
    )
    .order("created_at", { ascending: false });

  if (categorie) {
    requete = requete.eq("categorie", categorie);
  }

  if (pays) {
    requete = requete.eq("artiste.pays", pays);
  }

  if (q) {
    requete = requete.or(`titre.ilike.%${q}%,description.ilike.%${q}%`);
  }

  // Exécuter la requête avec pagination
  requete = requete.range(0, 99);

  const { data: oeuvres, error } = await requete;

  if (error) {
    console.error("Erreur chargement œuvres:", error.message);
  }

  // Normaliser les données
  const oeuvresNormalisees: Oeuvre[] = (oeuvres || []).map((o: any) => ({
    ...o,
    coups_de_coeur_count: o.coups_de_coeur?.[0]?.count ?? 0,
  }));

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* En-tête */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Découvrez l'art africain
        </h1>
        <p className="mt-2 text-lg text-foreground/60">
          Peintures, sculptures, photographies et artisanat — par les artistes
          du continent
        </p>
      </div>

      {/* Filtres */}
      <div className="mb-8">
        <Filtres />
      </div>

      {/* Résultats */}
      {q && (
        <p className="mb-4 text-sm text-foreground/60">
          Résultats pour{" "}
          <span className="font-semibold text-foreground">« {q} »</span> (
          {oeuvresNormalisees.length})
        </p>
      )}

      {oeuvresNormalisees.length > 0 ? (
        <div className="masonry-grid">
          {oeuvresNormalisees.map((oeuvre) => (
            <OeuvreCard key={oeuvre.id} oeuvre={oeuvre} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border-2 border-dashed border-black/10 bg-white/50 p-16 text-center">
          <p className="text-4xl">🖼️</p>
          <h2 className="mt-4 text-xl font-semibold">
            Aucune œuvre trouvée
          </h2>
          <p className="mt-2 text-foreground/60">
            {q
              ? `Aucun résultat pour « ${q} ». Essayez d'autres mots-clés.`
              : "Les premières œuvres apparaîtront ici. Revenez bientôt !"}
          </p>
        </div>
      )}
    </div>
  );
}