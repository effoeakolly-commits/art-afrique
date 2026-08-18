import Link from "next/link";
import { inscription } from "@/lib/actions";

export default async function InscriptionPage(props: {
  searchParams: Promise<{ erreur?: string }>;
}) {
  const searchParams = await props.searchParams;
  const erreur = searchParams.erreur;

  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-md flex-col justify-center px-4 py-12">
      <div className="mb-8 text-center">
        <span className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary text-2xl">
          🎨
        </span>
        <h1 className="text-3xl font-bold tracking-tight">
          Rejoignez ArtAfrique
        </h1>
        <p className="mt-2 text-foreground/60">
          Créez votre profil d'artiste et partagez vos œuvres avec le monde
        </p>
      </div>

      {erreur && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {erreur === "missing-fields" && "Veuillez remplir tous les champs."}
          {erreur !== "missing-fields" && erreur}
        </div>
      )}

      <form action={inscription} className="space-y-4">
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
            placeholder="Ex : Aïcha Konaté"
            className="w-full rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="vous@exemple.com"
            className="w-full rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Mot de passe
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={6}
            placeholder="Au moins 6 caractères"
            className="w-full rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
        >
          Créer mon compte d'artiste
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-foreground/60">
        Déjà inscrit ?{" "}
        <Link
          href="/connexion"
          className="font-medium text-primary hover:underline"
        >
          Se connecter
        </Link>
      </p>
    </div>
  );
}