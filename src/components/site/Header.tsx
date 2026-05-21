import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const nav = [
  { to: "/marketplace", en: "Browse", hi: "देखें" },
  { to: "/breeds", en: "Breeds", hi: "नस्लें" },
  { to: "/about", en: "About", hi: "परिचय" },
  { to: "/dashboard", en: "Dashboard", hi: "डैशबोर्ड" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 glass shadow-[0_1px_0_0_color-mix(in_oklab,var(--color-accent)_8%,transparent)]">
      <div className="mx-auto flex h-[4.25rem] max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="group flex items-center gap-3">
          <span className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-primary to-[color:var(--color-primary-light)] text-primary-foreground shadow-md transition group-hover:shadow-lg">
            <svg
              viewBox="0 0 24 24"
              className="relative z-10 h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 9c0-2 2-4 4-4s2 2 4 2 2-2 4-2 4 2 4 4-2 3-2 5 1 4-1 6-4 1-5 1-3 1-5 1-3-3-3-5 1-4 0-6S5 11 5 9z" />
              <circle cx="10" cy="11" r="0.8" fill="currentColor" />
              <circle cx="15" cy="11" r="0.8" fill="currentColor" />
            </svg>
            <span
              className="absolute inset-0 opacity-0 transition group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(circle at 30% 20%, color-mix(in oklab, var(--accent) 40%, transparent), transparent 70%)",
              }}
            />
          </span>
          <div className="flex flex-col leading-none">
            <span className="font-display text-lg font-bold tracking-tight text-foreground">
              PashuBazaar
            </span>
            <span className="font-hindi text-[10px] text-muted-foreground">पशु बाज़ार</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-0.5 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeProps={{ className: "nav-link-active text-primary font-semibold" }}
              className="relative rounded-lg px-3.5 py-2 text-sm font-medium text-muted-foreground transition hover:bg-secondary/80 hover:text-foreground"
            >
              {n.en}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            to="/login"
            className="rounded-xl px-4 py-2 text-sm font-medium text-foreground transition hover:bg-secondary"
          >
            Login
          </Link>
          <Link to="/register" className="btn-accent px-5 py-2">
            Register
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
          className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-card/80 transition hover:bg-secondary md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border/80 bg-card/95 backdrop-blur-md md:hidden">
          <div className="flex flex-col gap-1 px-4 py-4">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                activeProps={{ className: "bg-primary/8 text-primary font-semibold" }}
                className="rounded-xl px-3 py-3 text-sm font-medium text-foreground transition hover:bg-secondary"
              >
                {n.en}{" "}
                <span className="font-hindi text-[11px] text-muted-foreground">· {n.hi}</span>
              </Link>
            ))}
            <div className="mt-3 flex gap-2 border-t border-border pt-3">
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="flex-1 rounded-xl border border-border px-4 py-2.5 text-center text-sm font-medium"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setOpen(false)}
                className="btn-accent flex-1 justify-center py-2.5"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
