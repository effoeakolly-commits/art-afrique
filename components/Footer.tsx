export default function Footer() {
  return (
    <footer className="border-t border-black/5 bg-white/50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-foreground/60">
            © {new Date().getFullYear()} ArtAfrique — Découvrez l'art africain
          </p>
          <p className="text-sm text-foreground/60">
            Fait avec ❤️ sur le continent
          </p>
        </div>
      </div>
    </footer>
  );
}