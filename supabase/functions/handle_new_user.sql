-- Fonction de création automatique du profil + artiste à l'inscription
-- (remplace la version du trigger existant pour créer aussi un enregistrement artists)
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