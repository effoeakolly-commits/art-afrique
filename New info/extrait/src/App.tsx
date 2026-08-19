import React, { useState } from 'react';
import { PageView, Artwork } from './types';
import { ARTWORKS_DATA } from './data/mockData';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { HomeFeaturedArtworks } from './components/HomeFeaturedArtworks';
import { HomeTrustAndNewsletter } from './components/HomeTrustAndNewsletter';
import { CatalogSection } from './components/CatalogSection';
import { ArtistsSection } from './components/ArtistsSection';
import { ArtistsPage } from './components/ArtistsPage';
import { ArtistProfilePage } from './components/ArtistProfilePage';
import { ExpositionsSection } from './components/ExpositionsSection';
import { AboutSection } from './components/AboutSection';
import { ArtworkDetailPage } from './components/ArtworkDetailPage';
import { ArtistDashboard } from './components/ArtistDashboard';
import { AuthModal } from './components/AuthModal';
import { CartModal } from './components/CartModal';
import { AcquisitionModal } from './components/AcquisitionModal';
import { CollectorNewsletterModal } from './components/CollectorNewsletterModal';
import { VirtualTourModal } from './components/VirtualTourModal';
import { Footer } from './components/Footer';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('accueil');
  const [favorites, setFavorites] = useState<string[]>(['art-masque-dan', 'art-elevation']);
  const [viewingArtworkId, setViewingArtworkId] = useState<string>('art-masque-dan');
  const [viewingArtistId, setViewingArtistId] = useState<string>('artist-koffi');
  const [selectedExhibitionId, setSelectedExhibitionId] = useState<string | null>(null);
  
  // Cart State
  const [cartItems, setCartItems] = useState<Artwork[]>([ARTWORKS_DATA[0]]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Acquisition / Checkout Modal State
  const [isAcquisitionOpen, setIsAcquisitionOpen] = useState(false);
  const [checkoutArtwork, setCheckoutArtwork] = useState<Artwork | null>(ARTWORKS_DATA[0]);

  // Auth Modals state
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authInitialMode, setAuthInitialMode] = useState<'login' | 'artist-signup'>('login');
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);
  
  // Logged-in Artist Session state
  const [isLoggedInArtist, setIsLoggedInArtist] = useState(false);
  const [artistName, setArtistName] = useState('Koffi Amani');

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleOpenArtworkDetail = (artworkId: string) => {
    setViewingArtworkId(artworkId);
    setCurrentPage('artwork-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectArtist = (artistId: string) => {
    setViewingArtistId(artistId);
    setCurrentPage('artist-profile');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (artwork: Artwork) => {
    setCartItems((prev) => {
      if (prev.some((item) => item.id === artwork.id)) {
        return prev;
      }
      return [...prev, artwork];
    });
  };

  const handleRemoveFromCart = (artworkId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== artworkId));
  };

  const handleBuyNow = (artwork: Artwork) => {
    setCheckoutArtwork(artwork);
    setIsAcquisitionOpen(true);
  };

  const handleCartCheckout = () => {
    setIsCartOpen(false);
    if (cartItems.length > 0) {
      setCheckoutArtwork(cartItems[0]);
      setIsAcquisitionOpen(true);
    }
  };

  const handleAuthSuccess = (role: 'artist' | 'collector', name?: string) => {
    if (role === 'artist') {
      setIsLoggedInArtist(true);
      if (name) setArtistName(name);
      setCurrentPage('artist-dashboard');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#2F241A] font-sans selection:bg-[#C4953A]/20 selection:text-[#4B2E20]">
      
      {/* Top Navbar */}
      {currentPage !== 'artist-dashboard' && (
        <Navbar
          currentPage={currentPage}
          onNavigate={(page) => {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenAuth={() => {
            setAuthInitialMode('login');
            setIsAuthOpen(true);
          }}
          onOpenArtistOnboarding={() => {
            setAuthInitialMode('artist-signup');
            setIsAuthOpen(true);
          }}
          onOpenCart={() => setIsCartOpen(true)}
          cartCount={cartItems.length}
          favoritesCount={favorites.length}
        />
      )}

      {/* Main Content Router */}
      <main className="flex-1">
        
        {/* VIEW 1: HOME PAGE (Enhanced with the 2 exact requested screenshot components) */}
        {currentPage === 'accueil' && (
          <>
            {/* 1. Hero Carousel Banner */}
            <HeroBanner
              onNavigate={(page) => {
                setCurrentPage(page);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenArtworkDetail={handleOpenArtworkDetail}
              onOpenNewsletter={() => setIsNewsletterOpen(true)}
            />

            {/* 2. Œuvres en vedette (Exact match to Screenshot 1) */}
            <HomeFeaturedArtworks
              onNavigate={(page) => {
                setCurrentPage(page);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenArtworkDetail={handleOpenArtworkDetail}
              onToggleFavorite={toggleFavorite}
              favorites={favorites}
            />

            {/* 3. Mission & Master Artisan Section */}
            <ArtistsSection
              onNavigate={(page) => {
                setCurrentPage(page);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenAuth={() => {
                setAuthInitialMode('artist-signup');
                setIsAuthOpen(true);
              }}
            />

            {/* 4. 3D Virtual Expositions & Pavillons */}
            <ExpositionsSection
              onNavigate={(page) => {
                setCurrentPage(page);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenVirtualTour={(id) => setSelectedExhibitionId(id)}
            />

            {/* 5. Trust Strip + Newsletter Community (Exact match to Screenshot 2) */}
            <HomeTrustAndNewsletter />
          </>
        )}

        {/* VIEW 2: FULL CATALOGUE (Screenshot 1 filter view) */}
        {currentPage === 'catalogue' && (
          <CatalogSection
            onNavigate={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenArtworkDetail={handleOpenArtworkDetail}
            onToggleFavorite={toggleFavorite}
            favorites={favorites}
            isFullCatalog={true}
          />
        )}

        {/* VIEW 3: DEDICATED ARTWORK DETAIL PAGE */}
        {currentPage === 'artwork-detail' && (
          <ArtworkDetailPage
            artworkId={viewingArtworkId}
            onNavigate={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectArtist={handleSelectArtist}
            onToggleFavorite={toggleFavorite}
            isFavorite={favorites.includes(viewingArtworkId)}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
          />
        )}

        {/* VIEW 4: ARTISTS LIST PAGE */}
        {currentPage === 'artistes' && (
          <ArtistsPage
            onNavigate={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectArtist={handleSelectArtist}
          />
        )}

        {/* VIEW 5: ARTIST PROFILE PAGE */}
        {currentPage === 'artist-profile' && (
          <ArtistProfilePage
            artistId={viewingArtistId}
            onNavigate={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenArtworkDetail={handleOpenArtworkDetail}
          />
        )}

        {/* VIEW 6: EXPOSITIONS */}
        {currentPage === 'expositions' && (
          <div className="py-4">
            <ExpositionsSection
              onNavigate={(page) => {
                setCurrentPage(page);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenVirtualTour={(id) => setSelectedExhibitionId(id)}
            />
          </div>
        )}

        {/* VIEW 7: ABOUT PAGE WITH MASTER LOGO */}
        {currentPage === 'a-propos' && (
          <AboutSection
            onNavigate={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenAuth={(mode) => {
              setAuthInitialMode(mode || 'artist-signup');
              setIsAuthOpen(true);
            }}
          />
        )}

        {/* VIEW 8: ARTIST DASHBOARD */}
        {currentPage === 'artist-dashboard' && (
          <ArtistDashboard
            onNavigate={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onLogout={() => {
              setIsLoggedInArtist(false);
              setCurrentPage('accueil');
            }}
          />
        )}

      </main>

      {/* Footer */}
      {currentPage !== 'artist-dashboard' && (
        <Footer
          onNavigate={(page) => {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenAuth={() => {
            setAuthInitialMode('login');
            setIsAuthOpen(true);
          }}
          onOpenArtistOnboarding={() => {
            setAuthInitialMode('artist-signup');
            setIsAuthOpen(true);
          }}
        />
      )}

      {/* Shopping Cart Drawer / Modal */}
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={handleCartCheckout}
        onNavigateCatalog={() => {
          setIsCartOpen(false);
          setCurrentPage('catalogue');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Acquisition & Payment Escrow Modal */}
      <AcquisitionModal
        isOpen={isAcquisitionOpen}
        artwork={checkoutArtwork}
        onClose={() => setIsAcquisitionOpen(false)}
      />

      {/* Auth Modal (Login + Signup modes) */}
      <AuthModal
        isOpen={isAuthOpen}
        initialMode={authInitialMode}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={handleAuthSuccess}
      />

      {/* Collector Newsletter Modal */}
      <CollectorNewsletterModal
        isOpen={isNewsletterOpen}
        onClose={() => setIsNewsletterOpen(false)}
      />

      {/* Virtual 3D Tour Modal */}
      <VirtualTourModal
        exhibitionId={selectedExhibitionId}
        onClose={() => setSelectedExhibitionId(null)}
      />

    </div>
  );
}
