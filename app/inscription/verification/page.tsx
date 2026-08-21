"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Mail, RefreshCw, ShieldCheck } from "lucide-react";

export default function VerificationEmail({
  searchParams,
}: {
  searchParams?: Promise<{ email?: string; erreur?: string }>;
}) {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      // Récupérer l'email depuis les paramètres ou depuis l'utilisateur
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user?.email) {
        setEmail(user.email);
      } else {
        // Email vient des paramètres de l'URL
        const params = await searchParams;
        if (params?.email) {
          setEmail(params.email);
        }
        if (params?.erreur) {
          setError(params.erreur);
        }
      }

      // Si l'utilisateur est déjà connecté, rediriger vers le tableau de bord
      if (user) {
        router.replace("/tableau-de-bord");
      }
    };

    init();
  }, [searchParams, router]);

  const resendEmail = async () => {
    if (!email) return;

    setLoading(true);
    setError("");
    setMessage("");

    const supabase = createClient();
    const { error: resendError } = await supabase.auth.resend({
      type: "signup",
      email,
    });

    if (resendError) {
      setError(resendError.message);
    } else {
      setMessage("Un nouveau code de confirmation a été envoyé !");
    }

    setLoading(false);
  };

  const verifierCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !code) {
      setError("Veuillez saisir le code reçu par email.");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    const supabase = createClient();
    const { error: verifyError } = await supabase.auth.verifyOtp({
      email,
      token: code,
      type: "signup",
    });

    if (verifyError) {
      setError(verifyError.message);
      setLoading(false);
      return;
    }

    setMessage("Compte vérifié avec succès ! Redirection...");
    setTimeout(() => {
      router.push("/tableau-de-bord");
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-[#F6F2E7] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl border border-[#E8DFCE] p-8 text-center">
        <div className="w-16 h-16 mx-auto bg-[#241710]/5 rounded-full flex items-center justify-center mb-6">
          <Mail className="w-8 h-8 text-[#A67123]" />
        </div>

        <h1 className="font-serif-title text-2xl text-[#2F241A] mb-4">
          Vérifiez votre email
        </h1>

        <p className="text-sm text-[#2F241A]/70 leading-relaxed mb-6">
          Un code de confirmation à 6 chiffres a été envoyé à{" "}
          <strong className="text-[#241710]">{email}</strong>.
          Saisissez ce code ci-dessous pour activer votre compte d'artiste.
        </p>

        {error && (
          <div className="bg-[#FFF5F5] border border-[#FED7D7] text-[#9B2C2C] text-xs p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {message && (
          <div className="bg-[#F0FFF4] border border-[#C6F6D5] text-[#276749] text-xs p-3 rounded-lg mb-4">
            {message}
          </div>
        )}

        <form onSubmit={verifierCode} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#2F241A] mb-1.5 text-left">
              Code de confirmation
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, "").slice(0, 6))}
              placeholder="••••••"
              inputMode="numeric"
              maxLength={6}
              className="w-full bg-white border border-[#E8DFCE] rounded-xl px-4 py-3 text-center text-2xl font-bold tracking-[0.5em] text-[#241710] focus:outline-none focus:border-[#C4953A] focus:ring-2 focus:ring-[#C4953A]/20"
            />
          </div>

          <button
            type="submit"
            disabled={loading || code.length !== 6}
            className="w-full inline-flex items-center justify-center gap-2 bg-[#A67123] hover:bg-[#8F5F1B] disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold px-5 py-3 rounded-xl transition-all shadow-md cursor-pointer"
          >
            {loading ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <ShieldCheck className="w-4 h-4" />
            )}
            <span>{loading ? "Vérification..." : "Vérifier et activer mon compte"}</span>
          </button>
        </form>

        <button
          onClick={resendEmail}
          disabled={loading || !email}
          className="w-full inline-flex items-center justify-center gap-2 bg-transparent hover:bg-[#F6F2E7] disabled:opacity-50 text-[#A67123] text-xs font-bold px-5 py-3 rounded-xl transition-all mt-3 cursor-pointer"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          <span>Renvoyer le code</span>
        </button>

        <div className="text-xs text-[#2F241A]/50 pt-4 border-t border-[#E8DFCE] mt-4">
          <Link
            href="/connexion"
            className="text-[#A67123] hover:text-[#8F5F1B] font-medium"
          >
            Retour à la connexion
          </Link>
        </div>
      </div>
    </main>
  );
}