import React, { useState } from 'react';
import { X, Volume2, Glasses, Compass } from 'lucide-react';

interface VirtualTourModalProps {
  exhibitionId: string | null;
  onClose: () => void;
}

export const VirtualTourModal: React.FC<VirtualTourModalProps> = ({
  exhibitionId,
  onClose
}) => {
  const [activeArtworkIndex, setActiveArtworkIndex] = useState(0);

  if (!exhibitionId) return null;

  const galleryRooms = [
    {
      name: 'Salle 1 : L\'Esprit de la Kora & Cordes Royales',
      image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80',
      audioGuide: '« Écoutez la vibration de la calebasse façonnée selon les rites mandingues... »'
    },
    {
      name: 'Salle 2 : Les Bronzes et Statuettes des Ancêtres',
      image: 'https://images.unsplash.com/photo-1582561424760-0321d75e81fa?auto=format&fit=crop&w=1200&q=80',
      audioGuide: '« Ce bronze d\'Ifé capture l\'équilibre parfait entre le divin et la royauté terrienne. »'
    }
  ];

  const currentRoom = galleryRooms[activeArtworkIndex % galleryRooms.length];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/90 backdrop-blur-md animate-fade-in" id="virtual-tour-modal">
      <div className="relative w-full max-w-5xl h-[85vh] bg-[#241710] rounded-3xl shadow-2xl overflow-hidden flex flex-col text-[#F6F2E7]">
        
        {/* Top Control Bar */}
        <div className="p-4 bg-[#180E09] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-[#C4953A]/20 text-[#D6B26A]">
              <Compass className="w-5 h-5 animate-spin" style={{ animationDuration: '10s' }} />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#D6B26A] font-semibold">Visite Virtuelle 3D N'KORA</span>
              <h3 className="font-serif-title text-lg font-bold text-[#F6F2E7]">
                {currentRoom.name}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#241710] text-xs text-[#D6B26A] shadow-xs">
              <Glasses className="w-3.5 h-3.5" /> Mode VR Compatible
            </span>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-[#241710] text-[#E8D6B1] hover:text-white hover:bg-black transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 3D Gallery Canvas Viewer Simulation */}
        <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden group">
          <img
            src={currentRoom.image}
            alt="Vue 360 de l'exposition"
            className="w-full h-full object-cover brightness-90 transform scale-105 group-hover:scale-110 transition-transform duration-1000 ease-out"
            referrerPolicy="no-referrer"
          />

          {/* Interactive 3D Hotspots */}
          <div className="absolute top-1/2 left-1/3 p-3 rounded-full bg-[#C4953A]/80 backdrop-blur-md text-[#241710] font-bold text-xs animate-ping pointer-events-none" />
          <div className="absolute top-1/2 left-1/3 p-3 rounded-full bg-[#C4953A] backdrop-blur-md text-[#241710] font-bold text-xs shadow-lg cursor-pointer flex items-center gap-1.5">
            <span>Explorer la pièce</span>
          </div>

          {/* Audio Guide Player Pill */}
          <div className="absolute bottom-6 left-6 right-6 sm:left-12 sm:right-auto sm:max-w-md p-4 rounded-2xl bg-[#241710]/95 backdrop-blur-md shadow-xl flex items-start gap-3">
            <Volume2 className="w-5 h-5 text-[#D6B26A] shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] uppercase font-semibold text-[#D6B26A] block">Audio-guide de la salle</span>
              <p className="text-xs text-[#E8D6B1] italic mt-0.5">
                {currentRoom.audioGuide}
              </p>
            </div>
          </div>

          {/* Navigation Controls between rooms */}
          <div className="absolute bottom-6 right-6 flex items-center gap-2">
            <button
              onClick={() => setActiveArtworkIndex((prev) => Math.max(0, prev - 1))}
              className="px-4 py-2 rounded-xl bg-[#241710]/90 text-xs font-semibold text-[#E8D6B1] hover:bg-[#C4953A] hover:text-[#241710] transition-all cursor-pointer shadow-md"
            >
              ← Salle précédente
            </button>
            <button
              onClick={() => setActiveArtworkIndex((prev) => prev + 1)}
              className="px-4 py-2 rounded-xl bg-[#C4953A] text-xs font-bold text-[#241710] shadow-md hover:bg-[#D6B26A] transition-all cursor-pointer"
            >
              Salle suivante →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
