import Link from "next/link";
import Image from "next/image";
import { connexion } from "@/lib/actions";

export const dynamic = "force-dynamic";

export default async function PageConnexion(props: {
  searchParams: Promise<{ erreur?: string; message?: string }>;
}) {
  const searchParams = await props.searchParams;
  const erreur = searchParams.erreur;
  const message = searchParams.message;

  return (
    <div className="min-h-screen bg-[#FAF7F0] flex items-center justify-center p-4 text-[#2F241A]" id="login-page">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-12 bg-white rounded-3xl overflow-hidden shadow-2xl">
        {/* Colonne gauche : image / branding */}
        <div className="md:col-span-5 bg-[#1F130B] text-[#E8D6B1] p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 opacity-15 pointer-events-none">
            <Image src="/images/african_master_sculptor_1787142432994.jpg" alt="Atelier africain" fill className="object-cover" />
          </div>

          <div className="relative z-10 space-y-6">
            <div className="w-36 h-auto">
              <Image src="/images/nkora_logo.png" alt="N'KORA" width={200} height={60} className="object-contain" />
            </div>

            <div className="space-y-6">
              <h2 className="font-serif-title text-2xl sm:text-3xl font-normal text-[#FAF7F0] leading-snug">
                Bienvenue de retour ! <br />
                <span className="text-[#D6B26A]">Connectez-vous</span> à votre espace artiste.
              </h2>

              <div className="rounded-2xl overflow-hidden aspect-4/3 shadow-md bg-black/40 border border-[#3E2519]">
                <Image src="/images/african_master_sculptor_1787142432994.jpg" alt="Atelier d'artiste" width={800} height={600} className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Pied de page */}
          <div className="relative z-10 pt-6 text-[10px] text-[#E8D6B1]/50">
            {"N'KORA • Art, Artistes & Culture Africaine"}
          </div>
        </div>

        {/* Colonne droite : Formulaire */}
        <div className="md:col-span-7 bg-[#FAF7F0] p-8 sm:p-10 flex flex-col justify-center">
          <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-[#241710]">Se connecter</h2>

          {/* Messages d'erreur / de succès */}
          {erreur && (
            <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {erreur === "missing-fields" ? "Veuillez remplir tous les champs." : erreur}
            </div>
          )}

          {message === "verifiez-votre-email" && (
            <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700">
              Un email de confirmation a été envoyé. Vérifiez votre boîte de réception avant de vous connecter.
            </div>
          )}

          <form action={connexion} className="space-y-4 mt-6">
            <div>
              <label className="block text-xs font-medium text-[#2F241A] mb-1">Email</label>
              <input
                type="email"
                name="email"
                required
                placeholder="votre.email@exemple.com"
                className="w-full bg-white border border-[#E8DFCE] rounded-xl px-4 py-3 text-xs text-[#241710] focus:outline-none focus:border-[#C4953A]"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-medium text-[#2F241A] mb-1">Mot de passe</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                placeholder="••••••••"
                className="w-full bg-white border border-[#E8DFCE] rounded-xl px-4 py-3 text-xs text-[#241710] focus:outline-none focus:border-[#C4953A]"
              />
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-[#2F241A]/80">
                <input type="checkbox" name="remember" className="w-4 h-4 rounded border-[#C4B296] text-[#A67123] accent-[#A67123]" />
                <span>Se souvenir de moi</span>
              </label>

              <div className="text-right">
                <Link href="/mot-de-passe-oublie" className="text-xs text-[#8B6236] hover:text-[#A67123] font-medium hover:underline">
                  Mot de passe oublié ?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#A67123] hover:bg-[#8F5F1B] text-white text-xs sm:text-sm font-medium py-3.5 rounded-xl shadow-xs cursor-pointer mt-2"
            >
              Se connecter
            </button>
          </form>

          <div className="text-center pt-2 text-xs text-[#2F241A]/70">
            <span>Pas encore de compte ? </span>
            <Link href="/inscription" className="font-bold text-[#241710] hover:text-[#A67123] underline cursor-pointer">
              Créer un compte
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
