import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[color:var(--color-surface-dark)] text-[color:var(--color-surface)]">
      <div
        className="pointer-events-none absolute inset-0 hero-mesh opacity-40"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-accent to-[color:var(--color-accent-light)] font-display text-lg font-bold text-[color:var(--color-accent-foreground)] shadow-lg">
                P
              </span>
              <div>
                <div className="font-display text-xl font-bold">PashuBazaar</div>
                <div className="font-hindi text-xs opacity-80">पशु बाज़ार</div>
              </div>
            </div>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/70">
              India's first verified cattle marketplace. Every animal Aadhaar-linked,
              blockchain-secured, and CV-verified.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-accent">
              Platform
            </h4>
            <ul className="mt-5 space-y-3 text-sm text-white/65">
              <li>
                <Link to="/marketplace" className="transition hover:text-white hover:underline">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link to="/breeds" className="transition hover:text-white hover:underline">
                  Breeds Guide
                </Link>
              </li>
              <li>
                <Link to="/about" className="transition hover:text-white hover:underline">
                  About
                </Link>
              </li>
              <li>
                <Link to="/register" className="transition hover:text-white hover:underline">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-accent">
              Powered by
            </h4>
            <ul className="mt-5 space-y-3 text-sm text-white/65">
              {["Hyperledger Fabric", "UIDAI Aadhaar", "IPFS Storage", "Computer Vision ML"].map(
                (item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-accent/80" />
                    {item}
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/50 sm:flex-row sm:items-center">
          <p>© 2024 PashuBazaar</p>
          <div className="flex gap-6">
            <a href="#" className="transition hover:text-white">
              Privacy
            </a>
            <a href="#" className="transition hover:text-white">
              Terms
            </a>
            <a href="#" className="transition hover:text-white">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
