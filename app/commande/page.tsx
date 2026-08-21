// ============================================
// N'KORA — Page de commande (checkout)
// ============================================
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/store/cart-store";
import { createClient } from "@/lib/supabase/client";
import { ChevronLeft, MapPin, User, Phone, Mail } from "lucide-react";

export default function PageCommande() {
  const router = useRouter();
  const { items, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    buyer_name: "",
    buyer_email: "",
    buyer_phone: "",
    shipping_address: "",
    shipping_country: "",
    shipping_city: "",
    payment_method: "mobile_money_wave",
  });

  const total = items.reduce(
    (sum, item) => sum + Number(item.price_fcfa || 0),
    0
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) {
      setError("Votre panier est vide.");
      return;
    }

    if (!form.buyer_name || !form.buyer_email || !form.buyer_phone || !form.shipping_address) {
      setError("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      // 1. Créer la commande
      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .insert({
          buyer_id: user?.id || null,
          buyer_name: form.buyer_name,
          buyer_email: form.buyer_email,
          buyer_phone: form.buyer_phone,
          shipping_address: form.shipping_address,
          shipping_country: form.shipping_country,
          shipping_city: form.shipping_city,
          total_amount_fcfa: total,
          payment_method: form.payment_method,
        })
        .select()
        .single();

      if (orderError || !orderData) {
        throw new Error(orderError?.message || "Impossible de créer la commande.");
      }

      // 2. Créer les lignes de commande pour chaque article du panier
      const orderItems = items.map((item) => ({
        order_id: orderData.id,
        artwork_id: item.id,
        artist_id: item.artist_id,
        unit_price_fcfa: Number(item.price_fcfa || 0),
        quantity: 1,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) {
        throw new Error(itemsError.message);
      }

      // 3. Vider le panier
      clearCart();

      router.push(`/?message=commande-reussie`);
    } catch (err: any) {
      setError(err?.message || "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background py-8">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-foreground/60 hover:text-foreground"
          >
            <ChevronLeft className="w-4 h-4" />
            Retour à l'accueil
          </Link>
          <h1 className="font-serif-title text-3xl font-bold text-foreground mt-2">
            Finaliser la commande
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Formulaire de livraison */}
          <div className="space-y-6">
            <h2 className="font-serif-title text-xl font-semibold text-foreground">
              Informations de livraison
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium text-foreground/70">
                    Nom complet *
                  </label>
                  <div className="mt-1 relative">
                    <User className="absolute left-3 top-2.5 w-4 h-4 text-[#A67123]" />
                    <input
                      type="text"
                      name="buyer_name"
                      value={form.buyer_name}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-3 py-2.5 text-sm border border-[#E8DFCE] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#A67123]/20"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground/70">
                    Email *
                  </label>
                  <div className="mt-1 relative">
                    <Mail className="absolute left-3 top-2.5 w-4 h-4 text-[#A67123]" />
                    <input
                      type="email"
                      name="buyer_email"
                      value={form.buyer_email}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-3 py-2.5 text-sm border border-[#E8DFCE] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#A67123]/20"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground/70">
                  Téléphone *
                </label>
                <div className="mt-1 relative">
                  <Phone className="absolute left-3 top-2.5 w-4 h-4 text-[#A67123]" />
                  <input
                    type="tel"
                    name="buyer_phone"
                    value={form.buyer_phone}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-3 py-2.5 text-sm border border-[#E8DFCE] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#A67123]/20"
                    placeholder="+221 XX XX XX XX"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground/70">
                  Adresse de livraison *
                </label>
                <div className="mt-1 relative">
                  <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-[#A67123]" />
                  <input
                    type="text"
                    name="shipping_address"
                    value={form.shipping_address}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-3 py-2.5 text-sm border border-[#E8DFCE] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#A67123]/20"
                    placeholder="Rue, quartier, ville"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium text-foreground/70">
                    Pays *
                  </label>
                  <select
                    name="shipping_country"
                    value={form.shipping_country}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2.5 text-sm border border-[#E8DFCE] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#A67123]/20"
                  >
                    <option value="">Choisir un pays</option>
                    <option value="Sénégal">Sénégal</option>
                    <option value="Côte d'Ivoire">Côte d'Ivoire</option>
                    <option value="Togo">Togo</option>
                    <option value="Mali">Mali</option>
                    <option value="Burkina Faso">Burkina Faso</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground/70">
                    Ville *
                  </label>
                  <input
                    type="text"
                    name="shipping_city"
                    value={form.shipping_city}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2.5 text-sm border border-[#E8DFCE] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#A67123]/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground/70">
                  Mode de paiement
                </label>
                <select
                  name="payment_method"
                  value={form.payment_method}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 text-sm border border-[#E8DFCE] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#A67123]/20"
                >
                  <option value="mobile_money_wave">Wave (Mobile Money)</option>
                  <option value="orange_money">Orange Money</option>
                  <option value="mtn_momo">MTN Mobile Money</option>
                  <option value="card_stripe">Carte bancaire (Stripe)</option>
                  <option value="bank_wire">Virement bancaire</option>
                </select>
              </div>

              {error && (
                <div className="bg-[#FFF5F5] border border-[#FED7D7] text-[#9B2C2C] text-xs p-3 rounded-lg">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || items.length === 0}
                className="w-full gold-gradient-btn text-white text-xs font-bold py-3.5 rounded-xl transition-all shadow-md disabled:opacity-50"
              >
                {loading ? "Traitement..." : "Passer la commande"}
              </button>
            </form>
          </div>

          {/* Récapitulatif du panier */}
          <div className="space-y-6">
            <h2 className="font-serif-title text-xl font-semibold text-foreground">
              Récapitulatif
            </h2>

            <div className="space-y-4">
              {items.length === 0 ? (
                <p className="text-center text-sm text-foreground/50 py-8">
                  Votre panier est vide.
                </p>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3 items-center bg-white rounded-xl border border-[#E8DFCE] p-3"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.primary_image_url || "/images/placeholder.png"}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-sm text-foreground">
                        {item.title}
                      </h3>
                      <p className="text-xs text-foreground/50">
                        {Number(item.price_fcfa || 0).toLocaleString("fr-FR")} FCFA
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="border-t border-[#E8DFCE] pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-foreground/60">Sous-total</span>
                <span className="font-medium text-foreground">
                  {total.toLocaleString("fr-FR")} FCFA
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-foreground/60">Livraison</span>
                <span className="font-medium text-foreground">
                  À définir
                </span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t border-[#E8DFCE] pt-3">
                <span className="text-foreground">Total</span>
                <span className="text-[#A67123]">
                  {total.toLocaleString("fr-FR")} FCFA
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
