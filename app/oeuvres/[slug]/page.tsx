import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ArrowLeft, ShieldCheck, ShoppingCart } from "lucide-react";
import type { Commentaire, Oeuvre } from "@/lib/types";
import BoutonLike from "@/components/BoutonLike";
import SectionCommentaires from "@/components/SectionCommentaires";

export const dynamic = "force-dynamic";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("fr-FR").format(price) + " FCFA";

export default async function PageDetailOeuvre(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const supabase = await createClient();

  // Récupérer l'utilisateur connecté
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await supabase
    .from("artworks")
    .select("*, artiste:artists(display_name, country, city, profile_image_url, bio)")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (!data) notFound();

  // Vérifier si l'utilisateur a déjà liké cette œuvre
  let estAime = false;
  if (user) {
    const { data: likeExistant } = await supabase
      .from("artwork_likes")
      .select("id")
      .eq("artwork_id", data.id)
      .eq("user_id", user.id)
      .maybeSingle();
    estAime = !!likeExistant;
  }

  // Récupérer les commentaires de l'œuvre
  const { data: commentairesData } = await supabase
    .from("comments")
    .select("*, auteur:profiles(first_name, last_name)")
    .eq("artwork_id", data.id)
    .order("created_at", { ascending: false });

  const commentaires: Commentaire[] = (commentairesData || []).map((c: any) => ({
    id: c.id,
    artwork_id: c.artwork_id,
    author_id: c.author_id,
    content: c.content,
    created_at: c.created_at,
    auteur: c.auteur || undefined,
  }));

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

            {/* Bouton like + prix */}
            <div className="flex items-center justify-between">
              <BoutonLike
                oeuvreId={oeuvre.id}
                estAime={estAime}
                nombreLikes={oeuvre.likes_count}
                estConnecte={!!user}
              />

              <span className="font-serif-title font-bold text-2xl text-[#241710]">
                {formatPrice(oeuvre.price_fcfa)}
              </span>
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
                href={`/commande`}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-[#A67123] hover:bg-[#8F5F1B] text-white font-bold text-xs py-3 rounded-xl transition-all shadow-md"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Ajouter au panier</span>
              </Link>
              <Link
                href={`/artistes/${oeuvre.artist_id}`}
                className="flex-1 bg-[#FAF7F0] border border-[#E8DFCE] hover:bg-[#F2EADA] text-[#241710] font-medium text-xs py-3 rounded-xl text-center transition-colors"
              >
                Voir l'artiste
              </Link>
            </div>

            {/* Vidéo si disponible */}
            {oeuvre.video_url && (
              <div className="pt-4">
                <video
                  src={oeuvre.video_url}
                  controls
                  className="w-full rounded-2xl shadow-lg"
                  poster={oeuvre.primary_image_url}
                >
                  Votre navigateur ne supporte pas la vidéo.
                </video>
              </div>
            )}
          </div>
        </div>

        {/* Section commentaires */}
        <SectionCommentaires
          oeuvreId={oeuvre.id}
          commentaires={commentaires}
          estConnecte={!!user}
        />
      </div>
    </div>
  );
}
