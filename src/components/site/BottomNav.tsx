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
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card/95 backdrop-blur md:hidden">
      <ul className="mx-auto grid max-w-md grid-cols-5">
        {items.map((it) => {
          const Icon = it.icon;
          if (it.primary) {
            return (
              <li key={it.to} className="flex items-center justify-center">
                <Link
                  to={it.to}
                  className="-mt-5 grid h-14 w-14 place-items-center rounded-full bg-accent text-[color:var(--color-accent-foreground)] shadow-lg ring-4 ring-card"
                  aria-label={it.label}
                >
                  <Icon className="h-6 w-6" />
                </Link>
              </li>
            );
          }
          return (
            <li key={it.to}>
              <Link
                to={it.to}
                activeProps={{ className: "text-primary" }}
                className="flex flex-col items-center gap-0.5 py-2.5 text-[11px] text-muted-foreground"
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
