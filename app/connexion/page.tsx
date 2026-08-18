import Link from "next/link";
import { connexion } from "@/lib/actions";

export default async function ConnexionPage(props: {
  searchParams: Promise<{ erreur?: string; message?: string }>;
}) {
  const searchParams = await props.searchParams;
  const erreur = searchParams.erreur;
  const message = searchParams.message;

  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-md flex-col justify-center px-4 py-12">
      <div className="mb-8 text-center">
        <span className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary text-2xl">
          🎨
        </span>
        <h1 className="text-3xl font-bold tracking-tight">
          Content de vous revoir
        </h1>
        <p className="mt-2 text-foreground/60">
          Connectez-vous pour gérer vos œuvres
        </p>
      </div>

      {message === "verifiez-votre-email" && (
        <div className="mb-4 rounded-lg border border-accent/30 bg-accent/10 px-4 py-3 text-sm text-accent">
          📧 Vérifiez votre boîte mail pour confirmer votre inscription, puis
          connectez-vous.
        </div>
      )}

      {erreur && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {erreur === "missing-fields" && "Veuillez remplir tous les champs."}
          {erreur === "Invalid login credentials" &&
            "Email ou mot de passe incorrect."}
          {erreur !== "missing-fields" &&
            erreur !== "Invalid login credentials" &&
            erreur}
        </div>
      )}

      <form action={connexion} className="space-y-4">
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
            placeholder="••••••••"
            className="w-full rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
        >
          Se connecter
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-foreground/60">
        Pas encore de compte ?{" "}
        <Link
          href="/inscription"
          className="font-medium text-primary hover:underline"
        >
          Devenir artiste
        </Link>
      </p>
    </div>
  );
}