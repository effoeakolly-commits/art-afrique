"use client";

import { useRef, useState } from "react";
import { mettreAJourProfil } from "@/lib/actions";
import { PAYS_AFRIQUE } from "@/lib/types";

interface Props {
  nomComplet: string;
  bio: string | null;
  pays: string | null;
  photoUrl: string | null;
  redirectTo?: string;
}

export default function FormulaireProfil({
  nomComplet,
  bio,
  pays,
  photoUrl,
  redirectTo = "/tableau-de-bord",
}: Props) {
  const [preview, setPreview] = useState<string | null>(photoUrl);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const fichier = e.target.files?.[0];
    if (fichier) {
      const url = URL.createObjectURL(fichier);
      setPreview(url);
    }
  }

  return (
    <form action={mettreAJourProfil} className="space-y-4">
      <input type="hidden" name="redirect_to" value={redirectTo} />

      {/* Photo de profil */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">
          Photo de profil
        </label>
        <div
          className="flex cursor-pointer items-center gap-4 rounded-lg border-2 border-dashed border-black/15 bg-white p-4 transition hover:border-primary"
          onClick={() => inputRef.current?.click()}
        >
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={preview}
              alt="Aperçu de la photo de profil"
              className="h-16 w-16 rounded-full object-cover"
            />
          ) : (
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-2xl">
              📷
            </span>
          )}
          <div>
            <p className="text-sm font-medium text-foreground">
              {preview ? "Changer la photo" : "Ajouter une photo"}
            </p>
            <p className="mt-0.5 text-xs text-foreground/40">
              PNG, JPG, WEBP — max 5 Mo
            </p>
          </div>
        </div>
        <input
          ref={inputRef}
          type="file"
          name="photo"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      <div>
        <label
          htmlFor="nom_complet"
          className="mb-1.5 block text-sm font-medium text-foreground"
        >
          Nom complet
        </label>
        <input
          id="nom_complet"
          name="nom_complet"
          type="text"
          required
          defaultValue={nomComplet}
          className="w-full rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div>
        <label
          htmlFor="bio"
          className="mb-1.5 block text-sm font-medium text-foreground"
        >
          Biographie
        </label>
        <textarea
          id="bio"
          name="bio"
          rows={4}
          defaultValue={bio || ""}
          placeholder="Parlez de vous, de votre parcours, de votre art..."
          className="w-full rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div>
        <label
          htmlFor="pays"
          className="mb-1.5 block text-sm font-medium text-foreground"
        >
          Pays
        </label>
        <select
          id="pays"
          name="pays"
          defaultValue={pays || ""}
          className="w-full rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        >
          <option value="">
            {pays ? "" : "Sélectionnez votre pays"}
          </option>
          {PAYS_AFRIQUE.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
      >
        Enregistrer mon profil
      </button>
    </form>
  );
}
