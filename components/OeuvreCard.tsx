import Link from "next/link";
import type { Oeuvre } from "@/lib/types";

export default function OeuvreCard({ oeuvre }: { oeuvre: Oeuvre }) {
  const initiale = oeuvre.artiste?.nom_complet?.charAt(0) || "?";

  return (
    <div className="masonry-item group">
      <Link
        href={`/oeuvres/${oeuvre.id}`}
        className="block overflow-hidden rounded-2xl bg-white shadow-sm transition hover:shadow-lg"
      >
        <div className="relative overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={oeuvre.image_url}
            alt={oeuvre.titre}
            className="w-full object-cover transition duration-300 group-hover:scale-105"
            loading="lazy"
          />
          {/* Badge catégorie */}
          <span className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur capitalize">
            {oeuvre.categorie}
          </span>
        </div>

        <div className="p-4">
          <h3 className="font-semibold leading-tight group-hover:text-primary">
            {oeuvre.titre}
          </h3>

          {oeuvre.artiste && (
            <div className="mt-2 flex items-center gap-2">
              {oeuvre.artiste.photo_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={oeuvre.artiste.photo_url}
                  alt={`Photo de ${oeuvre.artiste.nom_complet}`}
                  className="h-6 w-6 rounded-full object-cover"
                />
              ) : (
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary uppercase">
                  {initiale}
                </span>
              )}
              <span className="text-sm text-foreground/60">
                {oeuvre.artiste.nom_complet}
              </span>
            </div>
          )}

          {oeuvre.coups_de_coeur_count !== undefined && (
            <p className="mt-2 text-sm text-foreground/40">
              ❤️ {oeuvre.coups_de_coeur_count}{" "}
              {oeuvre.coups_de_coeur_count > 1 ? "coups de cœur" : "coup de cœur"}
            </p>
          )}
        </div>
      </Link>
    </div>
  );
}