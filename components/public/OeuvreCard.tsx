"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import type { Oeuvre } from "@/lib/types";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("fr-FR").format(price) + " FCFA";

interface OeuvreCardProps {
  oeuvre: Oeuvre;
}

export default function OeuvreCard({ oeuvre }: OeuvreCardProps) {
  return (
    <Link
      href={`/oeuvres/${oeuvre.slug}`}
      className="group block bg-white rounded-2xl overflow-hidden border border-[#E8DFCE]/80 shadow-2xs hover:shadow-md transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-4/3 overflow-hidden bg-[#241710]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={oeuvre.primary_image_url}
          alt={oeuvre.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-3 left-3 bg-[#241710]/80 backdrop-blur text-[#D6B26A] text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full">
          {oeuvre.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <h3 className="font-serif-title font-bold text-base text-[#241710] group-hover:text-[#A67123] transition-colors line-clamp-1">
          {oeuvre.title}
        </h3>
        <div className="flex items-center justify-between text-xs">
          <span className="text-[#8B6236] truncate">
            {oeuvre.artiste?.display_name || "Artiste"} • {oeuvre.origin_country}
          </span>
          <span className="flex items-center gap-1 text-[#2F241A]/60 shrink-0">
            <Heart className="w-3.5 h-3.5 text-[#B76E00]" />
            {oeuvre.likes_count}
          </span>
        </div>
        <div className="pt-1 border-t border-[#E8DFCE]/60 flex items-center justify-between">
          <span className="font-serif-title text-lg font-bold text-[#A67123]">
            {formatPrice(oeuvre.price_fcfa)}
          </span>
          <span className="text-[10px] text-[#2D7A4D] font-medium">
            {oeuvre.is_available ? "Disponible" : "Vendue"}
          </span>
        </div>
      </div>
    </Link>
  );
}