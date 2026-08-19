import React, { useState } from 'react';
import { X, Globe, Shield, HelpCircle, Layers, Check } from 'lucide-react';
import logoImg from '../assets/images/nkora_main_brand_logo_1787154635918.jpg';
import sculptorImg from '../assets/images/african_master_sculptor_1787142432994.jpg';

interface AuthModalProps {
  isOpen: boolean;
  initialMode?: 'login' | 'artist-signup';
  onClose: () => void;
  onSuccess: (role: 'artist' | 'collector', artistName?: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode = 'login',
  onClose,
  onSuccess
}) => {
  const [mode, setMode] = useState<'login' | 'artist-signup'>(initialMode);
  
  // Login Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  // Signup Form State
  const [fullName, setFullName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [country, setCountry] = useState('Côte d\'Ivoire');
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    setTimeout(() => {
      setLoading(false);
      onSuccess('artist', 'Koffi Amani');
      onClose();
    }, 800);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (signupPassword !== confirmPassword) {
      setErrorMsg('Les mots de passe ne correspondent pas.');
      return;
    }
    if (!termsAccepted) {
      setErrorMsg('Veuillez accepter les conditions d\'utilisation.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    setTimeout(() => {
      setLoading(false);
      onSuccess('artist', fullName || 'Nouvel Artiste');
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-4xl w-full grid grid-cols-1 md:grid-cols-12 relative my-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/10 hover:bg-black/20 text-[#241710] flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* =========================================================================
            LEFT COLUMN (Matches Screenshots 6 & 7)
           ========================================================================= */}
        <div className="md:col-span-5 bg-[#1F130B] text-[#E8D6B1] p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
          
          {/* Subtle Background Art */}
          <div className="absolute inset-0 opacity-15 pointer-events-none">
            <img
              src={sculptorImg}
              alt="Artisan background"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="relative z-10 space-y-6">
            
            {/* Master N'KORA Logo */}
            <div className="w-36 h-auto">
              <img
                src={logoImg}
                alt="N'KORA"
                className="w-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Left Content for Login (Screenshot 6) */}
            {mode === 'login' ? (
              <div className="space-y-6">
                <h2 className="font-serif-title text-2xl sm:text-3xl font-normal text-[#FAF7F0] leading-snug">
                  Bienvenue de retour ! <br />
                  <span className="text-[#D6B26A]">Connectez-vous</span> à votre espace artiste.
                </h2>
                
                <div className="rounded-2xl overflow-hidden aspect-4/3 shadow-md bg-black/40 border border-[#3E2519]">
                  <img
                    src={sculptorImg}
                    alt="Atelier d'artiste"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            ) : (
              /* Left Content for Signup (Screenshot 7) */
              <div className="space-y-6">
                <h2 className="font-serif-title text-xl sm:text-2xl font-normal text-[#FAF7F0] leading-snug">
                  Rejoignez notre communauté d'artistes africains
                </h2>

                <div className="space-y-4 pt-2 text-xs text-[#E8D6B1]/90">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-[#C4953A]/20 flex items-center justify-center shrink-0 text-[#D6B26A]">
                      <Globe className="w-4 h-4" />
                    </div>
                    <span>Exposez vos œuvres à un public mondial</span>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-[#C4953A]/20 flex items-center justify-center shrink-0 text-[#D6B26A]">
                      <Layers className="w-4 h-4" />
                    </div>
                    <span>Gérez votre catalogue facilement</span>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-[#C4953A]/20 flex items-center justify-center shrink-0 text-[#D6B26A]">
                      <Shield className="w-4 h-4" />
                    </div>
                    <span>Vendez vos créations en toute sécurité</span>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-[#C4953A]/20 flex items-center justify-center shrink-0 text-[#D6B26A]">
                      <HelpCircle className="w-4 h-4" />
                    </div>
                    <span>Bénéficiez d'un accompagnement personnalisé</span>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Footer note */}
          <div className="relative z-10 pt-6 text-[10px] text-[#E8D6B1]/50">
            N'KORA • Art, Artistes & Culture Africaine
          </div>

        </div>

        {/* =========================================================================
            RIGHT COLUMN: FORMS (Matches Screenshots 6 & 7)
           ========================================================================= */}
        <div className="md:col-span-7 bg-[#FAF7F0] p-8 sm:p-10 flex flex-col justify-center">
          
          {/* Error notice if any */}
          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-700 text-xs border border-red-200">
              {errorMsg}
            </div>
          )}

          {/* LOGIN FORM (Screenshot 6) */}
          {mode === 'login' ? (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif-title text-2xl sm:text-3xl font-bold text-[#241710]">
                  Se connecter
                </h3>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[#2F241A] mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="votre.email@exemple.com"
                    className="w-full bg-white border border-[#E8DFCE] rounded-xl px-4 py-3 text-xs text-[#241710] focus:outline-none focus:border-[#C4953A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#2F241A] mb-1">Mot de passe</label>
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-white border border-[#E8DFCE] rounded-xl px-4 py-3 text-xs text-[#241710] focus:outline-none focus:border-[#C4953A]"
                  />
                </div>

                <div className="flex items-center justify-between text-xs">
                  <label className="flex items-center gap-2 cursor-pointer text-[#2F241A]/80">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-[#C4B296] text-[#A67123] accent-[#A67123]"
                    />
                    <span>Se souvenir de moi</span>
                  </label>

                  <a href="#forgot" className="text-[#A67123] hover:underline font-medium">
                    Mot de passe oublié ?
                  </a>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#A67123] hover:bg-[#8F5F1B] text-white font-medium text-xs sm:text-sm py-3.5 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  {loading ? 'Connexion en cours...' : 'Se connecter'}
                </button>
              </form>

              {/* Toggle to Signup */}
              <div className="text-center pt-2 text-xs text-[#2F241A]/70">
                <span>Pas encore de compte ? </span>
                <button
                  onClick={() => {
                    setMode('artist-signup');
                    setErrorMsg('');
                  }}
                  className="font-bold text-[#241710] hover:text-[#A67123] underline cursor-pointer"
                >
                  Créer un compte
                </button>
              </div>

            </div>
          ) : (
            /* SIGNUP FORM (Screenshot 7) */
            <div className="space-y-5">
              <div>
                <h3 className="font-serif-title text-2xl sm:text-3xl font-bold text-[#241710]">
                  Créer un compte artiste
                </h3>
              </div>

              <form onSubmit={handleSignupSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-medium text-[#2F241A] mb-1">Nom complet</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ex: Koffi Amani"
                    className="w-full bg-white border border-[#E8DFCE] rounded-xl px-4 py-2.5 text-xs text-[#241710] focus:outline-none focus:border-[#C4953A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#2F241A] mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    placeholder="votre.email@domaine.com"
                    className="w-full bg-white border border-[#E8DFCE] rounded-xl px-4 py-2.5 text-xs text-[#241710] focus:outline-none focus:border-[#C4953A]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[#2F241A] mb-1">Mot de passe</label>
                    <input
                      type="password"
                      required
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-white border border-[#E8DFCE] rounded-xl px-4 py-2.5 text-xs text-[#241710] focus:outline-none focus:border-[#C4953A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#2F241A] mb-1">Confirmer mot de passe</label>
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-white border border-[#E8DFCE] rounded-xl px-4 py-2.5 text-xs text-[#241710] focus:outline-none focus:border-[#C4953A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#2F241A] mb-1">Pays</label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-white border border-[#E8DFCE] rounded-xl px-4 py-2.5 text-xs text-[#241710] focus:outline-none focus:border-[#C4953A] cursor-pointer"
                  >
                    <option value="Côte d'Ivoire">Côte d'Ivoire</option>
                    <option value="Sénégal">Sénégal</option>
                    <option value="Ghana">Ghana</option>
                    <option value="Mali">Mali</option>
                    <option value="Cameroun">Cameroun</option>
                    <option value="Bénin">Bénin</option>
                    <option value="Togo">Togo</option>
                    <option value="Burkina Faso">Burkina Faso</option>
                  </select>
                </div>

                <div className="pt-1">
                  <label className="flex items-start gap-2.5 cursor-pointer text-[11px] text-[#2F241A]/80">
                    <input
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="w-4 h-4 rounded border-[#C4B296] text-[#A67123] accent-[#A67123] mt-0.5"
                    />
                    <span>J'accepte les conditions d'utilisation et la politique de confidentialité.</span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#A67123] hover:bg-[#8F5F1B] text-white font-medium text-xs sm:text-sm py-3.5 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  {loading ? 'Création du compte...' : 'Créer mon compte'}
                </button>
              </form>

              {/* Toggle to Login */}
              <div className="text-center pt-1 text-xs text-[#2F241A]/70">
                <span>Déjà un compte ? </span>
                <button
                  onClick={() => {
                    setMode('login');
                    setErrorMsg('');
                  }}
                  className="font-bold text-[#241710] hover:text-[#A67123] underline cursor-pointer"
                >
                  Se connecter
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
