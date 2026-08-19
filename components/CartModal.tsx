"use client";

import Link from "next/link";
import { ShoppingBag, X, Trash2, ArrowRight, ShieldCheck } from "lucide-react";
import { useCartStore } from "@/lib/store/cart-store";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("fr-FR").format(price) + " FCFA";

export default function CartModal() {
  const items = useCartStore((state) => state.items);
  const isOpen = useCartStore((state) => state.isCartOpen);
  const closeCart = useCartStore((state) => state.closeCart);
  const removeItem = useCartStore((state) => state.removeItem);

  if (!isOpen) return null;

  const totalAmount = items.reduce((acc, item) => acc + item.price_fcfa, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fade-in" id="cart-drawer-modal">
      <div className="relative w-full max-w-lg bg-[#FAF7F0] rounded-3xl shadow-2xl overflow-hidden text-[#2F241A] max-h-[90vh] flex flex-col border border-[#E8DFCE]">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-white border-b border-[#E8DFCE] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#241710] text-[#D6B26A] flex items-center justify-center shadow-xs">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-title text-xl font-bold text-[#241710]">
                Mon Panier d'Œuvres
              </h3>
              <p className="text-xs text-[#2F241A]/70 font-light">
                {items.length} {items.length > 1 ? "œuvres sélectionnées" : "œuvre sélectionnée"}
              </p>
            </div>
          </div>

          <button
            onClick={closeCart}
            className="p-2 rounded-full text-[#8B6236] hover:bg-[#FAF7F0] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4">
          {items.length === 0 ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#EFE6D5] flex items-center justify-center mx-auto text-[#8B6236]">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <h4 className="font-serif-title text-xl font-bold text-[#241710]">
                Votre panier est vide
              </h4>
              <p className="text-xs text-[#2F241A]/70 max-w-xs mx-auto font-light">
                Explorez notre catalogue de pièces authentiques et ajoutez vos coups de cœur.
              </p>
              <Link
                href="/catalogue"
                onClick={closeCart}
                className="inline-block bg-[#A67123] hover:bg-[#8F5F1B] text-white text-xs font-medium px-5 py-2.5 rounded-xl cursor-pointer shadow-xs"
              >
                Explorer le catalogue
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-3.5 rounded-2xl border border-[#E8DFCE]/80 flex items-center justify-between gap-3 shadow-2xs"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.primary_image_url}
                      alt={item.title}
                      className="w-16 h-16 rounded-xl object-cover bg-[#241710] shrink-0"
                    />
                    <div className="min-w-0">
                      <h5 className="font-serif-title font-bold text-sm text-[#241710] truncate">
                        {item.title}
                      </h5>
                      <p className="text-xs text-[#8B6236] truncate">
                        {item.artiste?.display_name || "Artiste"} • {item.origin_country}
                      </p>
                      <p className="text-xs font-bold text-[#241710] pt-1">
                        {formatPrice(item.price_fcfa)}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    title="Supprimer du panier"
                    className="p-2 rounded-xl text-red-600/70 hover:text-red-700 hover:bg-red-50 transition-colors cursor-pointer shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {items.length > 0 && (
          <div className="p-5 sm:p-6 bg-white border-t border-[#E8DFCE] space-y-4">
            <div className="space-y-1.5 text-xs text-[#2F241A]/80 font-light">
              <div className="flex justify-between">
                <span>Sous-total</span>
                <span className="font-medium text-[#241710]">{formatPrice(totalAmount)}</span>
              </div>
              <div className="flex justify-between text-[#2D7A4D]">
                <span>Certificat d'authenticité</span>
                <span className="font-medium">Inclus</span>
              </div>
              <div className="flex justify-between text-[#2D7A4D]">
                <span>Coordination d'atelier & Remise</span>
                <span className="font-medium">Offerte</span>
              </div>
              <div className="flex justify-between text-sm sm:text-base font-bold text-[#241710] pt-2 border-t border-[#E8DFCE]/60">
                <span>Total</span>
                <span className="font-serif-title text-[#A67123]">{formatPrice(totalAmount)}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-[#2D7A4D] bg-[#EBF5EE] p-2.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Règlement sous séquestre sécurisé (Mobile Money, Carte, Virement).</span>
            </div>

            <div className="flex gap-3">
              <Link
                href="/catalogue"
                onClick={closeCart}
                className="flex-1 bg-[#FAF7F0] border border-[#E8DFCE] hover:bg-[#F2EADA] text-[#241710] font-medium text-xs py-3 rounded-xl transition-colors cursor-pointer text-center"
              >
                Continuer mes achats
              </Link>

              <Link
                href="/commande"
                onClick={closeCart}
                className="flex-1 bg-[#A67123] hover:bg-[#8F5F1B] text-white font-medium text-xs py-3 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Commander ({formatPrice(totalAmount)})</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}