import React, { useState, useEffect } from 'react';
import { PageView } from '../types';
import maskMonumentalImg from '../assets/images/hero_mask_monumental_1787141482021.jpg';
import paintingImg from '../assets/images/african_painting_canvas_1787130390056.jpg';
import textileBogolanImg from '../assets/images/african_textile_bogolan_1787155587717.jpg';
import maskDetailImg from '../assets/images/african_royal_mask_1787130431593.jpg';
import nkoraEmblemImg from '../assets/images/nkora_circular_emblem_1787143741297.jpg';
import { ArrowRight, Compass, ShieldCheck, Eye, ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroBannerProps {
  onNavigate: (page: PageView) => void;
  onOpenArtworkDetail: (artworkId: string) => void;
  onOpenNewsletter: () => void;
}

interface MasterpieceItem {
  id: string;
  category: string;
  title: string;
  artist: string;
  year: number;
  origin: string;
  price: string;
  description: string;
  image: string;
  bgImage: string;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ 
  onNavigate, 
  onOpenArtworkDetail,
  onOpenNewsletter 
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const masterpieces: MasterpieceItem[] = [
    {
      id: 'art-peinture-1',
      category: 'Peinture africaine',
      title: 'Symphonie Sahélienne & Couleurs de Reine',
      artist: 'Aminata Diop',
      year: 2026,
      origin: 'Sénégal (Dakar)',
      price: '890 000 FCFA',
      description: "Toile expressive aux pigments naturels d'ocre du Sahel, d'indigo pur et de feuille d'or 24 carats célébrant la grâce et la noblesse africaine.",
      image: paintingImg,
      bgImage: paintingImg
    },
    {
      id: 'art-masque-1',
      category: 'Masque traditionnel',
      title: 'Masque Kple Kple Cérémonial',
      artist: 'Kouassi Mensah',
      year: 2026,
      origin: "Côte d'Ivoire (Région Baoulé)",
      price: '450 000 FCFA',
      description: "Chef-d'œuvre taillé dans un bloc d'ébène centenaire, rehaussé de feuilles de bronze martelées et de kaolin rituel sacré.",
      image: maskDetailImg,
      bgImage: maskMonumentalImg
    },
    {
      id: 'art-textile-1',
      category: 'Art textile',
      title: 'Tissage Bogolan Sacré des Anciens',
      artist: 'Bakary Traoré',
      year: 2026,
      origin: 'Mali (Ségou)',
      price: '380 000 FCFA',
      description: 'Grand pan textile en coton biologique filé à la main, peint aux décoctions végétales et à la boue alluviale fermentée du fleuve Niger.',
      image: textileBogolanImg,
      bgImage: textileBogolanImg
    }
  ];

  // Auto-advance continuous carousel even on hover
  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % masterpieces.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [masterpieces.length]);

  const current = masterpieces[activeIndex];

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % masterpieces.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + masterpieces.length) % masterpieces.length);
  };

  return (
    <section
      className="relative w-full overflow-hidden bg-[#241710] text-[#F6F2E7] py-14 lg:py-24"
      id="hero-banner-section"
    >
      {/* Full-width Luminous Background with Gentle Vignette (extremities only) */}
      {masterpieces.map((item, idx) => {
        const isActive = idx === activeIndex;
        return (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-0' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <img
              src={item.bgImage}
              alt={item.title}
              className="w-full h-full object-cover object-center scale-102 transition-transform duration-6000 ease-out"
              referrerPolicy="no-referrer"
            />
            {/* Soft, gentle vignette on extremities */}
            <div className="absolute inset-0 bg-radial-[circle_at_60%_45%] from-transparent via-[#241710]/40 to-[#180E09]/85" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#180E09]/90 via-[#241710]/50 to-transparent lg:w-3/5" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#180E09]/80 via-transparent to-[#180E09]/40" />
          </div>
        );
      })}

      {/* Main Content Grid */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Narrative & Action Controls */}
          <div className="lg:col-span-6 space-y-6 text-left">

            {/* Headline */}
            <h1 className="font-serif-title text-4xl sm:text-5xl lg:text-6xl text-[#F6F2E7] leading-[1.08] font-normal tracking-tight">
              L'art africain <br />
              <span className="italic font-light text-[#D6B26A]">dans toute sa</span>{' '}
              <span className="font-semibold text-white relative inline-block">
                richesse
                <svg className="absolute -bottom-2 left-0 w-full h-2 text-[#C4953A]" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0,6 Q50,0 100,6" stroke="currentColor" strokeWidth="3" fill="none" />
                </svg>
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#E8D6B1]/90 max-w-xl font-light leading-relaxed">
              Découvrez, soutenez et collectionnez des peintures authentiques, masques sacrés, céramiques et tissages d'art issus directement des ateliers des maîtres d'Afrique.
            </p>

            {/* Clean architectural action buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                id="btn-hero-discover"
                onClick={() => onNavigate('catalogue')}
                className="bg-[#C4953A] hover:bg-[#B3832B] text-[#241710] font-bold text-sm px-8 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-3 cursor-pointer group"
              >
                <span>Explorer le catalogue</span>
                <ArrowRight className="w-4 h-4 text-[#241710] group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="btn-hero-join-community"
                onClick={onOpenNewsletter}
                className="bg-[#241710]/70 hover:bg-[#3E2519] text-[#E8D6B1] font-medium text-sm px-6 py-3.5 rounded-xl backdrop-blur-md transition-all flex items-center gap-2.5 cursor-pointer shadow-md"
              >
                <span>Rejoindre la communauté</span>
              </button>
            </div>

            {/* Synchronized Thumbnails Selector with Kora Icon & No Borders */}
            <div className="pt-6 border-t border-[#E8D6B1]/20">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#D6B26A] font-bold">
                  <img
                    src={nkoraEmblemImg}
                    alt="Kora"
                    className="w-4 h-4 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span>Sélection à la Une :</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevSlide}
                    className="p-1.5 rounded-lg bg-[#3E2519]/80 hover:bg-[#C4953A] text-[#E8D6B1] hover:text-[#241710] transition-colors cursor-pointer"
                    title="Précédent"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-serif-title text-[#E8D6B1]">
                    0{activeIndex + 1} / 0{masterpieces.length}
                  </span>
                  <button
                    onClick={nextSlide}
                    className="p-1.5 rounded-lg bg-[#3E2519]/80 hover:bg-[#C4953A] text-[#E8D6B1] hover:text-[#241710] transition-colors cursor-pointer"
                    title="Suivant"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Seamless thumbnail buttons */}
              <div className="grid grid-cols-3 gap-3">
                {masterpieces.map((art, idx) => (
                  <button
                    key={art.id}
                    onClick={() => setActiveIndex(idx)}
                    className={`relative p-2.5 rounded-2xl text-left transition-all cursor-pointer flex items-center gap-2.5 overflow-hidden ${
                      activeIndex === idx
                        ? 'bg-[#3E2519] shadow-xl ring-2 ring-[#C4953A]'
                        : 'bg-[#241710]/75 hover:bg-[#3E2519]/70 shadow-md'
                    }`}
                  >
                    <img
                      src={art.image}
                      alt={art.title}
                      className="w-10 h-10 rounded-xl object-cover shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="min-w-0 pr-1">
                      <span className="block text-[9px] uppercase font-bold text-[#D6B26A] truncate">
                        {art.category}
                      </span>
                      <span className="block text-xs font-serif-title font-semibold text-[#F6F2E7] truncate">
                        {art.title}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Active Masterpiece Frame Card */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg rounded-3xl p-3 sm:p-4 bg-gradient-to-b from-[#3E2519]/80 to-[#241710]/95 backdrop-blur-md shadow-2xl">
              
              {/* Main Artwork Frame */}
              <div
                className="relative rounded-2xl overflow-hidden bg-[#180E09] aspect-4/3 sm:aspect-5/4 group cursor-pointer shadow-xl"
                onClick={() => onOpenArtworkDetail(current.id)}
              >
                {/* Artwork Photograph */}
                <img
                  key={current.id}
                  src={current.image}
                  alt={current.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-700 brightness-95 group-hover:brightness-100 animate-fade-in"
                  referrerPolicy="no-referrer"
                />

                {/* Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#180E09] via-transparent to-black/20 pointer-events-none" />

                {/* Top Category Label with Kora icon */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#241710]/90 backdrop-blur-md text-[#E8D6B1] text-xs font-semibold tracking-wider uppercase shadow-lg">
                    <img
                      src={nkoraEmblemImg}
                      alt="Kora"
                      className="w-3.5 h-3.5 rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <span>{current.category}</span>
                  </div>

                  <span className="px-3 py-1 rounded-xl bg-[#180E09]/85 backdrop-blur-md text-[#D6B26A] text-xs font-medium shadow-md">
                    {current.origin}
                  </span>
                </div>

                {/* Hover prompt */}
                <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <span className="px-5 py-2.5 rounded-xl bg-[#F6F2E7] text-[#241710] font-bold text-xs flex items-center gap-2 shadow-2xl transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <Eye className="w-4 h-4 text-[#8B6236]" /> Consulter l'œuvre
                  </span>
                </div>

                {/* Bottom Artwork Card Meta */}
                <div className="absolute bottom-3 left-3 right-3 p-4 rounded-2xl bg-[#F6F2E7] text-[#2F241A] shadow-xl">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8B6236] block">
                        Par {current.artist} • {current.year}
                      </span>
                      <h3 className="font-serif-title text-xl sm:text-2xl font-bold text-[#4B2E20] leading-tight truncate">
                        {current.title}
                      </h3>
                      <p className="text-xs text-[#2F241A]/75 line-clamp-1 mt-0.5">
                        {current.description}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="block text-[10px] uppercase text-[#8B6236] font-medium">Prix d'acquisition</span>
                      <span className="font-serif-title text-lg sm:text-xl font-bold text-[#C4953A]">
                        {current.price}
                      </span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Cultural Seal Badge */}
              <div className="absolute -bottom-3 -right-2 bg-[#3E2519] text-[#E8D6B1] rounded-2xl px-4 py-2.5 text-xs shadow-2xl flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#C4953A]" />
                <div>
                  <span className="font-serif-title tracking-wider text-sm font-bold text-[#D6B26A] block leading-none">
                    Certificat N'KORA
                  </span>
                  <span className="text-[10px] text-[#E8D6B1]/70">Traçabilité directe créateur</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
