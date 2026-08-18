"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { CATEGORIES, PAYS_AFRIQUE } from "@/lib/types";

export default function Filtres() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const categorieActive = searchParams.get("categorie") || "";
  const paysActif = searchParams.get("pays") || "";

  function construireUrl(params: Record<string, string>) {
    const url = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([cle, valeur]) => {
      if (valeur) {
        url.set(cle, valeur);
      } else {
        url.delete(cle);
      }
    });
    return `${pathname}?${url.toString()}`;
  }

  return (
    <div className="space-y-4">
      {/* Filtres par catégorie */}
      <div className="flex flex-wrap items-center gap-2">
        <Link
          href={construireUrl({ categorie: "" })}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
            !categorieActive
              ? "bg-primary text-white"
              : "bg-white text-foreground/70 hover:bg-black/5"
          }`}
        >
          Tout
        </Link>
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.value}
            href={construireUrl({ categorie: cat.value })}
            className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize transition ${
              categorieActive === cat.value
                ? "bg-primary text-white"
                : "bg-white text-foreground/70 hover:bg-black/5"
            }`}
          >
            {cat.label}
          </Link>
        ))}
      </div>

      {/* Filtre par pays */}
      <div>
        <label
          htmlFor="pays"
          className="mb-1.5 block text-sm font-medium text-foreground/60"
        >
          Filtrer par pays
        </label>
        <select
          id="pays"
          value={paysActif}
          onChange={(e) => {
            const url = new URLSearchParams(searchParams.toString());
            if (e.target.value) {
              url.set("pays", e.target.value);
            } else {
              url.delete("pays");
            }
            window.location.href = `${pathname}?${url.toString()}`;
          }}
          className="w-full max-w-xs rounded-lg border border-black/10 bg-white px-4 py-2 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        >
          <option value="">Tous les pays</option>
          {PAYS_AFRIQUE.map((pays) => (
            <option key={pays} value={pays}>
              {pays}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}