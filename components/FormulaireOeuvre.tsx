"use client";

import { useRef, useState } from "react";
import { ajouterOeuvre } from "@/lib/actions";
import { CATEGORIES } from "@/lib/types";

export default function FormulaireOeuvre() {
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const fichier = e.target.files?.[0];
    if (fichier) {
      const url = URL.createObjectURL(fichier);
      setPreview(url);
    }
  }

  return (
    <form action={ajouterOeuvre} className="space-y-4">
      {/* Upload image */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">
          Image de l'œuvre *
        </label>
        <div
          className="cursor-pointer rounded-lg border-2 border-dashed border-black/15 bg-white p-6 text-center transition hover:border-primary"
          onClick={() => inputRef.current?.click()}
        >
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={preview}
              alt="Aperçu de l'œuvre"
              className="mx-auto max-h-48 rounded-lg object-contain"
            />
          ) : (
            <div>
              <p className="text-3xl">🖼️</p>
              <p className="mt-2 text-sm text-foreground/60">
                Cliquez pour choisir une image
              </p>
              <p className="mt-1 text-xs text-foreground/40">
                PNG, JPG, WEBP — max 10 Mo
              </p>
            </div>
          )}
        </div>
        <input
          ref={inputRef}
          type="file"
          name="image"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          required
        />
      </div>

      <div>
        <label
          htmlFor="titre"
          className="mb-1.5 block text-sm font-medium text-foreground"
        >
          Titre de l'œuvre *
        </label>
        <input
          id="titre"
          name="titre"
          type="text"
          required
          placeholder="Ex : Danseuse aux calebasses"
          className="w-full rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="mb-1.5 block text-sm font-medium text-foreground"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          placeholder="Racontez l'histoire de cette œuvre, vos inspirations..."
          className="w-full rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div>
        <label
          htmlFor="categorie"
          className="mb-1.5 block text-sm font-medium text-foreground"
        >
          Catégorie *
        </label>
        <select
          id="categorie"
          name="categorie"
          required
          defaultValue=""
          className="w-full rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        >
          <option value="" disabled>
            Choisir une catégorie
          </option>
          {CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="video_url"
          className="mb-1.5 block text-sm font-medium text-foreground"
        >
          Vidéo du processus créatif (lien YouTube)
        </label>
        <input
          id="video_url"
          name="video_url"
          type="url"
          placeholder="https://www.youtube.com/watch?v=..."
          className="w-full rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
        <p className="mt-1 text-xs text-foreground/40">
          Optionnel — ajoutez un lien YouTube pour montrer votre processus
          créatif
        </p>
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
      >
        Publier mon œuvre
      </button>
    </form>
  );
}