export function StatPill({ value, label }: { value: string; label: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 backdrop-blur">
      <span className="font-display text-base font-semibold text-accent">{value}</span>
      <span className="text-xs text-white/80">{label}</span>
    </div>
  );
}
