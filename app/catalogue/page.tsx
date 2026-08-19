import { createClient } from "@/lib/supabase/server";
import OeuvreCard from "@/components/public/OeuvreCard";
import FiltresCatalogue from "@/components/public/FiltresCatalogue";
import type { Oeuvre } from "@/lib/types";
import { CATEGORIES_ARTWORKS } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function PageCatalogue(props: {
  searchParams: Promise<{
    q?: string;
    categorie?: string;
    pays?: string;
    min?: string;
    max?: string;
    sort?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const supabase = await createClient();

  const q = searchParams.q?.trim() || "";
  const categorie = searchParams.categorie || "";
  const pays = searchParams.pays || "";
  const min = searchParams.min ? Number(searchParams.min) : null;
  const max = searchParams.max ? Number(searchParams.max) : null;
  const sort = searchParams.sort || "recent";

  let requete = supabase
    .from("artworks")
    .select("*, artiste:artists(display_name, country, city, profile_image_url)")
    .eq("is_published", true);

  if (categorie) requete = requete.eq("category", categorie);
  if (pays) requete = requete.eq("origin_country", pays);
  if (min) requete = requete.gte("price_fcfa", min);
  if (max) requete = requete.lte("price_fcfa", max);
  if (q) requete = requete.or(`title.ilike.%${q}%,description.ilike.%${q}%`);

  if (sort === "price_asc") requete = requete.order("price_fcfa", { ascending: true });
  else if (sort === "price_desc") requete = requete.order("price_fcfa", { ascending: false });
  else requete = requete.order("created_at", { ascending: false });

  const { data: oeuvres } = await requete.limit(100);

  const oeuvresNormalisees: Oeuvre[] = (oeuvres || []).map((o: any) => ({
    ...o,
    artiste: { ...o.artiste, display_name: o.artiste?.display_name || "Artiste" },
  }));

  return (
    <div className="bg-[#FAF7F0] min-h-screen py-10 sm:py-14 text-[#2F241A]" id="catalog-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start">
          <aside className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-[#E8DFCE]">
              <h2 className="font-serif-title text-xl font-medium text-[#4B2E20]">Filtres</h2>
            </div>
            <FiltresCatalogue
              categories={CATEGORIES_ARTWORKS.map((c) => c.value)}
              pays={["Côte d'Ivoire", "Sénégal", "Ghana", "Mali", "Cameroun", "Bénin", "Burkina Faso", "Nigeria"]}
              actifCategorie={categorie}
              actifPays={pays}
              min={min}
              max={max}
              sort={sort}
              q={q}
            />
          </aside>

          <div className="lg:col-span-9 space-y-8">
            <div>
              <h1 className="font-serif-title text-3xl font-bold text-[#241710]">Catalogue</h1>
              <p className="text-xs text-[#2F241A]/70 mt-1">{oeuvresNormalisees.length} œuvres disponibles</p>
            </div>

            {oeuvresNormalisees.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {oeuvresNormalisees.map((oeuvre) => (
                  <OeuvreCard key={oeuvre.id} oeuvre={oeuvre} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border-2 border-dashed border-[#E8DFCE] bg-white/50 p-16 text-center">
                <p className="text-4xl">🖼️</p>
                <h2 className="mt-4 text-xl font-semibold font-serif-title">Aucune œuvre trouvée</h2>
                <p className="mt-2 text-foreground/60 text-sm">Essayez d'autres critères de recherche.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}