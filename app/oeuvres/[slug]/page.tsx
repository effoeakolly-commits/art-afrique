import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ArrowLeft, Truck, ShieldCheck, Heart } from "lucide-react";
import type { Oeuvre } from "@/lib/types";

export const dynamic = "force-dynamic";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("fr-FR").format(price) + " FCFA";

export default async function PageDetailOeuvre(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const supabase = await createClient();

  const { data } = await supabase
    .from("artworks")
    .select("*, artiste:artists(display_name, country, city, profile_image_url, bio)")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (!data) notFound();

  const oeuvre: Oeuvre = {
    ...data,
    artiste: { ...data.artiste, display_name: data.artiste?.display_name || "Artiste" },
  };

  return (
    <div className="bg-[#FAF7F0] min-h-screen py-8 sm:py-12 text-[#2F241A]" id="artwork-detail-page">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <Link href="/catalogue" className="inline-flex items-center gap-2 text-xs font-medium text-[#2F241A]/80 hover:text-[#A67123] transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Retour au catalogue
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Image */}
          <div className="rounded-3xl overflow-hidden bg-[#241710] shadow-xl border border-[#E8DFCE]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={oeuvre.primary_image_url} alt={oeuvre.title} className="w-full h-[500px] object-cover" />
          </div>

          {/* Détails */}
          <div className="space-y-6">
            <div className="space-y-3">
              <span className="inline-block bg-[#241710] text-[#D6B26A] text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full">
                {oeuvre.category}
              </span>
              <h1 className="font-serif-title text-3xl sm:text-4xl font-bold text-[#241710]">
                {oeuvre.title}
              </h1>
              <div className="flex items-center gap-3 text-sm text-[#8B6236]">
                <span className="font-bold">{oeuvre.artiste?.display_name}</span>
                <span>•</span>
                <span>{oeuvre.origin_country}</span>
                {oeuvre.year && (
                  <>
                    <span>•</span>
                    <span>{oeuvre.year}</span>
                  </>
                )}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#E8DFCE] flex items-center justify-between">
              <div>
                <span className="block text-[10px] uppercase font-bold text-[#8B6236]">PRIX TOTAL</span>
                <span className="font-serif-title font-bold text-2xl text-[#241710]">
                  {formatPrice(oeuvre.price_fcfa)}
                </span>
              </div>
              <span className="text-xs font-medium text-[#2D7A4D] bg-[#EBF5EE] px-3 py-1.5 rounded-full">
                {oeuvre.is_available ? "Disponible" : "Vendue"}
              </span>
            </div>

            {oeuvre.description && (
              <div className="space-y-2">
                <h3 className="font-serif-title text-lg font-bold text-[#241710]">Description</h3>
                <p className="text-sm text-[#2F241A]/80 leading-relaxed">{oeuvre.description}</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 text-xs">
              {oeuvre.medium && (
                <div className="p-3 rounded-xl bg-white border border-[#E8DFCE]">
                  <span className="block text-[10px] uppercase font-bold text-[#8B6236]">Matériau</span>
                  <span className="text-[#241710] font-medium">{oeuvre.medium}</span>
                </div>
              )}
              {oeuvre.dimensions && (
                <div className="p-3 rounded-xl bg-white border border-[#E8DFCE]">
                  <span className="block text-[10px] uppercase font-bold text-[#8B6236]">Dimensions</span>
                  <span className="text-[#241710] font-medium">{oeuvre.dimensions}</span>
                </div>
              )}
              {oeuvre.origin_country && (
                <div className="p-3 rounded-xl bg-white border border-[#E8DFCE]">
                  <span className="block text-[10px] uppercase font-bold text-[#8B6236]">Origine</span>
                  <span className="text-[#241710] font-medium">{oeuvre.origin_country}</span>
                </div>
              )}
              {oeuvre.certificate_number && (
                <div className="p-3 rounded-xl bg-white border border-[#E8DFCE]">
                  <span className="block text-[10px] uppercase font-bold text-[#8B6236]">Certificat</span>
                  <span className="text-[#241710] font-medium">{oeuvre.certificate_number}</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 text-[11px] text-[#2D7A4D] bg-[#EBF5EE] p-3 rounded-xl">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Authenticité garantie • Paiement sécurisé sous séquestre • Livraison coordonnée avec l'artiste</span>
            </div>

            <div className="flex gap-3 pt-2">
              <Link
                href={`/artistes/${oeuvre.artist_id}`}
                className="flex-1 bg-[#FAF7F0] border border-[#E8DFCE] hover:bg-[#F2EADA] text-[#241710] font-medium text-xs py-3 rounded-xl text-center transition-colors"
              >
                Voir l'artiste
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}