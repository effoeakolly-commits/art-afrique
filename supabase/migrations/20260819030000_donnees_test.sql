-- ============================================
-- N'KORA : Données de test demo (schéma nkora)
-- À exécuter une seule fois sur une base vide.
-- Placé APRÈS la migration triggers (02h) : les tables existent déjà.
-- ============================================

-- 1. Artiste principal existant (ariso KAPALA — 72ee...)
UPDATE public.profiles
SET
  first_name = 'Ariso',
  last_name = 'KAPALA',
  country = 'Togo',
  avatar_url = 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=400&h=400&fit=crop&crop=faces&q=80',
  is_verified = true,
  is_active = true
WHERE id = '72ee0490-753f-4e9c-9e42-5607e9097cae';

-- 2. Profil artiste pour ariso (id connu pour les FK artworks)
INSERT INTO public.artists (
  id, user_id, display_name, bio, country, city,
  banner_url, profile_image_url, is_verified_master, is_approved
) VALUES (
  'a1a1a1a1-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
  '72ee0490-753f-4e9c-9e42-5607e9097cae',
  'Ariso KAPALA',
  E'Peintre togolais dont les toiles vibrantes célèbrent les masques et traditions de l''Afrique de l''Ouest. Exposé lors de la Biennale de Lomé 2023.',
  'Togo',
  'Lomé',
  'https://images.unsplash.com/photo-1500467988314-ed7e1f0fff32?w=1600&h=400&fit=crop&q=80',
  'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=400&h=400&fit=crop&crop=faces&q=80',
  true, true
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  profile_image_url = EXCLUDED.profile_image_url;

-- 3. Créer des utilisateurs fictifs (trigger handle_new_user crée leurs profiles)
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at)
VALUES
  ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'amandine.koffi@test.artafrique', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', now(), '{"provider":"email","providers":["email"]}', '{"first_name":"Amandine","last_name":"Koffi","country":"Côte d''Ivoire","role":"collector"}', now(), now()),
  ('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'awa.sangare@test.artafrique', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', now(), '{"provider":"email","providers":["email"]}', '{"first_name":"Awa","last_name":"Sangare","country":"Mali","role":"collector"}', now(), now()),
  ('cccccccc-cccc-4ccc-8ccc-cccccccccccc', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'jean-marc.ouedraogo@test.artafrique', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', now(), '{"provider":"email","providers":["email"]}', '{"first_name":"Jean-Marc","last_name":"Ouedraogo","country":"Burkina Faso","role":"collector"}', now(), now())
ON CONFLICT (id) DO NOTHING;

-- 4. Enrichir les profiles des nouveaux utilisateurs
UPDATE public.profiles SET
  avatar_url = 'https://images.unsplash.com/photo-1607728643703-46c94895d399?w=400&h=400&fit=crop&crop=faces&q=80',
  is_verified = true,
  is_active = true
WHERE id IN ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', 'cccccccc-cccc-4ccc-8ccc-cccccccccccc')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.profiles (id, first_name, last_name, country, avatar_url, role, is_verified, is_active)
VALUES
  ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', 'Amandine', 'Koffi', 'Côte d''Ivoire', 'https://images.unsplash.com/photo-1607728643703-46c94895d399?w=400&h=400&fit=crop&crop=faces&q=80', 'collector', true, true),
  ('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', 'Awa', 'Sangare', 'Mali', 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=400&h=400&fit=crop&crop=faces&q=80', 'collector', true, true),
  ('cccccccc-cccc-4ccc-8ccc-cccccccccccc', 'Jean-Marc', 'Ouedraogo', 'Burkina Faso', 'https://images.unsplash.com/photo-1507003213389-7f6aadb3a6b6?w=400&h=400&fit=crop&crop=faces&q=80', 'collector', true, true)
ON CONFLICT (id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  last_name = EXCLUDED.last_name,
  country = EXCLUDED.country,
  avatar_url = EXCLUDED.avatar_url;

-- 5. Œuvres de l'artiste (artist_id = artists.id connu)
INSERT INTO public.artworks (id, artist_id, title, slug, description, category, medium, dimensions, year, origin_country, price_fcfa, stock_quantity, is_available, is_published, featured_home, primary_image_url, created_at)
VALUES
  ('d1111111-1111-4111-8111-111111111111', 'a1a1a1a1-aaaa-4aaa-8aaa-aaaaaaaaaaaa', 'Dansseuse aux calebasses', 'danseuse-aux-calebasses', E'Huile sur toile. Une célébration colorée du rythme communautaire togolais.', 'Peinture', 'Huile sur toile', '80 x 60 cm', 2023, 'Togo', 850000, 1, true, true, true, 'https://images.unsplash.com/photo-1500467988314-ed7e1f0fff32?w=1600&h=1200&fit=crop&q=80', '2026-08-07'),
  ('d2222222-2222-4222-8222-222222222222', 'a1a1a1a1-aaaa-4aaa-8aaa-aaaaaaaaaaaa', 'Masque du sablier', 'masque-du-sablier', E'Sculpture en bois de wawa. Symbolise le temps qui file et la sagesse des ancêtres.', 'Sculpture', 'Bois de wawa', '35 x 20 x 15 cm', 2024, 'Togo', 620000, 1, true, true, false, 'https://images.unsplash.com/photo-1500467988314-ed7e1f0fff32?w=1200&h=1600&fit=crop&q=80', '2026-08-10'),
  ('d3333333-3333-4333-8333-333333333333', 'a1a1a1a1-aaaa-4aaa-8aaa-aaaaaaaaaaaa', 'Mémoire d''or', 'memoire-d-or', E'Art textile. Broderie dorée sur fond de pagne, hommage aux trésors numismatiques.', 'Art Textile', 'Broderie sur pagne', '70 x 90 cm', 2025, 'Sénégal', 1350000, 1, true, false, false, 'https://images.unsplash.com/photo-1500467988314-ed7e1f0fff32?w=1200&h=800&fit=crop&q=80', '2026-08-01')
ON CONFLICT (id) DO NOTHING;

-- Images additionnelles des œuvres
INSERT INTO public.artwork_images (id, artwork_id, url, position)
VALUES
  ('e1111111-1111-4111-8111-111111111111', 'd1111111-1111-4111-8111-111111111111', 'https://images.unsplash.com/photo-1500467988314-ed7e1f0fff32?w=800&h=600&fit=crop&q=80', 1)
ON CONFLICT DO NOTHING;

-- 6. Coups de cœur (likes_count auto-incrémenté par le trigger)
INSERT INTO public.artwork_likes (id, artwork_id, user_id)
VALUES
  ('f1111111-1111-4111-8111-111111111111', 'd1111111-1111-4111-8111-111111111111', 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa'),
  ('f2222222-2222-4222-8222-222222222222', 'd1111111-1111-4111-8111-111111111111', 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb'),
  ('f3333333-3333-4333-8333-333333333333', 'd2222222-2222-4222-8222-222222222222', 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa'),
  ('f4444444-4444-4444-8444-444444444444', 'd2222222-2222-4222-8222-222222222222', 'cccccccc-cccc-4ccc-8ccc-cccccccccccc')
ON CONFLICT DO NOTHING;

-- 7. Commentaires
INSERT INTO public.comments (id, artwork_id, author_id, content)
VALUES
  ('comment-001', 'd1111111-1111-4111-8111-111111111111', 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', E'Quelle puissance dans les couleurs ! Bravo.'),
  ('comment-002', 'd1111111-1111-4111-8111-111111111111', 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', E'Superbe dynamisme, on sent la musique.'),
  ('comment-003', 'd2222222-2222-4222-8222-222222222222', 'cccccccc-cccc-4ccc-8ccc-cccccccccccc', E'Le wawa rend bien, très belle matière.')
ON CONFLICT (id) DO NOTHING;

-- 8. Abonnements (follows : followers_count auto-incrémenté)
INSERT INTO public.follows (id, follower_id, artist_id)
VALUES
  ('g1111111-1111-4111-8111-111111111111', 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', 'a1a1a1a1-aaaa-4aaa-8aaa-aaaaaaaaaaaa'),
  ('g2222222-2222-4222-8222-222222222222', 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', 'a1a1a1a1-aaaa-4aaa-8aaa-aaaaaaaaaaaa'),
  ('g3333333-3333-4333-8333-333333333333', 'cccccccc-cccc-4ccc-8ccc-cccccccccccc', 'a1a1a1a1-aaaa-4aaa-8aaa-aaaaaaaaaaaa')
ON CONFLICT (id) DO NOTHING;

-- 9. Newsletter
INSERT INTO public.newsletter_subscribers (id, email, is_active)
VALUES
  ('h1111111-1111-4111-8111-111111111111', 'awa.sangare@test.artafrique', true)
ON CONFLICT (email) DO UPDATE SET is_active = true;
