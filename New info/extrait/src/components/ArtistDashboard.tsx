import React, { useState } from 'react';
import { PageView } from '../types';
import maskDanImg from '../assets/images/african_royal_mask_1787130431593.jpg';
import elevationImg from '../assets/images/african_wooden_sculpture_1787143769088.jpg';
import materniteImg from '../assets/images/african_sculpture_maternite_1787156958511.jpg';
import logoImg from '../assets/images/nkora_main_brand_logo_1787154635918.jpg';
import { 
  LayoutDashboard, 
  Palette, 
  PlusCircle, 
  ShoppingBag, 
  MessageSquare, 
  BarChart3, 
  User, 
  Settings, 
  LogOut,
  ArrowRight,
  Upload,
  Check
} from 'lucide-react';

interface ArtistDashboardProps {
  onNavigate: (page: PageView) => void;
  onLogout?: () => void;
}

export const ArtistDashboard: React.FC<ArtistDashboardProps> = ({ onNavigate, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'my-artworks' | 'add-artwork' | 'orders' | 'messages' | 'stats' | 'profile' | 'settings'>('dashboard');
  
  // Quick state for adding artwork form
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Sculpture');
  const [newPrice, setNewPrice] = useState('');
  const [newDimensions, setNewDimensions] = useState('');
  const [artworkAdded, setArtworkAdded] = useState(false);

  const handleAddArtworkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setArtworkAdded(true);
    setTimeout(() => {
      setArtworkAdded(false);
      setActiveTab('dashboard');
    }, 1800);
  };

  return (
    <div className="bg-[#FAF7F0] min-h-screen flex text-[#2F241A]" id="artist-dashboard">
      
      {/* =========================================================================
          LEFT SIDEBAR: Dark textured wood theme (Screenshot 5)
         ========================================================================= */}
      <aside className="w-64 bg-[#231710] text-[#E8D6B1] shrink-0 hidden md:flex flex-col justify-between p-5 border-r border-[#3E2519]">
        
        <div className="space-y-8">
          {/* Brand Logo */}
          <div 
            onClick={() => onNavigate('accueil')}
            className="flex items-center gap-3 cursor-pointer px-2"
          >
            <div className="h-10 w-auto">
              <img
                src={logoImg}
                alt="N'KORA"
                className="h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5 text-xs font-medium">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-[#3E2519] text-[#D6B26A] shadow-xs font-semibold'
                  : 'text-[#E8D6B1]/70 hover:bg-[#3E2519]/40 hover:text-[#E8D6B1]'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Tableau de bord</span>
            </button>

            <button
              onClick={() => setActiveTab('my-artworks')}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all cursor-pointer ${
                activeTab === 'my-artworks'
                  ? 'bg-[#3E2519] text-[#D6B26A] shadow-xs font-semibold'
                  : 'text-[#E8D6B1]/70 hover:bg-[#3E2519]/40 hover:text-[#E8D6B1]'
              }`}
            >
              <Palette className="w-4 h-4" />
              <span>Mes œuvres</span>
            </button>

            <button
              onClick={() => setActiveTab('add-artwork')}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all cursor-pointer ${
                activeTab === 'add-artwork'
                  ? 'bg-[#3E2519] text-[#D6B26A] shadow-xs font-semibold'
                  : 'text-[#E8D6B1]/70 hover:bg-[#3E2519]/40 hover:text-[#E8D6B1]'
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              <span>Ajouter une œuvre</span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all cursor-pointer ${
                activeTab === 'orders'
                  ? 'bg-[#3E2519] text-[#D6B26A] shadow-xs font-semibold'
                  : 'text-[#E8D6B1]/70 hover:bg-[#3E2519]/40 hover:text-[#E8D6B1]'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Commandes</span>
            </button>

            <button
              onClick={() => setActiveTab('messages')}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all cursor-pointer ${
                activeTab === 'messages'
                  ? 'bg-[#3E2519] text-[#D6B26A] shadow-xs font-semibold'
                  : 'text-[#E8D6B1]/70 hover:bg-[#3E2519]/40 hover:text-[#E8D6B1]'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Messages</span>
            </button>

            <button
              onClick={() => setActiveTab('stats')}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all cursor-pointer ${
                activeTab === 'stats'
                  ? 'bg-[#3E2519] text-[#D6B26A] shadow-xs font-semibold'
                  : 'text-[#E8D6B1]/70 hover:bg-[#3E2519]/40 hover:text-[#E8D6B1]'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Statistiques</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all cursor-pointer ${
                activeTab === 'profile'
                  ? 'bg-[#3E2519] text-[#D6B26A] shadow-xs font-semibold'
                  : 'text-[#E8D6B1]/70 hover:bg-[#3E2519]/40 hover:text-[#E8D6B1]'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Profil</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-[#3E2519] text-[#D6B26A] shadow-xs font-semibold'
                  : 'text-[#E8D6B1]/70 hover:bg-[#3E2519]/40 hover:text-[#E8D6B1]'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Paramètres</span>
            </button>
          </nav>
        </div>

        {/* Logout button at bottom */}
        <div className="pt-6 border-t border-[#3E2519]">
          <button
            onClick={() => {
              if (onLogout) onLogout();
              onNavigate('accueil');
            }}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-[#E8D6B1]/60 hover:text-[#E8D6B1] hover:bg-[#3E2519]/40 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Déconnexion</span>
          </button>
        </div>

      </aside>

      {/* =========================================================================
          MAIN DASHBOARD AREA (Screenshot 5)
         ========================================================================= */}
      <main className="flex-1 p-6 sm:p-10 space-y-8 overflow-y-auto">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif-title text-2xl sm:text-3xl lg:text-4xl font-bold text-[#241710]">
              Bienvenue, Koffi !
            </h1>
            <p className="text-xs text-[#2F241A]/70 font-light mt-1">
              Voici un aperçu de votre activité.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('artist-profile')}
              className="bg-white border border-[#E8DFCE] hover:bg-[#F2EADA] text-[#241710] text-xs font-medium px-4 py-2 rounded-xl transition-colors cursor-pointer"
            >
              Voir mon profil public
            </button>
            <button
              onClick={() => setActiveTab('add-artwork')}
              className="bg-[#A67123] hover:bg-[#8F5F1B] text-white text-xs font-medium px-4 py-2 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Nouvelle œuvre</span>
            </button>
          </div>
        </div>

        {/* =========================================================================
            4 STAT METRIC CARDS (Screenshot 5)
           ========================================================================= */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          {/* Card 1 */}
          <div className="bg-white p-5 rounded-2xl border border-[#E8DFCE]/80 shadow-2xs space-y-2">
            <div className="font-serif-title text-3xl sm:text-4xl font-bold text-[#241710]">
              23
            </div>
            <div className="text-xs text-[#2F241A]/70 font-light">
              Œuvres publiées
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-5 rounded-2xl border border-[#E8DFCE]/80 shadow-2xs space-y-2">
            <div className="font-serif-title text-3xl sm:text-4xl font-bold text-[#241710]">
              12
            </div>
            <div className="text-xs text-[#2F241A]/70 font-light">
              Commandes
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-5 rounded-2xl border border-[#E8DFCE]/80 shadow-2xs space-y-2">
            <div className="font-serif-title text-3xl sm:text-4xl font-bold text-[#241710]">
              5
            </div>
            <div className="text-xs text-[#2F241A]/70 font-light">
              Messages
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-5 rounded-2xl border border-[#E8DFCE]/80 shadow-2xs space-y-2">
            <div className="font-serif-title text-3xl sm:text-4xl font-bold text-[#241710]">
              1.2M <span className="text-sm font-normal text-[#2F241A]/60">FCFA</span>
            </div>
            <div className="text-xs text-[#2F241A]/70 font-light">
              Ventes totales
            </div>
          </div>

        </div>

        {/* =========================================================================
            BOTTOM GRID: Commandes Récentes + Graphe des Ventes (Screenshot 5)
           ========================================================================= */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Box: Commandes récentes */}
            <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-[#E8DFCE]/80 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#E8DFCE]/50">
                <h2 className="font-serif-title text-lg font-bold text-[#241710]">
                  Commandes récentes
                </h2>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="inline-flex items-center gap-1 text-xs text-[#2F241A]/60 hover:text-[#A67123] cursor-pointer"
                >
                  <span>Voir tout</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Order items list */}
              <div className="space-y-3">
                {/* Item 1 */}
                <div className="flex items-center justify-between p-3 rounded-xl hover:bg-[#FAF7F0] transition-colors">
                  <div className="flex items-center gap-3">
                    <img
                      src={maskDanImg}
                      alt="Masque Dan"
                      className="w-12 h-12 rounded-xl object-cover bg-[#241710]"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <div className="text-xs font-bold text-[#241710]">Masque Dan</div>
                      <div className="text-[11px] text-[#2F241A]/50">Commande #1234</div>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="text-xs font-bold text-[#241710]">280 000 FCFA</div>
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-[#FFF4E5] text-[#B76E00]">
                      En attente
                    </span>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="flex items-center justify-between p-3 rounded-xl hover:bg-[#FAF7F0] transition-colors">
                  <div className="flex items-center gap-3">
                    <img
                      src={elevationImg}
                      alt="Élévation"
                      className="w-12 h-12 rounded-xl object-cover bg-[#241710]"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <div className="text-xs font-bold text-[#241710]">Élévation</div>
                      <div className="text-[11px] text-[#2F241A]/50">Commande #1233</div>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="text-xs font-bold text-[#241710]">450 000 FCFA</div>
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-[#E8F0FE] text-[#1967D2]">
                      Expédiée
                    </span>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="flex items-center justify-between p-3 rounded-xl hover:bg-[#FAF7F0] transition-colors">
                  <div className="flex items-center gap-3">
                    <img
                      src={materniteImg}
                      alt="Maternité"
                      className="w-12 h-12 rounded-xl object-cover bg-[#241710]"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <div className="text-xs font-bold text-[#241710]">Maternité</div>
                      <div className="text-[11px] text-[#2F241A]/50">Commande #1232</div>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="text-xs font-bold text-[#241710]">260 000 FCFA</div>
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-[#EBF5EE] text-[#2D7A4D]">
                      Livrée
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Box: Ventes (30 derniers jours) SVG Graph */}
            <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-[#E8DFCE]/80 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#E8DFCE]/50">
                <h2 className="font-serif-title text-lg font-bold text-[#241710]">
                  Ventes (30 derniers jours)
                </h2>
              </div>

              {/* Custom SVG Area Chart matching screenshot */}
              <div className="h-52 w-full pt-2">
                <svg className="w-full h-full" viewBox="0 0 320 180" fill="none">
                  {/* Grid Lines */}
                  <line x1="30" y1="30" x2="310" y2="30" stroke="#F0EAE1" strokeDasharray="3 3" />
                  <line x1="30" y1="70" x2="310" y2="70" stroke="#F0EAE1" strokeDasharray="3 3" />
                  <line x1="30" y1="110" x2="310" y2="110" stroke="#F0EAE1" strokeDasharray="3 3" />
                  <line x1="30" y1="150" x2="310" y2="150" stroke="#F0EAE1" />

                  {/* Y Axis Labels */}
                  <text x="5" y="34" fill="#A89A89" fontSize="9">600k</text>
                  <text x="5" y="74" fill="#A89A89" fontSize="9">400k</text>
                  <text x="5" y="114" fill="#A89A89" fontSize="9">200k</text>
                  <text x="15" y="154" fill="#A89A89" fontSize="9">0k</text>

                  {/* Gradient Area Fill */}
                  <defs>
                    <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#C4953A" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#C4953A" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  <path
                    d="M 40 130 Q 80 90 120 80 T 200 95 T 250 50 T 300 40 L 300 150 L 40 150 Z"
                    fill="url(#salesGrad)"
                  />

                  {/* Trend Line */}
                  <path
                    d="M 40 130 Q 80 90 120 80 T 200 95 T 250 50 T 300 40"
                    fill="none"
                    stroke="#B7791F"
                    strokeWidth="2.5"
                  />

                  {/* X Axis Points */}
                  <circle cx="40" cy="130" r="3.5" fill="#B7791F" />
                  <circle cx="120" cy="80" r="3.5" fill="#B7791F" />
                  <circle cx="200" cy="95" r="3.5" fill="#B7791F" />
                  <circle cx="250" cy="50" r="3.5" fill="#B7791F" />
                  <circle cx="300" cy="40" r="3.5" fill="#B7791F" />

                  {/* X Axis Labels */}
                  <text x="35" y="168" fill="#A89A89" fontSize="8">S1</text>
                  <text x="115" y="168" fill="#A89A89" fontSize="8">S2</text>
                  <text x="195" y="168" fill="#A89A89" fontSize="8">S3</text>
                  <text x="245" y="168" fill="#A89A89" fontSize="8">S4</text>
                  <text x="295" y="168" fill="#A89A89" fontSize="8">S5</text>
                </svg>
              </div>

            </div>

          </div>
        )}

        {/* =========================================================================
            SUBTAB: AJOUTER UNE ŒUVRE
           ========================================================================= */}
        {activeTab === 'add-artwork' && (
          <div className="max-w-2xl bg-white p-6 sm:p-8 rounded-2xl border border-[#E8DFCE] space-y-6 shadow-xs">
            <div>
              <h2 className="font-serif-title text-2xl font-bold text-[#241710]">
                Ajouter une nouvelle œuvre
              </h2>
              <p className="text-xs text-[#2F241A]/70 font-light mt-1">
                Remplissez les détails pour publier une nouvelle création dans votre catalogue.
              </p>
            </div>

            <form onSubmit={handleAddArtworkSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#2F241A] mb-1">Titre de l'œuvre</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Ex: Masque Royal des Moissons"
                  className="w-full bg-[#FAF7F0] border border-[#E8DFCE] rounded-xl px-3.5 py-2.5 text-xs text-[#2F241A] focus:outline-none focus:border-[#C4953A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#2F241A] mb-1">Catégorie</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full bg-[#FAF7F0] border border-[#E8DFCE] rounded-xl px-3.5 py-2.5 text-xs text-[#2F241A] focus:outline-none focus:border-[#C4953A]"
                  >
                    <option value="Sculpture">Sculpture</option>
                    <option value="Peinture">Peinture</option>
                    <option value="Masque">Masque</option>
                    <option value="Art Textile">Art Textile</option>
                    <option value="Céramique">Céramique</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#2F241A] mb-1">Prix (FCFA)</label>
                  <input
                    type="number"
                    required
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    placeholder="Ex: 350000"
                    className="w-full bg-[#FAF7F0] border border-[#E8DFCE] rounded-xl px-3.5 py-2.5 text-xs text-[#2F241A] focus:outline-none focus:border-[#C4953A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#2F241A] mb-1">Dimensions</label>
                <input
                  type="text"
                  value={newDimensions}
                  onChange={(e) => setNewDimensions(e.target.value)}
                  placeholder="Ex: 50 cm x 25 cm"
                  className="w-full bg-[#FAF7F0] border border-[#E8DFCE] rounded-xl px-3.5 py-2.5 text-xs text-[#2F241A] focus:outline-none focus:border-[#C4953A]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#2F241A] mb-1">Photographie de l'œuvre</label>
                <div className="border-2 border-dashed border-[#E8DFCE] rounded-2xl p-6 text-center bg-[#FAF7F0] space-y-2 cursor-pointer hover:border-[#C4953A]">
                  <Upload className="w-6 h-6 text-[#8B6236] mx-auto" />
                  <div className="text-xs text-[#2F241A]/70 font-medium">Glissez votre photo ici ou cliquez pour parcourir</div>
                  <div className="text-[10px] text-[#2F241A]/50">PNG, JPG jusqu'à 10MB</div>
                </div>
              </div>

              {artworkAdded ? (
                <div className="p-3 bg-[#EBF5EE] text-[#2D7A4D] rounded-xl text-xs flex items-center justify-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>Œuvre ajoutée avec succès à votre catalogue !</span>
                </div>
              ) : (
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('dashboard')}
                    className="px-4 py-2 text-xs text-[#2F241A]/70"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="bg-[#A67123] hover:bg-[#8F5F1B] text-white text-xs font-medium px-6 py-2.5 rounded-xl cursor-pointer"
                  >
                    Publier l'œuvre
                  </button>
                </div>
              )}
            </form>
          </div>
        )}

      </main>

    </div>
  );
};
