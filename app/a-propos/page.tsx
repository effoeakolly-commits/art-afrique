import Link from "next/link";
import Logo from "@/components/Logo";
import { ShieldCheck, Compass, Heart, Globe } from "lucide-react";

const pillars = [
  { icon: ShieldCheck, title: "Authenticité & Traçabilité", desc: "Chaque sculpture, masque rituel ou toile contemporaine est certifié d'origine avec un passeport d'authenticité garantissant sa provenance." },
  { icon: Heart, title: "Juste Rémunération des Artistes", desc: "Nous supprimons les intermédiaires spéculatifs pour reverser la majorité de la valeur directement aux créateurs et maîtres ateliers du continent." },
  { icon: Compass, title: "Immersion & Pavillons Virtuels", desc: "Grâce à des galeries virtuelles et visites audio-guidées, nous rendons les chefs-d'œuvre africains accessibles au monde entier en haute fidélité." },
  { icon: Globe, title: "Rayonnement International", desc: "Un réseau de diffusion présent à Dakar, Abidjan, Lagos et accessible aux collectionneurs du monde entier." },
];

export default function PageAPropos() {
  return (
    <div className="py-8 sm:py-14 bg-[#FAF7F0] text-[#2F241A]" id="about-page">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Grand Logo */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <div className="flex items-center justify-center">
            <Logo variant="full" size="xl" />
          </div>
          <div className="space-y-3 pt-2">
            <div className="text-xs uppercase tracking-[0.25em] text-[#A67123] font-semibold">— L'ÂME & LA VISION N'KORA —</div>
            <h1 className="font-serif-title text-3xl sm:text-5xl text-[#3E2519] font-normal leading-tight">
              L'art africain réinventé, <br />
              <span className="italic text-[#A67123]">au diapason de la Kora</span>
            </h1>
            <p className="text-sm sm:text-base text-[#2F241A]/80 leading-relaxed font-light max-w-2xl mx-auto">
              Inspirée par la <strong>Kora</strong> — instrument d'Afrique de l'Ouest mêlant harpe et luth sur calebasse résonante —, la plateforme <strong>N'KORA</strong> célèbre la polyphonie et la splendeur des arts du continent.
            </p>
          </div>
        </div>

        {/* 4 Piliers */}
        <div>
          <div className="text-center space-y-2 mb-10">
            <div className="text-[#A67123] text-xs uppercase font-bold tracking-widest">— LES 4 PILIERS FONDATEURS —</div>
            <h2 className="font-serif-title text-3xl font-bold text-[#241710]">Notre Manifeste</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar) => (
              <div key={pillar.title} className="bg-white p-6 rounded-2xl border border-[#E8DFCE]/80 shadow-2xs space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#241710] text-[#D6B26A] flex items-center justify-center">
                  <pillar.icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif-title text-lg font-bold text-[#241710]">{pillar.title}</h3>
                <p className="text-xs text-[#2F241A]/70 leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-8">
          <Link href="/catalogue" className="inline-flex items-center gap-2 bg-[#A67123] hover:bg-[#8F5F1B] text-white text-xs font-bold px-6 py-3.5 rounded-xl transition-all shadow-md">
            Découvrir le catalogue
          </Link>
        </div>
      </div>
    </div>
  );
}