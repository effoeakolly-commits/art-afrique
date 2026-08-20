# N'KORA — L'art africain, autrement

Plateforme dédiée aux arts africains contemporains et traditionnels : galeries virtuelles, expositions immersives 3D et ateliers d'artistes.

## ✨ Fonctionnalités

- **Découverte d'œuvres** : grille masonry style Pinterest avec filtres par catégorie et pays
- **Recherche** : par titre ou description
- **Profils artistes** : bio, pays, photo de profil, œuvres publiées
- **Publication d'œuvres** : upload d'image, description, catégorie, vidéo YouTube du processus créatif
- **Coups de cœur** : système de likes sur chaque œuvre
- **Commentaires** : discussion sur chaque œuvre
- **Abonnements** : suivre ses artistes préférés
- **Tableau de bord** : statistiques (œuvres, coups de cœur, abonnés), gestion du profil et des œuvres
- **Authentification** : inscription, connexion, déconnexion avec Supabase Auth
- **Expositions virtuelles** : galeries immersives, rétrospectives
- **Panier** : acquisition d'œuvres avec séquestre (escrow)

## 🚀 Démarrage rapide

### Prérequis

- Node.js 18+
- Un projet [Supabase](https://supabase.com) (gratuit)

### Installation

```bash
# 1. Cloner le projet
git clone <votre-repo>
cd nkora

# 2. Installer les dépendances
npm install

# 3. Configurer les variables d'environnement
cp .env.local.example .env.local
# Remplir avec vos clés Supabase

# 4. Lancer le serveur de développement
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000).

### Configuration Supabase

1. Créez un projet sur [supabase.com](https://supabase.com)
2. Dans **Project Settings → API**, copiez :
   - `NEXT_PUBLIC_SUPABASE_URL` → l'URL du projet
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` → la clé anon publique
3. Dans **SQL Editor**, exécutez les migrations dans `supabase/migrations/` pour créer :
   - Les tables (`profiles`, `artists`, `artworks`, `comments`, `artwork_likes`, `follows`, etc.)
   - Les politiques de sécurité (RLS)
   - Les buckets de stockage (`avatars`, `artworks`, `banners`)
   - Le trigger de création automatique de profil à l'inscription

## 🗂️ Structure du projet

```
nkora/
├── app/
│   ├── artistes/[id]/     → Page profil artiste
│   ├── connexion/         → Page de connexion
│   ├── inscription/       → Page d'inscription
│   ├── oeuvres/[slug]/    → Page détail d'une œuvre
│   ├── catalogue/         → Catalogue avec filtres
│   ├── expositions/       → Expositions virtuelles
│   ├── tableau-de-bord/   → Tableau de bord artiste
│   ├── layout.tsx         → Layout racine
│   ├── not-found.tsx      → Page 404 personnalisée
│   └── page.tsx           → Page d'accueil
├── components/
│   ├── public/            → Composants publics (HeroBanner, OeuvreCard, FiltresCatalogue)
│   ├── Navbar.tsx         → Barre de navigation avec sélecteur de langue et audio Kora
│   ├── Footer.tsx         → Pied de page
│   ├── CartModal.tsx      → Modale panier
│   ├── Logo.tsx           → Logo N'KORA (principal et sceau)
│   └── ...
├── lib/
│   ├── actions.ts         → Server Actions (auth, profil, œuvres, likes, abonnements)
│   ├── types.ts           → Types TypeScript et constantes
│   └── supabase/
│       ├── client.ts      → Client Supabase navigateur
│       └── server.ts      → Client Supabase serveur
├── supabase/
│   └── migrations/        → Migrations SQL (schéma, RLS, triggers, données test)
├── proxy.ts               → Middleware (protection des routes, session)
└── package.json
```

## 🛠️ Stack technique

- **[Next.js 16](https://nextjs.org)** — Framework React (App Router, Server Components, Server Actions)
- **[Supabase](https://supabase.com)** — Backend as a Service (Auth, PostgreSQL, Storage, RLS)
- **[Tailwind CSS 4](https://tailwindcss.com)** — Styling
- **[TypeScript](https://www.typescriptlang.org)** — Typage statique
- **[Zustand](https://zustand-demo.pmnd.rs)** — State management (panier)
- **[Zod](https://zod.dev)** — Validation

## 📝 Scripts disponibles

```bash
npm run dev      # Serveur de développement
npm run build    # Build de production
npm run start    # Serveur de production
npm run lint     # Linting ESLint
```

## 🔒 Sécurité

- **Row Level Security (RLS)** activé sur toutes les tables
- Chaque utilisateur ne peut modifier que son propre profil et ses œuvres
- Les coups de cœur et abonnements sont uniques (contrainte `unique`)
- Les routes du tableau de bord sont protégées par le middleware
- Les fichiers uploadés sont stockés dans des buckets publics avec politiques d'upload restreintes

## 🌍 Déploiement

Le plus simple est de déployer sur [Vercel](https://vercel.com) :

```bash
npm run build
```

Ou connectez votre repo GitHub à Vercel et configurez les variables d'environnement.

## 📄 Licence

MIT