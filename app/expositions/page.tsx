import { createClient } from "@/lib/supabase/server";
import { Calendar, User, Compass, ArrowRight } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

const expositionsDemo = [
  {
    id: "exhib-1",
    title: "Les Cordes Sacrées : De la Kora aux Formes Libres",
    theme: "Dialogue immersif entre lutherie mandingue, sculpture sur bois et art textile",
    dates: "15 Août — 30 Septembre 2026",
    curator: "Fatoumata Keïta (Conservatrice & Critique d'art)",
    coverImage: "/images/vibrant_african_art_hero_1787130350152.jpg",
    pavilionName: "Pavillon Ouest-Africain N'Kora",
    artworksCount: 28,
    isVirtual3D: true,
  },
  {
    id: "exhib-2",
    title: "Visages des Ancêtres & Masques d'Apparat",
    theme: "Masques sacrés, jarres de poterie et sculptures royales",
    dates: "En cours jusqu'au 15 Novembre 2026",
    curator: "Dr. Mamadou Bamba (Directeur d'Études)",
    coverImage: "/images/hero_mask_monumental_1787141482021.jpg",
    pavilionName: "Pavillon Sahel & Savane",
    artworksCount: 34,
    isVirtual3D: true,
  },
];

export default async function PageExpositions() {
  const supabase = await createClient();

  const { data: expositionsBdd } = await supabase
    .from("exhibitions")
    .select("*")
    .eq("is_active", true);

  const expositions = expositionsBdd && expositionsBdd.length > 0 ? expositionsBdd : expositionsDemo;

  return (
    <div className="bg-[#FAF7F0] min-h-screen py-10 sm:py-14 text-[#2F241A]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-2">
          <div className="text-[#A67123] text-xs uppercase font-bold tracking-widest">— RÉTROSPECTIVES & GALERIES IMMERSIVES</div>
          <h1 className="font-serif-title text-3xl sm:text-4xl lg:text-5xl font-bold text-[#241710]">Expositions Virtuelles</h1>
          <p className="text-xs sm:text-sm text-[#2F241A]/70 max-w-2xl">
            Explorez les grandes expositions d'art africain en immersion 3D interactive, accompagnées d'analyses curatorielles et de sonorités acoustiques traditionnelles.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10">
          {expositions.map((expo: any) => (
            <div key={expo.id} className="bg-[#2E1E15] rounded-3xl overflow-hidden shadow-2xl border border-[#3E2519]/60 text-[#F6F2E7] grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-7 relative">
                <div className="aspect-16/10 lg:aspect-auto lg:h-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={expo.coverImage} alt={expo.title} className="w-full h-full object-cover" />
                </div>
                <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-[#C4953A] text-[#241710] text-[10px] font-bold px-3 py-1.5 rounded-full">
                  <Compass className="w-3 h-3" />
                  3D Immersif
                </span>
              </div>

              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-center space-y-5">
                <div className="space-y-1">
                  <div className="text-[11px] text-[#D6B26A] font-bold uppercase tracking-widest">{expo.pavilionName}</div>
                  <h2 className="font-serif-title text-2xl font-bold">{expo.title}</h2>
                </div>

                <p className="text-xs text-[#E8D6B1]/75 leading-relaxed">{expo.theme}</p>

                <div className="space-y-2.5 text-xs text-[#E8D6B1]/80">
                  <div className="flex items-center gap-2.5">
                    <Calendar className="w-4 h-4 text-[#C4953A]" />
                    <span>{expo.dates}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <User className="w-4 h-4 text-[#C4953A]" />
                    <span>{expo.curator}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs font-bold text-[#D6B26A]">{expo.artworksCount} œuvres exposées</span>
                  <Link
                    href="/catalogue"
                    className="inline-flex items-center gap-2 bg-[#A67123] hover:bg-[#8F5F1B] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all"
                  >
                    Visiter l'exposition
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}