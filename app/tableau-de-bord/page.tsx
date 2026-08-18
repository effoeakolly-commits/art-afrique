import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import FormulaireProfil from "@/components/FormulaireProfil";
import FormulaireOeuvre from "@/components/FormulaireOeuvre";
import { supprimerOeuvre } from "@/lib/actions";

export default async function TableauDeBordPage(props: {
  searchParams: Promise<{
    erreur?: string;
    message?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  // Récupérer le profil
  const { data: profil } = await supabase
    .from("profils")
    .select("*")
    .eq("id", user.id)
    .single();

  // Récupérer les œuvres de l'artiste
  const { data: oeuvres } = await supabase
    .from("oeuvres")
    .select("*")
    .eq("artiste_id", user.id)
    .order("created_at", { ascending: false });

  // Compter les abonnés
  const { count: nombreAbonnes } = await supabase
    .from("abonnements")
    .select("id", { count: "exact", head: true })
    .eq("artiste_id", user.id);

  // Compter les coups de cœur totaux sur toutes les œuvres
  const { data: coupsDeCoeur } = await supabase
    .from("coups_de_coeur")
    .select("id", { count: "exact" })
    .in(
      "oeuvre_id",
      (oeuvres || []).map((o) => o.id)
    );

  const totalLikes = coupsDeCoeur?.length || 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold tracking-tight">
        Tableau de bord
      </h1>

      {searchParams.message === "profil-mis-a-jour" && (
        <div className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          ✅ Profil mis à jour avec succès !
        </div>
      )}

      {searchParams.message === "oeuvre-ajoutee" && (
        <div className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          ✅ Votre œuvre a été publiée !
        </div>
      )}

      {searchParams.message === "oeuvre-supprimee" && (
        <div className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          ✅ Œuvre supprimée.
        </div>
      )}

      {searchParams.erreur && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {searchParams.erreur}
        </div>
      )}

      {/* Statistiques */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-black/5 bg-white p-5">
          <p className="text-sm text-foreground/50">Œuvres publiées</p>
          <p className="mt-1 text-3xl font-bold text-primary">
            {oeuvres?.length || 0}
          </p>
        </div>
        <div className="rounded-2xl border border-black/5 bg-white p-5">
          <p className="text-sm text-foreground/50">Coups de cœur reçus</p>
          <p className="mt-1 text-3xl font-bold text-primary">{totalLikes}</p>
        </div>
        <div className="rounded-2xl border border-black/5 bg-white p-5">
          <p className="text-sm text-foreground/50">Abonnés</p>
          <p className="mt-1 text-3xl font-bold text-primary">
            {nombreAbonnes || 0}
          </p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Colonne gauche : profil */}
        <section className="rounded-2xl border border-black/5 bg-white p-6">
          <h2 className="mb-4 text-xl font-semibold">Mon profil artiste</h2>
          <FormulaireProfil
            nomComplet={profil?.nom_complet || "Artiste"}
            bio={profil?.bio || null}
            pays={profil?.pays || null}
            photoUrl={profil?.photo_url || null}
          />

          <div className="mt-6 border-t border-black/5 pt-6">
            <h3 className="mb-3 text-lg font-semibold">Ajouter une œuvre</h3>
            <FormulaireOeuvre />
          </div>
        </section>

        {/* Colonne droite : mes œuvres */}
        <section className="rounded-2xl border border-black/5 bg-white p-6">
          <h2 className="mb-4 text-xl font-semibold">
            Mes œuvres ({oeuvres?.length || 0})
          </h2>

          {oeuvres && oeuvres.length > 0 ? (
            <div className="space-y-4">
              {oeuvres.map((oeuvre) => (
                <div
                  key={oeuvre.id}
                  className="flex items-center gap-4 rounded-xl border border-black/5 p-3 transition hover:border-black/10"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={oeuvre.image_url}
                    alt={oeuvre.titre}
                    className="h-20 w-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <Link
                      href={`/oeuvres/${oeuvre.id}`}
                      className="font-medium hover:text-primary"
                    >
                      {oeuvre.titre}
                    </Link>
                    <p className="text-sm capitalize text-foreground/50">
                      {oeuvre.categorie}
                    </p>
                  </div>
                  <form action={supprimerOeuvre.bind(null, oeuvre.id)}>
                    <button
                      type="submit"
                      className="rounded-lg p-2 text-foreground/40 transition hover:bg-red-50 hover:text-red-600"
                      title="Supprimer l'œuvre"
                    >
                      🗑️
                    </button>
                  </form>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border-2 border-dashed border-black/10 p-8 text-center">
              <p className="text-3xl">🎨</p>
              <p className="mt-2 font-medium">
                Aucune œuvre pour le moment
              </p>
              <p className="mt-1 text-sm text-foreground/50">
                Utilisez le formulaire pour ajouter votre première œuvre !
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}