import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Copy, MapPin, ShieldCheck, Link2, ChevronRight } from "lucide-react";
import { useState } from "react";
import { cattleData, formatAge, formatINR, getCattle } from "@/lib/cattle-data";
import { CattleCard } from "@/components/site/CattleCard";
import { HealthGradeBadge } from "@/components/site/HealthGrade";
import { VerifiedBadge } from "@/components/site/Badges";

export const Route = createFileRoute("/cattle/$id")({
  loader: ({ params }) => {
    const c = getCattle(params.id);
    if (!c) throw notFound();
    return c;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.breed ?? "Cattle"} · ${loaderData?.id ?? ""} — PashuBazaar` },
      {
        name: "description",
        content: `${loaderData?.breed} · ${loaderData?.gender} · Grade ${loaderData?.healthScore} · ${loaderData ? formatINR(loaderData.price) : ""}`,
      },
      { property: "og:image", content: loaderData?.photo },
    ],
  }),
  notFoundComponent: () => (
    <div className="grid min-h-[60dvh] place-items-center p-8 text-center">
      <div>
        <h1 className="font-display text-3xl">Cattle not found</h1>
        <p className="mt-2 text-muted-foreground">This UID isn't on the chain.</p>
        <Link to="/marketplace" className="mt-6 inline-block rounded-lg bg-primary px-5 py-2.5 text-sm text-primary-foreground">
          Back to marketplace
        </Link>
      </div>
    </div>
  ),
  component: CattleDetailPage,
});

function CattleDetailPage() {
  const c = Route.useLoaderData();
  const similar = cattleData.filter((x) => x.id !== c.id).slice(0, 4);

  return (
    <div className="bg-[color:var(--color-surface-2)] pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 py-4 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/marketplace" className="hover:text-foreground">Marketplace</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">{c.id}</span>
        </nav>

        {/* Hero */}
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <div className="relative overflow-hidden rounded-3xl bg-muted shadow-lg ring-1 ring-border/50">
              <img
                src={c.photo}
                alt={`${c.breed} ${c.gender}`}
                className="aspect-video w-full object-cover"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"
                aria-hidden
              />
              <div className="absolute right-4 top-4 flex flex-col items-end gap-2">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-[color:var(--color-verified)] shadow-md">
                  <ShieldCheck className="h-3.5 w-3.5" /> Computer Vision Verified
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-[color:var(--color-blockchain)] px-3 py-1.5 text-xs font-semibold text-white shadow-md">
                  <Link2 className="h-3.5 w-3.5" /> Blockchain Secured
                </span>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-4 gap-3">
              {[c.photo, c.photo, c.photo, c.photo].map((p, i) => (
                <div
                  key={i}
                  className={`aspect-square overflow-hidden rounded-xl bg-muted ring-2 ${
                    i === 0 ? "ring-accent" : "ring-transparent"
                  }`}
                >
                  <img src={p} alt="" className="h-full w-full object-cover opacity-90" />
                </div>
              ))}
            </div>
          </div>

          {/* Info panel */}
          <aside
            className="self-start rounded-3xl border border-border/80 bg-card p-7 shadow-lg lg:sticky lg:top-44"
            style={{ boxShadow: "var(--shadow-soft)" }}
          >
            <p className="font-mono text-xs text-muted-foreground">{c.id}</p>
            <h1 className="mt-1 font-display text-3xl text-foreground md:text-4xl">{c.breed}</h1>
            <p className="font-hindi text-sm text-muted-foreground">
              {c.breed === "Murrah Buffalo" ? "मुर्रा भैंस" : c.breed === "Gir Cow" ? "गिर गाय" : c.breed}
            </p>

            <div className="mt-5 flex items-center gap-4">
              <HealthGradeBadge grade={c.healthScore} size="lg" />
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Health grade</p>
                <p className="font-display text-lg">
                  {c.healthScore === "A" ? "Excellent" : c.healthScore === "B" ? "Good" : "Fair"}
                </p>
              </div>
            </div>

            <div className="mt-6 font-display text-4xl text-primary">{formatINR(c.price)}</div>

            <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-xs text-muted-foreground">Age</dt>
                <dd className="font-medium">{formatAge(c.age)}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Weight</dt>
                <dd className="font-medium">{c.weight} kg</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Gender</dt>
                <dd className="font-medium">{c.gender}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Owners</dt>
                <dd className="font-medium">{c.ownershipCount}</dd>
              </div>
            </dl>

            <div className="mt-6 flex items-center gap-2 rounded-xl bg-secondary p-3 text-sm">
              <MapPin className="h-4 w-4 text-primary" />
              <span>
                {c.location.district}, {c.location.state} ·{" "}
                <span className="text-muted-foreground">{c.location.distance} km away</span>
              </span>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button className="rounded-xl border border-input bg-card px-4 py-3 text-sm font-semibold transition hover:bg-secondary">
                Contact Seller
              </button>
              <button className="btn-accent justify-center py-3">
                Buy Now · अभी खरीदें
              </button>
            </div>
          </aside>
        </div>

        {/* Sections */}
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {/* Seller identity */}
          <section className="rounded-3xl border border-border bg-card p-6">
            <h2 className="font-display text-xl">Seller Identity</h2>
            <p className="mt-1 text-xs text-muted-foreground">Aadhaar-protected, blockchain-bound</p>
            <div className="mt-4 flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-[color:var(--color-verified)]/10">
                <ShieldCheck className="h-6 w-6 text-[color:var(--color-verified)]" />
              </div>
              <div>
                <p className="text-sm font-semibold">Verified Owner</p>
                <p className="text-xs text-muted-foreground">via UIDAI · since Mar 2023</p>
              </div>
            </div>
            <div className="mt-4 rounded-lg bg-secondary p-3">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Cryptographic ID</p>
              <p
                title="Cryptographic identity — Aadhaar protected"
                className="mt-1 font-mono text-xs text-foreground"
              >
                {c.sellerHash.slice(0, 12)}…{c.sellerHash.slice(-6)}
              </p>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-center text-sm">
              <div className="rounded-lg bg-secondary p-3">
                <div className="font-display text-xl">14</div>
                <div className="text-xs text-muted-foreground">cattle sold</div>
              </div>
              <div className="rounded-lg bg-secondary p-3">
                <div className="font-display text-xl">4.8★</div>
                <div className="text-xs text-muted-foreground">rating</div>
              </div>
            </div>
          </section>

          {/* Health Report */}
          <section className="rounded-3xl border border-border bg-card p-6">
            <h2 className="font-display text-xl">Health Report</h2>
            <p className="mt-1 text-xs text-muted-foreground">CV model · last examined {c.registeredAt}</p>

            <div className="mt-5">
              <div className="flex items-center justify-between text-sm">
                <span>Breed confidence</span>
                <span className="font-semibold">{c.cvConfidence}%</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full bg-[color:var(--color-verified)]"
                  style={{ width: `${c.cvConfidence}%` }}
                />
              </div>
            </div>

            <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
              {(c.observations ?? []).map((o: string) => (
                <li key={o} className="flex gap-2">
                  <span className="text-[color:var(--color-verified)]">✓</span>
                  {o}
                </li>
              ))}
            </ul>
          </section>

          {/* Blockchain */}
          <section className="rounded-3xl border-l-4 border-[color:var(--color-blockchain)] border-r border-y border-r-border border-y-border bg-card p-6">
            <div className="flex items-center gap-2">
              <Link2 className="h-5 w-5 text-[color:var(--color-blockchain)]" />
              <h2 className="font-display text-xl">Blockchain Record</h2>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Written to Hyperledger Fabric</p>

            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="text-xs text-muted-foreground">Cattle UID</dt>
                <dd className="font-mono">{c.id}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Registration TX</dt>
                <dd className="mt-1 flex items-center gap-2 rounded-lg bg-secondary p-2 font-mono text-xs">
                  <span className="truncate">{c.txHash}</span>
                  <CopyButton text={c.txHash} />
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Registered</dt>
                <dd>{c.registeredAt}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Ownership transfers</dt>
                <dd>{c.ownershipCount}</dd>
              </div>
            </dl>

            <a className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[color:var(--color-blockchain)]">
              View on Explorer →
            </a>
          </section>
        </div>

        {/* Lineage */}
        <section className="mt-12 rounded-3xl border border-border bg-card p-6 md:p-8">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="font-display text-2xl">Family Tree</h2>
              <p className="text-sm text-muted-foreground">Lineage on chain · पारिवारिक वृक्ष</p>
            </div>
            <VerifiedBadge kind="lineage" size="md" />
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <LineageNode
              role="Mother"
              uid={c.lineage.motherUID}
              breed={c.breed}
              grade="A"
            />
            <LineageNode role="Father" uid={c.lineage.fatherUID} breed={c.breed} grade="A" />
            <div className="rounded-2xl border-2 border-accent bg-accent/5 p-5 text-center">
              <p className="text-xs uppercase tracking-wider text-[color:var(--color-primary)]">This cattle</p>
              <p className="mt-2 font-display text-lg">{c.breed}</p>
              <p className="mt-1 font-mono text-xs text-muted-foreground">{c.id}</p>
              <div className="mt-3 flex justify-center">
                <HealthGradeBadge grade={c.healthScore} size="md" />
              </div>
            </div>
          </div>
        </section>

        {/* Ownership history */}
        <section className="mt-12 rounded-3xl border border-border bg-card p-6 md:p-8">
          <h2 className="font-display text-2xl">Ownership History</h2>
          <ol className="mt-6 space-y-4">
            {Array.from({ length: c.ownershipCount }).map((_, i) => (
              <li key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-primary text-xs text-primary-foreground">
                    {c.ownershipCount - i}
                  </span>
                  {i < c.ownershipCount - 1 && <span className="my-1 w-px flex-1 bg-border" />}
                </div>
                <div className="flex-1 rounded-xl bg-secondary p-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="text-sm font-semibold">
                      {i === 0 ? "Current owner" : `Previous owner`}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {i === 0 ? c.registeredAt : "—"}
                    </p>
                  </div>
                  <p className="mt-1 font-mono text-xs text-muted-foreground">
                    Owner {c.sellerHash.slice(0, 8)}…
                  </p>
                  <p className="mt-1 font-mono text-[11px] text-muted-foreground">
                    TX {c.txHash.slice(0, 16)}…
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Similar */}
        <section className="mt-12">
          <h2 className="font-display text-2xl">Similar cattle</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {similar.map((s) => (
              <CattleCard key={s.id} c={s} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function LineageNode({
  role,
  uid,
  breed,
  grade,
}: {
  role: string;
  uid: string | null;
  breed: string;
  grade: "A" | "B" | "C";
}) {
  if (!uid) {
    return (
      <div className="rounded-2xl border-2 border-dashed border-border p-5 text-center text-muted-foreground">
        <p className="text-xs uppercase tracking-wider">{role}</p>
        <p className="mt-3 font-display text-base">Not registered</p>
        <p className="mt-1 text-xs">No on-chain record</p>
      </div>
    );
  }
  return (
    <div className="card-lift rounded-2xl border border-border bg-secondary p-5 text-center">
      <p className="text-xs uppercase tracking-wider text-muted-foreground">{role}</p>
      <p className="mt-2 font-display text-base">{breed}</p>
      <p className="mt-1 font-mono text-xs text-muted-foreground">{uid}</p>
      <div className="mt-3 flex justify-center">
        <HealthGradeBadge grade={grade} size="sm" />
      </div>
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard?.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1400);
      }}
      aria-label="Copy"
      className="ml-auto rounded p-1 text-muted-foreground hover:text-foreground"
    >
      {copied ? <span className="text-[10px] text-[color:var(--color-verified)]">Copied</span> : <Copy className="h-3.5 w-3.5" />}
    </button>
  );
}
