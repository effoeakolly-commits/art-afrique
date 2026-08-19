import React, { useState } from 'react';
import { Artwork } from '../types';
import { ShoppingBag, X, ShieldCheck, CreditCard, Smartphone, Building2, Check, Lock } from 'lucide-react';

interface AcquisitionModalProps {
  isOpen: boolean;
  onClose: () => void;
  artwork: Artwork | null;
}

export const AcquisitionModal: React.FC<AcquisitionModalProps> = ({
  isOpen,
  onClose,
  artwork
}) => {
  const [collectorName, setCollectorName] = useState('');
  const [email, setEmail] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [country, setCountry] = useState('Sénégal');
  const [paymentMethod, setPaymentMethod] = useState<'mobile_money' | 'card' | 'bank_transfer'>('mobile_money');
  const [mobileMoneyProvider, setMobileMoneyProvider] = useState<'wave' | 'orange' | 'mtn' | 'mpesa'>('wave');
  const [phoneNumber, setPhoneNumber] = useState('+221 77 123 45 67');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen || !artwork) return null;

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 2500);
  };

  const formattedPrice = artwork.priceFcfa.toLocaleString('fr-FR') + ' FCFA';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-fade-in" id="acquisition-order-modal">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden text-[#2F241A] max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="p-6 border-b border-[#F0EAE1] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#241710] text-[#D6B26A] flex items-center justify-center shadow-md">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-title text-xl sm:text-2xl font-bold text-[#241710]">
                Acquisition & Règlement Sécurisé
              </h3>
              <p className="text-xs text-[#8B6236]">
                Certificat d'authenticité inclus • Remise directe convenue avec l'artiste
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
                Protocole d'Acquisition Engagé !
              </h4>
              <p className="text-xs sm:text-sm text-[#2F241A]/80 max-w-md mx-auto leading-relaxed">
                Votre demande d'acquisition pour <strong>« {artwork.title} »</strong> d'un montant de <strong>{formattedPrice}</strong> a été enregistrée en séquestre sécurisé.
              </p>
              <div className="p-4 rounded-2xl bg-[#F6F2E7] text-left text-xs space-y-1">
                <p>• <strong>Artiste notifié :</strong> {artwork.artistName}</p>
                <p>• <strong>Attribution :</strong> Certificat physique n°NK-{artwork.id.toUpperCase()}-2026</p>
                <p>• <strong>Coordination de remise :</strong> L'artiste prendra contact sous 12h pour finaliser la mise à disposition.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleConfirm} className="space-y-4">
              
              {/* Artwork Mini Summary Row */}
              <div className="p-4 rounded-2xl bg-[#F6F2E7] flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={artwork.imageUrl}
                    alt={artwork.title}
                    className="w-14 h-14 rounded-xl object-cover shadow-sm shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="min-w-0">
                    <h4 className="font-serif-title font-bold text-sm text-[#241710] truncate">
                      {artwork.title}
                    </h4>
                    <p className="text-xs text-[#8B6236] truncate">
                      {artwork.artistName} • {artwork.origin}
                    </p>
                    <p className="text-[10px] text-[#2F241A]/70 truncate">
                      {artwork.medium || artwork.category} ({artwork.dimensions})
                    </p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[10px] uppercase font-bold text-[#8B6236] block">
                    PRIX TOTAL
                  </span>
                  <span className="font-serif-title font-bold text-sm sm:text-base text-[#241710]">
                    {formattedPrice}
                  </span>
                </div>
              </div>

              {/* Collector Details */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold text-[#8B6236] mb-2">
                  Informations du collectionneur
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Nom complet / Entité juridique *"
                    value={collectorName}
                    onChange={(e) => setCollectorName(e.target.value)}
                    className="w-full bg-[#F6F2E7] rounded-xl px-4 py-2.5 text-xs text-[#241710] focus:outline-hidden focus:ring-2 focus:ring-[#C4953A]"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Adresse email *"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#F6F2E7] rounded-xl px-4 py-2.5 text-xs text-[#241710] focus:outline-hidden focus:ring-2 focus:ring-[#C4953A]"
                  />
                </div>
              </div>

              {/* Delivery / Handover Destination */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold text-[#8B6236] mb-2">
                  Destination pour mise à disposition
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Ville & Adresse indicative *"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full bg-[#F6F2E7] rounded-xl px-4 py-2.5 text-xs text-[#241710] focus:outline-hidden focus:ring-2 focus:ring-[#C4953A]"
                  />
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-[#F6F2E7] rounded-xl px-4 py-2.5 text-xs text-[#241710] font-medium focus:outline-hidden focus:ring-2 focus:ring-[#C4953A] cursor-pointer"
                  >
                    <option value="Sénégal">Sénégal</option>
                    <option value="Côte d'Ivoire">Côte d'Ivoire</option>
                    <option value="Ghana">Ghana</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="Mali">Mali</option>
                    <option value="Bénin">Bénin</option>
                    <option value="Togo">Togo</option>
                    <option value="Cameroun">Cameroun</option>
                    <option value="France">France</option>
                    <option value="International">Autre (International)</option>
                  </select>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold text-[#8B6236] mb-2">
                  Moyen de règlement
                </label>
                
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('mobile_money')}
                    className={`p-3 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      paymentMethod === 'mobile_money'
                        ? 'bg-[#241710] text-[#F6F2E7] shadow-md'
                        : 'bg-[#F6F2E7] text-[#2F241A] hover:bg-[#EDE6D7]'
                    }`}
                  >
                    <Smartphone className="w-5 h-5 text-[#D6B26A]" />
                    <span className="text-[11px] font-bold">Mobile Money</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'bg-[#241710] text-[#F6F2E7] shadow-md'
                        : 'bg-[#F6F2E7] text-[#2F241A] hover:bg-[#EDE6D7]'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-[#D6B26A]" />
                    <span className="text-[11px] font-bold">Carte (Visa/MC)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bank_transfer')}
                    className={`p-3 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      paymentMethod === 'bank_transfer'
                        ? 'bg-[#241710] text-[#F6F2E7] shadow-md'
                        : 'bg-[#F6F2E7] text-[#2F241A] hover:bg-[#EDE6D7]'
                    }`}
                  >
                    <Building2 className="w-5 h-5 text-[#D6B26A]" />
                    <span className="text-[11px] font-bold">Virement</span>
                  </button>
                </div>

                {/* Sub Options for Mobile Money */}
                {paymentMethod === 'mobile_money' && (
                  <div className="p-4 rounded-2xl bg-[#F6F2E7] space-y-3">
                    <div className="flex gap-2 flex-wrap">
                      {(['Orange', 'MTN', 'Wave', 'M-Pesa'] as const).map((prov) => {
                        const val = prov.toLowerCase() as 'orange' | 'mtn' | 'wave' | 'mpesa';
                        const isSelected = mobileMoneyProvider === val;
                        return (
                          <button
                            key={prov}
                            type="button"
                            onClick={() => setMobileMoneyProvider(val)}
                            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-[#241710] text-[#F6F2E7] shadow-xs'
                                : 'bg-white text-[#241710] hover:bg-white/80'
                            }`}
                          >
                            {prov}
                          </button>
                        );
                      })}
                    </div>

                    <div>
                      <label className="block text-[10px] font-semibold text-[#8B6236] mb-1">
                        Numéro de téléphone Mobile Money
                      </label>
                      <input
                        type="tel"
                        required
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full bg-white rounded-xl px-3.5 py-2 text-xs font-mono text-[#241710] focus:outline-hidden focus:ring-2 focus:ring-[#C4953A]"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'card' && (
                  <div className="p-4 rounded-2xl bg-[#F6F2E7] text-xs text-[#2F241A]/80 space-y-2">
                    <p>Redirection vers la passerelle sécurisée 3D-Secure (Visa / Mastercard internationales acceptées sans frais de change).</p>
                  </div>
                )}

                {paymentMethod === 'bank_transfer' && (
                  <div className="p-4 rounded-2xl bg-[#F6F2E7] text-xs text-[#2F241A]/80 space-y-1">
                    <p className="font-semibold text-[#241710]">Compte séquestre officiel N'KORA UEMOA / SWIFT :</p>
                    <p className="font-mono text-[11px]">IBAN: SN13 0100 1000 0012 3456 7890 12</p>
                    <p>Référence à indiquer : NK-{artwork.id.toUpperCase()}</p>
                  </div>
                )}
              </div>

              {/* Escrow Guarantee Pill */}
              <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-900 flex items-center gap-2.5 text-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Paiement direct sécurisé et séquestre garanti jusqu'à confirmation de conformité.</span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#241710] hover:bg-[#3E2519] text-[#F6F2E7] font-bold text-xs uppercase tracking-wider py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Lock className="w-4 h-4 text-[#D6B26A]" />
                Confirmer l'acquisition ({formattedPrice})
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
