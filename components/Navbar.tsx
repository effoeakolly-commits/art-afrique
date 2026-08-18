import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { deconnexion } from "@/lib/actions";

export default async function Navbar() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-[#faf7f2]/90 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-lg">
            🎨
          </span>
          <span className="text-xl font-bold tracking-tight text-foreground">
            Art<span className="text-primary">Afrique</span>
          </span>
        </Link>

        {/* Barre de recherche */}
        <form
          action="/"
          className="hidden flex-1 justify-center px-8 md:flex"
        >
          <input
            type="text"
            name="q"
            placeholder="Rechercher un artiste, une œuvre..."
            className="w-full max-w-md rounded-full border border-black/10 bg-white px-5 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </form>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link
                href="/tableau-de-bord"
                className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-dark"
              >
                Mon espace
              </Link>
              <form action={deconnexion}>
                <button
                  type="submit"
                  className="hidden rounded-full border border-black/10 px-4 py-2 text-sm font-medium transition hover:bg-black/5 sm:block"
                >
                  Déconnexion
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/connexion"
                className="rounded-full border border-black/10 px-4 py-2 text-sm font-medium transition hover:bg-black/5"
              >
                Connexion
              </Link>
              <Link
                href="/inscription"
                className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-dark"
              >
                Devenir artiste
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}