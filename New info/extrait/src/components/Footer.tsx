import React from 'react';
import { PageView } from '../types';
import { Logo } from './Logo';
import { ArrowRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageView) => void;
  onOpenAuth: () => void;
  onOpenArtistOnboarding?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenAuth,
  onOpenArtistOnboarding
}) => {
  return (
    <footer className="bg-[#241710] text-[#F6F2E7] pt-16 pb-8 border-t border-[#3E2519]" id="footer-section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12">
          
          {/* Brand & Mission Column */}
          <div className="md:col-span-5 space-y-5">
            <div onClick={() => onNavigate('accueil')} className="cursor-pointer">
              <Logo variant="light-on-dark" size="md" />
            </div>

            <p className="text-xs sm:text-sm text-[#E8D6B1]/75 leading-relaxed max-w-sm">
              La première plateforme dédiée à l'art africain authentique. Connectez-vous directement avec des artistes d'exception et acquérez des créations d'héritage.
            </p>

            {/* Social Icons matching screenshot */}
            <div className="flex items-center gap-3 pt-2">
              {[
                { label: 'f', href: '#' },
                { label: 'in', href: '#' },
                { label: 'ig', href: '#' },
                { label: 'tw', href: '#' }
              ].map((soc) => (
                <a
                  key={soc.label}
                  href={soc.href}
                  className="w-8 h-8 rounded-full bg-[#3E2519] hover:bg-[#C4953A] hover:text-[#241710] text-[#E8D6B1] flex items-center justify-center font-bold text-xs transition-all shadow-xs"
                >
                  {soc.label}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links Column */}
          <div className="md:col-span-3 space-y-4">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#D6B26A] block">
              NAVIGATION
            </span>
            <ul className="space-y-2.5 text-xs text-[#E8D6B1]/80">
              {[
                { id: 'accueil', label: 'Accueil' },
                { id: 'catalogue', label: 'Catalogue' },
                { id: 'artistes', label: 'Artistes' },
                { id: 'expositions', label: 'Expositions' },
                { id: 'a-propos', label: 'À propos' }
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate(item.id as PageView)}
                    className="hover:text-[#D6B26A] transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Artist Action Column */}
          <div className="md:col-span-4 space-y-4">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#D6B26A] block">
              CONTACT
            </span>
            <div className="space-y-1.5 text-xs text-[#E8D6B1]/80">
              <p>contact@nkora.art</p>
              <p>+221 77 000 00 00</p>
              <p>Dakar, Sénégal & Abidjan, Côte d'Ivoire</p>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenArtistOnboarding || onOpenAuth}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#3E2519] hover:bg-[#C4953A] text-[#E8D6B1] hover:text-[#241710] text-xs font-bold transition-all shadow-md cursor-pointer"
              >
                <span>Atelier Artiste</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Legal Bar */}
        <div className="pt-8 border-t border-[#3E2519]/70 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#E8D6B1]/60">
          <div className="flex items-center gap-3">
            {/* Secondary Circular Seal Emblem */}
            <Logo variant="symbol" size="sm" />
            <span>© 2026 N'KORA — L'art africain, autrement.</span>
          </div>

          <div className="flex items-center gap-6 text-[11px]">
            <a href="#" className="hover:text-[#D6B26A] transition-colors">Confidentialité</a>
            <a href="#" className="hover:text-[#D6B26A] transition-colors">Conditions</a>
            <a href="#" className="hover:text-[#D6B26A] transition-colors">Cookies</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
