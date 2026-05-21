import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-border bg-[color:var(--color-surface-dark)] text-[color:var(--color-surface)]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent text-[color:var(--color-accent-foreground)] font-display font-bold">
                P
              </span>
              <div>
                <div className="font-display text-lg font-bold">PashuBazaar</div>
                <div className="font-hindi text-xs opacity-80">पशु बाज़ार</div>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm text-white/70">
              India's first verified cattle marketplace. Every animal Aadhaar-linked,
              blockchain-secured, and CV-verified.
            </p>
            <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs text-white/80">
              Built at IIT BHU
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-accent">
              Platform
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li><Link to="/marketplace" className="hover:text-white">Marketplace</Link></li>
              <li><Link to="/breeds" className="hover:text-white">Breeds Guide</Link></li>
              <li><Link to="/about" className="hover:text-white">About</Link></li>
              <li><Link to="/register" className="hover:text-white">Register</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-accent">
              Powered by
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li>Hyperledger Fabric</li>
              <li>UIDAI Aadhaar</li>
              <li>IPFS Storage</li>
              <li>Computer Vision ML</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/60 sm:flex-row sm:items-center">
          <p>© 2024 PashuBazaar · A research project from IIT (BHU) Varanasi</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
