"use client";

import { useState, useTransition } from "react";
import { suivreArtiste, nePlusSuivre } from "@/lib/actions";
import { useRouter } from "next/navigation";

interface Props {
  artisteId: string;
  estSuivi: boolean;
  nombreAbonnes: number;
  estConnecte: boolean;
  estProprietaire: boolean;
}

export default function BoutonSuivre({
  artisteId,
  estSuivi,
  nombreAbonnes,
  estConnecte,
  estProprietaire,
}: Props) {
  const [suivi, setSuivi] = useState(estSuivi);
  const [compteur, setCompteur] = useState(nombreAbonnes);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  if (estProprietaire) {
    return (
      <p className="rounded-full bg-black/5 px-4 py-2 text-sm font-medium text-foreground/60">
        {compteur} abonné{compteur > 1 ? "s" : ""}
      </p>
    );
  }

  function handleClick() {
    if (!estConnecte) {
      router.push("/connexion");
      return;
    }

    const nouveauSuivi = !suivi;
    setSuivi(nouveauSuivi);
    setCompteur((c) => c + (nouveauSuivi ? 1 : -1));

    startTransition(() => {
      if (nouveauSuivi) {
        suivreArtiste(artisteId);
      } else {
        nePlusSuivre(artisteId);
      }
    });
  }

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleClick}
        disabled={pending}
        className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
          suivi
            ? "border border-black/10 text-foreground/70 hover:bg-black/5"
            : "bg-primary text-white hover:bg-primary-dark"
        }`}
      >
        {suivi ? "Suivi ✓" : "Suivre"}
      </button>
      <span className="text-sm text-foreground/50">
        {compteur} abonné{compteur > 1 ? "s" : ""}
      </span>
    </div>
  );
}