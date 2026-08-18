export type Categorie =
  | "peinture"
  | "sculpture"
  | "photographie"
  | "artisanat"
  | "autre";

export interface Profil {
  id: string;
  nom_complet: string;
  bio: string | null;
  pays: string | null;
  photo_url: string | null;
  created_at: string;
}

export interface Oeuvre {
  id: string;
  artiste_id: string;
  titre: string;
  description: string | null;
  categorie: Categorie;
  image_url: string;
  video_url: string | null;
  created_at: string;
  artiste?: Profil;
  commentaires?: Commentaire[];
  coups_de_coeur_count?: number;
}

export interface Commentaire {
  id: string;
  oeuvre_id: string;
  auteur_id: string;
  contenu: string;
  created_at: string;
  auteur?: Profil;
}

export interface CoupDeCoeur {
  id: string;
  oeuvre_id: string;
  utilisateur_id: string;
  created_at: string;
}

export interface Abonnement {
  id: string;
  abonne_id: string;
  artiste_id: string;
  created_at: string;
}

export const CATEGORIES: { value: Categorie; label: string }[] = [
  { value: "peinture", label: "Peinture" },
  { value: "sculpture", label: "Sculpture" },
  { value: "photographie", label: "Photographie" },
  { value: "artisanat", label: "Artisanat" },
  { value: "autre", label: "Autre" },
];

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