import { Link } from "@tanstack/react-router";
import { Heart, MapPin, Clock, Weight, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import type { CattleRecord } from "@/lib/cattle-data";
import { formatAge, formatINR } from "@/lib/cattle-data";
import { HealthGradeBadge } from "./HealthGrade";
import { VerifiedBadge } from "./Badges";

export function CattleCard({ c }: { c: CattleRecord }) {
  const [saved, setSaved] = useState(false);
  const hasLineage = !!(c.lineage.motherUID || c.lineage.fatherUID);

  return (
    <article className="card-lift group flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-card">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={c.photo}
          alt={`${c.breed} — ${c.gender}, ${formatAge(c.age)}`}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.06]"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent"
          aria-hidden
        />
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
          <span className="rounded-lg bg-black/40 px-2 py-1 font-mono text-[10px] tracking-wide text-white/90 backdrop-blur-sm">
            {c.id}
          </span>
          <div className="shrink-0">
            <HealthGradeBadge grade={c.healthScore} size="md" ring />
          </div>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            setSaved((s) => !s);
          }}
          aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
          className="absolute left-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/95 text-foreground shadow-md backdrop-blur transition hover:scale-105 hover:bg-white"
        >
          <Heart
            className={`h-4 w-4 transition ${
              saved ? "fill-[color:var(--color-accent)] text-[color:var(--color-accent)]" : ""
            }`}
          />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-display text-xl leading-tight text-foreground">{c.breed}</h3>
            <p className="mt-0.5 text-xs text-muted-foreground">{c.gender}</p>
          </div>
          <div className="text-right">
            <div className="font-display text-2xl font-bold tracking-tight text-primary">
              {formatINR(c.price)}
            </div>
            <p className="text-[10px] text-muted-foreground">listed price</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-secondary/80 px-2.5 py-1 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-primary/70" />
            {c.location.district}, {c.location.state}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-secondary/80 px-2.5 py-1 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5 shrink-0" />
            {formatAge(c.age)}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-secondary/80 px-2.5 py-1 text-xs text-muted-foreground">
            <Weight className="h-3.5 w-3.5 shrink-0" />
            {c.weight} kg · {c.location.distance} km
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          <VerifiedBadge kind="aadhaar" />
          <VerifiedBadge kind="blockchain" />
          {hasLineage && <VerifiedBadge kind="lineage" />}
        </div>

        <Link
          to="/cattle/$id"
          params={{ id: c.id }}
          className="group/btn mt-auto inline-flex items-center justify-center gap-2 rounded-xl border border-primary/20 bg-primary/5 px-4 py-2.5 text-sm font-semibold text-primary transition hover:border-primary/40 hover:bg-primary hover:text-primary-foreground"
        >
          View Details
          <ArrowUpRight className="h-4 w-4 transition group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
        </Link>
      </div>
    </article>
  );
}
