-- ============================================
-- FIX : créer l'artiste manquant pour akollymarius@gmail.com
-- ============================================

-- Ajouter une contrainte unique sur user_id pour permettre ON CONFLICT
alter table public.artists add constraint artists_user_id_key unique (user_id);

-- Créer l'artiste pour l'utilisateur existant qui n'en avait pas
insert into public.artists (user_id, display_name, country, city, is_approved)
select 
  p.id,
  coalesce(p.first_name || ' ' || p.last_name, p.first_name, 'Artiste'),
  coalesce(p.country, 'Togo'),
  'Lomé',
  true
from public.profiles p
where p.id = '3e718f6b-f328-49bc-bdba-32c9e9df23c4'
  and not exists (select 1 from public.artists a where a.user_id = p.id);

-- Mettre à jour le rôle du profil existant
update public.profiles 
set role = 'artist', is_verified = true
where id = '3e718f6b-f328-49bc-bdba-32c9e9df23c4';

-- ============================================
-- METTRE À JOUR LES ARTISTES DE TEST
-- ============================================

-- Mettre à jour les profils collector existants en artistes
update public.profiles set role = 'artist', is_verified = true
where id in (
  'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
  'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
  'cccccccc-cccc-4ccc-8ccc-cccccccccccc'
);

-- Artiste test 1 : Aïcha Konaté (Mali) - user_id aaaaaaaa
insert into public.artists (
  user_id, display_name, bio, disciplines, materials, country, city,
  profile_image_url, experience_level, style, is_approved, is_verified_master
) values (
  'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
  'Aïcha Konaté',
  'Artiste textile malienne, je tisse des histoires à travers le bogolan et les teintures naturelles. Mon travail explore la mémoire, l''identité et la transmission des savoirs ancestraux.',
  array['Art Textile', 'Peinture'],
  array['Coton', 'Teintures naturelles', 'Bogolan'],
  'Mali',
  'Bamako',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces&q=80',
  'Confirmé',
  'Contemporain',
  true,
  true
) on conflict (user_id) do update set
  display_name = excluded.display_name,
  bio = excluded.bio,
  disciplines = excluded.disciplines,
  materials = excluded.materials,
  country = excluded.country,
  city = excluded.city,
  profile_image_url = excluded.profile_image_url,
  experience_level = excluded.experience_level,
  style = excluded.style,
  is_approved = true,
  is_verified_master = excluded.is_verified_master;

-- Artiste test 2 : Jean-Marc Soglio (Bénin) - user_id bbbbbbbb
insert into public.artists (
  user_id, display_name, bio, disciplines, materials, country, city,
  profile_image_url, experience_level, style, is_approved, is_verified_master
) values (
  'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
  'Jean-Marc Soglio',
  'Sculpteur béninois, je travaille le bronze et le bois pour donner vie à des figures qui interrogent notre rapport au sacré et à la modernité.',
  array['Sculpture'],
  array['Bronze', 'Bois', 'Fer'],
  'Bénin',
  'Cotonou',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces&q=80',
  'Maître',
  'Traditionnel',
  true,
  true
) on conflict (user_id) do update set
  display_name = excluded.display_name,
  bio = excluded.bio,
  disciplines = excluded.disciplines,
  materials = excluded.materials,
  country = excluded.country,
  city = excluded.city,
  profile_image_url = excluded.profile_image_url,
  experience_level = excluded.experience_level,
  style = excluded.style,
  is_approved = true,
  is_verified_master = excluded.is_verified_master;

-- Artiste test 3 : Awa Diallo (Sénégal) - user_id cccccccc
insert into public.artists (
  user_id, display_name, bio, disciplines, materials, country, city,
  profile_image_url, experience_level, style, is_approved, is_verified_master
) values (
  'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
  'Awa Diallo',
  'Photographe sénégalaise, je capture l''âme de Dakar à travers des portraits intimes et des scènes de rue vibrantes. Ma pratique documente la vie quotidienne et la culture urbaine.',
  array['Photographie'],
  array['Photographie argentique', 'Photographie numérique'],
  'Sénégal',
  'Dakar',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=faces&q=80',
  'Émergent',
  'Documentaire',
  true,
  false
) on conflict (user_id) do update set
  display_name = excluded.display_name,
  bio = excluded.bio,
  disciplines = excluded.disciplines,
  materials = excluded.materials,
  country = excluded.country,
  city = excluded.city,
  profile_image_url = excluded.profile_image_url,
  experience_level = excluded.experience_level,
  style = excluded.style,
  is_approved = true,
  is_verified_master = excluded.is_verified_master;

-- Artiste test 4 : Kwame Mensah (Ghana) - user_id 44b8ca44
insert into public.artists (
  user_id, display_name, bio, disciplines, materials, country, city,
  profile_image_url, experience_level, style, is_approved, is_verified_master
) values (
  '44b8ca44-0fa7-41b6-b1cb-7c085bfe8a62',
  'Kwame Mensah',
  'Peintre ghanéen, mes toiles mêlent symboles adinkra et abstraction contemporaine pour créer un dialogue entre tradition et modernité.',
  array['Peinture'],
  array['Acrylique', 'Huile', 'Pigments naturels'],
  'Ghana',
  'Accra',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces&q=80',
  'Confirmé',
  'Abstrait',
  true,
  true
) on conflict (user_id) do update set
  display_name = excluded.display_name,
  bio = excluded.bio,
  disciplines = excluded.disciplines,
  materials = excluded.materials,
  country = excluded.country,
  city = excluded.city,
  profile_image_url = excluded.profile_image_url,
  experience_level = excluded.experience_level,
  style = excluded.style,
  is_approved = true,
  is_verified_master = excluded.is_verified_master;

-- Artiste test 5 : Fatou Ndiaye (Sénégal) - user_id eeeeeeee
insert into public.artists (
  user_id, display_name, bio, disciplines, materials, country, city,
  profile_image_url, experience_level, style, is_approved, is_verified_master
) values (
  'eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee',
  'Fatou Ndiaye',
  'Céramiste sénégalaise, je façonne la terre pour créer des pièces uniques qui allient fonctionnalité et expression artistique. Mes œuvres célèbrent la beauté des formes organiques.',
  array['Céramique'],
  array['Argile', 'Émail', 'Terre cuite'],
  'Sénégal',
  'Saint-Louis',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=faces&q=80',
  'Émergent',
  'Organique',
  true,
  false
) on conflict (user_id) do update set
  display_name = excluded.display_name,
  bio = excluded.bio,
  disciplines = excluded.disciplines,
  materials = excluded.materials,
  country = excluded.country,
  city = excluded.city,
  profile_image_url = excluded.profile_image_url,
  experience_level = excluded.experience_level,
  style = excluded.style,
  is_approved = true,
  is_verified_master = excluded.is_verified_master;