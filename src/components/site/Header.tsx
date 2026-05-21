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
    <header className="sticky top-0 z-40 border-b border-border/70 bg-[color:var(--color-surface)]/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 9c0-2 2-4 4-4s2 2 4 2 2-2 4-2 4 2 4 4-2 3-2 5 1 4-1 6-4 1-5 1-3 1-5 1-3-3-3-5 1-4 0-6S5 11 5 9z" />
              <circle cx="10" cy="11" r="0.8" fill="currentColor" />
              <circle cx="15" cy="11" r="0.8" fill="currentColor" />
            </svg>
          </span>
          <div className="flex flex-col leading-none">
            <span className="font-display text-lg font-bold text-foreground">PashuBazaar</span>
            <span className="font-hindi text-[10px] text-muted-foreground">पशु बाज़ार</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeProps={{ className: "text-primary" }}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
            >
              {n.en}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            to="/login"
            className="rounded-lg px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-[color:var(--color-accent-foreground)] shadow-sm transition hover:bg-[color:var(--color-accent-light)]"
          >
            Register
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
          className="grid h-10 w-10 place-items-center rounded-lg border border-border md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-card md:hidden">
          <div className="flex flex-col gap-1 px-4 py-3">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground hover:bg-secondary"
              >
                {n.en}{" "}
                <span className="font-hindi text-[11px] text-muted-foreground">· {n.hi}</span>
              </Link>
            ))}
            <div className="mt-2 flex gap-2">
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="flex-1 rounded-lg border border-border px-4 py-2.5 text-center text-sm"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setOpen(false)}
                className="flex-1 rounded-lg bg-accent px-4 py-2.5 text-center text-sm font-semibold text-[color:var(--color-accent-foreground)]"
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
