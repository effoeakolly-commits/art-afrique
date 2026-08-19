import React, { useState } from 'react';
import { ArtistRegistrationData } from '../types';
import { X, Palette, User, Mail, Lock, Phone, CheckCircle2, ArrowRight } from 'lucide-react';
import { Logo } from './Logo';

interface ArtistOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (data: ArtistRegistrationData) => void;
  onSwitchToLogin: () => void;
}

export const ArtistOnboardingModal: React.FC<ArtistOnboardingModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  onSwitchToLogin
}) => {
  const [formData, setFormData] = useState<ArtistRegistrationData>({
    name: '',
    email: '',
    password: '',
    country: 'Sénégal',
    city: 'Dakar',
    discipline: 'Peinture africaine',
    style: 'Art Contemporain Africain',
    experienceLevel: 'Artiste confirmé (5 à 10 ans)',
    bio: '',
    phoneWhatsapp: '',
    payoutPreference: 'Mobile Money (Wave / Orange)'
  });

  const [step, setStep] = useState<'welcome' | 'form'>('welcome');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    onSuccess(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-fade-in" id="artist-onboarding-modal">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden text-[#2F241A] max-h-[94vh] flex flex-col">
        
        {/* Top Header */}
        <div className="p-6 border-b border-[#F0EAE1] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo variant="symbol" size="sm" />
            <div>
              <h3 className="font-serif-title text-xl font-bold text-[#241710]">
                {step === 'welcome' ? "Rejoindre le Mouvement N'KORA" : "Créer votre Profil d'Artiste"}
              </h3>
              <p className="text-xs text-[#8B6236]">
                Espace dédié aux artistes et maîtres d'art africains
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#8B6236] hover:bg-[#F6F2E7] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
          
          {/* STEP 1: Welcome Invitation */}
          {step === 'welcome' && (
            <div className="space-y-6 text-center py-4">
              <div className="w-20 h-20 rounded-3xl bg-[#241710] text-[#D6B26A] flex items-center justify-center mx-auto shadow-lg">
                <Palette className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h4 className="font-serif-title text-2xl sm:text-3xl font-bold text-[#241710]">
                  Bienvenue dans l'Alliance des Créateurs
                </h4>
                <p className="text-xs sm:text-sm text-[#2F241A]/80 max-w-md mx-auto leading-relaxed">
                  Vous êtes artiste peintre, sculpteur, bronzier, céramiste ou maître tisserand ? Rejoignez une plateforme qui valorise votre authenticité culturelle, sécurise vos ventes en direct et vous offre une vitrine de prestige.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
                <div className="p-3.5 rounded-2xl bg-[#F6F2E7]">
                  <span className="text-[10px] uppercase font-bold text-[#C4953A] block">0% COMMISSION CACHÉE</span>
                  <p className="text-xs text-[#241710] font-medium mt-0.5">Rémunération directe et transparente.</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#F6F2E7]">
                  <span className="text-[10px] uppercase font-bold text-[#C4953A] block">PAIEMENTS DIRECTS</span>
                  <p className="text-xs text-[#241710] font-medium mt-0.5">Mobile Money (Wave, Orange, MTN) & Virement.</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#F6F2E7]">
                  <span className="text-[10px] uppercase font-bold text-[#C4953A] block">CONTRÔLE TOTAL</span>
                  <p className="text-xs text-[#241710] font-medium mt-0.5">Vous fixez vos prix et gérez vos remises.</p>
                </div>
              </div>

              <div className="pt-2 space-y-3">
                <button
                  type="button"
                  onClick={() => setStep('form')}
                  className="w-full bg-[#241710] hover:bg-[#3E2519] text-[#F6F2E7] font-bold text-xs uppercase tracking-wider py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  Commencer mon inscription d'artiste <ArrowRight className="w-4 h-4 text-[#D6B26A]" />
                </button>

                <p className="text-xs text-[#8B6236]">
                  Déjà un compte ?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onSwitchToLogin();
                    }}
                    className="font-bold text-[#241710] underline cursor-pointer"
                  >
                    Se connecter
                  </button>
                </p>
              </div>
            </div>
          )}

          {/* STEP 2: Intuitive Registration Form with Dropdowns */}
          {step === 'form' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#241710] mb-1">
                    Nom d'artiste / Nom complet *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#8B6236] absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="Ex: Kouassi Mensah"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#F6F2E7] rounded-xl pl-10 pr-3 py-2.5 text-xs text-[#241710] focus:outline-hidden focus:ring-2 focus:ring-[#C4953A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#241710] mb-1">
                    Adresse email professionnelle *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#8B6236] absolute left-3.5 top-3" />
                    <input
                      type="email"
                      required
                      placeholder="artiste@domaine.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#F6F2E7] rounded-xl pl-10 pr-3 py-2.5 text-xs text-[#241710] focus:outline-hidden focus:ring-2 focus:ring-[#C4953A]"
                    />
                  </div>
                </div>
              </div>

              {/* Password & WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#241710] mb-1">
                    Mot de passe *
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#8B6236] absolute left-3.5 top-3" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full bg-[#F6F2E7] rounded-xl pl-10 pr-3 py-2.5 text-xs text-[#241710] focus:outline-hidden focus:ring-2 focus:ring-[#C4953A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#241710] mb-1">
                    Téléphone / WhatsApp *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#8B6236] absolute left-3.5 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder="+221 77 123 45 67"
                      value={formData.phoneWhatsapp}
                      onChange={(e) => setFormData({ ...formData, phoneWhatsapp: e.target.value })}
                      className="w-full bg-[#F6F2E7] rounded-xl pl-10 pr-3 py-2.5 text-xs text-[#241710] focus:outline-hidden focus:ring-2 focus:ring-[#C4953A]"
                    />
                  </div>
                </div>
              </div>

              {/* Country & City Dropdowns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#241710] mb-1">
                    Pays de résidence / atelier *
                  </label>
                  <select
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full bg-[#F6F2E7] rounded-xl px-3 py-2.5 text-xs text-[#241710] font-medium focus:outline-hidden focus:ring-2 focus:ring-[#C4953A] cursor-pointer"
                  >
                    <option value="Sénégal">Sénégal 🇸🇳</option>
                    <option value="Côte d'Ivoire">Côte d'Ivoire 🇨🇮</option>
                    <option value="Ghana">Ghana 🇬🇭</option>
                    <option value="Nigeria">Nigeria 🇳🇬</option>
                    <option value="Mali">Mali 🇲🇱</option>
                    <option value="Bénin">Bénin 🇧🇯</option>
                    <option value="Togo">Togo 🇹🇬</option>
                    <option value="Burkina Faso">Burkina Faso 🇧🇫</option>
                    <option value="Cameroun">Cameroun 🇨🇲</option>
                    <option value="Guinée">Guinée 🇬🇳</option>
                    <option value="RD Congo">RD Congo 🇨🇩</option>
                    <option value="Autre">Autre pays</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#241710] mb-1">
                    Ville ou Région d'Atelier *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Dakar, Abidjan, Bamako..."
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-[#F6F2E7] rounded-xl px-3.5 py-2.5 text-xs text-[#241710] focus:outline-hidden focus:ring-2 focus:ring-[#C4953A]"
                  />
                </div>
              </div>

              {/* Discipline & Style Dropdowns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#241710] mb-1">
                    Discipline principale *
                  </label>
                  <select
                    value={formData.discipline}
                    onChange={(e) => setFormData({ ...formData, discipline: e.target.value })}
                    className="w-full bg-[#F6F2E7] rounded-xl px-3 py-2.5 text-xs text-[#241710] font-medium focus:outline-hidden focus:ring-2 focus:ring-[#C4953A] cursor-pointer"
                  >
                    <option value="Peinture africaine">Peinture africaine & Pigments</option>
                    <option value="Masques & Rituels">Masques & Rituels</option>
                    <option value="Sculpture sur Bois & Bronze">Sculpture sur Bois & Bronze</option>
                    <option value="Art Textile & Tissage Bogolan">Art Textile & Tissage Bogolan</option>
                    <option value="Céramique & Poterie d'Art">Céramique & Poterie d'Art</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#241710] mb-1">
                    Courant Artistique *
                  </label>
                  <select
                    value={formData.style}
                    onChange={(e) => setFormData({ ...formData, style: e.target.value })}
                    className="w-full bg-[#F6F2E7] rounded-xl px-3 py-2.5 text-xs text-[#241710] font-medium focus:outline-hidden focus:ring-2 focus:ring-[#C4953A] cursor-pointer"
                  >
                    <option value="Art Contemporain Africain">Art Contemporain Africain</option>
                    <option value="Art Traditionnel & Sacré">Art Traditionnel & Sacré</option>
                    <option value="Symbolisme Mandingue & Akan">Symbolisme Mandingue & Akan</option>
                    <option value="Modernisme Africain">Modernisme Africain</option>
                  </select>
                </div>
              </div>

              {/* Experience Level & Payout Preference Dropdowns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#241710] mb-1">
                    Niveau d'expérience *
                  </label>
                  <select
                    value={formData.experienceLevel}
                    onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                    className="w-full bg-[#F6F2E7] rounded-xl px-3 py-2.5 text-xs text-[#241710] font-medium focus:outline-hidden focus:ring-2 focus:ring-[#C4953A] cursor-pointer"
                  >
                    <option value="Artiste Émergent (1 à 3 ans)">Artiste Émergent (1 à 3 ans)</option>
                    <option value="Artiste Confirmé (4 à 10 ans)">Artiste Confirmé (4 à 10 ans)</option>
                    <option value="Maître Artisan / Reconnaissance Muséale (+10 ans)">Maître Artisan / Reconnaissance Muséale (+10 ans)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#241710] mb-1">
                    Préférence de Versement *
                  </label>
                  <select
                    value={formData.payoutPreference}
                    onChange={(e) => setFormData({ ...formData, payoutPreference: e.target.value })}
                    className="w-full bg-[#F6F2E7] rounded-xl px-3 py-2.5 text-xs text-[#241710] font-medium focus:outline-hidden focus:ring-2 focus:ring-[#C4953A] cursor-pointer"
                  >
                    <option value="Mobile Money (Wave / Orange)">Mobile Money (Wave / Orange)</option>
                    <option value="Mobile Money (MTN / Moov)">Mobile Money (MTN / Moov)</option>
                    <option value="Virement Bancaire UEMOA / SWIFT">Virement Bancaire UEMOA / SWIFT</option>
                  </select>
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-xs font-semibold text-[#241710] mb-1">
                  Brève biographie ou démarche artistique (Facultatif)
                </label>
                <textarea
                  rows={2}
                  placeholder="Décrivez en quelques mots votre univers artistique et vos matières de prédilection..."
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full bg-[#F6F2E7] rounded-xl p-3 text-xs text-[#2F241A] focus:outline-hidden focus:ring-2 focus:ring-[#C4953A] resize-none"
                />
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-50/70 text-[#8B6236] text-[11px] leading-relaxed">
                💡 Vous pourrez ajouter vos œuvres et photos d'atelier directement depuis votre espace personnel dès validation.
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep('welcome')}
                  className="px-5 py-3 rounded-xl bg-[#F6F2E7] text-[#241710] text-xs font-bold hover:bg-[#EDE6D7] transition-all cursor-pointer"
                >
                  Retour
                </button>

                <button
                  type="submit"
                  className="flex-1 bg-[#C4953A] hover:bg-[#B3832B] text-[#241710] font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl shadow-md transition-all cursor-pointer"
                >
                  Valider et ouvrir mon atelier
                </button>
              </div>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
