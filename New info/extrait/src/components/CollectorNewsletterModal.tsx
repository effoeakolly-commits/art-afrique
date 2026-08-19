import React, { useState } from 'react';
import { X, Mail, CheckCircle2, BellRing } from 'lucide-react';
import { Logo } from './Logo';

interface CollectorNewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CollectorNewsletterModal: React.FC<CollectorNewsletterModalProps> = ({
  isOpen,
  onClose
}) => {
  const [email, setEmail] = useState('');
  const [receiveExhibitions, setReceiveExhibitions] = useState(true);
  const [receiveNewArtworks, setReceiveNewArtworks] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 2400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-fade-in" id="collector-newsletter-modal">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden text-[#2F241A] p-6 sm:p-8 space-y-6">
        
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <Logo variant="symbol" size="sm" />
          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#8B6236] hover:bg-[#F6F2E7] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="font-serif-title text-2xl font-bold text-[#241710]">
              Bienvenue dans le Cercle N'KORA
            </h4>
            <p className="text-xs text-[#2F241A]/80 max-w-xs mx-auto leading-relaxed">
              Votre email <strong>{email}</strong> est bien enregistré. Vous recevrez nos sélections curatorielles et invitations aux vernissages.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1 text-center">
              <h3 className="font-serif-title text-2xl font-bold text-[#241710]">
                Rejoindre la Communauté
              </h3>
              <p className="text-xs text-[#8B6236]">
                Recevez les sélections d'œuvres et annonces de vernissages
              </p>
            </div>

            {/* Email Only Input */}
            <div>
              <label className="block text-xs font-semibold text-[#241710] mb-1.5">
                Votre adresse email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#8B6236] absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  placeholder="collectionneur@domaine.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#F6F2E7] rounded-xl pl-10 pr-3 py-2.5 text-xs text-[#241710] focus:outline-hidden focus:ring-2 focus:ring-[#C4953A]"
                />
              </div>
            </div>

            {/* Preferences Checkboxes */}
            <div className="space-y-2.5 pt-2">
              <label className="flex items-center gap-2.5 text-xs text-[#2F241A] cursor-pointer">
                <input
                  type="checkbox"
                  checked={receiveNewArtworks}
                  onChange={(e) => setReceiveNewArtworks(e.target.checked)}
                  className="rounded-md accent-[#C4953A] w-4 h-4"
                />
                <span>Nouvelles œuvres disponibles & sélections d'artistes</span>
              </label>

              <label className="flex items-center gap-2.5 text-xs text-[#2F241A] cursor-pointer">
                <input
                  type="checkbox"
                  checked={receiveExhibitions}
                  onChange={(e) => setReceiveExhibitions(e.target.checked)}
                  className="rounded-md accent-[#C4953A] w-4 h-4"
                />
                <span>Invitations aux vernissages virtuels et expositions 3D</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-[#241710] hover:bg-[#3E2519] text-[#F6F2E7] font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-3"
            >
              <BellRing className="w-4 h-4 text-[#D6B26A]" />
              Confirmer mon inscription à la communauté
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
