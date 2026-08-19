import React, { useState } from 'react';
import { PageView } from '../types';
import { Logo } from './Logo';
import { User, Globe, Menu, X, Check, Volume2, VolumeX, Palette, ShoppingBag } from 'lucide-react';
import { toggleKoraAudio, isKoraPlaying } from '../utils/koraAudio';

interface NavbarProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
  onOpenAuth: () => void;
  onOpenArtistOnboarding: () => void;
  onOpenCart?: () => void;
  cartCount?: number;
  favoritesCount?: number;
}

const LANGUAGES = [
  { code: 'FR', label: 'Français', flag: '🇫🇷' },
  { code: 'EN', label: 'English', flag: '🇬🇧' },
  { code: 'PT', label: 'Português', flag: '🇵🇹' },
  { code: 'ES', label: 'Español', flag: '🇪🇸' },
  { code: 'DE', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'WO', label: 'Wolof', flag: '🇸🇳' },
  { code: 'SW', label: 'Kiswahili', flag: '🇰🇪' }
];

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenAuth,
  onOpenArtistOnboarding,
  onOpenCart,
  cartCount = 0,
  favoritesCount = 0
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(LANGUAGES[0]);
  const [isPlayingAudio, setIsPlayingAudio] = useState(isKoraPlaying());

  const navLinks: { id: PageView; label: string }[] = [
    { id: 'accueil', label: 'Accueil' },
    { id: 'catalogue', label: 'Catalogue' },
    { id: 'artistes', label: 'Artistes' },
    { id: 'expositions', label: 'Expositions' },
    { id: 'a-propos', label: 'À propos' }
  ];

  const handleToggleSound = () => {
    const nextState = toggleKoraAudio();
    setIsPlayingAudio(nextState);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F6F2E7]/95 backdrop-blur-md transition-all border-b border-[#E8DFCE]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24">
          
          {/* Brand Logo - Direct graphical image with no redundant HTML text */}
          <div onClick={() => onNavigate('accueil')} className="shrink-0 cursor-pointer">
            <Logo variant="full" size="md" />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className={`relative py-1.5 transition-colors cursor-pointer ${
                    isActive
                      ? 'text-[#C4953A] font-bold'
                      : 'text-[#2F241A] hover:text-[#C4953A]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#C4953A] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Ambient Kora Audio Toggle Button */}
            <button
              onClick={handleToggleSound}
              title={isPlayingAudio ? 'Couper la mélodie de Kora' : 'Activer la douce mélodie de Kora'}
              className={`p-2 rounded-xl text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                isPlayingAudio
                  ? 'bg-[#C4953A]/20 text-[#4B2E20] font-bold'
                  : 'text-[#8B6236] hover:bg-[#EDE6D7]'
              }`}
            >
              {isPlayingAudio ? (
                <>
                  <Volume2 className="w-4 h-4 text-[#C4953A] animate-pulse" />
                  <span className="text-[10px] hidden lg:inline font-mono">Kora On</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4" />
                  <span className="text-[10px] hidden lg:inline font-mono text-[#8B6236]">Kora</span>
                </>
              )}
            </button>

            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="p-2 rounded-xl text-xs text-[#2F241A] hover:bg-[#EDE6D7] flex items-center gap-1 transition-colors cursor-pointer"
                title="Changer de langue"
              >
                <Globe className="w-4 h-4 text-[#8B6236]" />
                <span className="text-xs font-semibold">{currentLang.code}</span>
              </button>

              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-2xl shadow-xl p-2 z-50 animate-fade-in text-xs border border-[#F0EAE1]">
                  <span className="text-[10px] font-bold uppercase text-[#8B6236] px-2 py-1 block">
                    Sélectionner la langue
                  </span>
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setCurrentLang(lang);
                        setIsLangOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between transition-colors cursor-pointer ${
                        currentLang.code === lang.code
                          ? 'bg-[#F6F2E7] font-bold text-[#C4953A]'
                          : 'text-[#2F241A] hover:bg-[#FAF7F2]'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{lang.flag}</span>
                        <span>{lang.label}</span>
                      </span>
                      {currentLang.code === lang.code && <Check className="w-3.5 h-3.5 text-[#C4953A]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Shopping Cart / Panier Icon with Live Counter */}
            <button
              onClick={onOpenCart}
              title="Voir mon panier"
              className="relative p-2 rounded-xl text-[#2F241A] hover:bg-[#EDE6D7] transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5 text-[#8B6236]" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#A67123] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs animate-scale-up">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Login Icon */}
            <button
              onClick={onOpenAuth}
              title="Connexion Artiste & Gestion de compte"
              className="p-2 rounded-xl text-[#2F241A] hover:bg-[#EDE6D7] transition-colors cursor-pointer"
            >
              <User className="w-5 h-5 text-[#8B6236]" />
            </button>

            {/* Join Movement / Atelier Artiste Button */}
            <button
              onClick={onOpenArtistOnboarding}
              className="hidden sm:inline-flex items-center gap-2 bg-[#241710] hover:bg-[#3E2519] text-[#F6F2E7] font-bold px-4 sm:px-5 py-2.5 rounded-xl text-xs transition-all shadow-md cursor-pointer"
            >
              <Palette className="w-3.5 h-3.5 text-[#D6B26A]" />
              <span>Atelier Artiste</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-[#2F241A] hover:bg-[#EDE6D7] cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>

        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#EDE6D7] space-y-3 animate-fade-in">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-xl text-sm font-medium ${
                  currentPage === link.id
                    ? 'bg-[#C4953A]/20 text-[#4B2E20] font-bold'
                    : 'text-[#2F241A] hover:bg-[#EDE6D7]'
                }`}
              >
                {link.label}
              </button>
            ))}

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  if (onOpenCart) onOpenCart();
                }}
                className="w-full bg-[#FAF7F0] border border-[#E8DFCE] text-[#241710] font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-[#8B6236]" />
                <span>Voir mon panier ({cartCount})</span>
              </button>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenArtistOnboarding();
                }}
                className="w-full bg-[#241710] text-[#F6F2E7] font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Palette className="w-4 h-4 text-[#D6B26A]" />
                <span>Rejoindre le mouvement (Atelier Artiste)</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
