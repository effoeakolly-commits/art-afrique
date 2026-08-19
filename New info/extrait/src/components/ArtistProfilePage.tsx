import React, { useState } from 'react';
import { PageView, Artist, Artwork } from '../types';
import { FEATURED_ARTISTS, ARTWORKS_DATA } from '../data/mockData';
import { 
  MapPin, 
  Mail, 
  Globe, 
  ArrowLeft, 
  ArrowRight, 
  Instagram, 
  Twitter, 
  Linkedin,
  Check
} from 'lucide-react';

interface ArtistProfilePageProps {
  artistId: string;
  onNavigate: (page: PageView) => void;
  onOpenArtworkDetail: (artworkId: string) => void;
  onContactArtist?: (artist: Artist) => void;
}

export const ArtistProfilePage: React.FC<ArtistProfilePageProps> = ({
  artistId,
  onNavigate,
  onOpenArtworkDetail,
  onContactArtist
}) => {
  const artist = FEATURED_ARTISTS.find(a => a.id === artistId) || FEATURED_ARTISTS[0];
  const [activeTab, setActiveTab] = useState<'about' | 'artworks' | 'expositions' | 'news'>('about');
  const [isFollowing, setIsFollowing] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactMessage, setContactMessage] = useState('');
  const [contactSent, setContactSent] = useState(false);

  // Artist artworks
  const artistArtworks = ARTWORKS_DATA.filter(art => art.artistId === artist.id || art.artistName === artist.name);
  const displayedArtworks = artistArtworks.length > 0 ? artistArtworks : ARTWORKS_DATA.slice(0, 4);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSent(true);
    setTimeout(() => {
      setContactSent(false);
      setShowContactModal(false);
      setContactMessage('');
    }, 2000);
  };

  return (
    <div className="bg-[#FAF7F0] min-h-screen pb-16 text-[#2F241A]" id="artist-profile-page">
      
      {/* =========================================================================
          HERO BANNER & PROFILE HEADER (Exact match to Screenshot 4)
         ========================================================================= */}
      <div>
        {/* Cover Photo */}
        <div className="w-full h-56 sm:h-72 lg:h-80 relative overflow-hidden bg-[#241710]">
          <img
            src={artist.coverUrl}
            alt={artist.name}
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/20" />
          
          {/* Back button */}
          <button
            onClick={() => onNavigate('artistes')}
            className="absolute top-4 left-4 sm:left-8 bg-black/40 hover:bg-black/60 text-white backdrop-blur-md text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Tous les artistes</span>
          </button>
        </div>

        {/* Profile Info Bar */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative -mt-16 sm:-mt-20 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E8DFCE]">
            
            {/* Avatar & Name & Role */}
            <div className="flex items-end gap-4 sm:gap-6">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-[#FAF7F0] shadow-lg bg-[#241710] shrink-0">
                <img
                  src={artist.avatarUrl}
                  alt={artist.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="space-y-1 pb-1">
                <h1 className="font-serif-title text-2xl sm:text-3xl lg:text-4xl font-bold text-[#241710]">
                  {artist.name}
                </h1>
                <div className="flex items-center gap-2 text-xs text-[#2F241A]/70 font-light">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#8B6236]" />
                    {artist.country}
                  </span>
                  <span>•</span>
                  <span>{artist.specialty}</span>
                </div>
              </div>
            </div>

            {/* Stats & Action Buttons (Screenshot 4) */}
            <div className="flex flex-wrap items-center gap-6 sm:gap-8">
              
              {/* 3 Metrics */}
              <div className="flex items-center gap-6 sm:gap-8 text-left">
                <div>
                  <div className="font-serif-title text-xl sm:text-2xl font-bold text-[#241710]">
                    {artist.artworksCount || 45}
                  </div>
                  <div className="text-[11px] text-[#2F241A]/60 font-light">Œuvres</div>
                </div>

                <div>
                  <div className="font-serif-title text-xl sm:text-2xl font-bold text-[#241710]">
                    {artist.exhibitionsCount || 12}
                  </div>
                  <div className="text-[11px] text-[#2F241A]/60 font-light">Expositions</div>
                </div>

                <div>
                  <div className="font-serif-title text-xl sm:text-2xl font-bold text-[#241710]">
                    {isFollowing ? (artist.followersCount || 560) + 1 : (artist.followersCount || 560)}
                  </div>
                  <div className="text-[11px] text-[#2F241A]/60 font-light">Abonnés</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={`text-xs font-medium px-5 py-2.5 rounded-xl border transition-all cursor-pointer ${
                    isFollowing 
                      ? 'bg-[#EFE6D5] border-[#D8C7AA] text-[#4B2E20]' 
                      : 'bg-white border-[#E8DFCE] text-[#241710] hover:bg-[#F2EADA]'
                  }`}
                >
                  {isFollowing ? 'Abonné(e)' : 'Suivre'}
                </button>

                <button
                  onClick={() => setShowContactModal(true)}
                  className="bg-[#A67123] hover:bg-[#8F5F1B] text-white text-xs font-medium px-6 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer"
                >
                  Contacter
                </button>
              </div>

            </div>

          </div>
        </div>
      </div>

      {/* =========================================================================
          TABS NAVIGATION: À propos | Œuvres | Expositions | Actualités (Screenshot 4)
         ========================================================================= */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        
        <div className="flex items-center gap-8 border-b border-[#E8DFCE]/80 mb-8">
          {(['about', 'artworks', 'expositions', 'news'] as const).map((tab) => {
            const labels = {
              about: 'À propos',
              artworks: 'Œuvres',
              expositions: 'Expositions',
              news: 'Actualités'
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
                <span>{labels[tab]}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#A67123]" />
                )}
              </button>
            );
          })}
        </div>

        {/* =========================================================================
            TAB CONTENT: À PROPOS (Screenshot 4 Layout)
           ========================================================================= */}
        {activeTab === 'about' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Bio & Contact Info */}
            <div className="lg:col-span-4 space-y-6">
              <p className="text-xs sm:text-sm text-[#2F241A]/80 leading-relaxed font-light">
                {artist.bio}
              </p>

              {/* Direct Info List */}
              <div className="space-y-3 text-xs text-[#2F241A]/80 font-light border-t border-[#E8DFCE]/80 pt-4">
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-[#8B6236]" />
                  <span>{artist.city || 'Abidjan'}, {artist.country}</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#8B6236]" />
                  <span>{artist.email || `${artist.name.toLowerCase().replace(' ', '')}@email.com`}</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Globe className="w-4 h-4 text-[#8B6236]" />
                  <span>{artist.website || `www.${artist.name.toLowerCase().replace(' ', '')}.com`}</span>
                </div>
              </div>

              {/* Social links */}
              <div className="flex items-center gap-3 pt-2 text-[#8B6236]">
                <a href="#instagram" className="w-8 h-8 rounded-full bg-white border border-[#E8DFCE] flex items-center justify-center hover:text-[#A67123] transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#twitter" className="w-8 h-8 rounded-full bg-white border border-[#E8DFCE] flex items-center justify-center hover:text-[#A67123] transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="#linkedin" className="w-8 h-8 rounded-full bg-white border border-[#E8DFCE] flex items-center justify-center hover:text-[#A67123] transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Right Column: Featured Artworks Grid (Screenshot 4) */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-serif-title text-xl font-bold text-[#241710]">
                  Œuvres de {artist.name}
                </h2>
                <button
                  onClick={() => setActiveTab('artworks')}
                  className="inline-flex items-center gap-1 text-xs font-medium text-[#2F241A]/70 hover:text-[#A67123] transition-colors cursor-pointer"
                >
                  <span>Voir tout</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* 4 Artworks Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {displayedArtworks.map(art => (
                  <div
                    key={art.id}
                    onClick={() => onOpenArtworkDetail(art.id)}
                    className="group flex flex-col cursor-pointer"
                  >
                    <div className="aspect-4/5 rounded-2xl overflow-hidden bg-[#241710] shadow-2xs group-hover:shadow-md transition-all">
                      <img
                        src={art.imageUrl}
                        alt={art.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="pt-2 text-left space-y-0.5">
                      <div className="font-serif-title text-xs font-bold text-[#241710] truncate group-hover:text-[#A67123]">
                        {art.title}
                      </div>
                      <div className="text-[11px] font-semibold text-[#241710]">
                        {formatPrice(art.priceFcfa)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* =========================================================================
            TAB CONTENT: ŒUVRES (Full grid)
           ========================================================================= */}
        {activeTab === 'artworks' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedArtworks.map(art => (
              <div
                key={art.id}
                onClick={() => onOpenArtworkDetail(art.id)}
                className="group flex flex-col cursor-pointer"
              >
                <div className="aspect-4/5 rounded-2xl overflow-hidden bg-[#241710] shadow-xs group-hover:shadow-lg transition-all">
                  <img
                    src={art.imageUrl}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="pt-2.5 text-left space-y-0.5">
                  <h3 className="font-serif-title text-sm font-bold text-[#241710] group-hover:text-[#A67123]">
                    {art.title}
                  </h3>
                  <div className="text-xs text-[#2F241A]/60 font-light">
                    {art.category} • {art.dimensions}
                  </div>
                  <div className="text-xs font-semibold text-[#241710] pt-0.5">
                    {formatPrice(art.priceFcfa)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* =========================================================================
            TAB CONTENT: EXPOSITIONS
           ========================================================================= */}
        {activeTab === 'expositions' && (
          <div className="space-y-4 max-w-3xl">
            <div className="bg-white p-5 rounded-2xl border border-[#E8DFCE] flex items-center justify-between">
              <div>
                <h4 className="font-serif-title text-base font-bold text-[#241710]">
                  Biennale de Dakar — Pavillon des Maîtres
                </h4>
                <p className="text-xs text-[#2F241A]/70 font-light mt-1">Dakar, Sénégal • Mai 2026</p>
              </div>
              <span className="text-xs px-3 py-1 bg-[#EFE6D5] rounded-full text-[#8B6236] font-medium">Passée</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E8DFCE] flex items-center justify-between">
              <div>
                <h4 className="font-serif-title text-base font-bold text-[#241710]">
                  Les Cordes Sacrées : De la Kora aux Formes Libres
                </h4>
                <p className="text-xs text-[#2F241A]/70 font-light mt-1">Galerie N'KORA & Pavillon Virtuel • Actuelle</p>
              </div>
              <span className="text-xs px-3 py-1 bg-[#EBF5EE] rounded-full text-[#2D7A4D] font-medium">En cours</span>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB CONTENT: ACTUALITÉS
           ========================================================================= */}
        {activeTab === 'news' && (
          <div className="space-y-4 max-w-3xl">
            <div className="bg-white p-6 rounded-2xl border border-[#E8DFCE] space-y-2">
              <span className="text-[11px] text-[#A67123] font-semibold">12 Août 2026</span>
              <h4 className="font-serif-title text-lg font-bold text-[#241710]">
                Nouvelle série de sculptures sur bois d'ébène
              </h4>
              <p className="text-xs text-[#2F241A]/80 leading-relaxed font-light">
                Je viens de terminer 3 pièces consacrées aux gardiens des traditions sacrées. Disponibles prochainement en exclusivité sur N'KORA.
              </p>
            </div>
          </div>
        )}

      </div>

      {/* Contact Artist Modal */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl relative">
            <h3 className="font-serif-title text-2xl font-bold text-[#241710]">
              Contacter {artist.name}
            </h3>
            <p className="text-xs text-[#2F241A]/70 font-light">
              Envoyez un message direct à l'atelier de l'artiste pour une commande spéciale ou une demande curariale.
            </p>

            <form onSubmit={handleSendMessage} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#2F241A] mb-1">Votre message</label>
                <textarea
                  required
                  rows={4}
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  placeholder="Écrivez votre message à l'artiste..."
                  className="w-full bg-[#FAF7F0] border border-[#E8DFCE] rounded-xl p-3 text-xs text-[#241710] focus:outline-none focus:border-[#C4953A]"
                />
              </div>

              {contactSent ? (
                <div className="p-3 bg-[#EBF5EE] text-[#2D7A4D] rounded-xl text-xs flex items-center justify-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>Message transmis avec succès à l'artiste !</span>
                </div>
              ) : (
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowContactModal(false)}
                    className="px-4 py-2 text-xs text-[#2F241A]/70 hover:text-[#2F241A]"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="bg-[#A67123] hover:bg-[#8F5F1B] text-white text-xs font-medium px-5 py-2.5 rounded-xl cursor-pointer"
                  >
                    Envoyer le message
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
