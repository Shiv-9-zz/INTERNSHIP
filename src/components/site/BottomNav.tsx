import { Link } from "@tanstack/react-router";
import { Home, Search, PlusCircle, LayoutDashboard, User } from "lucide-react";

type Item = { to: string; icon: typeof Home; label: string; primary?: boolean };
const items: Item[] = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/marketplace", icon: Search, label: "Browse" },
  { to: "/register/cattle", icon: PlusCircle, label: "Add", primary: true },
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/login", icon: User, label: "Profile" },
];

export function BottomNav() {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-border/70 glass pb-[env(safe-area-inset-bottom)] md:hidden"
      style={{ boxShadow: "0 -8px 32px -12px color-mix(in oklab, var(--primary) 18%, transparent)" }}
    >
      <ul className="mx-auto grid max-w-md grid-cols-5 px-1">
        {items.map((it) => {
          const Icon = it.icon;
          if (it.primary) {
            return (
              <li key={it.to} className="flex items-center justify-center">
                <Link
                  to={it.to}
                  className="-mt-6 grid h-[3.75rem] w-[3.75rem] place-items-center rounded-2xl bg-gradient-to-br from-accent to-[color:var(--color-accent-light)] text-[color:var(--color-accent-foreground)] shadow-lg ring-4 ring-card transition active:scale-95"
                  style={{ boxShadow: "var(--shadow-glow-accent)" }}
                  aria-label={it.label}
                >
                  <Icon className="h-6 w-6" strokeWidth={2.25} />
                </Link>
              </li>
            );
          }
          return (
            <li key={it.to}>
              <Link
                to={it.to}
                activeProps={{
                  className:
                    "!text-primary [&_svg]:stroke-[2.25] after:absolute after:bottom-1 after:left-1/2 after:h-1 after:w-1 after:-translate-x-1/2 after:rounded-full after:bg-accent",
                }}
                className="relative flex flex-col items-center gap-0.5 py-2.5 text-[10px] font-medium text-muted-foreground transition"
              >
                <Icon className="h-5 w-5" />
                {it.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
