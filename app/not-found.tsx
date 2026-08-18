import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-md flex-col items-center justify-center px-4 py-12 text-center">
      <span className="mb-4 text-6xl">🎨</span>
      <h1 className="text-4xl font-bold tracking-tight">404</h1>
      <p className="mt-2 text-lg text-foreground/60">
        Cette page n'existe pas ou a été déplacée.
      </p>
      <p className="mt-1 text-sm text-foreground/40">
        L'art est peut-être ailleurs...
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
      >
        ← Retour à la découverte
      </Link>
    </div>
  );
}