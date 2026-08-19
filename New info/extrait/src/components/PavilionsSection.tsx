import React from 'react';
import { PageView } from '../types';
import { FEATURED_EXHIBITIONS } from '../data/mockData';
import { Compass, Calendar, Layers, ArrowRight, Glasses } from 'lucide-react';

interface PavilionsSectionProps {
  onNavigate: (page: PageView) => void;
  onOpenVirtualTour: (exhibitionId: string) => void;
}

export const PavilionsSection: React.FC<PavilionsSectionProps> = ({
  onNavigate,
  onOpenVirtualTour
}) => {
  return (
    <section className="py-16 sm:py-24 bg-[#EFE6D3]/40" id="pavilions-section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs uppercase tracking-[0.2em] text-[#C4953A] font-semibold mb-2">
            — PAVILLONS IMMERSIFS —
          </div>
          <h2 className="font-serif-title text-3xl sm:text-4xl lg:text-5xl text-[#4B2E20] font-normal">
            Expositions Virtuelles & 3D
          </h2>
          <p className="text-sm sm:text-base text-[#2F241A]/75 mt-3 leading-relaxed">
            Parcourez nos galeries interactives depuis votre écran ou en immersion VR. 
            Découvrez l'histoire de chaque chef-d'œuvre avec nos commentaires sonores et audio-guides.
          </p>
        </div>

        {/* Exhibition Cards - No outline border */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {FEATURED_EXHIBITIONS.map((exhib) => (
            <div
              key={exhib.id}
              className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col group"
            >
              {/* Image Banner */}
              <div className="relative h-64 sm:h-72 overflow-hidden bg-[#241710]">
                <img
                  src={exhib.coverImage}
                  alt={exhib.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#241710] via-black/25 to-transparent" />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="px-3 py-1.5 rounded-xl bg-[#241710]/90 backdrop-blur-md text-[#D6B26A] text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                    <Glasses className="w-4 h-4 text-[#C4953A]" /> Galerie 3D Interactive
                  </span>
                  <span className="px-3 py-1 rounded-xl bg-white/90 text-[#4B2E20] text-xs font-medium backdrop-blur-xs flex items-center gap-1 shadow-md">
                    <Layers className="w-3.5 h-3.5 text-[#8B6236]" /> {exhib.artworksCount} œuvres
                  </span>
                </div>

                {/* Bottom Title on Image */}
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-xs uppercase tracking-widest text-[#D6B26A] font-semibold">{exhib.pavilionName}</span>
                  <h3 className="font-serif-title text-2xl sm:text-3xl font-bold text-[#F6F2E7] leading-tight mt-1">
                    {exhib.title}
                  </h3>
                </div>
              </div>

              {/* Card Meta & Actions */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 text-xs text-[#8B6236] font-semibold">
                    <Calendar className="w-3.5 h-3.5 text-[#C4953A]" />
                    <span>{exhib.dates}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#2F241A]/80 leading-relaxed">
                    {exhib.theme}
                  </p>
                  <p className="text-xs text-[#8B6236]">
                    <strong>Commissariat :</strong> {exhib.curator}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F0EAE1] flex flex-wrap items-center justify-between gap-4">
                  <button
                    onClick={() => onOpenVirtualTour(exhib.id)}
                    className="bg-[#C4953A] hover:bg-[#B3832B] text-[#241710] text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-xl shadow-md hover:shadow-lg flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <Compass className="w-4 h-4 text-[#241710]" />
                    <span>Entrer dans l'exposition</span>
                  </button>

                  <button
                    onClick={() => onNavigate('expositions')}
                    className="text-xs font-semibold text-[#8B6236] hover:text-[#4B2E20] flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>Guide & Livret d'exposition</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
