import { Link } from "@tanstack/react-router";
import { Heart, MapPin, Clock, Weight } from "lucide-react";
import { useState } from "react";
import type { CattleRecord } from "@/lib/cattle-data";
import { formatAge, formatINR } from "@/lib/cattle-data";
import { HealthGradeBadge } from "./HealthGrade";
import { VerifiedBadge } from "./Badges";

export function CattleCard({ c }: { c: CattleRecord }) {
  const [saved, setSaved] = useState(false);
  const hasLineage = !!(c.lineage.motherUID || c.lineage.fatherUID);

  return (
    <article className="card-lift group flex flex-col overflow-hidden rounded-2xl border border-border bg-card">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={c.photo}
          alt={`${c.breed} — ${c.gender}, ${formatAge(c.age)}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute right-3 top-3">
          <HealthGradeBadge grade={c.healthScore} size="md" ring />
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            setSaved((s) => !s);
          }}
          aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
          className="absolute left-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-foreground backdrop-blur transition hover:bg-white"
        >
          <Heart
            className={`h-4 w-4 transition ${
              saved ? "fill-[color:var(--color-accent)] text-[color:var(--color-accent)]" : ""
            }`}
          />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="font-display text-lg leading-tight text-foreground">{c.breed}</h3>
            <span className="text-xs text-muted-foreground">{c.gender}</span>
          </div>
          <p className="mt-0.5 font-mono text-[11px] tracking-tight text-muted-foreground">
            {c.id}
          </p>
        </div>

        <div className="font-display text-2xl text-primary">{formatINR(c.price)}</div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {c.location.district}, {c.location.state} · {c.location.distance} km
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {formatAge(c.age)}
          </span>
          <span className="inline-flex items-center gap-1">
            <Weight className="h-3.5 w-3.5" /> {c.weight} kg
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5 pt-1">
          <VerifiedBadge kind="aadhaar" />
          <VerifiedBadge kind="blockchain" />
          {hasLineage && <VerifiedBadge kind="lineage" />}
        </div>

        <Link
          to="/cattle/$id"
          params={{ id: c.id }}
          className="mt-2 inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:bg-[color:var(--color-primary-light)]"
        >
          View Details
          <span className="ml-2 font-hindi text-[11px] opacity-70">विवरण</span>
        </Link>
      </div>
    </article>
  );
}
