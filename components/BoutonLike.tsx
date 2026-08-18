"use client";

import { useState, useTransition } from "react";
import { ajouterCoupDeCoeur, retirerCoupDeCoeur } from "@/lib/actions";
import { useRouter } from "next/navigation";

interface Props {
  oeuvreId: string;
  estAime: boolean;
  nombreLikes: number;
  estConnecte: boolean;
}

export default function BoutonLike({
  oeuvreId,
  estAime,
  nombreLikes,
  estConnecte,
}: Props) {
  const [aime, setAime] = useState(estAime);
  const [compteur, setCompteur] = useState(nombreLikes);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  function handleClick() {
    if (!estConnecte) {
      router.push("/connexion");
      return;
    }

    const nouveauAime = !aime;
    setAime(nouveauAime);
    setCompteur((c) => c + (nouveauAime ? 1 : -1));

    startTransition(() => {
      if (nouveauAime) {
        ajouterCoupDeCoeur(oeuvreId);
      } else {
        retirerCoupDeCoeur(oeuvreId);
      }
    });
  }

  return (
    <button
      onClick={handleClick}
      disabled={pending}
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
        aime
          ? "bg-red-50 text-red-600"
          : "bg-black/5 text-foreground/70 hover:bg-black/10"
      }`}
      title={aime ? "Retirer mon coup de cœur" : "Ajouter un coup de cœur"}
    >
      <span className={`text-lg ${aime ? "animate-bounce" : ""}`}>
        {aime ? "❤️" : "🤍"}
      </span>
      <span>{compteur}</span>
    </button>
  );
}