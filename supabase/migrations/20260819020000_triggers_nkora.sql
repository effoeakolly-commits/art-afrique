-- ============================================
-- N'KORA : Triggers & Fonctions automatiques
-- ============================================

-- 1. Créer un profil automatiquement à l'inscription
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, first_name, last_name, country, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'first_name', split_part(coalesce(new.raw_user_meta_data->>'nom_complet', new.email), ' ', 1)),
    coalesce(new.raw_user_meta_data->>'last_name', null),
    coalesce(new.raw_user_meta_data->>'country', null),
    coalesce(new.raw_user_meta_data->>'role', 'collector')
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 2. Mettre à jour updated_at automatiquement
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
  for each row execute function public.handle_updated_at();

drop trigger if exists set_updated_at_artworks on public.artworks;
create trigger set_updated_at_artworks
  before update on public.artworks
  for each row execute function public.handle_updated_at();

-- 3. Incrémenter le compteur de likes sur les œuvres
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

-- 4. Incrémenter le compteur de followers sur les artistes
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

-- 5. Générer un numéro de commande unique (NK-2026-XXXX)
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