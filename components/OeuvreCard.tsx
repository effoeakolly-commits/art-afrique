import Link from "next/link";
import type { Oeuvre } from "@/lib/types";

export default function OeuvreCard({ oeuvre }: { oeuvre: Oeuvre }) {
  const initiale = oeuvre.artiste?.display_name?.charAt(0) || "?";

  return (
    <div className="masonry-item group">
      <Link
        href={`/oeuvres/${oeuvre.id}`}
        className="block overflow-hidden rounded-2xl bg-white shadow-sm transition hover:shadow-lg"
      >
        <div className="relative overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={oeuvre.primary_image_url}
            alt={oeuvre.title}
            className="w-full object-cover transition duration-300 group-hover:scale-105"
            loading="lazy"
          />
          {/* Badge catégorie */}
          <span className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur capitalize">
            {oeuvre.category}
          </span>
        </div>

        <div className="p-4">
          <h3 className="font-semibold leading-tight group-hover:text-primary">
            {oeuvre.title}
          </h3>

          {oeuvre.artiste && (
            <div className="mt-2 flex items-center gap-2">
              {oeuvre.artiste.profile_image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={oeuvre.artiste.profile_image_url}
                  alt={`Photo de ${oeuvre.artiste.display_name}`}
                  className="h-6 w-6 rounded-full object-cover"
                />
              ) : (
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary uppercase">
                  {initiale}
                </span>
              )}
              <span className="text-sm text-foreground/60">
                {oeuvre.artiste.display_name}
              </span>
            </div>
          )}

          {oeuvre.likes_count !== undefined && (
            <p className="mt-2 text-sm text-foreground/40">
              ❤️ {oeuvre.likes_count}{" "}
              {oeuvre.likes_count > 1 ? "coups de cœur" : "coup de cœur"}
            </p>
          )}
        </div>
      </Link>
    </div>
  );
}