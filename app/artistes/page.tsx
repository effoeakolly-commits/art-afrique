// ============================================
// N'KORA — Page liste des artistes
// ============================================
import Link from "next/link";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Artistes — N'KORA",
  description:
    "Découvrez les artistes africains d'exception de N'KORA. Chaque créateur raconte une histoire, chaque œuvre porte une culture.",
};

export default async function PageArtistes() {
  const supabase = await createClient();

  // Artistes approuvés avec leur compteur de followers
  const { data: artistes } = await supabase
    .from("artists")
    .select("*")
    .eq("is_approved", true)
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-[#241710] text-[#F6F2E7] py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif-title text-4xl font-bold sm:text-5xl">
            nos artistes
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-[#E8D6B1]/70 sm:text-base">
            Chaque artiste raconte une histoire, chaque œuvre porte une culture.
            Parcourez les créations d'artistes d'exception du continent.
          </p>
        </div>
      </section>

      {/* Grille d'artistes */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        {artistes && artistes.length > 0 ? (
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {artistes.map((artiste) => (
              <Link
                key={artiste.id}
                href={`/artistes/${artiste.id}`}
                className="group block overflow-hidden rounded-2xl bg-white shadow-sm transition hover:shadow-xl"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  {artiste.banner_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={artiste.banner_url}
                      alt={`Bannière de ${artiste.display_name}`}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#241710] via-[#4a2e1f] to-[#8B6236] text-4xl font-black uppercase text-white">
                      {artiste.display_name?.charAt(0) || "N"}
                    </div>
                  )}

                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/40 to-transparent p-5 opacity-0 transition duration-300 group-hover:opacity-100">
                    <h3 className="text-xl font-semibold text-white">
                      {artiste.display_name}
                    </h3>
                    {artiste.country && (
                      <p className="mt-1 text-sm text-white/85">
                        📍 {artiste.country}
                      </p>
                    )}
                    {artiste.bio && (
                      <p className="mt-2 line-clamp-3 text-xs text-white/70">
                        {artiste.bio}
                      </p>
                    )}
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-serif-title text-lg font-bold text-foreground">
                    {artiste.display_name}
                  </h3>
                  <p className="mt-1 text-xs text-foreground/50">
                    {artiste.disciplines?.slice(0, 2).join(", ") ||
                      "Artiste"}
                  </p>
                  <div className="mt-2 flex items-center justify-between text-xs text-foreground/50">
                    <span>❤️ {artiste.followers_count || 0} abonnés</span>
                    <span>🎨 Œuvres disponibles</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border-2 border-dashed border-black/10 bg-white/50 p-16 text-center">
            <p className="text-4xl">🎨</p>
            <h3 className="mt-4 text-xl font-semibold">
              Aucun artiste pour le moment
            </h3>
            <p className="mt-2 text-foreground/60">
              Revenez bientôt ! De nouveaux artistes rejoignent N'KORA.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
