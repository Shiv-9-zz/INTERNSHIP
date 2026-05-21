import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, MapPin, SlidersHorizontal, X } from "lucide-react";
import { cattleData, breeds, formatINR } from "@/lib/cattle-data";
import { CattleCard } from "@/components/site/CattleCard";

export const Route = createFileRoute("/marketplace")({
  head: () => ({
    meta: [
      { title: "Marketplace — PashuBazaar" },
      { name: "description", content: "Browse verified cattle near you on PashuBazaar." },
    ],
  }),
  component: MarketplacePage,
});

const types = ["All", "Buffalo", "Cow", "Bull", "Calf"] as const;
const sorts = ["Nearest", "Newest", "Price: Low → High", "Health Grade"] as const;

function MarketplacePage() {
  const [q, setQ] = useState("");
  const [type, setType] = useState<(typeof types)[number]>("All");
  const [sort, setSort] = useState<(typeof sorts)[number]>("Nearest");
  const [maxPrice, setMaxPrice] = useState(500000);
  const [maxDist, setMaxDist] = useState(500);
  const [grades, setGrades] = useState<Set<"A" | "B" | "C">>(new Set(["A", "B", "C"]));
  const [showFilters, setShowFilters] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const list = cattleData.filter((c) => {
      if (q && !`${c.breed} ${c.location.district} ${c.location.state}`.toLowerCase().includes(q.toLowerCase()))
        return false;
      if (type !== "All") {
        const matchBuffalo = type === "Buffalo" && c.breed.includes("Buffalo");
        const matchCow = type === "Cow" && (c.breed.includes("Cow") || c.gender === "Female");
        const matchBull = type === "Bull" && c.gender === "Male";
        const matchCalf = type === "Calf" && c.age < 24;
        if (!(matchBuffalo || matchCow || matchBull || matchCalf)) return false;
      }
      if (c.price > maxPrice) return false;
      if (c.location.distance > maxDist) return false;
      if (!grades.has(c.healthScore)) return false;
      return true;
    });

    const sorted = [...list];
    if (sort === "Nearest") sorted.sort((a, b) => a.location.distance - b.location.distance);
    else if (sort === "Newest") sorted.sort((a, b) => b.registeredAt.localeCompare(a.registeredAt));
    else if (sort === "Price: Low → High") sorted.sort((a, b) => a.price - b.price);
    else if (sort === "Health Grade") sorted.sort((a, b) => a.healthScore.localeCompare(b.healthScore));
    return sorted;
  }, [q, type, sort, maxPrice, maxDist, grades]);

  const toggleGrade = (g: "A" | "B" | "C") => {
    const next = new Set(grades);
    next.has(g) ? next.delete(g) : next.add(g);
    setGrades(next);
  };

  return (
    <div className="bg-[color:var(--color-surface-2)]">
      {/* Top bar */}
      <div className="sticky top-16 z-30 border-b border-border bg-[color:var(--color-surface)]/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by breed, location, price…"
                className="h-11 w-full rounded-lg border border-input bg-card pl-10 pr-3 text-sm outline-none transition focus:border-accent"
              />
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as (typeof sorts)[number])}
              className="h-11 rounded-lg border border-input bg-card px-3 text-sm outline-none focus:border-accent"
            >
              {sorts.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <button
              onClick={() => setShowFilters((v) => !v)}
              className="inline-flex h-11 items-center gap-2 rounded-lg border border-input bg-card px-4 text-sm font-medium lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" /> Filters
            </button>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {types.map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
                  type === t
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-muted-foreground ring-1 ring-border hover:text-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[260px_1fr_minmax(0,1fr)]">
        {/* Filter sidebar */}
        <aside
          className={`${
            showFilters ? "block" : "hidden"
          } space-y-6 rounded-2xl border border-border bg-card p-5 lg:sticky lg:top-40 lg:block lg:h-fit`}
        >
          <div className="flex items-center justify-between lg:hidden">
            <h3 className="font-display text-lg">Filters</h3>
            <button onClick={() => setShowFilters(false)} aria-label="Close">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Breed</h4>
            <div className="mt-3 space-y-2 text-sm">
              {breeds.slice(0, 6).map((b) => (
                <label key={b} className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="h-4 w-4 accent-[color:var(--color-primary)]" />
                  <span>{b}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Max price <span className="ml-2 text-foreground">{formatINR(maxPrice)}</span>
            </h4>
            <input
              type="range"
              min={10000}
              max={500000}
              step={5000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(+e.target.value)}
              className="mt-3 w-full accent-[color:var(--color-accent)]"
            />
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Health Grade</h4>
            <div className="mt-3 flex gap-2">
              {(["A", "B", "C"] as const).map((g) => (
                <button
                  key={g}
                  onClick={() => toggleGrade(g)}
                  className={`h-9 w-9 rounded-full font-display text-sm font-bold transition ${
                    grades.has(g)
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Distance <span className="ml-2 text-foreground">≤ {maxDist} km</span>
            </h4>
            <input
              type="range"
              min={10}
              max={500}
              step={10}
              value={maxDist}
              onChange={(e) => setMaxDist(+e.target.value)}
              className="mt-3 w-full accent-[color:var(--color-accent)]"
            />
          </div>

          <div className="space-y-3 border-t border-border pt-4">
            <label className="flex cursor-pointer items-center justify-between text-sm">
              <span>Verified only</span>
              <input type="checkbox" defaultChecked className="h-4 w-4 accent-[color:var(--color-verified)]" />
            </label>
            <label className="flex cursor-pointer items-center justify-between text-sm">
              <span>With lineage</span>
              <input type="checkbox" className="h-4 w-4 accent-[color:var(--color-accent)]" />
            </label>
          </div>
        </aside>

        {/* List */}
        <section>
          <div className="mb-4 flex items-end justify-between">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{filtered.length}</span> verified
              cattle found
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {filtered.map((c) => (
              <div
                key={c.id}
                onMouseEnter={() => setSelectedId(c.id)}
                className={selectedId === c.id ? "ring-2 ring-accent rounded-2xl" : ""}
              >
                <CattleCard c={c} />
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="col-span-full rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">
                No cattle match your filters. Try widening your range.
              </div>
            )}
          </div>
        </section>

        {/* Map */}
        <aside className="hidden lg:sticky lg:top-40 lg:block lg:h-[calc(100dvh-12rem)]">
          <MapPanel selectedId={selectedId} onSelect={setSelectedId} cattle={filtered} />
        </aside>
      </div>
    </div>
  );
}

function MapPanel({
  selectedId,
  onSelect,
  cattle,
}: {
  selectedId: string | null;
  onSelect: (id: string) => void;
  cattle: typeof cattleData;
}) {
  // Stylized map — bounding box covers UP / Bihar / Rajasthan / MP
  const minLat = 22,
    maxLat = 28,
    minLng = 74,
    maxLng = 86;
  const pos = (lat: number, lng: number) => ({
    left: `${((lng - minLng) / (maxLng - minLng)) * 100}%`,
    top: `${100 - ((lat - minLat) / (maxLat - minLat)) * 100}%`,
  });

  return (
    <div className="relative h-full overflow-hidden rounded-2xl border border-border bg-[color:var(--color-surface-dark)]">
      {/* base */}
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(45,106,79,0.4), rgba(15,36,25,0.95)), repeating-linear-gradient(45deg, rgba(255,255,255,0.025) 0 1px, transparent 1px 28px)",
        }}
      />
      {/* faux district outlines */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path
          d="M10,20 Q30,10 50,18 T90,22 L92,40 Q75,55 60,52 T30,60 L25,80 Q40,90 65,85 L88,78"
          fill="none"
          stroke="rgba(212,160,23,0.25)"
          strokeWidth="0.3"
        />
        <path
          d="M15,45 Q40,38 60,48 T88,55"
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="0.2"
        />
      </svg>

      {/* pins */}
      {cattle.map((c) => {
        const p = pos(c.location.lat, c.location.lng);
        const active = selectedId === c.id;
        return (
          <button
            key={c.id}
            onClick={() => onSelect(c.id)}
            className={`absolute -translate-x-1/2 -translate-y-full transition ${
              active ? "z-20 scale-110" : "z-10"
            }`}
            style={p}
            aria-label={`${c.breed} in ${c.location.district}`}
          >
            <div
              className={`relative grid h-9 w-9 place-items-center rounded-full text-xs font-bold text-white shadow-lg ring-2 ring-white ${
                active ? "bg-accent text-[color:var(--color-accent-foreground)]" : "bg-primary"
              }`}
            >
              {c.healthScore}
              <span
                className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45"
                style={{ backgroundColor: active ? "var(--color-accent)" : "var(--color-primary)" }}
              />
            </div>
          </button>
        );
      })}

      <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-black/40 px-3 py-1.5 text-xs text-white backdrop-blur">
        <MapPin className="h-3.5 w-3.5 text-accent" /> {cattle.length} cattle nearby
      </div>
      <div className="absolute bottom-4 right-4 rounded-lg bg-black/40 px-3 py-1.5 text-[10px] text-white/70 backdrop-blur">
        Stylized regional view · UP · Bihar · MP · RJ
      </div>
    </div>
  );
}
