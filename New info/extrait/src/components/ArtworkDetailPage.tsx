import React, { useState } from 'react';
import { PageView, Artwork } from '../types';
import { ARTWORKS_DATA } from '../data/mockData';
import { 
  ArrowLeft, 
  ShoppingBag, 
  Truck, 
  ShieldCheck, 
  CheckCircle2,
  Check
} from 'lucide-react';
import { AcquisitionModal } from './AcquisitionModal';

interface ArtworkDetailPageProps {
  artworkId: string;
  onNavigate: (page: PageView) => void;
  onSelectArtist: (artistId: string) => void;
  onToggleFavorite: (artworkId: string) => void;
  isFavorite: boolean;
  onAddToCart?: (artwork: Artwork) => void;
  onBuyNow?: (artwork: Artwork) => void;
}

export const ArtworkDetailPage: React.FC<ArtworkDetailPageProps> = ({
  artworkId,
  onNavigate,
  onSelectArtist,
  onToggleFavorite,
  isFavorite,
  onAddToCart,
  onBuyNow
}) => {
  const artwork = ARTWORKS_DATA.find(a => a.id === artworkId) || ARTWORKS_DATA[0];
  
  const imagesList = artwork.galleryImages && artwork.galleryImages.length > 0 
    ? artwork.galleryImages 
    : [artwork.imageUrl];
    
  const [selectedImage, setSelectedImage] = useState<string>(artwork.imageUrl);
  const [activeTab, setActiveTab] = useState<'description' | 'details' | 'livraison' | 'retour'>('description');
  const [isAcquisitionModalOpen, setIsAcquisitionModalOpen] = useState(false);
  const [cartAdded, setCartAdded] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';
  };

  const handleAddToCartClick = () => {
    if (onAddToCart) {
      onAddToCart(artwork);
    }
    setCartAdded(true);
    setTimeout(() => setCartAdded(false), 2500);
  };

  const handleBuyNowClick = () => {
    if (onBuyNow) {
      onBuyNow(artwork);
    } else {
      setIsAcquisitionModalOpen(true);
    }
  };

  return (
    <div className="bg-[#FAF7F0] min-h-screen py-8 sm:py-12 text-[#2F241A]" id="artwork-detail-page">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        
        {/* =========================================================================
            TOP LINK: <- Retour au catalogue (Screenshot 3)
           ========================================================================= */}
        <div>
          <button
            id="btn-back-to-catalog"
            onClick={() => onNavigate('catalogue')}
            className="inline-flex items-center gap-2 text-xs font-medium text-[#2F241A]/80 hover:text-[#A67123] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour au catalogue</span>
          </button>
        </div>

        {/* =========================================================================
            MAIN 2-COLUMN VIEW (Screenshot 3)
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT SIDE: Thumbnails Stack + Large Artwork Image */}
          <div className="lg:col-span-6 flex gap-4">
            
            {/* 4 Stacked Thumbnails */}
            <div className="flex flex-col gap-3 w-16 sm:w-20 shrink-0">
              {imagesList.map((imgUrl, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(imgUrl)}
                  className={`aspect-square rounded-xl overflow-hidden bg-[#241710] border-2 transition-all cursor-pointer ${
                    selectedImage === imgUrl ? 'border-[#A67123] shadow-md scale-102' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt={`${artwork.title} thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </button>
              ))}
            </div>

            {/* Main Featured Image */}
            <div className="flex-1 aspect-square rounded-3xl overflow-hidden bg-[#241710] shadow-md relative">
              <img
                src={selectedImage}
                alt={artwork.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

          </div>

          {/* RIGHT SIDE: Artwork Details & Acquisition Actions (Screenshot 3) */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Title & Artist */}
            <div>
              <h1 className="font-serif-title text-3xl sm:text-4xl font-normal text-[#241710] tracking-tight">
                {artwork.title}
              </h1>
              <div className="text-xs text-[#2F241A]/80 mt-1.5 font-light">
                <span>Par </span>
                <button
                  onClick={() => onSelectArtist(artwork.artistId)}
                  className="font-medium text-[#241710] hover:text-[#A67123] underline underline-offset-2 transition-colors cursor-pointer"
                >
                  {artwork.artistName}
                </button>
              </div>
            </div>

            {/* Key Metadata List */}
            <div className="space-y-1.5 text-xs text-[#2F241A]/80 font-light border-y border-[#E8DFCE]/80 py-4">
              <div className="flex items-center gap-2">
                <span className="font-medium text-[#4B2E20] min-w-[110px]">Catégorie :</span>
                <span>{artwork.category}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-[#4B2E20] min-w-[110px]">Matériau :</span>
                <span>{artwork.medium || 'Bois noble & pigments'}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-[#4B2E20] min-w-[110px]">Dimensions :</span>
                <span>{artwork.dimensions}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-[#4B2E20] min-w-[110px]">Année :</span>
                <span>{artwork.year}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-[#4B2E20] min-w-[110px]">Lieu d'origine :</span>
                <span>{artwork.origin}</span>
              </div>
            </div>

            {/* Price & Stock Badge */}
            <div className="flex items-center gap-4">
              <span className="font-serif-title text-2xl sm:text-3xl font-bold text-[#241710]">
                {formatPrice(artwork.priceFcfa)}
              </span>
              
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF5EE] text-[#2D7A4D] text-xs font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>En stock</span>
              </div>
            </div>

            {/* Action Buttons: Ajouter au panier & Acheter maintenant */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                id="btn-add-to-cart"
                onClick={handleAddToCartClick}
                className="flex-1 bg-[#A67123] hover:bg-[#8F5F1B] text-white font-medium text-xs sm:text-sm py-3.5 px-6 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {cartAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Ajouté au panier !</span>
                  </>
                ) : (
                  <span>Ajouter au panier</span>
                )}
              </button>

              <button
                id="btn-buy-now"
                onClick={handleBuyNowClick}
                className="flex-1 bg-[#241710] hover:bg-[#150D09] text-[#FAF7F0] font-medium text-xs sm:text-sm py-3.5 px-6 rounded-xl shadow-xs transition-all flex items-center justify-center cursor-pointer"
              >
                <span>Acheter maintenant</span>
              </button>
            </div>

            {/* 3 Trust Badges (Screenshot 3) */}
            <div className="grid grid-cols-3 gap-2 pt-4 text-center border-t border-[#E8DFCE]/80">
              <div className="flex flex-col items-center gap-1.5 p-2">
                <div className="w-8 h-8 rounded-full bg-[#EFE6D5] flex items-center justify-center text-[#8B6236]">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-medium text-[#2F241A]">Paiement sécurisé</span>
              </div>

              <div className="flex flex-col items-center gap-1.5 p-2">
                <div className="w-8 h-8 rounded-full bg-[#EFE6D5] flex items-center justify-center text-[#8B6236]">
                  <Truck className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-medium text-[#2F241A]">Remise directe</span>
              </div>

              <div className="flex flex-col items-center gap-1.5 p-2">
                <div className="w-8 h-8 rounded-full bg-[#EFE6D5] flex items-center justify-center text-[#8B6236]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-medium text-[#2F241A]">Certificat d'authenticité</span>
              </div>
            </div>

          </div>

        </div>

        {/* =========================================================================
            BOTTOM TABS SECTION: Description | Détails | Livraison | Retour (Screenshot 3)
           ========================================================================= */}
        <div className="pt-8 border-t border-[#E8DFCE] space-y-6">
          
          {/* Tab Navigation */}
          <div className="flex items-center gap-8 border-b border-[#E8DFCE]/80">
            {(['description', 'details', 'livraison', 'retour'] as const).map((tab) => {
              const tabLabels = {
                description: 'Description',
                details: 'Détails',
                livraison: 'Livraison & Remise',
                retour: 'Retour'
              };
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 text-xs sm:text-sm font-medium transition-colors relative cursor-pointer ${
                    isActive ? 'text-[#A67123]' : 'text-[#2F241A]/60 hover:text-[#2F241A]'
                  }`}
                >
                  <span>{tabLabels[tab]}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#A67123]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="text-xs sm:text-sm text-[#2F241A]/80 leading-relaxed max-w-4xl font-light">
            {activeTab === 'description' && (
              <p>
                {artwork.description || "Ce masque traditionnel Dan symbolise la beauté, la spiritualité et la connexion avec les ancêtres. Utilisé lors des cérémonies, il incarne la sagesse et la force intérieure."}
              </p>
            )}

            {activeTab === 'details' && (
              <div className="space-y-3">
                <p><strong>Inspiration culturelle :</strong> {artwork.culturalInspiration}</p>
                <p><strong>Matériaux utilisés :</strong> {artwork.materials?.join(', ') || artwork.medium}</p>
                <p><strong>Passeport d'authenticité :</strong> {artwork.authenticityDetails?.certificate}</p>
              </div>
            )}

            {activeTab === 'livraison' && (
              <div className="space-y-2">
                <p><strong>Coordination directe :</strong> La remise de l'œuvre s'effectue directement en concertation avec l'artiste ou son atelier officiel.</p>
                <p><strong>Emballage d'art :</strong> Pièce emballée sous caisse renforcée et papier neutre de conservation.</p>
              </div>
            )}

            {activeTab === 'retour' && (
              <div className="space-y-2">
                <p><strong>Garantie Sérénité :</strong> Si l'œuvre ne correspond pas aux spécifications d'authenticité, vous bénéficiez d'un délai de rétractation de 14 jours après réception.</p>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Acquisition Checkout Modal */}
      <AcquisitionModal
        isOpen={isAcquisitionModalOpen}
        artwork={artwork}
        onClose={() => setIsAcquisitionModalOpen(false)}
      />
    </div>
  );
};
