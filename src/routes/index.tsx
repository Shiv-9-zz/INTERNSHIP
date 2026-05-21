import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ShieldCheck,
  Camera,
  Tag,
  Handshake,
  ArrowRight,
  ArrowDown,
  Eye,
  Link2,
} from "lucide-react";
import { cattleData } from "@/lib/cattle-data";
import { CattleCard } from "@/components/site/CattleCard";
import { StatPill } from "@/components/site/StatPill";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PashuBazaar — India's First Verified Cattle Marketplace" },
      {
        name: "description",
        content:
          "Browse Aadhaar-linked, blockchain-secured, CV-verified cattle from farmers across India.",
      },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-[color:var(--color-surface-dark)] text-white">
        <div className="absolute inset-0 hero-mesh" aria-hidden />
        <div className="absolute inset-0 bg-grain opacity-50" aria-hidden />
        <div
          className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[color:var(--color-surface-dark)] to-transparent"
          aria-hidden
        />
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 md:py-28 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <h1
              className="animate-fade-up font-display text-4xl font-bold leading-[1.05] text-balance sm:text-5xl md:text-6xl lg:text-7xl"
            >
              India's First Verified{" "}
              <span className="text-gradient-gold">Cattle Marketplace</span>
            </h1>
            <p
              className="animate-fade-up mx-auto mt-6 max-w-2xl text-base text-white/75 sm:text-lg"
              style={{ animationDelay: "160ms" }}
            >
              Every animal. Aadhaar-linked. Blockchain-secured. CV-verified.
            </p>
            <p
              className="animate-fade-up mt-2 font-hindi text-sm text-white/60"
              style={{ animationDelay: "200ms" }}
            >
              हर पशु · आधार से जुड़ा · ब्लॉकचेन से सुरक्षित
            </p>

            <div
              className="animate-fade-up mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
              style={{ animationDelay: "280ms" }}
            >
              <Link to="/marketplace" className="btn-accent group w-full px-7 py-3.5 sm:w-auto">
                Browse Cattle
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/register"
                className="inline-flex w-full items-center justify-center rounded-xl border border-white/25 bg-white/8 px-7 py-3.5 font-semibold text-white backdrop-blur-md transition hover:border-white/40 hover:bg-white/12 sm:w-auto"
              >
                Register Your Cattle
              </Link>
            </div>

            <div
              className="animate-fade-up mt-12 flex flex-wrap items-center justify-center gap-3"
              style={{ animationDelay: "360ms" }}
            >
              <StatPill value="12,400+" label="Cattle Registered" />
              <StatPill value="₹ 8.2 Cr" label="Traded" />
              <StatPill value="99.8%" label="Verified" />
            </div>
          </div>

          <div className="mx-auto mt-6 flex flex-col items-center text-xs text-white/40">
            <span>Scroll</span>
            <ArrowDown className="mt-1 h-4 w-4 animate-bounce" />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-[color:var(--color-surface-2)] py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="section-eyebrow mx-auto">How it works</p>
            <h2 className="mt-4 font-display text-3xl md:text-4xl text-balance">
              From farm to verified listing in 4 steps
            </h2>
            <p className="mt-3 font-hindi text-sm text-muted-foreground">
              खेत से सत्यापित सूची तक — चार सरल चरण
            </p>
          </div>

          <ol className="animate-stagger relative mt-14 grid gap-6 md:grid-cols-4">
            <span
              aria-hidden
              className="absolute left-0 right-0 top-10 hidden h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent md:block"
            />
            {[
              { icon: ShieldCheck, title: "Verify with Aadhaar", hi: "आधार सत्यापन", desc: "Owner identity verified via UIDAI. Only a secure hash is stored." },
              { icon: Camera, title: "Capture cattle photo", hi: "पशु की फोटो", desc: "CV model identifies breed, scores health and generates a unique ID." },
              { icon: Tag, title: "List on marketplace", hi: "बाज़ार में सूची", desc: "Set your price. The blockchain record builds buyer trust automatically." },
              { icon: Handshake, title: "Sell with escrow", hi: "एस्क्रो भुगतान", desc: "Funds released on transfer of ownership on chain. No middlemen, no fraud." },
            ].map((step, i) => {
              const Icon = step.icon;
              return (
                <li
                  key={step.title}
                  className="card-lift relative rounded-2xl border border-border/80 bg-card p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-[color:var(--color-primary-light)] text-primary-foreground shadow-md">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-mono text-[10px] font-medium uppercase tracking-wider text-accent">
                        Step 0{i + 1}
                      </p>
                      <h3 className="mt-1 font-display text-lg text-foreground">{step.title}</h3>
                      <p className="mt-0.5 font-hindi text-xs text-muted-foreground">{step.hi}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* TRUST */}
      <section className="bg-grain-warm relative bg-[color:var(--color-surface)] py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="section-eyebrow mx-auto">Built on trust</p>
            <h2 className="mt-4 font-display text-3xl md:text-4xl text-balance">
              Three layers of verification on every animal
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              {
                Icon: ShieldCheck,
                color: "var(--color-verified)",
                title: "Aadhaar Verified",
                hi: "आधार सत्यापित",
                desc: "Owners verified via UIDAI. Only a cryptographic hash is stored — your Aadhaar number never leaves your device.",
              },
              {
                Icon: Eye,
                color: "var(--color-primary)",
                title: "CV Model Verified",
                hi: "सीवी सत्यापित",
                desc: "A computer vision model identifies breed with 95%+ confidence and grades visible health markers on every listing.",
              },
              {
                Icon: Link2,
                color: "var(--color-blockchain)",
                title: "Blockchain Secured",
                hi: "ब्लॉकचेन सुरक्षित",
                desc: "Every registration and ownership transfer is written to Hyperledger Fabric — immutable, auditable, tamper-proof.",
              },
            ].map((card) => {
              const Icon = card.Icon;
              return (
                <div
                  key={card.title}
                  className="card-lift rounded-2xl border border-border/80 bg-card p-7 shadow-sm"
                >
                  <div
                    className="grid h-12 w-12 place-items-center rounded-xl"
                    style={{
                      backgroundColor: `color-mix(in oklab, ${card.color} 12%, transparent)`,
                    }}
                  >
                    <Icon className="h-6 w-6" style={{ color: card.color }} />
                  </div>
                  <h3 className="mt-5 font-display text-xl">{card.title}</h3>
                  <p className="font-hindi text-xs text-muted-foreground">{card.hi}</p>
                  <p className="mt-3 text-sm text-muted-foreground">{card.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURED LISTINGS */}
      <section className="bg-[color:var(--color-surface-2)] py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="section-eyebrow">Recently verified</p>
              <h2 className="mt-2 font-display text-3xl md:text-4xl">Cattle on the market</h2>
            </div>
            <Link
              to="/marketplace"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-[color:var(--color-primary-light)]"
            >
              View all listings <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cattleData.map((c) => (
              <CattleCard key={c.id} c={c} />
            ))}
          </div>
        </div>
      </section>

      {/* LINEAGE */}
      <section className="bg-[color:var(--color-surface-dark)] py-20 text-white md:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 md:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">
              Genealogy on chain
            </p>
            <h2 className="mt-3 font-display text-3xl text-balance md:text-4xl">
              Know every animal's family tree
            </h2>
            <p className="mt-4 max-w-md text-white/75">
              When sellers link their cattle's mother and father UIDs, buyers see three
              generations of verified lineage — drastically increasing trust and resale value.
            </p>
            <p className="mt-2 font-hindi text-sm text-white/60">
              अपने पशु का वंश ब्लॉकचेन पर देखें
            </p>
            <ul className="mt-6 space-y-3 text-sm text-white/80">
              <li className="flex gap-3"><span className="text-accent">✓</span> Mother & father UIDs cross-verified on chain</li>
              <li className="flex gap-3"><span className="text-accent">✓</span> Breed authenticity inheritable across generations</li>
              <li className="flex gap-3"><span className="text-accent">✓</span> Lineage-linked cattle sell for up to 22% more on average</li>
            </ul>
          </div>

          <div className="relative rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
            <LineageTree />
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-12 sm:px-6 md:grid-cols-4">
          {[
            { v: "27", l: "Breeds available" },
            { v: "14", l: "States covered" },
            { v: "4.3 days", l: "Avg time to sale" },
            { v: "100%", l: "Escrow protected" },
          ].map((s) => (
            <div key={s.l} className="text-center md:text-left">
              <div className="font-display text-4xl text-accent md:text-5xl">{s.v}</div>
              <div className="mt-1 text-sm text-white/80">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-accent py-16 text-[color:var(--color-accent-foreground)]">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="font-display text-3xl text-balance md:text-4xl">
            Start selling your cattle today
          </h2>
          <p className="mt-3 font-hindi text-sm opacity-80">आज ही अपना पशु बेचें</p>
          <Link to="/register" className="btn-primary mt-8 px-8 py-3.5">
            Register now <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}

function LineageTree() {
  return (
    <svg viewBox="0 0 360 280" className="h-auto w-full">
      <defs>
        <linearGradient id="line" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#D4A017" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#D4A017" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      {/* connectors */}
      <path d="M90 60 V120 H270 V60" stroke="url(#line)" strokeWidth="1.5" fill="none" />
      <path d="M180 120 V160" stroke="url(#line)" strokeWidth="1.5" fill="none" />
      <path d="M120 220 V200 H240 V220" stroke="url(#line)" strokeWidth="1.5" fill="none" />
      <path d="M180 160 V200" stroke="url(#line)" strokeWidth="1.5" fill="none" />

      {/* mother */}
      <g>
        <rect x="40" y="30" width="100" height="50" rx="10" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.2)" />
        <text x="90" y="50" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="600">Mother · Murrah</text>
        <text x="90" y="68" textAnchor="middle" fill="#D4A017" fontSize="9" fontFamily="monospace">CV-2022-UP-000045</text>
      </g>
      {/* father */}
      <g>
        <rect x="220" y="30" width="100" height="50" rx="10" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.2)" />
        <text x="270" y="50" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="600">Father · Murrah</text>
        <text x="270" y="68" textAnchor="middle" fill="#D4A017" fontSize="9" fontFamily="monospace">CV-2021-UP-000012</text>
      </g>
      {/* self */}
      <g>
        <rect x="120" y="135" width="120" height="60" rx="12" fill="#D4A017" />
        <text x="180" y="158" textAnchor="middle" fill="#1B4332" fontSize="12" fontWeight="700">This Cattle · A</text>
        <text x="180" y="178" textAnchor="middle" fill="#1B4332" fontSize="9" fontFamily="monospace">CV-2024-UP-000123</text>
      </g>
      {/* offspring */}
      <g>
        <rect x="70" y="220" width="100" height="40" rx="8" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.15)" strokeDasharray="4 3" />
        <text x="120" y="244" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="10">Offspring 1</text>
      </g>
      <g>
        <rect x="190" y="220" width="100" height="40" rx="8" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.2)" />
        <text x="240" y="240" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="600">Calf · 6 mo</text>
        <text x="240" y="254" textAnchor="middle" fill="#D4A017" fontSize="8" fontFamily="monospace">CV-2024-UP-000901</text>
      </g>
    </svg>
  );
}
