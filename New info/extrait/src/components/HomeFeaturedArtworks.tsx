import React from 'react';
import { PageView } from '../types';
import { Heart, Calendar, ArrowRight } from 'lucide-react';
import kpleMaskImg from '../assets/images/baoule_kple_mask_1787143756094.jpg';
import sculptureImg from '../assets/images/african_wooden_sculpture_1787143769088.jpg';
import ancestralMaskImg from '../assets/images/african_royal_mask_1787130431593.jpg';
import artisanHarmonieImg from '../assets/images/african_master_sculptor_1787142432994.jpg';

interface HomeFeaturedArtworksProps {
  onNavigate: (page: PageView) => void;
  onOpenArtworkDetail: (artworkId: string) => void;
  onToggleFavorite: (artworkId: string) => void;
  favorites: string[];
}

interface FeaturedItem {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  category: string;
  country: string;
  date: string;
  likes: number;
  priceFcfa: number;
  imageUrl: string;
}

const FEATURED_ITEMS: FeaturedItem[] = [
  {
    id: 'art-masque-dan',
    title: 'Masque Kple Kple',
    artist: 'Kofi Amani',
    artistId: 'artist-koffi',
    category: 'Masques',
    country: "Côte d'Ivoire",
    date: '12 août 2026',
    likes: 143,
    priceFcfa: 250000,
    imageUrl: kpleMaskImg
  },
  {
    id: 'art-elevation',
    title: 'La Penseuse',
    artist: 'Awe Diop',
    artistId: 'artist-awa',
    category: 'Sculptures',
    country: 'Ghana',
    date: '5 août 2026',
    likes: 87,
    priceFcfa: 100000,
    imageUrl: sculptureImg
  },
  {
    id: 'art-visage-ancestral',
    title: 'Visage Ancestral',
    artist: 'Joseph K.',
    artistId: 'artist-joseph',
    category: 'Peintures',
    country: 'Mali',
    date: '18 juil. 2026',
    likes: 211,
    priceFcfa: 320000,
    imageUrl: ancestralMaskImg
  },
  {
    id: 'art-maternite',
    title: 'Harmonie',
    artist: 'Nia Amadou',
    artistId: 'artist-nia',
    category: 'Sculptures',
    country: 'Sénégal',
    date: '2 août 2026',
    likes: 64,
    priceFcfa: 150000,
    imageUrl: artisanHarmonieImg
  }
];

export const HomeFeaturedArtworks: React.FC<HomeFeaturedArtworksProps> = ({
  onNavigate,
  onOpenArtworkDetail,
  onToggleFavorite,
  favorites
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price);
  };

  return (
    <section className="py-12 sm:py-16 bg-[#FAF7F0] text-[#2F241A]" id="home-featured-artworks">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* =========================================================================
            HEADER: Eyebrow + Title + "Voir tout ->" (Exact match to Screenshot 1)
           ========================================================================= */}
        <div className="flex items-end justify-between">
          <div className="space-y-1 text-left">
            <div className="text-xs uppercase tracking-[0.25em] text-[#C4953A] font-semibold">
              — COLLECTION —
            </div>
            <h2 className="font-serif-title text-3xl sm:text-4xl lg:text-5xl font-normal text-[#241710] tracking-tight">
              Œuvres en vedette
            </h2>
          </div>

          <button
            onClick={() => onNavigate('catalogue')}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#2F241A]/80 hover:text-[#C4953A] transition-colors cursor-pointer pb-1"
          >
            <span>Voir tout</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* =========================================================================
            4 CARDS GRID (Exact match to Screenshot 1)
           ========================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED_ITEMS.map((item) => {
            const isFav = favorites.includes(item.id);
            return (
              <div
                key={item.id}
                onClick={() => onOpenArtworkDetail(item.id)}
                className="bg-white rounded-3xl overflow-hidden shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer border border-[#E8DFCE]/60"
              >
                {/* Image Container with Badges */}
                <div className="relative aspect-4/5 w-full overflow-hidden bg-[#241710]">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />

                  {/* Top-Left: Country Badge */}
                  <span className="absolute top-3.5 left-3.5 bg-black/50 backdrop-blur-xs text-[#FAF7F0] text-[10px] font-medium px-2.5 py-1 rounded-md">
                    {item.country}
                  </span>

                  {/* Top-Right: Favorite Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(item.id);
                    }}
                    className={`absolute top-3.5 right-3.5 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-xs transition-transform active:scale-90 cursor-pointer ${
                      isFav 
                        ? 'bg-white text-red-600 shadow-sm' 
                        : 'bg-white/80 hover:bg-white text-[#2F241A]/70 hover:text-red-500'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Content Box below Image */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between text-left space-y-3">
                  
                  {/* Title, Artist, Category */}
                  <div className="space-y-1">
                    <h3 className="font-serif-title text-base sm:text-lg font-bold text-[#241710] group-hover:text-[#C4953A] transition-colors line-clamp-1">
                      {item.title}
                    </h3>
                    
                    <div className="text-xs font-semibold text-[#C4953A]">
                      {item.artist}
                    </div>

                    <div className="text-xs text-[#2F241A]/60 font-light">
                      {item.category}
                    </div>
                  </div>

                  {/* Date & Likes Row */}
                  <div className="flex items-center justify-between text-[11px] text-[#2F241A]/60 font-light pt-2 border-t border-[#F0EAE1]">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#8B6236]" />
                      <span>{item.date}</span>
                    </span>

                    <span className="flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5 text-[#8B6236]" />
                      <span>{isFav ? item.likes + 1 : item.likes}</span>
                    </span>
                  </div>

                  {/* Price Row */}
                  <div className="pt-1">
                    <span className="font-serif-title text-sm sm:text-base font-bold text-[#241710]">
                      {formatPrice(item.priceFcfa)}{' '}
                      <span className="font-sans text-xs font-semibold text-[#8B6236]">FCFA</span>
                    </span>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
