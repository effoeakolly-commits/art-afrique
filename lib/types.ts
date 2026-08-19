// ============================================
// N'KORA — Types & DTOs
// ============================================

export type Role = "collector" | "artist" | "curator" | "admin";

export type CategorieArtwork =
  | "Sculpture"
  | "Peinture"
  | "Masque"
  | "Art Textile"
  | "Photographie"
  | "Céramique"
  | "Bijoux"
  | "Autres";

// Alias rétro-compatible (nom de l'ancien schéma)
export type Categorie = CategorieArtwork;

export type StatutPaiement =
  | "pending"
  | "escrow_locked"
  | "released_to_artist"
  | "refunded";

export type StatutCommande =
  | "processing"
  | "prepared_by_artist"
  | "in_transit"
  | "delivered"
  | "completed"
  | "cancelled";

export type MethodePaiement =
  | "mobile_money_wave"
  | "orange_money"
  | "mtn_momo"
  | "card_stripe"
  | "bank_wire";

export interface Profil {
  id: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  country: string | null;
  city: string | null;
  avatar_url: string | null;
  role: Role;
  is_verified: boolean;
  is_active: boolean;
  banned_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Artiste {
  id: string;
  user_id: string;
  display_name: string;
  bio: string | null;
  disciplines: string[];
  materials: string[];
  country: string;
  city: string;
  banner_url: string | null;
  profile_image_url: string | null;
  studio_address: string | null;
  website_url: string | null;
  instagram_handle: string | null;
  experience_level: string | null;
  style: string | null;
  payout_preference: string | null;
  payout_account_number: string | null;
  exhibitions_count: number;
  followers_count: number;
  total_sales_fcfa: number;
  is_verified_master: boolean;
  is_approved: boolean;
  created_at: string;
}

export interface Oeuvre {
  id: string;
  artist_id: string;
  title: string;
  slug: string;
  description: string | null;
  category: CategorieArtwork;
  medium: string | null;
  materials: string[];
  dimensions: string | null;
  year: number | null;
  origin_country: string | null;
  origin_region: string | null;
  cultural_significance: string | null;
  price_fcfa: number;
  price_usd: number | null;
  price_eur: number | null;
  stock_quantity: number;
  is_available: boolean;
  is_published: boolean;
  featured_home: boolean;
  primary_image_url: string;
  certificate_number: string | null;
  views_count: number;
  likes_count: number;
  video_url: string | null;
  created_at: string;
  updated_at: string;
  artiste?: Artiste;
  images?: OeuvreImage[];
}

export interface OeuvreImage {
  id: string;
  artwork_id: string;
  url: string;
  position: number;
}

export interface Commande {
  id: string;
  order_number: string;
  buyer_id: string | null;
  buyer_name: string;
  buyer_email: string;
  buyer_phone: string;
  shipping_address: string;
  shipping_country: string;
  shipping_city: string;
  total_amount_fcfa: number;
  currency: string;
  payment_method: MethodePaiement;
  payment_status: StatutPaiement;
  order_status: StatutCommande;
  escrow_release_token: string | null;
  created_at: string;
  items?: CommandeItem[];
}

export interface CommandeItem {
  id: string;
  order_id: string;
  artwork_id: string | null;
  artist_id: string | null;
  unit_price_fcfa: number;
  quantity: number;
  artwork?: Oeuvre;
}

export interface Exposition {
  id: string;
  title: string;
  subtitle: string | null;
  curator_name: string | null;
  description: string | null;
  theme: string | null;
  banner_url: string | null;
  video_preview_url: string | null;
  spatial_3d_model_url: string | null;
  artworks_count: number;
  visitors_count: number;
  start_date: string | null;
  end_date: string | null;
  is_active: boolean;
  created_at: string;
}

export interface Commentaire {
  id: string;
  artwork_id: string;
  author_id: string;
  content: string;
  created_at: string;
  auteur?: Profil;
}

export interface ArticlePanier {
  id: string;
  user_id: string;
  artwork_id: string;
  quantity: number;
  created_at: string;
  oeuvre?: Oeuvre;
}

export interface AbonneNewsletter {
  id: string;
  email: string;
  is_active: boolean;
  subscribed_at: string;
}

export const CATEGORIES_ARTWORKS: { value: CategorieArtwork; label: string }[] = [
  { value: "Sculpture", label: "Sculpture" },
  { value: "Peinture", label: "Peinture" },
  { value: "Masque", label: "Masque" },
  { value: "Art Textile", label: "Art Textile" },
  { value: "Photographie", label: "Photographie" },
  { value: "Céramique", label: "Céramique" },
  { value: "Bijoux", label: "Bijoux" },
  { value: "Autres", label: "Autres" },
];

// Alias rétro-compatible (nom de l'ancien schéma)
export const CATEGORIES = CATEGORIES_ARTWORKS;

export const PAYS_AFRIQUE = [
  "Bénin",
  "Burkina Faso",
  "Cameroun",
  "Côte d'Ivoire",
  "Ghana",
  "Guinée",
  "Mali",
  "Maroc",
  "Niger",
  "Nigeria",
  "République démocratique du Congo",
  "Sénégal",
  "Togo",
  "Tunisie",
  "Autre",
];