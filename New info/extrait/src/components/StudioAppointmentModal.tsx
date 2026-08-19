import React, { useState } from 'react';
import { Artwork, StudioAppointmentData } from '../types';
import { Calendar, X, Clock, Users, User, Mail, Phone, Check, MapPin } from 'lucide-react';

interface StudioAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  artwork: Artwork | null;
}

export const StudioAppointmentModal: React.FC<StudioAppointmentModalProps> = ({
  isOpen,
  onClose,
  artwork
}) => {
  const [format, setFormat] = useState<'physical' | 'virtual'>('physical');
  const [date, setDate] = useState('2026-09-18');
  const [time, setTime] = useState('14:00');
  const [visitorsCount, setVisitorsCount] = useState(2);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneWhatsapp, setPhoneWhatsapp] = useState('');
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen || !artwork) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-fade-in" id="studio-appointment-modal">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden text-[#2F241A] max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="p-6 border-b border-[#F0EAE1] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#241710] text-[#D6B26A] flex items-center justify-center shadow-md">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-title text-xl sm:text-2xl font-bold text-[#241710]">
                Demande de Rendez-vous en Atelier
              </h3>
              <p className="text-xs text-[#8B6236]">
                Rencontre privée & visite de création avec l'artiste
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

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          {isSuccess ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
                <Check className="w-8 h-8" />
              </div>
              <h4 className="font-serif-title text-2xl font-bold text-[#241710]">
                Demande transmise avec succès !
              </h4>
              <p className="text-xs sm:text-sm text-[#2F241A]/80 max-w-md mx-auto leading-relaxed">
                L'artiste <strong>{artwork.artistName}</strong> et l'équipe N'KORA ont reçu votre demande pour le <strong>{date}</strong> à <strong>{time}</strong>. Vous recevrez une confirmation sous 24h par email et WhatsApp.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Host Artist Card */}
              <div className="p-4 rounded-2xl bg-[#F6F2E7] flex items-center gap-4">
                <img
                  src={artwork.artistAvatar || artwork.imageUrl}
                  alt={artwork.artistName}
                  className="w-12 h-12 rounded-full object-cover shadow-sm shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="min-w-0">
                  <span className="text-[10px] uppercase font-bold text-[#C4953A] tracking-wider block">
                    ATELIER HÔTE
                  </span>
                  <span className="font-serif-title font-bold text-base text-[#241710] block">
                    {artwork.artistName}
                  </span>
                  <span className="text-xs text-[#8B6236] flex items-center gap-1 truncate">
                    <MapPin className="w-3 h-3 text-[#C4953A]" />
                    {artwork.artistStudioLocation || artwork.origin}
                  </span>
                </div>
              </div>

              {/* Format of visit dropdown */}
              <div>
                <label className="block text-xs font-semibold text-[#241710] mb-1.5">
                  Format de la visite *
                </label>
                <select
                  value={format}
                  onChange={(e) => setFormat(e.target.value as 'physical' | 'virtual')}
                  className="w-full bg-[#F6F2E7] rounded-xl px-4 py-3 text-xs text-[#241710] font-medium focus:outline-hidden focus:ring-2 focus:ring-[#C4953A] cursor-pointer"
                >
                  <option value="physical">Visite physique de l'atelier (Présentiel)</option>
                  <option value="virtual">Visite virtuelle privée en direct (Visioconférence)</option>
                </select>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#241710] mb-1.5">
                    Date souhaitée *
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-[#F6F2E7] rounded-xl px-3 py-2.5 text-xs text-[#241710] font-medium focus:outline-hidden focus:ring-2 focus:ring-[#C4953A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#241710] mb-1.5">
                    Horaire souhaité *
                  </label>
                  <div className="relative">
                    <input
                      type="time"
                      required
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full bg-[#F6F2E7] rounded-xl px-3 py-2.5 text-xs text-[#241710] font-medium focus:outline-hidden focus:ring-2 focus:ring-[#C4953A]"
                    />
                  </div>
                </div>
              </div>

              {/* Number of persons */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-semibold text-[#241710]">
                    Nombre de personnes ({visitorsCount} visiteur{visitorsCount > 1 ? 's' : ''})
                  </label>
                </div>
                <input
                  type="range"
                  min="1"
                  max="6"
                  value={visitorsCount}
                  onChange={(e) => setVisitorsCount(parseInt(e.target.value))}
                  className="w-full accent-[#C4953A] cursor-pointer"
                />
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-[#241710] mb-1">
                  Votre nom complet *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#8B6236] absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="Ex: Christian Kouamé"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-[#F6F2E7] rounded-xl pl-10 pr-3 py-2.5 text-xs text-[#241710] focus:outline-hidden focus:ring-2 focus:ring-[#C4953A]"
                  />
                </div>
              </div>

              {/* Email & Phone WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#241710] mb-1">
                    Adresse email *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#8B6236] absolute left-3.5 top-3" />
                    <input
                      type="email"
                      required
                      placeholder="contact@domaine.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                      placeholder="+225 07 00 00 00"
                      value={phoneWhatsapp}
                      onChange={(e) => setPhoneWhatsapp(e.target.value)}
                      className="w-full bg-[#F6F2E7] rounded-xl pl-10 pr-3 py-2.5 text-xs text-[#241710] focus:outline-hidden focus:ring-2 focus:ring-[#C4953A]"
                    />
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-semibold text-[#241710] mb-1">
                  Œuvres d'intérêt / Projets de commande (Facultatif)
                </label>
                <textarea
                  rows={2}
                  placeholder="Précisez vos attentes ou votre intérêt pour des œuvres particulières..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-[#F6F2E7] rounded-xl p-3 text-xs text-[#241710] focus:outline-hidden focus:ring-2 focus:ring-[#C4953A] resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#241710] hover:bg-[#3E2519] text-[#F6F2E7] font-bold text-xs uppercase tracking-wider py-4 rounded-xl shadow-lg transition-all cursor-pointer"
              >
                Envoyer la demande de rendez-vous
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
