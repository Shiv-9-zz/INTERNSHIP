import { ShieldCheck, Link2, Eye, Dna } from "lucide-react";

type BadgeKind = "aadhaar" | "blockchain" | "cv" | "lineage";

const config: Record<BadgeKind, { icon: typeof ShieldCheck; label: string; cls: string }> = {
  aadhaar: {
    icon: ShieldCheck,
    label: "Aadhaar Verified",
    cls: "bg-[color:var(--color-verified)]/12 text-[color:var(--color-verified)] ring-[color:var(--color-verified)]/25",
  },
  blockchain: {
    icon: Link2,
    label: "On Blockchain",
    cls: "bg-[color:var(--color-blockchain)]/12 text-[color:var(--color-blockchain)] ring-[color:var(--color-blockchain)]/25",
  },
  cv: {
    icon: Eye,
    label: "CV Verified",
    cls: "bg-primary/10 text-primary ring-primary/20",
  },
  lineage: {
    icon: Dna,
    label: "Lineage Linked",
    cls: "bg-accent/12 text-[color:var(--color-primary)] ring-accent/35",
  },
};

export function VerifiedBadge({
  kind,
  size = "sm",
  pulse = false,
}: {
  kind: BadgeKind;
  size?: "sm" | "md";
  pulse?: boolean;
}) {
  const c = config[kind];
  const Icon = c.icon;
  const sizeCls =
    size === "sm" ? "text-[10px] px-2 py-0.5 gap-1" : "text-xs px-2.5 py-1 gap-1.5";
  return (
    <span
      className={`inline-flex items-center rounded-full ring-1 font-semibold backdrop-blur-sm ${sizeCls} ${c.cls} ${
        pulse ? "animate-pulse-ring" : ""
      }`}
    >
      <Icon className={size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5"} aria-hidden />
      {c.label}
    </span>
  );
}
