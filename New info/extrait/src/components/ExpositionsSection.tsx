import React, { useState } from 'react';
import { PageView } from '../types';
import { FEATURED_EXHIBITIONS } from '../data/mockData';
import { Calendar, User, ArrowRight, Compass, Volume2, Eye, Maximize2 } from 'lucide-react';

interface ExpositionsSectionProps {
  onNavigate: (page: PageView) => void;
  onOpenVirtualTour: (exhibitionId: string) => void;
}

export const ExpositionsSection: React.FC<ExpositionsSectionProps> = ({
  onNavigate,
  onOpenVirtualTour
}) => {
  const [activeExhibIndex, setActiveExhibIndex] = useState(0);

  const currentExhibition = FEATURED_EXHIBITIONS[activeExhibIndex] || FEATURED_EXHIBITIONS[0];

  return (
    <section className="py-20 bg-[#241710] text-[#F6F2E7] relative overflow-hidden" id="expositions-section">
      
      {/* Subtle Background Ambience */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C4953A]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#8B6236]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header without AI star icons */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="text-[#D6B26A] text-xs uppercase font-bold tracking-widest">
              — RÉTROSPECTIVES & GALERIES IMMERSIVES
            </div>
            <h2 className="font-serif-title text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F6F2E7]">
              Expositions Virtuelles
            </h2>
            <p className="text-xs sm:text-sm text-[#E8D6B1]/75 max-w-xl">
              Explorez les grandes expositions d'art africain en immersion 3D interactive, accompagnées d'analyses curatorielles et de sonorités acoustiques traditionnelles.
            </p>
          </div>

          <div className="flex gap-2">
            {FEATURED_EXHIBITIONS.map((exhib, idx) => (
              <button
                key={exhib.id}
                onClick={() => setActiveExhibIndex(idx)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeExhibIndex === idx
                    ? 'bg-[#C4953A] text-[#241710] shadow-md'
                    : 'bg-[#3E2519] text-[#E8D6B1] hover:bg-[#4E3020]'
                }`}
              >
                Exposition {idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Continuous Live Exhibition Showcase (Plays automatically with hover zoom) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#2E1E15] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#3E2519]/60">
          
          {/* Left: Continuous Active Video/Visual Loop Window */}
          <div 
            onClick={() => onOpenVirtualTour(currentExhibition.id)}
            className="lg:col-span-7 relative rounded-2xl overflow-hidden shadow-xl bg-black aspect-16/10 group cursor-pointer"
          >
            {/* Live animated backdrop scale & pan */}
            <img
              src={currentExhibition.coverImage}
              alt={currentExhibition.title}
              className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700 brightness-95 group-hover:brightness-100 animate-pulse"
              style={{ animationDuration: '6s' }}
              referrerPolicy="no-referrer"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/35 pointer-events-none" />

            {/* Live Active Badge */}
            <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-bold text-[#D6B26A]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>GALERIE 3D EN DIRECT</span>
            </div>

            {/* Acoustic Audio Indicator */}
            <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-[10px] text-[#E8D6B1]">
              <Volume2 className="w-3.5 h-3.5 text-[#D6B26A]" />
              <span>Acoustique Kora & Percussions</span>
            </div>

            {/* Center Hover Action Pill */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-[#C4953A] group-hover:bg-[#D6B26A] text-[#241710] font-bold text-xs px-5 py-3 rounded-2xl flex items-center gap-2 shadow-2xl transition-all duration-300 transform group-hover:scale-105">
                <Maximize2 className="w-4 h-4" />
                <span>Entrer dans l'exposition 3D</span>
              </div>
            </div>

            {/* Bottom info bar */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-[#E8D6B1]">
              <span className="font-mono bg-black/60 px-3 py-1 rounded-md backdrop-blur-xs">
                {currentExhibition.artworksCount} pièces authentiques
              </span>
              <span className="text-[11px] text-[#D6B26A]">
                Visite libre à 360°
              </span>
            </div>
          </div>

          {/* Right: Curatorial Details & Navigation */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <span className="text-[10px] uppercase tracking-widest font-bold text-[#D6B26A] block">
                {currentExhibition.pavilionName}
              </span>

              <h3 className="font-serif-title text-2xl sm:text-3xl font-bold text-[#F6F2E7] leading-tight">
                {currentExhibition.title}
              </h3>

              <div className="flex items-center gap-4 text-xs text-[#E8D6B1]/75">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#D6B26A]" />
                  {currentExhibition.dates}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#E8D6B1]/85 leading-relaxed">
              {currentExhibition.description || currentExhibition.theme}
            </p>

            <div className="p-4 rounded-2xl bg-[#3E2519]/70 space-y-1.5 text-xs">
              <span className="text-[10px] uppercase font-bold text-[#D6B26A] block">DIRECTION CURATORIALE</span>
              <p className="font-semibold text-[#F6F2E7] flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#D6B26A]" />
                {currentExhibition.curator}
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => onOpenVirtualTour(currentExhibition.id)}
                className="flex-1 bg-[#C4953A] hover:bg-[#B3832B] text-[#241710] font-bold text-xs uppercase tracking-wider py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Compass className="w-4 h-4" />
                Lancer la visite 3D
              </button>

              <button
                onClick={() => onNavigate('catalogue')}
                className="px-5 py-4 rounded-xl bg-[#3E2519] hover:bg-[#4E3020] text-[#E8D6B1] text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                Voir les œuvres <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
