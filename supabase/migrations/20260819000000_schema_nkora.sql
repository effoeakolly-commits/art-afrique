-- ============================================
-- N'KORA : Schéma de base de données complet
-- À exécuter dans Supabase → SQL Editor
-- ============================================

-- ============================================
-- 1. PROFILES (extension de auth.users)
-- ============================================
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  first_name varchar(100),
  last_name varchar(100),
  phone varchar(50),
  country varchar(100),
  city varchar(100),
  avatar_url text,
  role varchar(20) not null default 'collector' check (role in ('collector', 'artist', 'curator', 'admin')),
  is_verified boolean default false,
  is_active boolean default true,
  banned_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================
-- 2. ARTISTS (profils artistes)
-- ============================================
create table if not exists public.artists (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  display_name varchar(150) not null,
  bio text,
  disciplines text[] default '{}',
  materials text[] default '{}',
  country varchar(100) not null,
  city varchar(100) not null,
  banner_url text,
  profile_image_url text,
  studio_address text,
  website_url text,
  instagram_handle varchar(100),
  experience_level varchar(100),
  style varchar(100),
  payout_preference varchar(100) default 'mobile_money_wave',
  payout_account_number varchar(150),
  exhibitions_count int default 0,
  followers_count int default 0,
  total_sales_fcfa numeric(15,2) default 0.00,
  is_verified_master boolean default false,
  is_approved boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================
-- 3. ARTWORKS (œuvres d'art)
-- ============================================
create table if not exists public.artworks (
  id uuid primary key default gen_random_uuid(),
  artist_id uuid not null references public.artists(id) on delete restrict,
  title varchar(255) not null,
  slug varchar(255) unique not null,
  description text,
  category varchar(100) not null check (category in ('Sculpture', 'Peinture', 'Masque', 'Art Textile', 'Photographie', 'Céramique', 'Bijoux', 'Autres')),
  medium varchar(150),
  materials text[] default '{}',
  dimensions varchar(100),
  year int,
  origin_country varchar(100),
  origin_region varchar(100),
  cultural_significance text,
  price_fcfa numeric(12,2) not null,
  price_usd numeric(10,2),
  price_eur numeric(10,2),
  stock_quantity int default 1,
  is_available boolean default true,
  is_published boolean default false,
  featured_home boolean default false,
  primary_image_url text not null,
  certificate_number varchar(100) unique,
  views_count int default 0,
  likes_count int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================
-- 4. ARTWORK IMAGES (galerie d'images)
-- ============================================
create table if not exists public.artwork_images (
  id uuid primary key default gen_random_uuid(),
  artwork_id uuid not null references public.artworks(id) on delete cascade,
  url text not null,
  position int default 0
);

-- ============================================
-- 5. ARTWORK LIKES (coups de cœur)
-- ============================================
create table if not exists public.artwork_likes (
  id uuid primary key default gen_random_uuid(),
  artwork_id uuid not null references public.artworks(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz default now(),
  unique (artwork_id, user_id)
);

-- ============================================
-- 6. FOLLOWS (suivre un artiste)
-- ============================================
create table if not exists public.follows (
  id uuid primary key default gen_random_uuid(),
  follower_id uuid not null references public.profiles(id) on delete cascade,
  artist_id uuid not null references public.artists(id) on delete cascade,
  created_at timestamptz default now(),
  unique (follower_id, artist_id),
  check (follower_id <> artist_id)
);

-- ============================================
-- 7. COMMENTS (commentaires sur œuvres)
-- ============================================
create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  artwork_id uuid not null references public.artworks(id) on delete cascade,
  author_id uuid not null references public.profiles(id) on delete cascade,
  content text not null,
  created_at timestamptz default now()
);

-- ============================================
-- 8. CONTACT MESSAGES (messages artistes)
-- ============================================
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  artist_id uuid not null references public.artists(id) on delete cascade,
  sender_name varchar(150) not null,
  sender_email varchar(255) not null,
  message text not null,
  is_read boolean default false,
  created_at timestamptz default now()
);

-- ============================================
-- 9. CART ITEMS (panier)
-- ============================================
create table if not exists public.cart_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  artwork_id uuid not null references public.artworks(id) on delete cascade,
  quantity int default 1,
  created_at timestamptz default now(),
  unique (user_id, artwork_id)
);

-- ============================================
-- 10. ORDERS (commandes)
-- ============================================
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number varchar(50) unique not null,
  buyer_id uuid references public.profiles(id),
  buyer_name varchar(150) not null,
  buyer_email varchar(255) not null,
  buyer_phone varchar(50) not null,
  shipping_address text not null,
  shipping_country varchar(100) not null,
  shipping_city varchar(100) not null,
  total_amount_fcfa numeric(15,2) not null,
  currency varchar(10) default 'XOF',
  payment_method varchar(50) not null check (payment_method in ('mobile_money_wave', 'orange_money', 'mtn_momo', 'card_stripe', 'bank_wire')),
  payment_status varchar(50) default 'pending' check (payment_status in ('pending', 'escrow_locked', 'released_to_artist', 'refunded')),
  order_status varchar(50) default 'processing' check (order_status in ('processing', 'prepared_by_artist', 'in_transit', 'delivered', 'completed', 'cancelled')),
  escrow_release_token varchar(255),
  created_at timestamptz default now()
);

-- ============================================
-- 11. ORDER ITEMS (lignes de commande)
-- ============================================
create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  artwork_id uuid references public.artworks(id),
  artist_id uuid references public.artists(id),
  unit_price_fcfa numeric(12,2) not null,
  quantity int default 1
);

-- ============================================
-- 12. PAYMENTS (transactions)
-- ============================================
create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  provider varchar(50) not null check (provider in ('wave', 'orange_money', 'mtn_momo', 'stripe', 'bank_wire')),
  transaction_id varchar(255),
  amount_fcfa numeric(15,2) not null,
  status varchar(50) default 'pending' check (status in ('pending', 'succeeded', 'failed', 'refunded')),
  provider_reference varchar(255),
  paid_at timestamptz,
  created_at timestamptz default now()
);

-- ============================================
-- 13. ESCROW TRANSACTIONS (séquestre)
-- ============================================
create table if not exists public.escrow_transactions (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  amount_fcfa numeric(15,2) not null,
  status varchar(50) default 'locked' check (status in ('locked', 'released', 'refunded')),
  released_to_artist_id uuid references public.artists(id),
  released_at timestamptz,
  proof_url text,
  created_at timestamptz default now()
);

-- ============================================
-- 14. EXHIBITIONS (expositions virtuelles)
-- ============================================
create table if not exists public.exhibitions (
  id uuid primary key default gen_random_uuid(),
  title varchar(255) not null,
  subtitle varchar(255),
  curator_name varchar(150),
  description text,
  theme varchar(100),
  banner_url text,
  video_preview_url text,
  spatial_3d_model_url text,
  artworks_count int default 0,
  visitors_count int default 0,
  start_date date,
  end_date date,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- ============================================
-- 15. EXHIBITION ARTWORKS (liaison)
-- ============================================
create table if not exists public.exhibition_artworks (
  id uuid primary key default gen_random_uuid(),
  exhibition_id uuid not null references public.exhibitions(id) on delete cascade,
  artwork_id uuid not null references public.artworks(id) on delete cascade,
  position int default 0
);

-- ============================================
-- 16. NEWSLETTER SUBSCRIBERS (abonnés)
-- ============================================
create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email varchar(255) unique not null,
  is_active boolean default true,
  subscribed_at timestamptz default now()
);

-- ============================================
-- 17. APPOINTMENTS (RDV atelier)
-- ============================================
create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  artist_id uuid not null references public.artists(id) on delete cascade,
  visitor_name varchar(150) not null,
  visitor_email varchar(255) not null,
  phone varchar(50),
  format varchar(20) default 'physical' check (format in ('physical', 'virtual')),
  date date,
  time varchar(10),
  visitors_count int default 1,
  notes text,
  status varchar(20) default 'pending' check (status in ('pending', 'confirmed', 'cancelled')),
  created_at timestamptz default now()
);

-- ============================================
-- 18. NOTIFICATIONS
-- ============================================
create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  type varchar(50) not null,
  content text not null,
  is_read boolean default false,
  created_at timestamptz default now()
);

-- ============================================
-- INDEX
-- ============================================
create index if not exists idx_artists_user on public.artists(user_id);
create index if not exists idx_artworks_artist on public.artworks(artist_id);
create index if not exists idx_artworks_category on public.artworks(category);
create index if not exists idx_artworks_slug on public.artworks(slug);
create index if not exists idx_artworks_published on public.artworks(is_published);
create index if not exists idx_artwork_images_artwork on public.artwork_images(artwork_id);
create index if not exists idx_artwork_likes_artwork on public.artwork_likes(artwork_id);
create index if not exists idx_follows_artist on public.follows(artist_id);
create index if not exists idx_comments_artwork on public.comments(artwork_id);
create index if not exists idx_orders_buyer on public.orders(buyer_id);
create index if not exists idx_order_items_order on public.order_items(order_id);
create index if not exists idx_payments_order on public.payments(order_id);
create index if not exists idx_escrow_order on public.escrow_transactions(order_id);
create index if not exists idx_exhibition_artworks_exhibition on public.exhibition_artworks(exhibition_id);
create index if not exists idx_notifications_user on public.notifications(user_id);