-- ============================================
-- N'KORA : Schéma de base de données complet
-- À exécuter dans Supabase → SQL Editor
-- Idempotent : ré-exécutable sans erreur
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
  video_url text,
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
-- INDEX pour les performances
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

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Activer RLS sur toutes les tables
alter table public.profiles enable row level security;
alter table public.artists enable row level security;
alter table public.artworks enable row level security;
alter table public.artwork_images enable row level security;
alter table public.artwork_likes enable row level security;
alter table public.follows enable row level security;
alter table public.comments enable row level security;
alter table public.contact_messages enable row level security;
alter table public.cart_items enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.payments enable row level security;
alter table public.escrow_transactions enable row level security;
alter table public.exhibitions enable row level security;
alter table public.exhibition_artworks enable row level security;
alter table public.newsletter_subscribers enable row level security;
alter table public.appointments enable row level security;
alter table public.notifications enable row level security;

-- Supprimer les politiques existantes pour rendre le script ré-exécutable
drop policy if exists "Profiles visibles par tous" on public.profiles;
drop policy if exists "Chacun peut créer son profil" on public.profiles;
drop policy if exists "Chacun peut modifier son profil" on public.profiles;

drop policy if exists "Artists publics approuvés" on public.artists;
drop policy if exists "Artiste crée son profil" on public.artists;
drop policy if exists "Artiste modifie son profil" on public.artists;
drop policy if exists "Admin gère artistes" on public.artists;

drop policy if exists "Œuvres publiées visibles par tous" on public.artworks;
drop policy if exists "Artiste ajoute ses œuvres" on public.artworks;
drop policy if exists "Artiste modifie ses œuvres" on public.artworks;
drop policy if exists "Artiste supprime ses œuvres" on public.artworks;
drop policy if exists "Admin gère œuvres" on public.artworks;

drop policy if exists "Images visibles par tous" on public.artwork_images;
drop policy if exists "Artiste ajoute images" on public.artwork_images;
drop policy if exists "Artiste supprime images" on public.artwork_images;

drop policy if exists "Likes visibles par tous" on public.artwork_likes;
drop policy if exists "Utilisateur connecté peut liker" on public.artwork_likes;
drop policy if exists "Utilisateur peut retirer son like" on public.artwork_likes;

drop policy if exists "Follows visibles par tous" on public.follows;
drop policy if exists "Utilisateur peut suivre" on public.follows;
drop policy if exists "Utilisateur peut se désabonner" on public.follows;

drop policy if exists "Commentaires visibles par tous" on public.comments;
drop policy if exists "Utilisateur peut commenter" on public.comments;
drop policy if exists "Auteur modifie son commentaire" on public.comments;
drop policy if exists "Auteur supprime son commentaire" on public.comments;

drop policy if exists "Artiste voit ses messages" on public.contact_messages;
drop policy if exists "Visiteur peut envoyer message" on public.contact_messages;

drop policy if exists "Utilisateur voit son panier" on public.cart_items;
drop policy if exists "Utilisateur ajoute au panier" on public.cart_items;
drop policy if exists "Utilisateur modifie son panier" on public.cart_items;
drop policy if exists "Utilisateur supprime du panier" on public.cart_items;

drop policy if exists "Acheteur voit ses commandes" on public.orders;
drop policy if exists "Artiste voit ses commandes" on public.orders;
drop policy if exists "Acheteur crée commande" on public.orders;
drop policy if exists "Admin gère commandes" on public.orders;

drop policy if exists "Acheteur voit ses lignes" on public.order_items;
drop policy if exists "Artiste voit ses lignes" on public.order_items;
drop policy if exists "Acheteur crée lignes" on public.order_items;
drop policy if exists "Admin gère lignes" on public.order_items;

drop policy if exists "Acheteur voit ses paiements" on public.payments;
drop policy if exists "Admin gère paiements" on public.payments;

drop policy if exists "Acheteur voit séquestre" on public.escrow_transactions;
drop policy if exists "Admin gère séquestre" on public.escrow_transactions;

drop policy if exists "Expositions visibles par tous" on public.exhibitions;
drop policy if exists "Admin gère expositions" on public.exhibitions;

drop policy if exists "Liaisons visibles" on public.exhibition_artworks;
drop policy if exists "Admin gère liaisons" on public.exhibition_artworks;

drop policy if exists "Inscription newsletter publique" on public.newsletter_subscribers;
drop policy if exists "Admin gère abonnés" on public.newsletter_subscribers;

drop policy if exists "Visiteur crée RDV" on public.appointments;
drop policy if exists "Artiste voit ses RDV" on public.appointments;
drop policy if exists "Admin gère RDV" on public.appointments;

drop policy if exists "Utilisateur voit ses notifications" on public.notifications;
drop policy if exists "Système crée notifications" on public.notifications;
drop policy if exists "Utilisateur marque lu" on public.notifications;
drop policy if exists "Utilisateur supprime notification" on public.notifications;

-- PROFILS : tout le monde peut lire, seul l'utilisateur peut modifier son profil
create policy "Profiles visibles par tous"
  on public.profiles for select
  using (true);

create policy "Chacun peut créer son profil"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Chacun peut modifier son profil"
  on public.profiles for update
  using (auth.uid() = id);

-- ARTISTS : public approuvé peut lire, l'artiste peut créer/modifier, admin gère tout
create policy "Artists publics approuvés" on public.artists for select using (is_approved = true or auth.uid() = user_id);
create policy "Artiste crée son profil" on public.artists for insert with check (auth.uid() = user_id);
create policy "Artiste modifie son profil" on public.artists for update using (auth.uid() = user_id);
create policy "Admin gère artistes" on public.artists for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- ŒUVRES : publiées visibles par tous, l'artiste gère ses œuvres
create policy "Œuvres publiées visibles par tous" on public.artworks for select using (is_published = true);
create policy "Artiste ajoute ses œuvres" on public.artworks for insert with check (
  auth.uid() = (select user_id from public.artists where id = artist_id)
);
create policy "Artiste modifie ses œuvres" on public.artworks for update using (
  auth.uid() = (select user_id from public.artists where id = artist_id)
);
create policy "Artiste supprime ses œuvres" on public.artworks for delete using (
  auth.uid() = (select user_id from public.artists where id = artist_id)
);
create policy "Admin gère œuvres" on public.artworks for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- ARTWORK IMAGES
create policy "Images visibles par tous" on public.artwork_images for select using (true);
create policy "Artiste ajoute images" on public.artwork_images for insert with check (
  auth.uid() = (select a.user_id from public.artworks w join public.artists a on a.id = w.artist_id where w.id = artwork_id)
);
create policy "Artiste supprime images" on public.artwork_images for delete using (
  auth.uid() = (select a.user_id from public.artworks w join public.artists a on a.id = w.artist_id where w.id = artwork_id)
);

-- ARTWORK LIKES
create policy "Likes visibles par tous" on public.artwork_likes for select using (true);
create policy "Utilisateur connecté peut liker" on public.artwork_likes for insert with check (auth.uid() = user_id);
create policy "Utilisateur peut retirer son like" on public.artwork_likes for delete using (auth.uid() = user_id);

-- FOLLOWS
create policy "Follows visibles par tous" on public.follows for select using (true);
create policy "Utilisateur peut suivre" on public.follows for insert with check (auth.uid() = follower_id);
create policy "Utilisateur peut se désabonner" on public.follows for delete using (auth.uid() = follower_id);

-- COMMENTAIRES
create policy "Commentaires visibles par tous" on public.comments for select using (true);
create policy "Utilisateur peut commenter" on public.comments for insert with check (auth.uid() = author_id);
create policy "Auteur modifie son commentaire" on public.comments for update using (auth.uid() = author_id);
create policy "Auteur supprime son commentaire" on public.comments for delete using (auth.uid() = author_id);

-- CONTACT MESSAGES
create policy "Artiste voit ses messages" on public.contact_messages for select using (
  auth.uid() = (select user_id from public.artists where id = artist_id)
);
create policy "Visiteur peut envoyer message" on public.contact_messages for insert with check (true);

-- CART ITEMS
create policy "Utilisateur voit son panier" on public.cart_items for select using (auth.uid() = user_id);
create policy "Utilisateur ajoute au panier" on public.cart_items for insert with check (auth.uid() = user_id);
create policy "Utilisateur modifie son panier" on public.cart_items for update using (auth.uid() = user_id);
create policy "Utilisateur supprime du panier" on public.cart_items for delete using (auth.uid() = user_id);

-- ORDERS
create policy "Acheteur voit ses commandes" on public.orders for select using (auth.uid() = buyer_id);
create policy "Artiste voit ses commandes" on public.orders for select using (
  exists (
    select 1 from public.order_items oi
    join public.artists a on a.id = oi.artist_id
    where oi.order_id = orders.id and a.user_id = auth.uid()
  )
);
create policy "Acheteur crée commande" on public.orders for insert with check (auth.uid() = buyer_id);
create policy "Admin gère commandes" on public.orders for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- ORDER ITEMS
create policy "Acheteur voit ses lignes" on public.order_items for select using (
  auth.uid() = (select buyer_id from public.orders where id = order_id)
);
create policy "Artiste voit ses lignes" on public.order_items for select using (
  auth.uid() = (select a.user_id from public.artists a where a.id = artist_id)
);
create policy "Acheteur crée lignes" on public.order_items for insert with check (
  auth.uid() = (select buyer_id from public.orders where id = order_id)
);
create policy "Admin gère lignes" on public.order_items for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- PAYMENTS
create policy "Acheteur voit ses paiements" on public.payments for select using (
  auth.uid() = (select buyer_id from public.orders where id = order_id)
);
create policy "Admin gère paiements" on public.payments for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- ESCROW TRANSACTIONS
create policy "Acheteur voit séquestre" on public.escrow_transactions for select using (
  auth.uid() = (select buyer_id from public.orders where id = order_id)
);
create policy "Admin gère séquestre" on public.escrow_transactions for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- EXHIBITIONS
create policy "Expositions visibles par tous" on public.exhibitions for select using (is_active = true);
create policy "Admin gère expositions" on public.exhibitions for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- EXHIBITION ARTWORKS
create policy "Liaisons visibles" on public.exhibition_artworks for select using (true);
create policy "Admin gère liisons" on public.exhibition_artworks for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- NEWSLETTER SUBSCRIBERS
create policy "Inscription newsletter publique" on public.newsletter_subscribers for select using (true);
create policy "Inscription newsletter" on public.newsletter_subscribers for insert with check (true);
create policy "Admin gère abonnés" on public.newsletter_subscribers for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- APPOINTMENTS
create policy "Visiteur crée RDV" on public.appointments for insert with check (true);
create policy "Artiste voit ses RDV" on public.appointments for select using (
  auth.uid() = (select user_id from public.artists where id = artist_id)
);
create policy "Admin gère RDV" on public.appointments for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- NOTIFICATIONS
create policy "Utilisateur voit ses notifications" on public.notifications for select using (auth.uid() = user_id);
create policy "Système crée notifications" on public.notifications for insert with check (auth.uid() = user_id);
create policy "Utilisateur marque lu" on public.notifications for update using (auth.uid() = user_id);
create policy "Utilisateur supprime notification" on public.notifications for delete using (auth.uid() = user_id);

-- ============================================
-- STORAGE : buckets pour les images
-- ============================================

-- Bucket pour les photos de profil
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

-- Bucket pour les images d'œuvres
insert into storage.buckets (id, name, public)
values ('artworks', 'artworks', true)
on conflict (id) do nothing;

-- Bucket pour les bannières
insert into storage.buckets (id, name, public)
values ('banners', 'banners', true)
on conflict (id) do nothing;

-- Supprimer les policies de stockage existantes
drop policy if exists "Médias publics" on storage.objects;
drop policy if exists "Upload connecté" on storage.objects;
drop policy if exists "Suppression uploader" on storage.objects;

-- Politiques de stockage : tout le monde peut lire
create policy "Médias publics" on storage.objects for select using (bucket_id in ('avatars', 'artworks', 'banners'));

create policy "Upload connecté" on storage.objects for insert
with check (bucket_id in ('avatars', 'artworks', 'banners') and auth.role() = 'authenticated');

create policy "Suppression uploader" on storage.objects for delete
using (auth.role() = 'authenticated' and (storage.foldername(name))[1] = auth.uid()::text);

-- ============================================
-- TRIGGER : créer un profil automatiquement à l'inscription
-- ============================================

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
  prenom text;
  nom text;
  pays text;
  user_role text;
begin
  prenom := coalesce(new.raw_user_meta_data->>'first_name', split_part(coalesce(new.raw_user_meta_data->>'nom_complet', new.email), ' ', 1));
  nom := coalesce(new.raw_user_meta_data->>'last_name', null);
  pays := coalesce(new.raw_user_meta_data->>'country', null);
  user_role := coalesce(new.raw_user_meta_data->>'role', 'artist');

  -- 1. Créer le profil
  insert into public.profiles (id, first_name, last_name, country, role)
  values (new.id, prenom, nom, pays, user_role);

  -- 2. Créer le profil artiste (rôle artist par défaut)
  insert into public.artists (user_id, display_name, country, city, is_approved)
  values (
    new.id,
    prenom || case when nom is not null then ' ' || nom else '' end,
    coalesce(pays, 'Autre'),
    'Ville',
    true
  );

  return new;
end;
$$;

-- Déclencher à chaque nouvelle inscription
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================
-- TRIGGER : mettre à jour updated_at automatiquement
-- ============================================

create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_updated_at_profiles on public.profiles;
create trigger set_updated_at_profiles
  before update on public.profiles
  for each row execute function public.handle_updated_at();

drop trigger if exists set_updated_at_artists on public.artists;
create trigger set_updated_at_artists
  before update on public.artists
  for each row execute function public.artists();

drop trigger if exists set_updated_at_artworks on public.artworks;
create trigger set_updated_at_artworks
  before update on public.artworks
  for each row execute function public.handle_updated_at();

-- ============================================
-- TRIGGER : incrémenter le compteur de likes sur les œuvres
-- ============================================

create or replace function public.increment_artwork_likes()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  update public.artworks set likes_count = likes_count + 1 where id = new.artwork_id;
  return new;
end;
$$;

create or replace function public.decrement_artwork_likes()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  update public.artworks set likes_count = greatest(likes_count - 1, 0) where id = old.artwork_id;
  return old;
end;
$$;

drop trigger if exists on_like_added on public.artwork_likes;
create trigger on_like_added
  after insert on public.artwork_likes
  for each row execute function public.increment_artwork_likes();

drop trigger if exists on_like_removed on public.artwork_likes;
create trigger on_like_removed
  after delete on public.artwork_likes
  for each row execute function public.decrement_artwork_likes();

-- ============================================
-- TRIGGER : incrémenter le compteur de followers sur les artistes
-- ============================================

create or replace function public.increment_artist_followers()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  update public.artists set followers_count = followers_count + 1 where id = new.artist_id;
  return new;
end;
$$;

create or replace function public.decrement_artist_followers()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  update public.artists set followers_count = greatest(followers_count - 1, 0) where id = old.artist_id;
  return old;
end;
$$;

drop trigger if exists on_follow_added on public.follows;
create trigger on_follow_added
  after insert on public.follows
  for each row execute function public.increment_artist_followers();

drop trigger if exists on_follow_removed on public.follows;
create trigger on_follow_removed
  after delete on public.follows
  for each row execute function public.decrement_artist_followers();

-- ============================================
-- TRIGGER : générer un numéro de commande unique
-- ============================================

create or replace function public.generate_order_number()
returns trigger
language plpgsql
as $$
declare
  year_text varchar(4) := to_char(now(), 'YYYY');
  seq_num int;
begin
  seq_num := nextval('orders_seq');
  new.order_number := 'NK-' || year_text || '-' || lpad(seq_num::text, 4, '0');
  return new;
end;
$$;

create sequence if not exists public.orders_seq start 1;

drop trigger if exists on_order_created on public.orders;
create trigger on_order_created
  before insert on public.orders
  for each row when (new.order_number is null)
  execute function public.generate_order_number();
