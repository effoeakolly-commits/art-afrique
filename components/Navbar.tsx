"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Globe, Menu, X, Check, Volume2, VolumeX, Palette, ShoppingBag } from "lucide-react";
import { toggleKoraAudio, isKoraPlaying } from "@/lib/utils/koraAudio";
import { useCartStore } from "@/lib/store/cart-store";
import Logo from "@/components/Logo";

const LANGUAGES = [
  { code: "FR", label: "Français", flag: "🇫🇷" },
  { code: "EN", label: "English", flag: "🇬🇧" },
  { code: "PT", label: "Português", flag: "🇵🇹" },
  { code: "ES", label: "Español", flag: "🇪🇸" },
  { code: "WO", label: "Wolof", flag: "🇸🇳" },
  { code: "SW", label: "Kiswahili", flag: "🇰🇪" },
];

const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/catalogue", label: "Catalogue" },
  { href: "/artistes", label: "Artistes" },
  { href: "/expositions", label: "Expositions" },
  { href: "/a-propos", label: "À propos" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(LANGUAGES[0]);
  const [isPlayingAudio, setIsPlayingAudio] = useState(isKoraPlaying());
  const cartCount = useCartStore((state) => state.items.length);
  const openCart = useCartStore((state) => state.openCart);

  const handleToggleSound = () => {
    setIsPlayingAudio(toggleKoraAudio());
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F6F2E7]/95 backdrop-blur-md transition-all border-b border-[#E8DFCE]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24">
          {/* Brand Logo */}
          <Link href="/" className="shrink-0 cursor-pointer">
            <Logo variant="full" size="md" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-1.5 transition-colors cursor-pointer ${
                  isActive(link.href)
                    ? "text-[#C4953A] font-bold"
                    : "text-[#2F241A] hover:text-[#C4953A]"
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#C4953A] rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Kora Audio Toggle */}
            <button
              onClick={handleToggleSound}
              title={isPlayingAudio ? "Couper la mélodie de Kora" : "Activer la douce mélodie de Kora"}
              className={`p-2 rounded-xl text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                isPlayingAudio
                  ? "bg-[#C4953A]/20 text-[#4B2E20] font-bold"
                  : "text-[#8B6236] hover:bg-[#EDE6D7]"
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

            {/* Language Selector */}
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
                          ? "bg-[#F6F2E7] font-bold text-[#C4953A]"
                          : "text-[#2F241A] hover:bg-[#FAF7F2]"
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

            {/* Cart */}
            <button
              onClick={openCart}
              title="Voir mon panier"
              className="relative p-2 rounded-xl text-[#2F241A] hover:bg-[#EDE6D7] transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5 text-[#8B6236]" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#A67123] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Login */}
            <Link
              href="/connexion"
              title="Connexion Artiste & Gestion de compte"
              className="p-2 rounded-xl text-[#2F241A] hover:bg-[#EDE6D7] transition-colors cursor-pointer"
            >
              <User className="w-5 h-5 text-[#8B6236]" />
            </Link>

            {/* Join Movement / Atelier Artiste */}
            <Link
              href="/inscription"
              className="hidden sm:inline-flex items-center gap-2 bg-[#241710] hover:bg-[#3E2519] text-[#F6F2E7] font-bold px-4 sm:px-5 py-2.5 rounded-xl text-xs transition-all shadow-md cursor-pointer"
            >
              <Palette className="w-3.5 h-3.5 text-[#D6B26A]" />
              <span>Atelier Artiste</span>
            </Link>

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
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block w-full text-left px-3 py-2 rounded-xl text-sm font-medium ${
                  isActive(link.href)
                    ? "bg-[#C4953A]/20 text-[#4B2E20] font-bold"
                    : "text-[#2F241A] hover:bg-[#EDE6D7]"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openCart();
                }}
                className="w-full bg-[#FAF7F0] border border-[#E8DFCE] text-[#241710] font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-[#8B6236]" />
                <span>Voir mon panier ({cartCount})</span>
              </button>

              <Link
                href="/inscription"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full bg-[#241710] text-[#F6F2E7] font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Palette className="w-4 h-4 text-[#D6B26A]" />
                <span>Rejoindre le mouvement (Atelier Artiste)</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}