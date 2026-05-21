import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/breeds")({
  head: () => ({ meta: [{ title: "Breeds Guide — PashuBazaar" }] }),
  component: BreedsPage,
});

const guide = [
  {
    name: "Murrah Buffalo",
    hi: "मुर्रा भैंस",
    region: "Haryana, Punjab, UP",
    priceRange: "₹ 60,000 – 1,20,000",
    notes: "World's highest milk-yielding buffalo breed. Average 12 L/day.",
    color: "#1B4332",
  },
  {
    name: "Gir Cow",
    hi: "गिर गाय",
    region: "Gujarat, Rajasthan",
    priceRange: "₹ 50,000 – 90,000",
    notes: "A2 milk producer, heat-tolerant, distinctive forehead and ears.",
    color: "#D4A017",
  },
  {
    name: "Sahiwal",
    hi: "साहीवाल",
    region: "Punjab, UP, Bihar",
    priceRange: "₹ 40,000 – 75,000",
    notes: "One of the best dairy breeds of zebu cattle, disease-resistant.",
    color: "#6366F1",
  },
  {
    name: "Tharparkar",
    hi: "थारपारकर",
    region: "Rajasthan",
    priceRange: "₹ 45,000 – 80,000",
    notes: "Dual-purpose breed, exceptional desert adaptation.",
    color: "#2D6A4F",
  },
  {
    name: "Rathi",
    hi: "राठी",
    region: "Rajasthan",
    priceRange: "₹ 80,000 – 1,50,000",
    notes: "Renowned dairy breed of dry regions, gentle temperament.",
    color: "#D4A017",
  },
  {
    name: "Holstein Friesian",
    hi: "होल्स्टीन फ्रीज़ियन",
    region: "MP, Punjab",
    priceRange: "₹ 80,000 – 1,20,000",
    notes: "High milk yield (25 L/day avg). Requires cooler housing.",
    color: "#059669",
  },
];

function BreedsPage() {
  return (
    <div className="bg-[color:var(--color-surface-2)] py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">Reference</p>
        <h1 className="mt-2 font-display text-4xl text-balance md:text-5xl">Breeds Guide</h1>
        <p className="mt-2 font-hindi text-sm text-muted-foreground">नस्ल मार्गदर्शिका</p>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {guide.map((b) => (
            <div key={b.name} className="card-lift rounded-2xl border border-border bg-card p-6">
              <span
                className="inline-block h-1 w-12 rounded-full"
                style={{ backgroundColor: b.color }}
              />
              <h3 className="mt-4 font-display text-xl">{b.name}</h3>
              <p className="font-hindi text-sm text-muted-foreground">{b.hi}</p>
              <dl className="mt-4 space-y-1.5 text-sm">
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">Region</dt>
                  <dd className="text-right">{b.region}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">Typical price</dt>
                  <dd className="text-right font-medium">{b.priceRange}</dd>
                </div>
              </dl>
              <p className="mt-4 text-sm text-muted-foreground">{b.notes}</p>
              <Link
                to="/marketplace"
                className="mt-5 inline-flex text-sm font-semibold text-primary hover:underline"
              >
                Browse {b.name} →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
