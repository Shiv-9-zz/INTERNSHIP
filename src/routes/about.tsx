import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Eye, Link2, Sparkles } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — PashuBazaar" },
      {
        name: "description",
        content:
          "PashuBazaar is a verified cattle marketplace research project from IIT (BHU) Varanasi.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="bg-[color:var(--color-surface)] pb-16">
      <section className="bg-[color:var(--color-surface-dark)] py-16 text-white md:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80">
            <Sparkles className="h-3.5 w-3.5 text-accent" /> Research at IIT (BHU)
          </span>
          <h1 className="mt-6 font-display text-4xl text-balance md:text-5xl">
            Building a trust layer for India's cattle economy
          </h1>
          <p className="mt-5 text-base text-white/75 md:text-lg">
            PashuBazaar combines UIDAI Aadhaar verification, on-device computer vision, and
            Hyperledger Fabric to create an auditable, fraud-resistant marketplace for the
            ₹2,00,000 crore Indian livestock economy.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-16 sm:px-6 md:grid-cols-3">
        {[
          {
            Icon: ShieldCheck,
            title: "Aadhaar-backed identity",
            text: "Owner KYC via UIDAI. Only SHA-256 hashes are persisted; Aadhaar numbers never leave the user's device.",
            color: "var(--color-verified)",
          },
          {
            Icon: Eye,
            title: "On-device CV verification",
            text: "A breed-classification model identifies 27 indigenous and exotic breeds with 95%+ confidence and grades visible health.",
            color: "var(--color-primary)",
          },
          {
            Icon: Link2,
            title: "Hyperledger Fabric ledger",
            text: "Every registration, ownership transfer, and lineage link is written to a permissioned chain auditable by regulators.",
            color: "var(--color-blockchain)",
          },
        ].map(({ Icon, title, text, color }) => (
          <div key={title} className="card-lift rounded-2xl border border-border bg-card p-6">
            <span
              className="grid h-11 w-11 place-items-center rounded-xl"
              style={{ backgroundColor: `color-mix(in oklab, ${color} 12%, transparent)` }}
            >
              <Icon className="h-5 w-5" style={{ color }} />
            </span>
            <h3 className="mt-4 font-display text-lg">{title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{text}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-20 sm:px-6">
        <div className="rounded-3xl border border-border bg-card p-8">
          <h2 className="font-display text-2xl">The team</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Built by undergraduate researchers at the Indian Institute of Technology (BHU)
            Varanasi, in collaboration with the Department of Animal Husbandry and Dairying.
          </p>
        </div>
      </section>
    </div>
  );
}
