import { createClient } from "@/lib/supabase/server";
import HeroBanner from "@/components/public/HeroBanner";
import OeuvreCard from "@/components/public/OeuvreCard";
import type { Oeuvre } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function PageAccueil() {
  const supabase = await createClient();

  const { data: oeuvres } = await supabase
    .from("artworks")
    .select("*, artiste:artists(display_name, country, city, profile_image_url)")
    .eq("is_published", true)
    .order("created_at", { ascending: false })
    .limit(8);

  const oeuvresNormalisees: Oeuvre[] = (oeuvres || []).map((o: any) => ({
    ...o,
    artiste: { ...o.artiste, display_name: o.artiste?.display_name || "Artiste" },
  }));

  return (
    <div className="min-h-screen bg-[#FAF7F0]">
      <HeroBanner />

      {/* Œuvres en vedette */}
      <section className="py-16 sm:py-20 bg-[#FAF7F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="space-y-2">
            <div className="text-[#A67123] text-xs uppercase font-bold tracking-widest">— PIÈCES MAÎTRESSES</div>
            <h2 className="font-serif-title text-3xl sm:text-4xl lg:text-5xl font-bold text-[#241710]">Œuvres en Vedette</h2>
            <p className="text-xs sm:text-sm text-[#2F241A]/70 max-w-xl">Une sélection de créations d'exception, choisies par nos commissaires d'exposition.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {oeuvresNormalisees.length > 0 ? (
              oeuvresNormalisees.slice(0, 4).map((oeuvre) => <OeuvreCard key={oeuvre.id} oeuvre={oeuvre} />)
            ) : (
              [1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-2xl border border-[#E8DFCE]/80 overflow-hidden">
                  <div className="aspect-4/3 bg-[#241710]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={["/images/african_royal_mask_1787130431593.jpg", "/images/african_wooden_sculpture_1787143769088.jpg", "/images/african_painting_canvas_1787130390056.jpg", "/images/african_sculpture_maternite_1787156958511.jpg"][i - 1]}
                      alt="Œuvre"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 space-y-1">
                    <div className="h-4 bg-[#F6F2E7] rounded w-3/4" />
                    <div className="h-3 bg-[#F6F2E7] rounded w-1/2" />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Maître Artisan */}
      <section className="py-16 sm:py-20 bg-[#241710] text-[#F6F2E7] relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C4953A]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="rounded-3xl overflow-hidden shadow-2xl border border-[#3E2519]/60">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/african_master_sculptor_1787142432994.jpg" alt="Maître Artisan" className="w-full h-[400px] object-cover" />
          </div>
          <div className="space-y-6">
            <div className="text-[#D6B26A] text-xs uppercase font-bold tracking-widest">— LA PHILOSOPHIE DES 21 CORDES</div>
            <h2 className="font-serif-title text-3xl sm:text-4xl lg:text-5xl font-bold">L'art africain réinventé, <span className="italic text-[#D6B26A]">au diapason de la Kora</span></h2>
            <p className="text-xs sm:text-sm text-[#E8D6B1]/75 leading-relaxed max-w-xl">Inspirée par la Kora — instrument d'Afrique de l'Ouest mêlant harpe et luth —, la plateforme N'KORA célèbre la polyphonie et la splendeur des arts du continent.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { title: "Authenticité", desc: "Traçabilité et certificats d'origine" },
                { title: "Rémunération", desc: "Juste part reversée aux artistes" },
                { title: "Immersion", desc: "Galeries virtuelles 3D interactives" },
              ].map((item) => (
                <div key={item.title} className="bg-[#2E1E15] rounded-2xl p-4 border border-[#3E2519]/60">
                  <div className="text-[#D6B26A] font-bold text-xs uppercase tracking-wider">{item.title}</div>
                  <p className="text-[11px] text-[#E8D6B1]/70 mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Expositions Virtuelles */}
      <section className="py-16 sm:py-20 bg-[#FAF7F0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="space-y-2">
            <div className="text-[#A67123] text-xs uppercase font-bold tracking-widest">— RÉTROSPECTIVES & GALERIES IMMERSIVES</div>
            <h2 className="font-serif-title text-3xl sm:text-4xl lg:text-5xl font-bold text-[#241710]">Expositions Virtuelles</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-[#2E1E15] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#3E2519]/60 text-[#F6F2E7]">
              <div className="rounded-2xl overflow-hidden shadow-xl bg-black aspect-video">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/vibrant_african_art_hero_1787130350152.jpg" alt="Les Cordes Sacrées" className="w-full h-full object-cover" />
              </div>
              <div className="pt-5 space-y-3">
                <h3 className="font-serif-title text-xl font-bold">Les Cordes Sacrées : De la Kora aux Formes Libres</h3>
                <p className="text-xs text-[#E8D6B1]/70">15 Août — 30 Septembre 2026 • Pavillon Ouest-Africain N'Kora</p>
              </div>
            </div>
            <div className="bg-[#2E1E15] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#3E2519]/60 text-[#F6F2E7]">
              <div className="rounded-2xl overflow-hidden shadow-xl bg-black aspect-video">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/hero_mask_monumental_1787141482021.jpg" alt="Visages des Ancêtres" className="w-full h-full object-cover" />
              </div>
              <div className="pt-5 space-y-3">
                <h3 className="font-serif-title text-xl font-bold">Visages des Ancêtres & Masques d'Apparat</h3>
                <p className="text-xs text-[#E8D6B1]/70">En cours jusqu'au 15 Novembre 2026 • Pavillon Sahel & Savane</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
