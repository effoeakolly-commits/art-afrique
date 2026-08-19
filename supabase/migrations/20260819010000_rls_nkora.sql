-- ============================================
-- N'KORA : Row Level Security (RLS)
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

-- ============================================
-- PROFILES
-- ============================================
drop policy if exists "Profiles visibles par tous" on public.profiles;
drop policy if exists "Chacun peut créer son profil" on public.profiles;
drop policy if exists "Chacun peut modifier son profil" on public.profiles;

create policy "Profiles visibles par tous" on public.profiles for select using (true);
create policy "Chacun peut créer son profil" on public.profiles for insert with check (auth.uid() = id);
create policy "Chacun peut modifier son profil" on public.profiles for update using (auth.uid() = id);

-- ============================================
-- ARTISTS
-- ============================================
drop policy if exists "Artists publics approuvés" on public.artists;
drop policy if exists "Artiste crée son profil" on public.artists;
drop policy if exists "Artiste modifie son profil" on public.artists;
drop policy if exists "Admin gère artistes" on public.artists;

create policy "Artists publics approuvés" on public.artists for select using (is_approved = true or auth.uid() = user_id);
create policy "Artiste crée son profil" on public.artists for insert with check (auth.uid() = user_id);
create policy "Artiste modifie son profil" on public.artists for update using (auth.uid() = user_id);
create policy "Admin gère artistes" on public.artists for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- ============================================
-- ARTWORKS
-- ============================================
drop policy if exists "Œuvres publiées visibles par tous" on public.artworks;
drop policy if exists "Artiste ajoute ses œuvres" on public.artworks;
drop policy if exists "Artiste modifie ses œuvres" on public.artworks;
drop policy if exists "Artiste supprime ses œuvres" on public.artworks;
drop policy if exists "Admin gère œuvres" on public.artworks;

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

-- ============================================
-- ARTWORK IMAGES
-- ============================================
drop policy if exists "Images visibles par tous" on public.artwork_images;
drop policy if exists "Artiste ajoute images" on public.artwork_images;
drop policy if exists "Artiste supprime images" on public.artwork_images;

create policy "Images visibles par tous" on public.artwork_images for select using (true);
create policy "Artiste ajoute images" on public.artwork_images for insert with check (
  auth.uid() = (select a.user_id from public.artworks w join public.artists a on a.id = w.artist_id where w.id = artwork_id)
);
create policy "Artiste supprime images" on public.artwork_images for delete using (
  auth.uid() = (select a.user_id from public.artworks w join public.artists a on a.id = w.artist_id where w.id = artwork_id)
);

-- ============================================
-- ARTWORK LIKES
-- ============================================
drop policy if exists "Likes visibles par tous" on public.artwork_likes;
drop policy if exists "Utilisateur connecté peut liker" on public.artwork_likes;
drop policy if exists "Utilisateur peut retirer son like" on public.artwork_likes;

create policy "Likes visibles par tous" on public.artwork_likes for select using (true);
create policy "Utilisateur connecté peut liker" on public.artwork_likes for insert with check (auth.uid() = user_id);
create policy "Utilisateur peut retirer son like" on public.artwork_likes for delete using (auth.uid() = user_id);

-- ============================================
-- FOLLOWS
-- ============================================
drop policy if exists "Follows visibles par tous" on public.follows;
drop policy if exists "Utilisateur peut suivre" on public.follows;
drop policy if exists "Utilisateur peut se désabonner" on public.follows;

create policy "Follows visibles par tous" on public.follows for select using (true);
create policy "Utilisateur peut suivre" on public.follows for insert with check (auth.uid() = follower_id);
create policy "Utilisateur peut se désabonner" on public.follows for delete using (auth.uid() = follower_id);

-- ============================================
-- COMMENTS
-- ============================================
drop policy if exists "Commentaires visibles par tous" on public.comments;
drop policy if exists "Utilisateur peut commenter" on public.comments;
drop policy if exists "Auteur modifie son commentaire" on public.comments;
drop policy if exists "Auteur supprime son commentaire" on public.comments;

create policy "Commentaires visibles par tous" on public.comments for select using (true);
create policy "Utilisateur peut commenter" on public.comments for insert with check (auth.uid() = author_id);
create policy "Auteur modifie son commentaire" on public.comments for update using (auth.uid() = author_id);
create policy "Auteur supprime son commentaire" on public.comments for delete using (auth.uid() = author_id);

-- ============================================
-- CONTACT MESSAGES
-- ============================================
drop policy if exists "Artiste voit ses messages" on public.contact_messages;
drop policy if exists "Visiteur peut envoyer message" on public.contact_messages;

create policy "Artiste voit ses messages" on public.contact_messages for select using (
  auth.uid() = (select user_id from public.artists where id = artist_id)
);
create policy "Visiteur peut envoyer message" on public.contact_messages for insert with check (true);

-- ============================================
-- CART ITEMS
-- ============================================
drop policy if exists "Utilisateur voit son panier" on public.cart_items;
drop policy if exists "Utilisateur ajoute au panier" on public.cart_items;
drop policy if exists "Utilisateur modifie son panier" on public.cart_items;
drop policy if exists "Utilisateur supprime du panier" on public.cart_items;

create policy "Utilisateur voit son panier" on public.cart_items for select using (auth.uid() = user_id);
create policy "Utilisateur ajoute au panier" on public.cart_items for insert with check (auth.uid() = user_id);
create policy "Utilisateur modifie son panier" on public.cart_items for update using (auth.uid() = user_id);
create policy "Utilisateur supprime du panier" on public.cart_items for delete using (auth.uid() = user_id);

-- ============================================
-- ORDERS
-- ============================================
drop policy if exists "Acheteur voit ses commandes" on public.orders;
drop policy if exists "Artiste voit ses commandes" on public.orders;
drop policy if exists "Acheteur crée commande" on public.orders;
drop policy if exists "Admin gère commandes" on public.orders;

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

-- ============================================
-- ORDER ITEMS
-- ============================================
drop policy if exists "Acheteur voit ses lignes" on public.order_items;
drop policy if exists "Artiste voit ses lignes" on public.order_items;
drop policy if exists "Acheteur crée lignes" on public.order_items;
drop policy if exists "Admin gère lignes" on public.order_items;

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

-- ============================================
-- PAYMENTS
-- ============================================
drop policy if exists "Acheteur voit ses paiements" on public.payments;
drop policy if exists "Admin gère paiements" on public.payments;

create policy "Acheteur voit ses paiements" on public.payments for select using (
  auth.uid() = (select buyer_id from public.orders where id = order_id)
);
create policy "Admin gère paiements" on public.payments for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- ============================================
-- ESCROW TRANSACTIONS
-- ============================================
drop policy if exists "Acheteur voit séquestre" on public.escrow_transactions;
drop policy if exists "Admin gère séquestre" on public.escrow_transactions;

create policy "Acheteur voit séquestre" on public.escrow_transactions for select using (
  auth.uid() = (select buyer_id from public.orders where id = order_id)
);
create policy "Admin gère séquestre" on public.escrow_transactions for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- ============================================
-- EXHIBITIONS
-- ============================================
drop policy if exists "Expositions visibles par tous" on public.exhibitions;
drop policy if exists "Admin gère expositions" on public.exhibitions;

create policy "Expositions visibles par tous" on public.exhibitions for select using (is_active = true);
create policy "Admin gère expositions" on public.exhibitions for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- ============================================
-- EXHIBITION ARTWORKS
-- ============================================
drop policy if exists "Liaisons visibles" on public.exhibition_artworks;
drop policy if exists "Admin gère liaisons" on public.exhibition_artworks;

create policy "Liaisons visibles" on public.exhibition_artworks for select using (true);
create policy "Admin gère liaisons" on public.exhibition_artworks for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- ============================================
-- NEWSLETTER SUBSCRIBERS
-- ============================================
drop policy if exists "Inscription newsletter publique" on public.newsletter_subscribers;
drop policy if exists "Admin gère abonnés" on public.newsletter_subscribers;

create policy "Inscription newsletter publique" on public.newsletter_subscribers for insert with check (true);
create policy "Admin gère abonnés" on public.newsletter_subscribers for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- ============================================
-- APPOINTMENTS
-- ============================================
drop policy if exists "Visiteur crée RDV" on public.appointments;
drop policy if exists "Artiste voit ses RDV" on public.appointments;
drop policy if exists "Admin gère RDV" on public.appointments;

create policy "Visiteur crée RDV" on public.appointments for insert with check (true);
create policy "Artiste voit ses RDV" on public.appointments for select using (
  auth.uid() = (select user_id from public.artists where id = artist_id)
);
create policy "Admin gère RDV" on public.appointments for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- ============================================
-- NOTIFICATIONS
-- ============================================
drop policy if exists "Utilisateur voit ses notifications" on public.notifications;
drop policy if exists "Système crée notifications" on public.notifications;
drop policy if exists "Utilisateur marque lu" on public.notifications;
drop policy if exists "Utilisateur supprime notification" on public.notifications;

create policy "Utilisateur voit ses notifications" on public.notifications for select using (auth.uid() = user_id);
create policy "Système crée notifications" on public.notifications for insert with check (auth.uid() = user_id);
create policy "Utilisateur marque lu" on public.notifications for update using (auth.uid() = user_id);
create policy "Utilisateur supprime notification" on public.notifications for delete using (auth.uid() = user_id);

-- ============================================
-- STORAGE BUCKETS
-- ============================================
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('artworks', 'artworks', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('banners', 'banners', true)
on conflict (id) do nothing;

drop policy if exists "Médias publics" on storage.objects;
drop policy if exists "Upload connecté" on storage.objects;
drop policy if exists "Suppression uploader" on storage.objects;

create policy "Médias publics" on storage.objects for select using (bucket_id in ('avatars', 'artworks', 'banners'));

create policy "Upload connecté" on storage.objects for insert
with check (bucket_id in ('avatars', 'artworks', 'banners') and auth.role() = 'authenticated');

create policy "Suppression uploader" on storage.objects for delete
using (auth.role() = 'authenticated' and (storage.foldername(name))[1] = auth.uid()::text);