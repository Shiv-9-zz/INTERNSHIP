export function StatPill({ value, label }: { value: string; label: string }) {
  return (
    <div className="inline-flex flex-col items-center gap-0.5 rounded-2xl border border-white/20 bg-white/8 px-5 py-3 backdrop-blur-md sm:flex-row sm:items-center sm:gap-3">
      <span className="font-display text-xl font-bold text-gradient-gold sm:text-2xl">{value}</span>
      <span className="text-center text-xs font-medium text-white/75 sm:text-left">{label}</span>
    </div>
  );
}
