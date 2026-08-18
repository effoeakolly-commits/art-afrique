"use client";

import { useState, useTransition } from "react";
import { ajouterCommentaire } from "@/lib/actions";
import { useRouter } from "next/navigation";
import type { Commentaire } from "@/lib/types";

interface Props {
  oeuvreId: string;
  commentaires: Commentaire[];
  estConnecte: boolean;
}

export default function SectionCommentaires({
  oeuvreId,
  commentaires,
  estConnecte,
}: Props) {
  const [contenu, setContenu] = useState("");
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!contenu.trim()) return;

    const formData = new FormData();
    formData.set("oeuvre_id", oeuvreId);
    formData.set("contenu", contenu);

    setContenu("");
    startTransition(() => {
      ajouterCommentaire(formData);
      router.refresh();
    });
  }

  return (
    <div className="mt-8">
      <h2 className="mb-4 text-xl font-semibold">
        Commentaires ({commentaires.length})
      </h2>

      {/* Formulaire de commentaire */}
      <form onSubmit={handleSubmit} className="mb-6">
        {estConnecte ? (
          <div className="flex gap-3">
            <input
              type="text"
              value={contenu}
              onChange={(e) => setContenu(e.target.value)}
              placeholder="Ajouter un commentaire..."
              className="flex-1 rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <button
              type="submit"
              disabled={pending || !contenu.trim()}
              className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-primary-dark disabled:opacity-50"
            >
              Envoyer
            </button>
          </div>
        ) : (
          <p className="rounded-lg bg-black/5 px-4 py-3 text-sm text-foreground/60">
            <a href="/connexion" className="font-medium text-primary hover:underline">
              Connectez-vous
            </a>{" "}
            pour laisser un commentaire.
          </p>
        )}
      </form>

      {/* Liste des commentaires */}
      {commentaires.length > 0 ? (
        <div className="space-y-4">
          {commentaires.map((commentaire) => (
            <div key={commentaire.id} className="rounded-xl bg-white p-4">
              <div className="mb-1 flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary uppercase">
                  {commentaire.auteur?.nom_complet?.charAt(0) || "?"}
                </span>
                <span className="text-sm font-medium">
                  {commentaire.auteur?.nom_complet || "Utilisateur"}
                </span>
                <span className="text-xs text-foreground/40">
                  {new Date(commentaire.created_at).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
              <p className="text-sm text-foreground/80">{commentaire.contenu}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-foreground/50">
          Aucun commentaire pour le moment. Soyez le premier à commenter !
        </p>
      )}
    </div>
  );
}