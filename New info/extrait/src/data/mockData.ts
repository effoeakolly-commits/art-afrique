import { Artwork, Artist, Exhibition } from '../types';
import maskDanImg from '../assets/images/african_royal_mask_1787130431593.jpg';
import elevationImg from '../assets/images/african_wooden_sculpture_1787143769088.jpg';
import racinesImg from '../assets/images/african_painting_canvas_1787130390056.jpg';
import materniteImg from '../assets/images/african_sculpture_maternite_1787156958511.jpg';
import guerrierImg from '../assets/images/african_sculpture_guerrier_1787156973905.jpg';
import textileBogolanImg from '../assets/images/african_textile_bogolan_1787155587717.jpg';
import ceramicPotteryImg from '../assets/images/african_ceramic_pottery_1787155618305.jpg';
import artworkRoomImg from '../assets/images/artwork_in_situ_room_1787154713594.jpg';
import heroCompositeImg from '../assets/images/vibrant_african_art_hero_1787130350152.jpg';
import heroMaskMonumentalImg from '../assets/images/hero_mask_monumental_1787141482021.jpg';

// Artist images
import koffiAvatarImg from '../assets/images/african_sculptor_koffi_1787156885532.jpg';
import awaAvatarImg from '../assets/images/african_artist_awa_1787156899001.jpg';
import josephAvatarImg from '../assets/images/african_sculptor_joseph_1787156931594.jpg';
import niaAvatarImg from '../assets/images/african_artist_nia_1787156944344.jpg';
import koffiBannerImg from '../assets/images/koffi_workshop_banner_1787156917051.jpg';

export const ARTWORKS_DATA: Artwork[] = [
  {
    id: 'art-masque-dan',
    title: 'Masque Dan',
    artistName: 'Koffi Amani',
    artistId: 'artist-koffi',
    artistAvatar: koffiAvatarImg,
    artistStudioLocation: 'Abidjan, Côte d\'Ivoire',
    category: 'Masque',
    medium: 'Bois noble, Kaolin sacré & pigments naturels',
    movement: 'Art Rituel & Sacré Dan',
    priceFcfa: 280000,
    imageUrl: maskDanImg,
    galleryImages: [maskDanImg, elevationImg, materniteImg, guerrierImg],
    year: 2023,
    origin: 'Côte d\'Ivoire',
    dimensions: '45 cm x 20 cm',
    isAvailable: true,
    isFeatured: true,
    likesCount: 248,
    dateStr: '15 août 2026',
    description: 'Ce masque traditionnel Dan symbolise la beauté, la spiritualité et la connexion avec les ancêtres. Utilisé lors des cérémonies sacrées, il incarne la sagesse et la force intérieure.',
    culturalInspiration: 'Héritage séculaire de la région montagneuse de l\'ouest ivoirien, reliant le monde visible et les bénédictions spirituelles.',
    authenticityDetails: {
      edition: 'Pièce Unique Originale (1/1)',
      origin: 'Côte d\'Ivoire (Région Dan)',
      logistics: 'Remise en main propre ou coordination directe avec l\'artiste',
      certificate: 'Certificat d\'authenticité délivré par l\'atelier Koffi Amani'
    },
    materials: ['Bois d\'iroko patiné', 'Pigments naturels de terre', 'Cire d\'abeille sauvage'],
    toolsAndMethods: ['Herminette traditionnelle', 'Polissage aux feuilles végétales'],
    curatorialReflections: [
      {
        id: 'ref-dan-1',
        author: 'Mamadou Ndiaye',
        role: 'Commissaire d\'exposition',
        date: 'Il y a 2 jours',
        content: 'La finesse des scarifications frontales et l\'équilibre des proportions en font une pièce majeure du corpus traditionnel ivoirien.'
      }
    ]
  },
  {
    id: 'art-elevation',
    title: 'Élévation',
    artistName: 'Koffi Amani',
    artistId: 'artist-koffi',
    artistAvatar: koffiAvatarImg,
    artistStudioLocation: 'Abidjan, Côte d\'Ivoire',
    category: 'Sculpture',
    medium: 'Bois d\'Ébène massif sculpté main',
    movement: 'Sculpture Contemporaine Ivoirienne',
    priceFcfa: 450000,
    imageUrl: elevationImg,
    galleryImages: [elevationImg, maskDanImg, materniteImg, artworkRoomImg],
    year: 2024,
    origin: 'Côte d\'Ivoire',
    dimensions: '58 cm x 22 cm',
    isAvailable: true,
    isFeatured: true,
    likesCount: 192,
    dateStr: '10 août 2026',
    description: 'Figure élancée taillée dans un bloc d\'ébène noble, capturant l\'aspiration humaine vers la sagesse transcendante et l\'harmonie céleste.',
    culturalInspiration: 'Inspirée par la posture des gardiens des forêts sacrées et les symboles d\'élévation spirituelle mandé.',
    authenticityDetails: {
      edition: 'Sculpture unique taillée main',
      origin: 'Côte d\'Ivoire (Abidjan)',
      logistics: 'Coordination directe et soignée avec l\'artiste',
      certificate: 'Certificat officiel d\'authenticité N\'KORA'
    },
    materials: ['Ébène noir royal', 'Huile de karité pour patine'],
    toolsAndMethods: ['Ciseau à bois', 'Gouge traditionnelle'],
    curatorialReflections: []
  },
  {
    id: 'art-racines',
    title: 'Racines',
    artistName: 'Awa Diop',
    artistId: 'artist-awa',
    artistAvatar: awaAvatarImg,
    artistStudioLocation: 'Médina, Dakar, Sénégal',
    category: 'Peinture',
    medium: 'Pigments naturels, Ocre & Acrylique sur toile de lin',
    movement: 'Modernisme & Expressionnisme Sahélien',
    priceFcfa: 330000,
    imageUrl: racinesImg,
    galleryImages: [racinesImg, artworkRoomImg],
    year: 2024,
    origin: 'Sénégal',
    dimensions: '100 cm x 80 cm',
    isAvailable: true,
    isFeatured: true,
    likesCount: 310,
    dateStr: '5 août 2026',
    description: 'Toile vibrante aux ocres chauds et aux bleus nocturnes évoquant l\'ancrage territorial et la mémoire vivante de la lignée matriarcale.',
    culturalInspiration: 'Les récits oraux des conteuses du fleuve Sénégal et la métaphore du baobab protecteur.',
    authenticityDetails: {
      edition: 'Toile originale signée',
      origin: 'Sénégal (Dakar)',
      logistics: 'Remise organisée directement avec l\'atelier d\'Awa Diop',
      certificate: 'Certificat signé par l\'artiste peintre'
    },
    materials: ['Pigments d\'ocre du Sahel', 'Liant végétal', 'Toile pure lin'],
    toolsAndMethods: ['Couteau de peinture', 'Superposition de glacis'],
    curatorialReflections: []
  },
  {
    id: 'art-maternite',
    title: 'Maternité',
    artistName: 'Koffi Amani',
    artistId: 'artist-koffi',
    artistAvatar: koffiAvatarImg,
    artistStudioLocation: 'Abidjan, Côte d\'Ivoire',
    category: 'Sculpture',
    medium: 'Bois de Teck précieux patiné au bronze',
    movement: 'Sculpture Figurative Africaine',
    priceFcfa: 260000,
    imageUrl: materniteImg,
    galleryImages: [materniteImg, elevationImg, maskDanImg, artworkRoomImg],
    year: 2023,
    origin: 'Côte d\'Ivoire',
    dimensions: '42 cm x 18 cm',
    isAvailable: true,
    isFeatured: false,
    likesCount: 220,
    dateStr: '28 juil. 2026',
    description: 'Représentation tendre et majestueuse de la mère protectrice berçant son enfant, symbole universel de transmission de la vie.',
    culturalInspiration: 'L\'hommage sacré à la mère nourricière et au rôle central des femmes dans la préservation des lignées.',
    authenticityDetails: {
      edition: 'Pièce unique taillée main',
      origin: 'Côte d\'Ivoire',
      logistics: 'Remise sécurisée convenue directement avec l\'artiste',
      certificate: 'Passeport d\'œuvre N\'KORA'
    },
    materials: ['Teck noble massif', 'Patine naturelle'],
    toolsAndMethods: ['Taille directe', 'Polissage doux'],
    curatorialReflections: []
  },
  {
    id: 'art-couleurs-afrique',
    title: 'Couleurs d\'Afrique',
    artistName: 'Nia Amadou',
    artistId: 'artist-nia',
    artistAvatar: niaAvatarImg,
    artistStudioLocation: 'Atelier Djenné, Bamako, Mali',
    category: 'Peinture',
    medium: 'Huile et terre de Ségou sur toile de coton',
    movement: 'Art Contemporain Malien',
    priceFcfa: 180000,
    imageUrl: heroCompositeImg,
    galleryImages: [heroCompositeImg, artworkRoomImg],
    year: 2024,
    origin: 'Mali',
    dimensions: '90 cm x 70 cm',
    isAvailable: true,
    isFeatured: false,
    likesCount: 175,
    dateStr: '22 juil. 2026',
    description: 'Portrait chaleureux et rayonnant célébrant la grâce des parures et la fierté culturelle des peuples du Sahel.',
    culturalInspiration: 'Les coiffures royales et les motifs textiles peints lors des fêtes de moissons.',
    authenticityDetails: {
      edition: 'Toile originale',
      origin: 'Mali (Bamako)',
      logistics: 'Coordination directe avec l\'artiste',
      certificate: 'Certificat signé par Nia Amadou'
    },
    materials: ['Terre de Ségou', 'Huile extra-fine', 'Toile coton bio'],
    toolsAndMethods: ['Brosses de soies', 'Empâtement au doigt'],
    curatorialReflections: []
  },
  {
    id: 'art-guerrier-bamileke',
    title: 'Guerrier Bamileke',
    artistName: 'Joseph K.',
    artistId: 'artist-joseph',
    artistAvatar: josephAvatarImg,
    artistStudioLocation: 'Studio Ashanti, Kumasi, Ghana',
    category: 'Sculpture',
    medium: 'Bois dur d\'Iroko & perles cérémonielles',
    movement: 'Sculpture Traditionnelle des Hauts Plateaux',
    priceFcfa: 390000,
    imageUrl: guerrierImg,
    galleryImages: [guerrierImg, artworkRoomImg],
    year: 2023,
    origin: 'Ghana',
    dimensions: '62 cm x 24 cm',
    isAvailable: true,
    isFeatured: false,
    likesCount: 188,
    dateStr: '12 juil. 2026',
    description: 'Statue commémorative du dignitaire et guerrier Bamileke, incarnant le courage, la loyauté et la défense du royaume.',
    culturalInspiration: 'Les rites d\'intronisation des gardiens des chefferies traditionnelles.',
    authenticityDetails: {
      edition: 'Pièce originale 1/1',
      origin: 'Ghana (Kumasi)',
      logistics: 'Remise directe en atelier ou envoi sécurisé',
      certificate: 'Certificat d\'authenticité N\'KORA'
    },
    materials: ['Bois d\'Iroko centenaire', 'Perles de verre', 'Pigments minéraux'],
    toolsAndMethods: ['Gouge', 'Incision rituelle'],
    curatorialReflections: []
  },
  {
    id: 'art-textile-bogolan',
    title: 'Tissage Bogolan Sacré',
    artistName: 'Nia Amadou',
    artistId: 'artist-nia',
    artistAvatar: niaAvatarImg,
    artistStudioLocation: 'Bamako, Mali',
    category: 'Art Textile',
    medium: 'Coton brut filé main & Teinture à la terre fermentée',
    movement: 'Art Textile Mandé',
    priceFcfa: 380000,
    imageUrl: textileBogolanImg,
    galleryImages: [textileBogolanImg, artworkRoomImg],
    year: 2025,
    origin: 'Mali',
    dimensions: '180 cm x 120 cm',
    isAvailable: true,
    isFeatured: false,
    likesCount: 165,
    dateStr: '8 juil. 2026',
    description: 'Grand pan textile traditionnel en coton biologique orné de motifs géométriques protecteurs peints à la terre alluviale du fleuve Niger.',
    culturalInspiration: 'Idéogrammes ancestraux transmis de génération en génération chez les maîtres tisserands.',
    authenticityDetails: {
      edition: 'Tissage original unique',
      origin: 'Mali (Ségou)',
      logistics: 'Remise convenue avec l\'artiste',
      certificate: 'Certificat d\'origine N\'KORA'
    },
    materials: ['Coton du terroir', 'Boue fermentée du Niger', 'Décoction d\'écorces'],
    toolsAndMethods: ['Métier à pédales', 'Calame de bambou'],
    curatorialReflections: []
  },
  {
    id: 'art-ceramique-jarre',
    title: 'Jarre Cérémoniale en Terre Cuite',
    artistName: 'Awa Diop',
    artistId: 'artist-awa',
    artistAvatar: awaAvatarImg,
    artistStudioLocation: 'Dakar, Sénégal',
    category: 'Céramique',
    medium: 'Argile chamottée, Engobe d\'ocre rouge & Enfumage',
    movement: 'Céramique & Poterie d\'Art',
    priceFcfa: 290000,
    imageUrl: ceramicPotteryImg,
    galleryImages: [ceramicPotteryImg, artworkRoomImg],
    year: 2025,
    origin: 'Sénégal',
    dimensions: '52 cm x 36 cm',
    isAvailable: true,
    isFeatured: false,
    likesCount: 142,
    dateStr: '1 juil. 2026',
    description: 'Vase sculptural monté au colombin dans une argile pure, orné de scarifications géométriques et patiné à la fumée de paille.',
    culturalInspiration: 'Les jarres rituelles des libations sacrées.',
    authenticityDetails: {
      edition: 'Pièce unique façonnée main',
      origin: 'Sénégal (Casamance)',
      logistics: 'Remise sécurisée convenue directement',
      certificate: 'Certificat N\'KORA'
    },
    materials: ['Argile rouge', 'Engobe minéral'],
    toolsAndMethods: ['Colombin', 'Brunissage au galet'],
    curatorialReflections: []
  }
];

export const FEATURED_ARTISTS: Artist[] = [
  {
    id: 'artist-koffi',
    name: 'Koffi Amani',
    country: 'Côte d\'Ivoire',
    countryFlag: '🇨🇮',
    city: 'Abidjan',
    specialty: 'Sculpteur',
    avatarUrl: koffiAvatarImg,
    coverUrl: koffiBannerImg,
    bio: 'Sculpteur passionné par l\'art traditionnel africain, je m\'inspire des ancêtres et de la nature pour créer des œuvres uniques qui racontent nos histoires.',
    artworksCount: 45,
    exhibitionsCount: 12,
    followersCount: 560,
    email: 'koffiamani@email.com',
    website: 'www.koffiamani.com',
    instagram: '@koffi_amani_art',
    isVerified: true,
    featuredArtworkIds: ['art-masque-dan', 'art-elevation', 'art-maternite', 'art-guerrier-bamileke']
  },
  {
    id: 'artist-awa',
    name: 'Awa Diop',
    country: 'Sénégal',
    countryFlag: '🇸🇳',
    city: 'Dakar',
    specialty: 'Peintre',
    avatarUrl: awaAvatarImg,
    coverUrl: racinesImg,
    bio: 'Artiste peintre travaillant les pigments naturels d\'ocre et d\'indigo pour capturer la vibration de la lumière sahélienne et la dignité féminine.',
    artworksCount: 28,
    exhibitionsCount: 8,
    followersCount: 420,
    email: 'awadiop@email.com',
    website: 'www.awadiopart.sn',
    instagram: '@awa_diop_peintre',
    isVerified: true,
    featuredArtworkIds: ['art-racines', 'art-ceramique-jarre']
  },
  {
    id: 'artist-joseph',
    name: 'Joseph K.',
    country: 'Ghana',
    countryFlag: '🇬🇭',
    city: 'Kumasi',
    specialty: 'Sculpteur',
    avatarUrl: josephAvatarImg,
    coverUrl: guerrierImg,
    bio: 'Maître sculpteur sur bois dur et bronze, héritier des techniques royales Ashanti et créateur de figures commémoratives.',
    artworksCount: 34,
    exhibitionsCount: 15,
    followersCount: 380,
    email: 'josephk@email.com',
    website: 'www.josephk-sculpture.com',
    instagram: '@joseph_k_art',
    isVerified: true,
    featuredArtworkIds: ['art-guerrier-bamileke']
  },
  {
    id: 'artist-nia',
    name: 'Nia Amadou',
    country: 'Mali',
    countryFlag: '🇲🇱',
    city: 'Bamako',
    specialty: 'Peintre & Textile',
    avatarUrl: niaAvatarImg,
    coverUrl: heroCompositeImg,
    bio: 'Peintre et teinturière de Bogolan, Nia explore le lien entre écriture pictographique ancestrale et composition chromatique moderne.',
    artworksCount: 19,
    exhibitionsCount: 6,
    followersCount: 310,
    email: 'niaamadou@email.com',
    website: 'www.niaamadou.ml',
    instagram: '@nia_amadou_studio',
    isVerified: true,
    featuredArtworkIds: ['art-couleurs-afrique', 'art-textile-bogolan']
  }
];

export const FEATURED_EXHIBITIONS: Exhibition[] = [
  {
    id: 'exhib-1',
    title: 'Les Cordes Sacrées : De la Kora aux Formes Libres',
    theme: 'Dialogue immersif entre lutherie mandingue, sculpture sur bois et art textile',
    dates: '15 Août — 30 Septembre 2026',
    curator: 'Fatoumata Keïta (Conservatrice & Critique d\'art)',
    coverImage: heroCompositeImg,
    pavilionName: 'Pavillon Ouest-Africain N\'Kora',
    artworksCount: 28,
    isVirtual3D: true,
    description: 'Une exposition multisensorielle où chaque pièce de bronze, d\'ébène et de textile résonne avec des compositions inédites enregistrées sur Kora 21 cordes.'
  },
  {
    id: 'exhib-2',
    title: 'Visages des Ancêtres & Masques d\'Apparat',
    theme: 'Masques sacrés, jarres de poterie et sculptures royales',
    dates: 'En cours jusqu\'au 15 Novembre 2026',
    curator: 'Dr. Mamadou Bamba (Directeur d\'Études)',
    coverImage: heroMaskMonumentalImg,
    pavilionName: 'Pavillon Sahel & Savane',
    artworksCount: 34,
    isVirtual3D: true,
    description: 'Immersion dans les trésors symboliques et la mémoire vivante des cours royales Dan, Baoulé et Ashanti.'
  }
];
