/**
 * ============================================================================
 * N'KORA — CORE DATA TYPES & DTOs FOR FRONTEND & BACKEND INTEGRATION
 * ============================================================================
 * Ce fichier définit les modèles de données et contrats d'interfaces utilisés
 * par l'application frontend N'KORA. Tout backend (Node/Express, NestJS, Django,
 * Go, Spring Boot, Laravel) doit calquer ses schémas de base de données et
 * réponses API sur ces structures.
 */

/**
 * Vues et Routes de l'application
 */
export type PageView =
  | 'accueil'           // Page d'accueil avec hero, œuvres en vedette, artisanat et expositions
  | 'catalogue'         // Catalogue complet avec filtres multi-critères
  | 'artwork-detail'    // Page de détails de l'œuvre avec achat et informations
  | 'artistes'          // Annuaire de tous les maîtres et artistes
  | 'artist-profile'    // Profil individuel de l'artiste avec galerie et biographie
  | 'expositions'       // Pavillons 3D et expositions virtuelles
  | 'a-propos'          // Histoire, manifeste et mise en majesté du grand logo N'KORA
  | 'artist-dashboard'  // Espace d'administration et tableau de bord de l'artiste
  | 'contact';

/**
 * Réflexions et avis critiques des commissaires d'exposition
 */
export interface CuratorialReflection {
  id: string;
  author: string;
  role?: string;
  date: string;
  content: string;
}

/**
 * Modèle complet de l'Œuvre d'Art (Artwork)
 * Correspond à la table `artworks` en base de données
 */
export interface Artwork {
  id: string;                     // UUID ou ID unique de l'œuvre
  title: string;                  // Titre de l'œuvre (ex: 'Masque Kple Kple')
  artistName: string;             // Nom complet de l'artiste
  artistId: string;               // Clé étrangère vers le profil de l'artiste
  artistAvatar?: string;          // Photo de profil de l'artiste
  artistStudioLocation?: string;  // Emplacement de l'atelier de création
  category: 
    | 'Sculpture' 
    | 'Peintures'
    | 'Peinture' 
    | 'Peinture africaine' 
    | 'Masque' 
    | 'Masques'
    | 'Masques & Rituels' 
    | 'Art Textile' 
    | 'Photographie' 
    | 'Céramique' 
    | 'Céramiques'
    | 'Bijoux' 
    | 'Autres';
  medium?: string;                // Matériaux / Technique (ex: 'Bois noble, pigments naturels')
  movement?: string;              // Courant artistique
  priceFcfa: number;              // Prix en Francs CFA (XOF / XAF)
  imageUrl: string;               // URL de l'image principale en haute résolution
  galleryImages?: string[];       // Liste d'URLs pour les vignettes / vues d'angle
  year: number;                   // Année de création (ex: 2026)
  origin: string;                 // Pays ou région d'origine (ex: 'Côte d'Ivoire')
  dimensions: string;             // Dimensions (ex: '45 x 28 x 18 cm')
  isAvailable: boolean;           // Disponibilité pour acquisition
  isFeatured?: boolean;           // Mise en avant sur la page d'accueil
  likesCount?: number;            // Nombre de mentions j'aime
  dateStr?: string;               // Date textuelle (ex: '12 août 2026')
  description: string;            // Description narrative et historique
  culturalInspiration?: string;   // Contexte culturel et signification rituelle
  authenticityDetails?: {
    edition: string;
    origin: string;
    logistics: string;
    certificate: string;          // Numéro de certificat d'authenticité
  };
  materials?: string[];           // Liste des matériaux utilisés
  toolsAndMethods?: string[];     // Méthodes de fabrication
  curatorialReflections?: CuratorialReflection[];
}

/**
 * Modèle de l'Artiste / Maître Créateur
 * Correspond à la table `artists` en base de données
 */
export interface Artist {
  id: string;                     // UUID ou ID unique de l'artiste
  name: string;                   // Nom d'artiste ou nom complet
  country: string;                // Pays d'origine
  countryFlag: string;            // Drapeau emoji ou code ISO
  city?: string;                  // Ville de l'atelier
  specialty: string;              // Discipline (ex: 'Sculpteur', 'Peintre')
  avatarUrl: string;              // Photo de profil
  coverUrl: string;               // Bannière d'atelier
  bio: string;                    // Biographie et parcours artistique
  artworksCount: number;          // Nombre total d'œuvres publiées
  exhibitionsCount?: number;      // Nombre d'expositions réalisées
  followersCount?: number;        // Nombre d'abonnés / collectionneurs suiveurs
  email?: string;                 // Email de contact direct
  website?: string;               // Site internet officiel
  instagram?: string;             // Compte Instagram / réseaux sociaux
  isVerified: boolean;            // Statut de certification N'KORA
  featuredArtworkIds?: string[];  // IDs des œuvres sélectionnées
}

/**
 * Données d'inscription d'un Artiste (DTO de création de compte)
 */
export interface ArtistRegistrationData {
  name: string;
  email: string;
  password?: string;
  country: string;
  city: string;
  discipline: string;
  style: string;
  experienceLevel: string;
  bio?: string;
  phoneWhatsapp?: string;
  payoutPreference: string;       // Moyen de paiement des royalties (Wave, Orange, etc.)
}

/**
 * Modèle d'Exposition Virtuelle 3D
 * Correspond à la table `exhibitions` en base de données
 */
export interface Exhibition {
  id: string;
  title: string;
  theme: string;
  dates: string;
  curator: string;
  coverImage: string;
  videoPreviewUrl?: string;
  pavilionName: string;
  artworksCount: number;
  isVirtual3D: boolean;
  description?: string;
  featuredArtworks?: string[];
}

/**
 * Données pour la prise de rendez-vous en atelier
 */
export interface StudioAppointmentData {
  artworkId: string;
  artistName: string;
  artistLocation: string;
  artistAvatar: string;
  format: 'physical' | 'virtual';
  date: string;
  time: string;
  visitorsCount: number;
  fullName: string;
  email: string;
  phoneWhatsapp: string;
  notes: string;
}

/**
 * Données pour une commande d'acquisition sous séquestre
 */
export interface AcquisitionOrderData {
  artworkId: string;
  artworkTitle: string;
  artistName: string;
  artworkImage: string;
  priceFcfa: number;
  collectorName: string;
  collectorEmail: string;
  deliveryAddress: string;
  deliveryCountry: string;
  paymentMethod: 'mobile_money' | 'card' | 'bank_transfer';
  mobileMoneyProvider: 'wave' | 'orange' | 'mtn' | 'mpesa';
  mobileMoneyPhone: string;
}
