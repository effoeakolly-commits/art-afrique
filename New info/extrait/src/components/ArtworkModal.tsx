import React from 'react';
import { Artwork } from '../types';
import nkoraEmblemImg from '../assets/images/nkora_circular_emblem_1787143741297.jpg';
import { X, ShieldCheck, Heart, ShoppingBag, MapPin } from 'lucide-react';

interface ArtworkModalProps {
  artwork: Artwork | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export const ArtworkModal: React.FC<ArtworkModalProps> = ({
  artwork,
  onClose,
  isFavorite,
  onToggleFavorite
}) => {
  if (!artwork) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fade-in" id="artwork-modal-overlay">
      <div className="relative w-full max-w-4xl bg-[#F6F2E7] rounded-3xl shadow-2xl overflow-hidden text-[#2F241A] grid grid-cols-1 md:grid-cols-12 max-h-[90vh]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#241710]/80 text-[#E8D6B1] hover:bg-[#241710] hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Artwork Image */}
        <div className="md:col-span-6 bg-[#241710] relative flex items-center justify-center p-6 min-h-[320px]">
          <img
            src={artwork.imageUrl}
            alt={artwork.title}
            className="max-h-[70vh] w-auto object-contain rounded-2xl shadow-2xl"
            referrerPolicy="no-referrer"
          />
          <div className="absolute bottom-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#241710]/90 text-[#D6B26A] text-xs font-semibold uppercase tracking-wider shadow-md">
            <img
              src={nkoraEmblemImg}
              alt="Kora"
              className="w-3.5 h-3.5 rounded-full object-cover"
              referrerPolicy="no-referrer"
            />
            <span>{artwork.category}</span>
          </div>
        </div>

        {/* Right Details Panel */}
        <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#8B6236] uppercase tracking-wider mb-1">
                <MapPin className="w-3.5 h-3.5 text-[#C4953A]" />
                <span>{artwork.origin} • Année {artwork.year}</span>
              </div>
              <h2 className="font-serif-title text-3xl sm:text-4xl font-bold text-[#4B2E20] leading-tight">
                {artwork.title}
              </h2>
              <p className="text-sm font-medium text-[#8B6236] mt-1">
                Créé par <strong className="text-[#4B2E20]">{artwork.artistName}</strong>
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white shadow-sm space-y-2">
              <div className="flex justify-between text-xs text-[#4B2E20]">
                <span className="text-[#8B6236]">Dimensions :</span>
                <strong>{artwork.dimensions}</strong>
              </div>
              <div className="flex justify-between text-xs text-[#4B2E20]">
                <span className="text-[#8B6236]">Disponibilité :</span>
                <strong className="text-emerald-700">Pièce Unique Disponible</strong>
              </div>
              <div className="flex justify-between text-xs text-[#4B2E20]">
                <span className="text-[#8B6236]">Traçabilité :</span>
                <strong className="flex items-center gap-1 text-[#C4953A]">
                  <ShieldCheck className="w-3.5 h-3.5" /> Certificat N'KORA
                </strong>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#8B6236] mb-1.5">
                Description & Histoire de l'œuvre
              </h4>
              <p className="text-xs sm:text-sm text-[#2F241A]/85 leading-relaxed">
                {artwork.description}
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[#E8D6B1]/70 space-y-4">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="block text-[10px] uppercase tracking-wider text-[#8B6236]">Prix d'acquisition</span>
                <span className="font-serif-title text-2xl sm:text-3xl font-bold text-[#C4953A]">
                  {formatPrice(artwork.priceFcfa)}
                </span>
              </div>

              <button
                onClick={() => onToggleFavorite(artwork.id)}
                className={`p-3 rounded-full transition-all cursor-pointer shadow-sm ${
                  isFavorite
                    ? 'bg-[#C4953A] text-white'
                    : 'bg-white text-[#8B6236] hover:bg-[#EFE6D3]'
                }`}
                title="Favoris"
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  onClose();
                }}
                className="flex-1 bg-[#C4953A] hover:bg-[#B3832B] text-[#241710] font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-[#241710]" />
                <span>Acquérir cette œuvre</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
