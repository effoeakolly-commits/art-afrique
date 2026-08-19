import React, { useState, useMemo } from 'react';
import { PageView } from '../types';
import { FEATURED_ARTISTS } from '../data/mockData';
import { Search, ChevronDown, ArrowRight } from 'lucide-react';

interface ArtistsPageProps {
  onNavigate: (page: PageView) => void;
  onSelectArtist: (artistId: string) => void;
}

export const ArtistsPage: React.FC<ArtistsPageProps> = ({ onNavigate, onSelectArtist }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');

  const countries = ['Côte d\'Ivoire', 'Sénégal', 'Ghana', 'Mali', 'Cameroun'];
  const specialties = ['Sculpteur', 'Peintre', 'Textile', 'Céramiste'];

  const filteredArtists = useMemo(() => {
    return FEATURED_ARTISTS.filter(artist => {
      const matchesSearch = artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            artist.bio.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCountry = selectedCountry === 'all' || artist.country === selectedCountry;
      const matchesSpecialty = selectedSpecialty === 'all' || artist.specialty.toLowerCase().includes(selectedSpecialty.toLowerCase());

      return matchesSearch && matchesCountry && matchesSpecialty;
    });
  }, [searchQuery, selectedCountry, selectedSpecialty]);

  return (
    <div className="bg-[#FAF7F0] min-h-screen py-10 sm:py-16 text-[#2F241A]" id="artists-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* =========================================================================
            HEADER & SEARCH/FILTER ROW (Exact match to Screenshot 2)
           ========================================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
          
          {/* Title & Subtitle */}
          <div>
            <h1 className="font-serif-title text-3xl sm:text-4xl lg:text-5xl text-[#3E2519] font-normal tracking-tight">
              Nos artistes
            </h1>
            <p className="text-sm text-[#2F241A]/70 mt-2 font-light">
              Découvrez les talents qui font vivre l'art africain.
            </p>
          </div>

          {/* Filters on top right */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* Search Input */}
            <div className="relative min-w-[240px] sm:min-w-[280px]">
              <Search className="w-4 h-4 text-[#8B6236]/60 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Rechercher un artiste..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-[#E8DFCE] rounded-xl pl-10 pr-4 py-2 text-xs text-[#2F241A] placeholder-[#2F241A]/50 focus:outline-none focus:border-[#C4953A] shadow-2xs"
              />
            </div>

            {/* Country Dropdown */}
            <div className="relative">
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="bg-white border border-[#E8DFCE] rounded-xl pl-3.5 pr-8 py-2 text-xs text-[#2F241A] focus:outline-none focus:border-[#C4953A] cursor-pointer appearance-none shadow-2xs"
              >
                <option value="all">Pays</option>
                {countries.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#8B6236] absolute right-2.5 top-2.5 pointer-events-none" />
            </div>

            {/* Specialty Dropdown */}
            <div className="relative">
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="bg-white border border-[#E8DFCE] rounded-xl pl-3.5 pr-8 py-2 text-xs text-[#2F241A] focus:outline-none focus:border-[#C4953A] cursor-pointer appearance-none shadow-2xs"
              >
                <option value="all">Spécialité</option>
                {specialties.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#8B6236] absolute right-2.5 top-2.5 pointer-events-none" />
            </div>

          </div>

        </div>

        {/* =========================================================================
            4-COLUMN ARTISTS CARDS GRID (Exact match to Screenshot 2)
           ========================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {filteredArtists.map((artist) => (
            <div
              key={artist.id}
              id={`artist-card-${artist.id}`}
              onClick={() => onSelectArtist(artist.id)}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col cursor-pointer border border-[#E8DFCE]/60"
            >
              {/* Artist Portrait Image */}
              <div className="aspect-4/3 overflow-hidden bg-[#241710] relative">
                <img
                  src={artist.avatarUrl}
                  alt={artist.name}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1">
                  <h3 className="font-serif-title text-lg font-bold text-[#241710] group-hover:text-[#A67123] transition-colors">
                    {artist.name}
                  </h3>
                  <div className="text-xs text-[#2F241A]/70 font-light">
                    {artist.country}
                  </div>
                  <div className="text-xs text-[#2F241A]/50 font-light">
                    {artist.specialty}
                  </div>
                </div>

                {/* Bottom Link: Voir le profil -> */}
                <div className="pt-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#241710] group-hover:text-[#A67123] transition-colors">
                    <span>Voir le profil</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
