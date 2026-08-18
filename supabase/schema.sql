-- ============================================
-- ART-AFRIQUE : Schéma de base de données
-- À exécuter dans Supabase → SQL Editor
-- ============================================

-- 1. Table des profils artistes
create table if not exists public.profils (
  id uuid primary key references auth.users(id) on delete cascade,
  nom_complet text not null,
  bio text,
  pays text,
  photo_url text,
  created_at timestamptz default now()
);

-- 2. Table des œuvres
create table if not exists public.oeuvres (
  id uuid primary key default gen_random_uuid(),
  artiste_id uuid not null references public.profils(id) on delete cascade,
  titre text not null,
  description text,
  categorie text not null check (categorie in ('peinture', 'sculpture', 'photographie', 'artisanat', 'autre')),
  image_url text not null,
  video_url text,
  created_at timestamptz default now()
);

-- 3. Table des commentaires
create table if not exists public.commentaires (
  id uuid primary key default gen_random_uuid(),
  oeuvre_id uuid not null references public.oeuvres(id) on delete cascade,
  auteur_id uuid not null references public.profils(id) on delete cascade,
  contenu text not null,
  created_at timestamptz default now()
);

-- 4. Table des coups de cœur (likes)
create table if not exists public.coups_de_coeur (
  id uuid primary key default gen_random_uuid(),
  oeuvre_id uuid not null references public.oeuvres(id) on delete cascade,
  utilisateur_id uuid not null references public.profils(id) on delete cascade,
  created_at timestamptz default now(),
  unique (oeuvre_id, utilisateur_id)
);

-- 5. Table des abonnements (suivre un artiste)
create table if not exists public.abonnements (
  id uuid primary key default gen_random_uuid(),
  abonne_id uuid not null references public.profils(id) on delete cascade,
  artiste_id uuid not null references public.profils(id) on delete cascade,
  created_at timestamptz default now(),
  unique (abonne_id, artiste_id),
  check (abonne_id <> artiste_id)
);

-- ============================================
-- INDEX pour les performances
-- ============================================
create index if not exists idx_oeuvres_artiste on public.oeuvres(artiste_id);
create index if not exists idx_oeuvres_categorie on public.oeuvres(categorie);
create index if not exists idx_commentaires_oeuvre on public.commentaires(oeuvre_id);
create index if not exists idx_coups_coeur_oeuvre on public.coups_de_coeur(oeuvre_id);
create index if not exists idx_abonnements_artiste on public.abonnements(artiste_id);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Activer RLS sur toutes les tables
alter table public.profils enable row level security;
alter table public.oeuvres enable row level security;
alter table public.commentaires enable row level security;
alter table public.coups_de_coeur enable row level security;
alter table public.abonnements enable row level security;

-- PROFILS : tout le monde peut lire, seul l'utilisateur peut modifier son profil
create policy "Profils visibles par tous"
  on public.profils for select
  using (true);

create policy "Chacun peut créer son profil"
  on public.profils for insert
  with check (auth.uid() = id);

create policy "Chacun peut modifier son profil"
  on public.profils for update
  using (auth.uid() = id);

-- OEUVRES : tout le monde peut lire, seul l'artiste peut créer/modifier/supprimer
create policy "Œuvres visibles par tous"
  on public.oeuvres for select
  using (true);

create policy "Un artiste peut ajouter ses œuvres"
  on public.oeuvres for insert
  with check (auth.uid() = artiste_id);

create policy "Un artiste peut modifier ses œuvres"
  on public.oeuvres for update
  using (auth.uid() = artiste_id);

create policy "Un artiste peut supprimer ses œuvres"
  on public.oeuvres for delete
  using (auth.uid() = artiste_id);

-- COMMENTAIRES : tout le monde peut lire, seul l'auteur peut créer/modifier/supprimer
create policy "Commentaires visibles par tous"
  on public.commentaires for select
  using (true);

create policy "Un utilisateur connecté peut commenter"
  on public.commentaires for insert
  with check (auth.uid() = auteur_id);

create policy "Un auteur peut modifier son commentaire"
  on public.commentaires for update
  using (auth.uid() = auteur_id);

create policy "Un auteur peut supprimer son commentaire"
  on public.commentaires for delete
  using (auth.uid() = auteur_id);

-- COUPS DE CŒUR : tout le monde peut lire, seul l'utilisateur peut liker
create policy "Coups de cœur visibles par tous"
  on public.coups_de_coeur for select
  using (true);

create policy "Un utilisateur connecté peut liker"
  on public.coups_de_coeur for insert
  with check (auth.uid() = utilisateur_id);

create policy "Un utilisateur peut retirer son like"
  on public.coups_de_coeur for delete
  using (auth.uid() = utilisateur_id);

-- ABONNEMENTS : tout le monde peut lire, seul l'utilisateur peut s'abonner
create policy "Abonnements visibles par tous"
  on public.abonnements for select
  using (true);

create policy "Un utilisateur connecté peut s'abonner"
  on public.abonnements for insert
  with check (auth.uid() = abonne_id);

create policy "Un utilisateur peut se désabonner"
  on public.abonnements for delete
  using (auth.uid() = abonne_id);

-- ============================================
-- STORAGE : buckets pour les images
-- ============================================

-- Bucket pour les photos de profil
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

-- Bucket pour les images d'œuvres
insert into storage.buckets (id, name, public)
values ('oeuvres', 'oeuvres', true)
on conflict (id) do nothing;

-- Politiques de stockage : tout le monde peut lire
create policy "Avatars publics"
  on storage.objects for select
  using (bucket_id = 'avatars');

create policy "Œuvres publiques"
  on storage.objects for select
  using (bucket_id = 'oeuvres');

-- Seuls les utilisateurs connectés peuvent uploader
create policy "Upload avatar"
  on storage.objects for insert
  with check (bucket_id = 'avatars' and auth.role() = 'authenticated');

create policy "Upload œuvre"
  on storage.objects for insert
  with check (bucket_id = 'oeuvres' and auth.role() = 'authenticated');

-- ============================================
-- TRIGGER : créer un profil automatiquement à l'inscription
-- ============================================

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profils (id, nom_complet)
  values (new.id, coalesce(new.raw_user_meta_data->>'nom_complet', 'Artiste'));
  return new;
end;
$$;

-- Déclencher à chaque nouvelle inscription
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();