import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ShieldCheck, ArrowRight, ArrowLeftRight, Link2 } from "lucide-react";
import { cattleData } from "@/lib/cattle-data";
import { CattleCard } from "@/components/site/CattleCard";
import { VerifiedBadge } from "@/components/site/Badges";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — PashuBazaar" }] }),
  component: DashboardPage,
});

function DashboardPage() {
  const [role, setRole] = useState<"seller" | "buyer">("seller");
  const myCattle = cattleData.slice(0, 3);
  const purchases = cattleData.slice(3, 5);

  return (
    <div className="bg-[color:var(--color-surface-2)] py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Welcome back</p>
            <h1 className="mt-1 flex flex-wrap items-center gap-3 font-display text-3xl md:text-4xl">
              Ramesh Kumar
              <VerifiedBadge kind="aadhaar" size="md" />
            </h1>
            <p className="font-hindi text-sm text-muted-foreground">रमेश कुमार · सत्यापित</p>
          </div>

          {/* Role switcher */}
          <div className="inline-flex items-center gap-3 rounded-2xl border border-border bg-card p-1.5">
            <button
              onClick={() => setRole("seller")}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                role === "seller"
                  ? "bg-primary text-primary-foreground shadow"
                  : "text-muted-foreground"
              }`}
            >
              Seller
            </button>
            <ArrowLeftRight className="h-4 w-4 text-muted-foreground" />
            <button
              onClick={() => setRole("buyer")}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                role === "buyer"
                  ? "bg-accent text-[color:var(--color-accent-foreground)] shadow"
                  : "text-muted-foreground"
              }`}
            >
              Buyer
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {(role === "seller"
            ? [
                { label: "Cattle listed", value: "8", hi: "सूचीबद्ध" },
                { label: "Total sold", value: "14", hi: "बेचे गए" },
                { label: "Revenue earned", value: "₹ 12.4 L", hi: "आय" },
                { label: "Pending inquiries", value: "23", hi: "पूछताछ" },
              ]
            : [
                { label: "Cattle purchased", value: "5", hi: "खरीदे" },
                { label: "Total spent", value: "₹ 4.8 L", hi: "खर्च" },
                { label: "Saved listings", value: "12", hi: "सहेजे" },
                { label: "Active offers", value: "3", hi: "ऑफर" },
              ]
          ).map((s) => (
            <div key={s.label} className="rounded-2xl border border-border bg-card p-5">
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className="mt-2 font-display text-3xl text-primary">{s.value}</p>
              <p className="font-hindi text-[11px] text-muted-foreground">{s.hi}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[2fr_1fr]">
          {/* Left col */}
          <section>
            <div className="flex items-end justify-between">
              <h2 className="font-display text-2xl">
                {role === "seller" ? "My listings" : "My purchases"}
              </h2>
              {role === "seller" && (
                <Link
                  to="/register/cattle"
                  className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-[color:var(--color-accent-foreground)]"
                >
                  Add cattle <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              {(role === "seller" ? myCattle : purchases).map((c) => (
                <div key={c.id} className="relative">
                  <span className="absolute left-3 top-3 z-10 rounded-full bg-[color:var(--color-verified)] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                    {role === "seller" ? "Listed" : "Owned"}
                  </span>
                  <CattleCard c={c} />
                </div>
              ))}
            </div>
          </section>

          {/* Right col */}
          <aside className="space-y-6">
            {/* Identity card */}
            <div className="rounded-3xl border-l-4 border-[color:var(--color-blockchain)] bg-card p-6 ring-1 ring-border">
              <div className="flex items-center gap-2">
                <Link2 className="h-5 w-5 text-[color:var(--color-blockchain)]" />
                <h3 className="font-display text-lg">Blockchain Identity</h3>
              </div>
              <dl className="mt-4 space-y-3 text-sm">
                <Row label="User UID" value="USR-2023-IN-007421" mono />
                <Row label="Aadhaar hash" value="e3b0c442 … fb924" mono />
                <Row label="Roles" value="seller · buyer" />
                <Row label="Member since" value="Mar 2023" />
                <Row label="Total TXs" value="47" />
              </dl>
              <a className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[color:var(--color-blockchain)]">
                View on Explorer →
              </a>
            </div>

            {/* Activity */}
            <div className="rounded-3xl border border-border bg-card p-6">
              <h3 className="font-display text-lg">Recent activity</h3>
              <ul className="mt-4 space-y-4 text-sm">
                {[
                  { icon: "✓", text: "Listed Murrah Buffalo CV-2024-UP-000123", time: "2 hours ago", tx: "a3f9c2…" },
                  { icon: "₹", text: "Received offer ₹ 80,000 on Gir Cow", time: "Yesterday", tx: null },
                  { icon: "⛓", text: "Ownership transferred for Holstein", time: "3 days ago", tx: "e5f2d9…" },
                  { icon: "✓", text: "Aadhaar re-verified", time: "Last week", tx: null },
                ].map((a, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-secondary text-sm">
                      {a.icon}
                    </span>
                    <div className="flex-1">
                      <p className="text-sm">{a.text}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {a.time}
                        {a.tx && <span className="ml-2 font-mono">· TX {a.tx}</span>}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Switch CTA */}
            <div className="rounded-3xl bg-primary p-6 text-primary-foreground">
              <ShieldCheck className="h-7 w-7 text-accent" />
              <h3 className="mt-3 font-display text-xl">
                {role === "seller" ? "Browse verified cattle to buy" : "Ready to sell?"}
              </h3>
              <p className="mt-1 text-sm text-white/80">
                {role === "seller"
                  ? "Switch roles anytime — your verification carries over."
                  : "List your cattle in 3 simple steps."}
              </p>
              <Link
                to={role === "seller" ? "/marketplace" : "/register/cattle"}
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-[color:var(--color-accent-foreground)]"
              >
                {role === "seller" ? "Open marketplace" : "Start selling"}{" "}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className={mono ? "font-mono text-xs text-foreground" : "text-sm font-medium"}>{value}</dd>
    </div>
  );
}
