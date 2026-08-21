import { createClient } from "@/lib/supabase/server";
import FormulaireProfil from "@/components/FormulaireProfil";
import FormulaireModificationOeuvre from "@/components/FormulaireModificationOeuvre";
import { supprimerOeuvre, supprimerCompte } from "@/lib/actions";
import type { Oeuvre } from "@/lib/types";

export default async function ParametresPage(props: {
  searchParams: Promise<{
    erreur?: string;
    message?: string;
    oeuvre?: string;
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

  // Récupérer le profil (N'KORA : table "profiles")
  const { data: profil } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  // Récupérer l'enregistrement artiste
  const { data: artiste } = await supabase
    .from("artists")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  const artisteId = artiste?.id || "";

  // Construire le nom complet depuis le profil (first_name + last_name)
  const nomCompletProfil = profil
    ? [profil.first_name, profil.last_name].filter(Boolean).join(" ") || null
    : null;

  // Récupérer les œuvres de l'artiste (N'KORA : table "artworks")
  const { data: oeuvresData } = await supabase
    .from("artworks")
    .select(`*, artwork_likes(count)`)
    .eq("artist_id", artisteId)
    .order("created_at", { ascending: false });

  const oeuvresAvecLikes: Oeuvre[] = (oeuvresData || []).map((o) => ({
    ...o,
    likes_count: o.artwork_likes?.[0]?.count ?? 0,
  }));

  // Charger l'œuvre à éditer si demandé
  const oeuvreId = searchParams.oeuvre;
  let oeuvreEdit: Oeuvre | null = null;
  if (oeuvreId) {
    const { data } = await supabase
      .from("artworks")
      .select("*")
      .eq("id", oeuvreId)
      .eq("artist_id", artisteId)
      .single();
    oeuvreEdit = data;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Paramètres du compte
          </h1>
          <p className="mt-1 text-sm text-foreground/60">
            Gérez votre profil, vos œuvres et votre compte
          </p>
        </div>
        {user && (
          <div className="text-right">
            <p className="text-sm text-foreground/60">Connecté en tant que</p>
            <p className="font-semibold">{user.email}</p>
          </div>
        )}
      </div>

      {/* Messages */}
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
      {searchParams.message === "oeuvre-modifiee" && (
        <div className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          ✅ Œuvre modifiée avec succès !
        </div>
      )}
      {searchParams.message === "oeuvre-supprimee" && (
        <div className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          ✅ Œuvre supprimée.
        </div>
      )}
      {searchParams.message === "compte-supprime" && (
        <div className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          ✅ Votre compte a été supprimé. À bientôt !
        </div>
      )}
      {searchParams.erreur && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {searchParams.erreur}
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Colonne gauche : profil */}
        <section className="rounded-2xl border border-black/5 bg-white p-6">
          <h2 className="mb-4 text-xl font-semibold">Mon profil artiste</h2>
          <FormulaireProfil
            nomComplet={artiste?.display_name || nomCompletProfil || "Artiste"}
            bio={artiste?.bio || null}
            pays={artiste?.country || profil?.country || null}
            photoUrl={artiste?.profile_image_url || profil?.avatar_url || null}
            redirectTo="/tableau-de-bord/parametres"
          />
        </section>

        {/* Colonne droite : œuvres */}
        <section className="rounded-2xl border border-black/5 bg-white p-6">
          <h2 className="mb-4 text-xl font-semibold">
            Mes œuvres ({oeuvresAvecLikes.length})
          </h2>

          {oeuvresAvecLikes.length > 0 ? (
            <div className="space-y-4">
              {oeuvresAvecLikes.map((oeuvre) => (
                <div
                  key={oeuvre.id}
                  className="flex items-center gap-4 rounded-xl border border-black/5 p-3 transition hover:border-black/10"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={oeuvre.primary_image_url}
                    alt={oeuvre.title}
                    className="h-20 w-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{oeuvre.title}</p>
                    <div className="flex items-center gap-3 text-xs text-foreground/50">
                      <span className="capitalize">{oeuvre.category}</span>
                      <span className="rounded-full bg-black/5 px-2 py-0.5">
                        ❤️ {oeuvre.likes_count ?? 0}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <a
                      href={`/tableau-de-bord/parametres?oeuvre=${oeuvre.id}`}
                      className="rounded-lg p-2 text-foreground/40 transition hover:bg-black/5 hover:text-foreground"
                      title="Modifier l'œuvre"
                    >
                      ✏️
                    </a>
                    <form action={supprimerOeuvre.bind(null, oeuvre.id)}>
                      <button
                        type="submit"
                        className="rounded-lg p-2 text-foreground/40 transition hover:bg-red-50 hover:text-red-600"
                        title="Supprimer l'œuvre"
                        onClick={(e) => {
                          if (
                            !confirm(
                              "Supprimer cette œuvre définitivement ?"
                            )
                          )
                            e.preventDefault();
                        }}
                      >
                        🗑️
                      </button>
                    </form>
                  </div>
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
                Ajoutez votre première œuvre depuis votre tableau de bord !
              </p>
            </div>
          )}

          {/* Formulaire de modification d'œuvre (si en édition) */}
          {oeuvreEdit && (
            <div className="mt-6 rounded-xl border-2 border-primary/20 bg-primary/5 p-6">
              <h3 className="mb-4 text-lg font-semibold">
                Modifier « {oeuvreEdit.title} »
              </h3>
              <FormulaireModificationOeuvre oeuvre={oeuvreEdit} />
            </div>
          )}
        </section>
      </div>

      {/* Section : suppression du compte */}
      <section className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-6">
        <h2 className="mb-2 text-xl font-semibold text-red-800">
          ⚠️ Zone de danger
        </h2>
        <p className="mb-4 text-sm text-red-700/80">
          La suppression de votre compte est irréversible. Toutes vos œuvres,
          commentaires et données seront définitivement supprimés.
        </p>
        <form action={supprimerCompte}>
          <button
            type="submit"
            className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
            onClick={(e) => {
              if (
                !confirm(
                  "Êtes-vous sûr de vouloir supprimer votre compte définitivement ?"
                )
              )
                e.preventDefault();
            }}
          >
            Supprimer mon compte
          </button>
        </form>
      </section>
    </div>
  );
}
