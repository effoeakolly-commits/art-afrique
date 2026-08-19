import React, { useState, useMemo } from 'react';
import { PageView, Artwork } from '../types';
import { ARTWORKS_DATA, FEATURED_ARTISTS } from '../data/mockData';
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';

interface CatalogSectionProps {
  onNavigate: (page: PageView) => void;
  onOpenArtworkDetail: (artworkId: string) => void;
  onToggleFavorite: (artworkId: string) => void;
  favorites: string[];
  isFullCatalog?: boolean;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  onNavigate,
  onOpenArtworkDetail,
  onToggleFavorite,
  favorites,
  isFullCatalog = true
}) => {
  // Filter States
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedArtist, setSelectedArtist] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(5000000);
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'price-asc' | 'price-desc'>('recent');
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Collapsible sidebar sections
  const [openSections, setOpenSections] = useState({
    categories: true,
    artist: true,
    price: true,
    country: true
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const categoryOptions = [
    { label: 'Sculptures', value: 'Sculpture' },
    { label: 'Peintures', value: 'Peinture' },
    { label: 'Masques', value: 'Masque' },
    { label: 'Céramiques', value: 'Céramique' },
    { label: 'Photographies', value: 'Photographie' },
    { label: 'Textiles', value: 'Art Textile' },
    { label: 'Bijoux', value: 'Bijoux' },
    { label: 'Autres', value: 'Autres' }
  ];

  const countries = ['Côte d\'Ivoire', 'Sénégal', 'Ghana', 'Mali', 'Cameroun', 'Bénin', 'Burkina Faso'];

  const handleCategoryToggle = (catValue: string) => {
    setSelectedCategories(prev =>
      prev.includes(catValue) ? prev.filter(c => c !== catValue) : [...prev, catValue]
    );
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSelectedCategories([]);
    setSelectedArtist('all');
    setMaxPrice(5000000);
    setSelectedCountry('all');
    setSortBy('recent');
    setCurrentPage(1);
  };

  // Filter artworks
  const filteredArtworks = useMemo(() => {
    let result = [...ARTWORKS_DATA];

    if (selectedCategories.length > 0) {
      result = result.filter(art => selectedCategories.includes(art.category) || (art.category === 'Peinture africaine' && selectedCategories.includes('Peinture')));
    }

    if (selectedArtist !== 'all') {
      result = result.filter(art => art.artistId === selectedArtist || art.artistName === selectedArtist);
    }

    if (selectedCountry !== 'all') {
      result = result.filter(art => art.origin === selectedCountry);
    }

    result = result.filter(art => art.priceFcfa <= maxPrice);

    // Sort
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.priceFcfa - b.priceFcfa);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.priceFcfa - a.priceFcfa);
    }

    return result;
  }, [selectedCategories, selectedArtist, selectedCountry, maxPrice, sortBy]);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredArtworks.length / itemsPerPage) || 1;
  const paginatedArtworks = filteredArtworks.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';
  };

  return (
    <div className="bg-[#FAF7F0] min-h-screen py-10 sm:py-14 text-[#2F241A]" id="catalog-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start">
          
          {/* =========================================================================
              LEFT SIDEBAR: FILTRES (Exact match to Screenshot 1)
             ========================================================================= */}
          <aside className="lg:col-span-3 bg-transparent space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-[#E8DFCE]">
              <h2 className="font-serif-title text-xl font-medium text-[#4B2E20]">Filtres</h2>
            </div>

            {/* 1. Catégories */}
            <div className="border-b border-[#E8DFCE]/70 pb-5">
              <button
                onClick={() => toggleSection('categories')}
                className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#4B2E20] py-1 cursor-pointer"
              >
                <span>Catégories</span>
                {openSections.categories ? <ChevronUp className="w-4 h-4 text-[#8B6236]" /> : <ChevronDown className="w-4 h-4 text-[#8B6236]" />}
              </button>

              {openSections.categories && (
                <div className="mt-3 space-y-2.5">
                  {categoryOptions.map(cat => {
                    const isChecked = selectedCategories.includes(cat.value);
                    return (
                      <label
                        key={cat.value}
                        className="flex items-center gap-3 text-xs text-[#2F241A]/80 hover:text-[#4B2E20] cursor-pointer select-none"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleCategoryToggle(cat.value)}
                          className="w-4 h-4 rounded border-[#C4B296] text-[#A67123] focus:ring-0 focus:ring-offset-0 cursor-pointer accent-[#A67123]"
                        />
                        <span>{cat.label}</span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 2. Artiste */}
            <div className="border-b border-[#E8DFCE]/70 pb-5">
              <button
                onClick={() => toggleSection('artist')}
                className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#4B2E20] py-1 cursor-pointer"
              >
                <span>Artiste</span>
                {openSections.artist ? <ChevronUp className="w-4 h-4 text-[#8B6236]" /> : <ChevronDown className="w-4 h-4 text-[#8B6236]" />}
              </button>

              {openSections.artist && (
                <div className="mt-3">
                  <select
                    value={selectedArtist}
                    onChange={(e) => {
                      setSelectedArtist(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full bg-white border border-[#E8DFCE] rounded-xl px-3.5 py-2.5 text-xs text-[#2F241A] focus:outline-none focus:border-[#C4953A] cursor-pointer shadow-xs"
                  >
                    <option value="all">Tous les artistes</option>
                    {FEATURED_ARTISTS.map(art => (
                      <option key={art.id} value={art.id}>{art.name}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* 3. Prix Slider */}
            <div className="border-b border-[#E8DFCE]/70 pb-5">
              <button
                onClick={() => toggleSection('price')}
                className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#4B2E20] py-1 cursor-pointer"
              >
                <span>Prix</span>
                {openSections.price ? <ChevronUp className="w-4 h-4 text-[#8B6236]" /> : <ChevronDown className="w-4 h-4 text-[#8B6236]" />}
              </button>

              {openSections.price && (
                <div className="mt-3 space-y-3">
                  <input
                    type="range"
                    min={100000}
                    max={5000000}
                    step={50000}
                    value={maxPrice}
                    onChange={(e) => {
                      setMaxPrice(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="w-full accent-[#A67123] h-1.5 bg-[#E8DFCE] rounded-lg cursor-pointer"
                  />
                  <div className="flex items-center justify-between text-[11px] text-[#2F241A]/70 font-medium">
                    <span>0 FCFA</span>
                    <span>{maxPrice >= 5000000 ? '5 000 000+ FCFA' : formatPrice(maxPrice)}</span>
                  </div>
                </div>
              )}
            </div>

            {/* 4. Pays */}
            <div className="border-b border-[#E8DFCE]/70 pb-5">
              <button
                onClick={() => toggleSection('country')}
                className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#4B2E20] py-1 cursor-pointer"
              >
                <span>Pays</span>
                {openSections.country ? <ChevronUp className="w-4 h-4 text-[#8B6236]" /> : <ChevronDown className="w-4 h-4 text-[#8B6236]" />}
              </button>

              {openSections.country && (
                <div className="mt-3">
                  <select
                    value={selectedCountry}
                    onChange={(e) => {
                      setSelectedCountry(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full bg-white border border-[#E8DFCE] rounded-xl px-3.5 py-2.5 text-xs text-[#2F241A] focus:outline-none focus:border-[#C4953A] cursor-pointer shadow-xs"
                  >
                    <option value="all">Tous les pays</option>
                    {countries.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Reset Button (Warm ochre solid button from Screenshot 1) */}
            <button
              onClick={handleResetFilters}
              className="w-full bg-[#A67123] hover:bg-[#8F5F1B] text-white font-medium text-xs py-3 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Réinitialiser</span>
            </button>

          </aside>

          {/* =========================================================================
              MAIN CONTENT: HEADER & 3-COLUMN ARTWORKS GRID (Screenshot 1)
             ========================================================================= */}
          <main className="lg:col-span-9 space-y-6">
            
            {/* Header & Sort Controls */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-2">
              <div>
                <h1 className="font-serif-title text-3xl sm:text-4xl text-[#3E2519] font-normal tracking-tight">
                  Catalogue
                </h1>
                <p className="text-xs text-[#2F241A]/70 mt-1 font-light">
                  {filteredArtworks.length} {filteredArtworks.length > 1 ? 'œuvres disponibles' : 'œuvre disponible'}
                </p>
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2 text-xs text-[#2F241A]/80">
                <span>Trier par :</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent font-medium text-[#4B2E20] focus:outline-none cursor-pointer border-none py-1 pr-2"
                >
                  <option value="recent">Plus récentes</option>
                  <option value="price-asc">Prix croissant</option>
                  <option value="price-desc">Prix décroissant</option>
                </select>
              </div>
            </div>

            {/* Artworks Grid (3 columns on desktop) */}
            {paginatedArtworks.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center space-y-4 shadow-sm border border-[#E8DFCE]">
                <p className="text-[#4B2E20] font-serif-title text-xl">Aucune œuvre trouvée</p>
                <p className="text-xs text-[#2F241A]/70">Essayez de réinitialiser vos filtres de recherche.</p>
                <button
                  onClick={handleResetFilters}
                  className="bg-[#A67123] text-white text-xs px-5 py-2.5 rounded-xl cursor-pointer"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
                {paginatedArtworks.map((artwork) => (
                  <div
                    key={artwork.id}
                    id={`artwork-card-${artwork.id}`}
                    onClick={() => onOpenArtworkDetail(artwork.id)}
                    className="group flex flex-col cursor-pointer transition-transform duration-300"
                  >
                    {/* Artwork Image Container with rounded borders */}
                    <div className="relative aspect-4/5 rounded-2xl overflow-hidden bg-[#241710] shadow-sm group-hover:shadow-lg transition-all duration-300">
                      <img
                        src={artwork.imageUrl}
                        alt={artwork.title}
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Metadata below image (exact match to Screenshot 1) */}
                    <div className="pt-3 space-y-1 text-left">
                      <h3 className="font-serif-title text-base sm:text-lg font-bold text-[#241710] leading-snug group-hover:text-[#A67123] transition-colors">
                        {artwork.title}
                      </h3>
                      <div className="text-xs text-[#2F241A]/60 font-light">
                        {artwork.category}
                      </div>
                      <div className="text-xs font-semibold text-[#241710] pt-0.5">
                        {formatPrice(artwork.priceFcfa)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination Controls (Screenshot 1: <- 1 2 3 ... 10 ->) */}
            <div className="flex items-center justify-center gap-2 pt-8 text-xs text-[#2F241A]">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#2F241A] hover:bg-[#E8DFCE]/50 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
                const pageNum = i + 1;
                const isActive = currentPage === pageNum;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-7 h-7 rounded-full text-xs font-medium cursor-pointer transition-colors ${
                      isActive ? 'font-bold text-[#A67123]' : 'text-[#2F241A]/70 hover:text-[#2F241A]'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              {totalPages > 5 && (
                <>
                  <span className="text-[#2F241A]/50">...</span>
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    className={`w-7 h-7 rounded-full text-xs font-medium cursor-pointer ${
                      currentPage === totalPages ? 'font-bold text-[#A67123]' : 'text-[#2F241A]/70'
                    }`}
                  >
                    {totalPages}
                  </button>
                </>
              )}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#2F241A] hover:bg-[#E8DFCE]/50 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </main>

        </div>

      </div>
    </div>
  );
};
