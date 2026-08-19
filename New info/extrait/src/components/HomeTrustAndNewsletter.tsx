import React, { useState } from 'react';
import { Shield, Users, CreditCard, Truck, Check } from 'lucide-react';

export const HomeTrustAndNewsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail('');
    }, 3000);
  };

  return (
    <div className="w-full text-[#2F241A]" id="home-trust-and-newsletter">
      
      {/* =========================================================================
          1. DARK TRUST STRIP (Exact match to Screenshot 2 Top)
         ========================================================================= */}
      <div className="bg-[#241710] text-[#E8D6B1] py-10 sm:py-12 border-y border-[#3E2519]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6 text-center">
            
            {/* Feature 1: Authenticité */}
            <div className="flex flex-col items-center space-y-2">
              <Shield className="w-6 h-6 text-[#C4953A] stroke-[1.75]" />
              <h4 className="font-serif-title text-sm sm:text-base font-bold text-[#FAF7F0]">
                Authenticité
              </h4>
              <p className="text-xs text-[#E8D6B1]/75 font-light">
                Œuvres authentiques et certifiées
              </p>
            </div>

            {/* Feature 2: Artistes talentueux */}
            <div className="flex flex-col items-center space-y-2">
              <Users className="w-6 h-6 text-[#C4953A] stroke-[1.75]" />
              <h4 className="font-serif-title text-sm sm:text-base font-bold text-[#FAF7F0]">
                Artistes talentueux
              </h4>
              <p className="text-xs text-[#E8D6B1]/75 font-light">
                Soutenez les artistes africains
              </p>
            </div>

            {/* Feature 3: Paiement sécurisé */}
            <div className="flex flex-col items-center space-y-2">
              <CreditCard className="w-6 h-6 text-[#C4953A] stroke-[1.75]" />
              <h4 className="font-serif-title text-sm sm:text-base font-bold text-[#FAF7F0]">
                Paiement sécurisé
              </h4>
              <p className="text-xs text-[#E8D6B1]/75 font-light">
                Achetez en toute confiance
              </p>
            </div>

            {/* Feature 4: Livraison fiable */}
            <div className="flex flex-col items-center space-y-2">
              <Truck className="w-6 h-6 text-[#C4953A] stroke-[1.75]" />
              <h4 className="font-serif-title text-sm sm:text-base font-bold text-[#FAF7F0]">
                Livraison fiable
              </h4>
              <p className="text-xs text-[#E8D6B1]/75 font-light">
                Livraison sécurisée dans le monde entier
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* =========================================================================
          2. PATTERNED NEWSLETTER BOX (Exact match to Screenshot 2 Bottom)
         ========================================================================= */}
      <div className="relative bg-[#F6F0E4] py-16 sm:py-24 overflow-hidden border-b border-[#E8DFCE]">
        
        {/* Subtle Honeycomb / African Geometric Vector Watermark Pattern */}
        <div 
          className="absolute inset-0 opacity-25 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='83.138' viewBox='0 0 48 83.138'%3E%3Cpath d='M24 0l24 13.856v27.713L24 55.426 0 41.569V13.856L24 0zm0 83.138l24-13.856V41.569L24 55.426 0 41.569v27.713L24 83.138z' fill='none' stroke='%23C4953A' stroke-width='0.8' stroke-opacity='0.4'/%3E%3C/svg%3E")`,
            backgroundSize: '48px 83.138px'
          }}
        />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          
          <div className="space-y-2">
            <div className="text-xs uppercase tracking-[0.25em] text-[#C4953A] font-semibold">
              — RESTEZ INFORMÉ —
            </div>

            <h3 className="font-serif-title text-3xl sm:text-4xl lg:text-5xl font-normal text-[#241710] tracking-tight">
              Rejoignez la communauté N'KORA
            </h3>

            <p className="text-xs sm:text-sm text-[#2F241A]/75 max-w-xl mx-auto font-light leading-relaxed">
              Recevez en avant-première les nouvelles œuvres, les expositions et les actualités des artistes.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubscribe} className="max-w-md mx-auto pt-2">
            {subscribed ? (
              <div className="p-3.5 bg-[#EBF5EE] text-[#2D7A4D] rounded-xl text-xs flex items-center justify-center gap-2 border border-[#C6E6D3] shadow-xs">
                <Check className="w-4 h-4" />
                <span>Merci ! Vous êtes désormais abonné(e) à la communauté N'KORA.</span>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre adresse e-mail"
                  className="flex-1 bg-white border border-[#E8DFCE] rounded-xl px-4 py-3 text-xs text-[#241710] placeholder-[#2F241A]/40 focus:outline-none focus:border-[#C4953A] shadow-2xs"
                />

                <button
                  type="submit"
                  className="bg-[#C4953A] hover:bg-[#B3832B] text-white font-medium text-xs px-6 py-3 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                >
                  <span>S'inscrire</span>
                  <span>→</span>
                </button>
              </div>
            )}
          </form>

        </div>

      </div>

    </div>
  );
};
