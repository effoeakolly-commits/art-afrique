# N'KORA — Plateforme d'Art Africain & Galeries d'Artistes (Frontend)

Bienvenue sur le projet frontend officiel de **N'KORA** (*L'art africain, autrement*).
Ce projet est une application web haute fidélité développée avec **React 18**, **TypeScript**, **Tailwind CSS**, **Lucide Icons** et **Audio Synthétisé Kora**.

---

## 🌟 FONCTIONNALITÉS PRINCIPALES

1. **Page d'Accueil** :
   - Hero Banner avec carrousel d'œuvres d'exception.
   - Section **« Œuvres en vedette »** (4 pièces maîtresses avec likes, dates, prix FCFA et pays).
   - Section Maître Artisan & Philosophie des 21 cordes.
   - Pavillons 3D et Expositions Virtuelles interactives.
   - Bandeau de réassurance (*Authenticité, Artistes talentueux, Paiement sécurisé, Livraison fiable*).
   - Formulaire d'abonnement à la communauté avec motif géométrique texturé.
2. **Page Catalogue** :
   - Sidebar de filtres repliables (Catégories, Artistes, Slider de prix 0 à 5M FCFA, Pays).
   - Grille 3 colonnes responsive avec tri et pagination dynamique.
3. **Page Détail de l'Œuvre** :
   - 4 vignettes empilées à gauche + grand affichage haute résolution.
   - Métadonnées complètes (matériau, dimensions, origine, certificat).
   - Boutons **« Ajouter au panier »** et **« Acheter maintenant »**.
   - Onglets descriptifs (Description, Détails, Livraison, Retour).
4. **Panier d'Achats & Tunnel de Commande** :
   - Tiroir de panier avec compteur en temps réel sur la Navbar.
   - Récapitulatif du total en FCFA et certificat inclus.
   - Modal de paiement multi-options (*Wave, Orange Money, MTN MoMo, Carte Bancaire, Virement*).
5. **Page Artistes & Profil Artiste** :
   - Liste des artistes avec recherche et filtrage par spécialité et pays.
   - Page de profil individuelle avec bannière d'atelier, statistiques, bio, œuvres associées et formulaire de contact.
6. **Tableau de Bord Artiste (Backoffice)** :
   - Sidebar sombre personnalisée avec le logo N'KORA.
   - Métriques clés (œuvres publiées, commandes, messages, chiffre d'affaires).
   - Tableau des commandes récentes avec statuts de livraison.
   - Graphique de performance des ventes sur 30 jours.
7. **Page « À propos »** :
   - Mise en majesté du grand logo officiel sans cadre.
   - Présentation de la Kora, des 21 cordes et des 4 Piliers Fondateurs.
8. **Modals d'Authentification** :
   - Connexion & Inscription Artiste au design soigné.

---

## 📁 STRUCTURE DES DOSSIERS

```
├── public/                     # Fichiers statiques et images
│   └── images/                 # Galerie des photos d'art africain et masques
├── src/
│   ├── assets/
│   │   └── images/             # Images haute définition importées
│   ├── components/             # Composants React modulaires
│   │   ├── AboutSection.tsx            # Page À propos avec grand logo maître
│   │   ├── AcquisitionModal.tsx        # Tunnel de paiement sécurisé sous séquestre
│   │   ├── ArtistDashboard.tsx         # Tableau de bord complet de l'artiste
│   │   ├── ArtistProfilePage.tsx       # Profil individuel d'artiste
│   │   ├── ArtistsPage.tsx             # Annuaire des artistes
│   │   ├── ArtworkDetailPage.tsx       # Page de détails de l'œuvre
│   │   ├── AuthModal.tsx               # Pop-up connexion et inscription artiste
│   │   ├── CartModal.tsx               # Tiroir du panier d'achat
│   │   ├── CatalogSection.tsx          # Page et grille catalogue avec filtres
│   │   ├── ExpositionsSection.tsx      # Expositions virtuelles 3D
│   │   ├── Footer.tsx                  # Pied de page
│   │   ├── HeroBanner.tsx              # Carrousel hero d'accueil
│   │   ├── HomeFeaturedArtworks.tsx    # Section 4 œuvres en vedette
│   │   ├── HomeTrustAndNewsletter.tsx  # Bandeau réassurance et newsletter
│   │   ├── Logo.tsx                    # Composant logo N'KORA officiel
│   │   └── Navbar.tsx                  # Barre de navigation avec son Kora & Panier
│   ├── data/
│   │   └── mockData.ts         # Données d'exemple typées (œuvres, artistes)
│   ├── utils/
│   │   └── koraAudio.ts        # Synthétiseur audio Web Audio API pour la mélodie Kora
│   ├── App.tsx                 # Routeur d'état central de l'application
│   ├── index.css               # Feuilles de style Tailwind CSS
│   ├── main.tsx                # Point d'entrée React
│   └── types.ts                # Interfaces TypeScript strictes
├── BACKEND_SPECIFICATIONS.md   # Spécifications exhaustives de l'API Backend pour IA
├── package.json
└── vite.config.ts
```

---

## 🚀 INSTALLATION & DÉMARRAGE LOCAL

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer le serveur de développement Vite
npm run dev

# 3. Compiler pour la production
npm run build
```

---

## 💡 INTÉGRATION AVEC LE BACKEND

Consultez le fichier `BACKEND_SPECIFICATIONS.md` pour le schéma complet de la base de données SQL/NoSQL et la liste de tous les endpoints REST à implémenter.
