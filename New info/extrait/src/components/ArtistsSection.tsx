import React from 'react';
import { PageView } from '../types';
import sculptorImg from '../assets/images/african_master_sculptor_1787142432994.jpg';
import nkoraEmblemImg from '../assets/images/nkora_circular_emblem_1787143741297.jpg';
import { Check, ArrowRight } from 'lucide-react';

interface ArtistsSectionProps {
  onNavigate: (page: PageView) => void;
  onOpenAuth: (mode?: 'login' | 'artist-signup') => void;
}

export const ArtistsSection: React.FC<ArtistsSectionProps> = ({ onNavigate }) => {
  return (
    <section className="py-16 sm:py-24 bg-[#3E2519] text-[#F6F2E7] relative overflow-hidden" id="artists-mission-section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Master Sculptor Portrait in Workshop (No outline border) */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-4/3 sm:aspect-5/4">
              <img
                src={sculptorImg}
                alt="Maître artisan sculpteur N'KORA"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#241710]/50 via-transparent to-black/10" />

              {/* Top-Left Badge: 80+ Artistes (No border) */}
              <div className="absolute top-5 left-5 bg-[#241710]/90 backdrop-blur-md px-4 py-2.5 rounded-2xl text-center shadow-xl">
                <span className="font-serif-title text-xl sm:text-2xl font-bold text-[#D6B26A] block leading-none">
                  80+
                </span>
                <span className="text-[11px] uppercase tracking-wider text-[#E8D6B1]/90 font-medium">
                  Artistes
                </span>
              </div>

              {/* Bottom-Right Circular N'KORA Logo Emblem with Transparent Blend */}
              <div className="absolute -bottom-2 -right-2 w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden shadow-2xl flex items-center justify-center p-1 bg-[#241710]/95 backdrop-blur-md">
                <img
                  src={nkoraEmblemImg}
                  alt="Sceau N'KORA Kora"
                  className="w-full h-full object-contain rounded-full"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Mission Content */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Eyebrow */}
            <div className="text-xs uppercase tracking-[0.2em] text-[#D6B26A] font-semibold flex items-center gap-2">
              <span className="w-6 h-0.5 bg-[#C4953A]" />
              <span>NOTRE MISSION</span>
            </div>

            {/* Headline matching image #3 */}
            <h2 className="font-serif-title text-3xl sm:text-5xl lg:text-6xl text-[#F6F2E7] font-normal leading-[1.12]">
              Valoriser l'héritage <br />
              <span className="italic text-[#D6B26A]">et la créativité</span> <br />
              africaine
            </h2>

            {/* Description Paragraph */}
            <p className="text-sm sm:text-base text-[#E8D6B1]/85 leading-relaxed font-light">
              N'KORA est bien plus qu'une plateforme de vente. C'est un espace de rencontre entre artistes talentueux et amateurs d'art passionnés, unis par l'amour de la culture africaine.
            </p>

            {/* Checklist */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-sm text-[#F6F2E7]/90 font-medium">
                <div className="w-5 h-5 rounded-full bg-[#C4953A]/20 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-[#D6B26A]" />
                </div>
                <span>Œuvres authentiques et certifiées</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-[#F6F2E7]/90 font-medium">
                <div className="w-5 h-5 rounded-full bg-[#C4953A]/20 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-[#D6B26A]" />
                </div>
                <span>Soutien direct aux artistes africains</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-[#F6F2E7]/90 font-medium">
                <div className="w-5 h-5 rounded-full bg-[#C4953A]/20 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-[#D6B26A]" />
                </div>
                <span>Coordination directe et sécurisée avec l'artiste</span>
              </div>
            </div>

            {/* Solid Refined Action Buttons (No metallic gradients) */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                id="btn-discover-artists"
                onClick={() => onNavigate('artistes')}
                className="bg-[#C4953A] hover:bg-[#B3832B] text-[#241710] font-bold text-xs sm:text-sm tracking-wide px-7 py-3.5 rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Découvrir les artistes</span>
                <ArrowRight className="w-4 h-4 text-[#241710]" />
              </button>

              <button
                id="btn-mission-more"
                onClick={() => onNavigate('a-propos')}
                className="bg-[#241710]/80 hover:bg-[#241710] text-[#E8D6B1] font-medium text-xs sm:text-sm px-6 py-3.5 rounded-xl transition-all cursor-pointer shadow-md"
              >
                <span>En savoir plus</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
