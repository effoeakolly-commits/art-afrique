# SPÉCIFICATIONS TECHNIQUES BACKEND — N'KORA
*Plateforme d'Art Africain Contemporain & Traditionnel, Galeries Virtuelles et Ateliers d'Artistes*

Ce document sert de guide complet et exhaustif pour l'Intelligence Artificielle ou l'équipe d'ingénierie backend chargée de concevoir et déployer l'API, la base de données et les services métier de **N'KORA**.

---

## 1. ARCHITECTURE GÉNÉRALE

- **Type d'Architecture** : RESTful API ou GraphQL avec Microservices / Monolithe modulaire.
- **Protocoles** : HTTPS, WebSockets (pour les notifications temps réel, les visites virtuelles 3D multi-utilisateurs et le statut des commandes).
- **Format de données** : JSON (`Content-Type: application/json`).
- **Devise de référence** : Franc CFA (XOF / XAF), avec taux de conversion dynamique pour EUR ($) et USD ($).

---

## 2. MODÈLE DE DONNÉES (DATABASE SCHEMA)

### 2.1. Utilisateurs & Authentification (`users`)
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'collector', -- 'collector', 'artist', 'curator', 'admin'
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone VARCHAR(50),
    country VARCHAR(100),
    city VARCHAR(100),
    avatar_url TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 2.2. Profils d'Artistes (`artists`)
```sql
CREATE TABLE artists (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    display_name VARCHAR(150) NOT NULL,
    bio TEXT,
    disciplines TEXT[], -- ['Sculpture', 'Peinture', 'Masques', 'Art Textile']
    materials TEXT[],    -- ['Bois d'ébène', 'Bronze', 'Pigments naturels']
    country VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    banner_url TEXT,
    profile_image_url TEXT,
    studio_address TEXT,
    website_url TEXT,
    instagram_handle VARCHAR(100),
    payout_preference VARCHAR(100), -- 'wave', 'orange_money', 'mtn_momo', 'bank_transfer'
    payout_account_number VARCHAR(150),
    exhibitions_count INT DEFAULT 0,
    followers_count INT DEFAULT 0,
    total_sales_fcfa NUMERIC(15, 2) DEFAULT 0.00,
    is_verified_master BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 2.3. Œuvres d'Art (`artworks`)
```sql
CREATE TABLE artworks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    artist_id UUID REFERENCES artists(id) ON DELETE RESTRICT,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    category VARCHAR(100) NOT NULL, -- 'Sculptures', 'Peintures', 'Masques', 'Céramiques', 'Textiles', 'Photographies'
    medium VARCHAR(150),
    materials TEXT[],
    dimensions VARCHAR(100),
    year INT,
    origin_country VARCHAR(100),
    origin_region VARCHAR(100),
    cultural_significance TEXT,
    price_fcfa NUMERIC(12, 2) NOT NULL,
    price_usd NUMERIC(10, 2),
    price_eur NUMERIC(10, 2),
    stock_quantity INT DEFAULT 1,
    is_available BOOLEAN DEFAULT TRUE,
    featured_home BOOLEAN DEFAULT FALSE,
    primary_image_url TEXT NOT NULL,
    gallery_image_urls TEXT[],
    certificate_number VARCHAR(100) UNIQUE,
    views_count INT DEFAULT 0,
    likes_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 2.4. Commandes & Séquestre (`orders` & `order_items`)
```sql
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number VARCHAR(50) UNIQUE NOT NULL, -- Ex: NK-2026-0891
    buyer_id UUID REFERENCES users(id),
    buyer_name VARCHAR(150) NOT NULL,
    buyer_email VARCHAR(255) NOT NULL,
    buyer_phone VARCHAR(50) NOT NULL,
    shipping_address TEXT NOT NULL,
    shipping_country VARCHAR(100) NOT NULL,
    shipping_city VARCHAR(100) NOT NULL,
    total_amount_fcfa NUMERIC(15, 2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'XOF',
    payment_method VARCHAR(50) NOT NULL, -- 'mobile_money_wave', 'orange_money', 'mtn_momo', 'card_stripe', 'bank_wire'
    payment_status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'escrow_locked', 'released_to_artist', 'refunded'
    order_status VARCHAR(50) DEFAULT 'processing', -- 'processing', 'prepared_by_artist', 'in_transit', 'delivered', 'completed'
    escrow_release_token VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    artwork_id UUID REFERENCES artworks(id),
    artist_id UUID REFERENCES artists(id),
    unit_price_fcfa NUMERIC(12, 2) NOT NULL,
    quantity INT DEFAULT 1
);
```

### 2.5. Expositions Virtuelles 3D (`exhibitions`)
```sql
CREATE TABLE exhibitions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    subtitle VARCHAR(255),
    curator_name VARCHAR(150),
    description TEXT,
    theme VARCHAR(100),
    banner_url TEXT,
    video_preview_url TEXT,
    spatial_3d_model_url TEXT, -- GLTF/GLB file
    artworks_count INT DEFAULT 0,
    visitors_count INT DEFAULT 0,
    start_date DATE,
    end_date DATE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## 3. ENDPOINTS DE L'API REST

### 3.1. Authentification & Profils
- `POST /api/v1/auth/register` : Inscription d'un collectionneur ou d'un artiste.
- `POST /api/v1/auth/login` : Connexion (retourne JWT access + refresh token).
- `POST /api/v1/auth/forgot-password` : Réinitialisation de mot de passe par email.
- `GET /api/v1/auth/me` : Données de la session utilisateur connectée.
- `PUT /api/v1/users/profile` : Mise à jour du profil.

### 3.2. Artistes
- `GET /api/v1/artists` : Liste des artistes avec filtres (pays, discipline, tri).
- `GET /api/v1/artists/:id` : Profil complet d'un artiste avec ses œuvres et statistiques.
- `POST /api/v1/artists/:id/follow` : S'abonner à un artiste.
- `POST /api/v1/artists/:id/contact` : Envoyer un message direct à l'artiste.

### 3.3. Catalogue & Œuvres
- `GET /api/v1/artworks` : Liste paginée des œuvres avec filtres multi-critères :
  - `?category=Masques,Sculptures`
  - `?country=Côte d'Ivoire,Sénégal`
  - `?minPrice=50000&maxPrice=500000`
  - `?artistId=...`
  - `?sort=recent|price_asc|price_desc|popular`
  - `?page=1&limit=12`
- `GET /api/v1/artworks/featured` : Récupère les 4 œuvres en vedette pour la page d'accueil.
- `GET /api/v1/artworks/:id` : Détail complet d'une œuvre (matériaux, origine, galerie photo).
- `POST /api/v1/artworks/:id/like` : Ajouter / Retirer des favoris.

### 3.4. Gestion Artiste (Tableau de Bord / Backoffice)
- `GET /api/v1/artist/dashboard/stats` : Indicateurs clés (œuvres, ventes, messages, commandes).
- `GET /api/v1/artist/artworks` : Liste des œuvres publiées par l'artiste connecté.
- `POST /api/v1/artist/artworks` : Publier une nouvelle œuvre avec upload d'images.
- `PUT /api/v1/artist/artworks/:id` : Modifier une œuvre.
- `DELETE /api/v1/artist/artworks/:id` : Dépublier ou supprimer une œuvre.
- `GET /api/v1/artist/orders` : Commandes reçues par l'artiste.
- `PUT /api/v1/artist/orders/:id/status` : Marquer comme expédiée / prête pour remise.

### 3.5. Paiements Séquestre & Mobile Money
- `POST /api/v1/checkout/create-order` : Initialiser une commande avec sélection de méthode.
- `POST /api/v1/payments/wave/init` : Initialiser le push Mobile Money Wave.
- `POST /api/v1/payments/orange-money/init` : Push Orange Money Web Payment.
- `POST /api/v1/payments/stripe/create-intent` : Créer un PaymentIntent pour cartes bancaires.
- `POST /api/v1/webhooks/payment-gateway` : Webhook sécurisé pour valider le séquestre.
- `POST /api/v1/orders/:id/confirm-receipt` : Confirmation de réception acheteur déclenchant le virement artiste.

### 3.6. Newsletter & Communauté
- `POST /api/v1/newsletter/subscribe` : Inscription email à la communauté N'KORA.

---

## 4. INSTRUCTIONS D'EXÉCUTION & DÉPLOIEMENT

1. **Variables d'Environnement** : Définir `DATABASE_URL`, `JWT_SECRET`, `WAVE_API_KEY`, `ORANGE_MONEY_SECRET`, `STRIPE_SECRET_KEY`, `S3_BUCKET_NAME`.
2. **Stockage Médias** : Uploader les images originales en haute fidélité vers un CDN (Cloudinary / AWS S3 / Cloud Storage).
3. **CORS Configuration** : Autoriser le domaine frontend N'KORA.
