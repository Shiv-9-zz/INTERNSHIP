import type { HealthGrade as Grade } from "@/lib/cattle-data";

const gradients: Record<Grade, string> = {
  A: "from-[color:var(--color-grade-a)] to-emerald-600",
  B: "from-[color:var(--color-grade-b)] to-amber-600",
  C: "from-[color:var(--color-grade-c)] to-orange-600",
};

const sizes = {
  sm: "h-7 w-7 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-14 w-14 text-2xl",
};

export function HealthGradeBadge({
  grade,
  size = "sm",
  ring = false,
}: {
  grade: Grade;
  size?: keyof typeof sizes;
  ring?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full bg-gradient-to-br font-display font-bold text-white shadow-md ${gradients[grade]} ${sizes[size]} ${ring ? "ring-[3px] ring-white/90 ring-offset-1 ring-offset-black/20" : ""}`}
      aria-label={`Health grade ${grade}`}
    >
      {grade}
    </span>
  );
}
