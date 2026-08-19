import React from 'react';
import { PageView } from '../types';
import logoImg from '../assets/images/nkora_main_brand_logo_1787154635918.jpg';
import sculptorImg from '../assets/images/african_master_sculptor_1787142432994.jpg';
import maskImg from '../assets/images/african_royal_mask_1787130431593.jpg';
import { ShieldCheck, Compass, Heart, Globe, ArrowRight } from 'lucide-react';

interface AboutSectionProps {
  onNavigate: (page: PageView) => void;
  onOpenAuth: (mode?: 'login' | 'artist-signup') => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onNavigate, onOpenAuth }) => {
  const pillars = [
    {
      icon: ShieldCheck,
      title: 'Authenticité & Traçabilité',
      desc: 'Chaque sculpture, masque rituel ou toile contemporaine est certifié d\'origine avec un passeport d\'authenticité garantissant sa provenance.'
    },
    {
      icon: Heart,
      title: 'Juste Rémunération des Artistes',
      desc: 'Nous supprimons les intermédiaires spéculatifs pour reverser la majorité de la valeur directement aux créateurs et maîtres ateliers du continent.'
    },
    {
      icon: Compass,
      title: 'Immersion & Pavillons Virtuels',
      desc: 'Grâce à des galeries virtuelles et visites audio-guidées, nous rendons les chefs-d\'œuvre africains accessibles au monde entier en haute fidélité.'
    },
    {
      icon: Globe,
      title: 'Rayonnement International',
      desc: 'Un réseau de diffusion présent à Dakar, Abidjan, Lagos et accessible aux collectionneurs, institutions muséales et passionnés sur tous les continents.'
    }
  ];

  return (
    <div className="py-8 sm:py-14 bg-[#FAF7F0] text-[#2F241A]" id="about-page">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20">
        
        {/* =========================================================================
            1. LARGE MASTER LOGO SHOWCASE (WITHOUT FRAME / CONTAINER BOX)
           ========================================================================= */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          
          {/* Prominent Master Brand Logo directly placed without any border or enclosing frame */}
          <div className="flex items-center justify-center">
            <img
              src={logoImg}
              alt="N'KORA — Art • Artistes • Culture — L'art africain, autrement."
              className="w-full max-w-2xl max-h-[360px] object-contain transition-transform duration-500 hover:scale-101"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="space-y-3 pt-2">
            <div className="text-xs uppercase tracking-[0.25em] text-[#A67123] font-semibold">
              — L'ÂME & LA VISION N'KORA —
            </div>

            <h1 className="font-serif-title text-3xl sm:text-5xl text-[#3E2519] font-normal leading-tight">
              L'art africain réinventé, <br />
              <span className="italic text-[#A67123]">au diapason de la Kora</span>
            </h1>

            <p className="text-sm sm:text-base text-[#2F241A]/80 leading-relaxed font-light max-w-2xl mx-auto">
              Inspirée par la <strong>Kora</strong> — instrument d'Afrique de l'Ouest mêlant harpe et luth sur calebasse résonante —, la plateforme <strong>N'KORA</strong> célèbre la polyphonie et la splendeur des arts du continent.
            </p>
          </div>

        </div>

        {/* =========================================================================
            2. VISUAL STORY & MISSION GRID
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Images Left */}
          <div className="lg:col-span-6 relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden shadow-md aspect-3/4 bg-[#241710]">
                  <img
                    src={maskImg}
                    alt="Masque rituel sacré"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-4 rounded-2xl bg-[#3E2519] text-[#E8D6B1] text-center space-y-1 shadow-sm">
                  <span className="font-serif-title text-2xl font-bold text-[#D6B26A] block">21 Cordes</span>
                  <span className="text-[11px] text-[#E8D6B1]/75 font-light">Symbole d'harmonie & de mémoire</span>
                </div>
              </div>

              <div className="space-y-4 pt-8">
                <div className="p-4 rounded-2xl bg-white border border-[#E8DFCE] text-center space-y-1 shadow-2xs">
                  <span className="font-serif-title text-2xl font-bold text-[#4B2E20] block">80+ Maîtres</span>
                  <span className="text-[11px] text-[#8B6236]">Sculpteurs, peintres & bronziers</span>
                </div>
                <div className="rounded-2xl overflow-hidden shadow-md aspect-3/4 bg-[#241710]">
                  <img
                    src={sculptorImg}
                    alt="Atelier de sculpture"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Text Right */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="text-xs uppercase tracking-[0.2em] text-[#A67123] font-semibold">
              — NOTRE ENGAGEMENT —
            </div>

            <h2 className="font-serif-title text-3xl sm:text-4xl text-[#3E2519] font-normal leading-snug">
              Un pont entre patrimoine ancestral et création contemporaine
            </h2>

            <p className="text-xs sm:text-sm text-[#2F241A]/80 leading-relaxed font-light">
              En Afrique, l'art n'est pas un simple objet décoratif : il est verbe, mémoire, célébration rituelle et transmission d'une philosophie millénaire.
            </p>

            <p className="text-xs sm:text-sm text-[#2F241A]/80 leading-relaxed font-light">
              N'KORA offre aux artistes africains un espace numérique d'exception pour exposer leurs œuvres, raconter leur processus de création et dialoguer directement avec les amateurs d'art et collectionneurs du monde entier.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => onNavigate('catalogue')}
                className="bg-[#A67123] hover:bg-[#8F5F1B] text-white font-medium text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-xs cursor-pointer flex items-center gap-2"
              >
                <span>Explorer le catalogue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onOpenAuth('artist-signup')}
                className="bg-[#3E2519] hover:bg-[#241710] text-[#E8D6B1] font-medium text-xs sm:text-sm px-6 py-3.5 rounded-xl transition-all cursor-pointer shadow-xs"
              >
                Rejoindre comme Artiste
              </button>
            </div>
          </div>

        </div>

        {/* =========================================================================
            3. LES 4 PILIERS FONDAMENTAUX
           ========================================================================= */}
        <div className="pt-4">
          <div className="text-center mb-12 space-y-1">
            <span className="text-xs uppercase tracking-widest text-[#A67123] font-semibold">
              LES FONDATIONS
            </span>
            <h3 className="font-serif-title text-3xl sm:text-4xl text-[#3E2519]">
              Les 4 Piliers N'KORA
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-2xl border border-[#E8DFCE]/80 shadow-2xs hover:shadow-md transition-all flex flex-col justify-start space-y-3"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#EFE6D5] flex items-center justify-center text-[#A67123]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif-title text-lg font-bold text-[#3E2519]">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-[#2F241A]/75 leading-relaxed font-light">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
