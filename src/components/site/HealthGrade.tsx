import type { HealthGrade as Grade } from "@/lib/cattle-data";

const colors: Record<Grade, string> = {
  A: "bg-[color:var(--color-grade-a)]",
  B: "bg-[color:var(--color-grade-b)]",
  C: "bg-[color:var(--color-grade-c)]",
};

const sizes = {
  sm: "h-6 w-6 text-xs",
  md: "h-9 w-9 text-sm",
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
      className={`inline-flex items-center justify-center rounded-full font-display font-bold text-white shadow-sm ${
        colors[grade]
      } ${sizes[size]} ${ring ? "ring-4 ring-white/80" : ""}`}
      aria-label={`Health grade ${grade}`}
    >
      {grade}
    </span>
  );
}
