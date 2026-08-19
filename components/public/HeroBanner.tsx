"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Compass, ChevronLeft, ChevronRight } from "lucide-react";

const masterpieces = [
  {
    id: "art-peinture-1",
    category: "Peinture africaine",
    title: "Symphonie Sahélienne & Couleurs de Reine",
    artist: "Aminata Diop",
    year: 2026,
    origin: "Sénégal (Dakar)",
    price: "890 000 FCFA",
    description: "Toile expressive aux pigments naturels d'ocre du Sahel, d'indigo pur et de feuille d'or 24 carats célébrant la grâce et la noblesse africaine.",
    image: "/images/african_painting_canvas_1787130390056.jpg",
    bgImage: "/images/african_painting_canvas_1787130390056.jpg",
  },
  {
    id: "art-masque-1",
    category: "Masque traditionnel",
    title: "Masque Kple Kple Cérémonial",
    artist: "Kouassi Mensah",
    year: 2026,
    origin: "Côte d'Ivoire (Région Baoulé)",
    price: "450 000 FCFA",
    description: "Chef-d'œuvre taillé dans un bloc d'ébène centenaire, rehaussé de feuilles de bronze martelées et de kaolin rituel sacré.",
    image: "/images/african_royal_mask_1787130431593.jpg",
    bgImage: "/images/hero_mask_monumental_1787141482021.jpg",
  },
  {
    id: "art-textile-1",
    category: "Art textile",
    title: "Tissage Bogolan Sacré des Anciens",
    artist: "Bakary Traoré",
    year: 2026,
    origin: "Mali (Ségou)",
    price: "380 000 FCFA",
    description: "Grand pan textile en coton biologique filé à la main, peint aux décoctions végétales et à la boue alluviale fermentée du fleuve Niger.",
    image: "/images/african_textile_bogolan_1787155587717.jpg",
    bgImage: "/images/african_textile_bogolan_1787155587717.jpg",
  },
];

export default function HeroBanner() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % masterpieces.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, []);

  const current = masterpieces[activeIndex];

  const goPrev = () =>
    setActiveIndex((prev) => (prev - 1 + masterpieces.length) % masterpieces.length);
  const goNext = () => setActiveIndex((prev) => (prev + 1) % masterpieces.length);

  return (
    <section className="relative min-h-[70vh] sm:min-h-[80vh] overflow-hidden bg-[#241710] text-[#F6F2E7]" id="hero-banner">
      {/* Background Image with Ken Burns effect */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={current.bgImage}
          alt={current.title}
          className="w-full h-full object-cover opacity-40 scale-105 transition-all duration-[4000ms]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1F130B]/90 via-[#241710]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#241710] via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center min-h-[70vh] sm:min-h-[80vh]">
        <div className="max-w-2xl space-y-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#C4953A]/20 text-[#D6B26A] text-[11px] uppercase tracking-widest font-bold px-4 py-2 rounded-full border border-[#C4953A]/30">
            <Compass className="w-3.5 h-3.5" />
            {current.category}
          </div>

          <h1 className="font-serif-title text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-[#F6F2E7]">
            {current.title}
          </h1>

          <div className="flex items-center gap-3 text-xs text-[#E8D6B1]/80">
            <span className="text-[#D6B26A] font-bold">{current.artist}</span>
            <span>•</span>
            <span>{current.year}</span>
            <span>•</span>
            <span>{current.origin}</span>
          </div>

          <p className="text-sm sm:text-base text-[#E8D6B1]/80 max-w-xl leading-relaxed font-light">
            {current.description}
          </p>

          <div className="flex items-center gap-4 pt-2">
            <div className="text-xs">
              <span className="block text-[10px] uppercase text-[#E8D6B1]/60 font-bold">Prix</span>
              <span className="font-serif-title text-2xl font-bold text-[#D6B26A]">{current.price}</span>
            </div>

            <div className="flex gap-3">
              <Link
                href="/catalogue"
                className="inline-flex items-center gap-2 bg-[#A67123] hover:bg-[#8F5F1B] text-white text-xs font-bold px-5 py-3 rounded-xl transition-all shadow-lg cursor-pointer"
              >
                <span>Explorer le catalogue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel Controls */}
      <div className="absolute bottom-8 right-4 sm:right-8 z-20 flex items-center gap-3">
        <button
          onClick={goPrev}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur flex items-center justify-center transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <button
          onClick={goNext}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur flex items-center justify-center transition-colors cursor-pointer"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-8 left-4 sm:left-8 z-20 flex items-center gap-2">
        {masterpieces.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`h-1.5 rounded-full transition-all cursor-pointer ${
              idx === activeIndex ? "w-8 bg-[#C4953A]" : "w-3 bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}