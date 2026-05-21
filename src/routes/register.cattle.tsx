import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Camera, Upload, Check, Sparkles, ArrowRight } from "lucide-react";
import { breeds } from "@/lib/cattle-data";

export const Route = createFileRoute("/register/cattle")({
  head: () => ({ meta: [{ title: "Register Cattle — PashuBazaar" }] }),
  component: RegisterCattlePage,
});

function RegisterCattlePage() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setScanned(true);
    }, 2200);
  };

  return (
    <div className="bg-[color:var(--color-surface-2)] py-10 md:py-14">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        {/* Steps */}
        <ol className="mb-8 flex items-center justify-between gap-2 text-xs">
          {[
            { n: 1, label: "Basic Info" },
            { n: 2, label: "Photo & CV" },
            { n: 3, label: "Lineage" },
            { n: 4, label: "Done" },
          ].map((s, i, arr) => (
            <li key={s.n} className="flex flex-1 items-center gap-2">
              <span
                className={`grid h-8 w-8 shrink-0 place-items-center rounded-full font-semibold ${
                  step >= s.n
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {step > s.n ? <Check className="h-4 w-4" /> : s.n}
              </span>
              <span className={`hidden sm:block ${step >= s.n ? "text-foreground" : "text-muted-foreground"}`}>
                {s.label}
              </span>
              {i < arr.length - 1 && <span className="ml-1 h-px flex-1 bg-border" />}
            </li>
          ))}
        </ol>

        <div className="rounded-3xl border border-border bg-card p-6 md:p-8">
          {step === 1 && (
            <>
              <h2 className="font-display text-2xl">Basic information</h2>
              <p className="mt-1 text-sm text-muted-foreground">Tell us about your cattle.</p>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <Field label="Breed">
                  <select className="h-11 w-full rounded-lg border border-input bg-card px-3">
                    {breeds.map((b) => (
                      <option key={b}>{b}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Gender">
                  <div className="flex h-11 rounded-lg bg-secondary p-1">
                    {(["Female", "Male"] as const).map((g, i) => (
                      <button
                        key={g}
                        className={`flex-1 rounded-md text-sm font-medium transition ${
                          i === 0 ? "bg-card shadow text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </Field>
                <Field label="Age (months)">
                  <input
                    type="number"
                    defaultValue={40}
                    className="h-11 w-full rounded-lg border border-input bg-card px-3"
                  />
                </Field>
                <Field label="Weight (kg)">
                  <input
                    type="number"
                    defaultValue={480}
                    className="h-11 w-full rounded-lg border border-input bg-card px-3"
                  />
                </Field>
                <Field label="State">
                  <select className="h-11 w-full rounded-lg border border-input bg-card px-3">
                    <option>Uttar Pradesh</option>
                    <option>Bihar</option>
                    <option>Rajasthan</option>
                    <option>Madhya Pradesh</option>
                  </select>
                </Field>
                <Field label="District">
                  <select className="h-11 w-full rounded-lg border border-input bg-card px-3">
                    <option>Varanasi</option>
                    <option>Mirzapur</option>
                    <option>Agra</option>
                  </select>
                </Field>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
                >
                  Continue <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="font-display text-2xl">Photo & CV Verification</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Our computer vision model will identify breed and grade health.
              </p>

              <div className="mt-6">
                {!scanned ? (
                  <div
                    onClick={!scanning ? handleScan : undefined}
                    className={`relative grid aspect-video w-full cursor-pointer place-items-center overflow-hidden rounded-2xl border-2 border-dashed transition ${
                      scanning ? "border-[color:var(--color-verified)] bg-secondary" : "border-border bg-secondary hover:border-accent"
                    }`}
                  >
                    {scanning ? (
                      <>
                        <div
                          className="absolute inset-x-0 top-0 h-1 animate-[scan_2.2s_linear] bg-[color:var(--color-verified)] shadow-[0_0_20px_rgba(5,150,105,0.7)]"
                          style={{ animationFillMode: "forwards" }}
                        />
                        <p className="text-sm font-semibold text-primary">
                          Analyzing cattle… <span className="font-hindi">पशु की जांच…</span>
                        </p>
                        <style>{`@keyframes scan { from { top: 0 } to { top: 100% } }`}</style>
                      </>
                    ) : (
                      <div className="text-center">
                        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-card shadow">
                          <Upload className="h-6 w-6 text-primary" />
                        </div>
                        <p className="mt-4 font-display text-lg">Drop a photo or capture from camera</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          PNG, JPG up to 10 MB · Good lighting recommended
                        </p>
                        <span className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground">
                          <Camera className="h-4 w-4" /> Simulate upload
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-3 rounded-2xl border border-[color:var(--color-verified)]/30 bg-[color:var(--color-verified)]/5 p-6">
                    {[
                      "Breed Identified: Murrah Buffalo (98.4% confidence)",
                      "Unique ID Generated: CV-2024-UP-000123",
                      "Health Assessment: Grade A",
                    ].map((line, i) => (
                      <div
                        key={line}
                        className="animate-fade-up flex items-center gap-3"
                        style={{ animationDelay: `${i * 220}ms` }}
                      >
                        <span className="grid h-6 w-6 place-items-center rounded-full bg-[color:var(--color-verified)] text-white">
                          <Check className="h-3.5 w-3.5" />
                        </span>
                        <p className="text-sm font-medium text-foreground">{line}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-8 flex items-center justify-between">
                <button onClick={() => setStep(1)} className="text-sm text-muted-foreground hover:text-foreground">
                  ← Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!scanned}
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-50"
                >
                  Continue <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="font-display text-2xl">Link parent records (optional)</h2>
              <p className="mt-1 text-sm text-muted-foreground text-pretty">
                If your cattle's parents are registered on PashuBazaar, linking them increases
                your cattle's value and trustworthiness to buyers.
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <Field label="Mother UID">
                  <input
                    placeholder="CV-2022-UP-000045"
                    className="h-11 w-full rounded-lg border border-input bg-card px-3 font-mono text-sm"
                  />
                </Field>
                <Field label="Father UID">
                  <input
                    placeholder="CV-2021-UP-000012"
                    className="h-11 w-full rounded-lg border border-input bg-card px-3 font-mono text-sm"
                  />
                </Field>
              </div>

              <div className="mt-6 rounded-xl bg-secondary p-4 text-sm">
                <p className="font-medium">No parents on chain?</p>
                <p className="mt-1 text-muted-foreground">
                  You can skip this step and link parents later from your dashboard.
                </p>
              </div>

              <div className="mt-8 flex items-center justify-between">
                <button onClick={() => setStep(2)} className="text-sm text-muted-foreground hover:text-foreground">
                  ← Back
                </button>
                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(4)}
                    className="rounded-lg border border-input bg-card px-5 py-3 text-sm font-medium"
                  >
                    Skip
                  </button>
                  <button
                    onClick={() => setStep(4)}
                    className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-[color:var(--color-accent-foreground)]"
                  >
                    Register cattle <Sparkles className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </>
          )}

          {step === 4 && (
            <div className="text-center">
              <div className="relative mx-auto grid h-20 w-20 place-items-center rounded-full bg-accent text-[color:var(--color-accent-foreground)]">
                <Check className="h-10 w-10" />
                <span className="absolute inset-0 animate-ping rounded-full bg-accent/40" />
              </div>
              <h2 className="mt-6 font-display text-3xl">Your cattle is on the blockchain</h2>
              <p className="font-hindi text-sm text-muted-foreground">आपका पशु ब्लॉकचेन पर दर्ज</p>

              <div className="mx-auto mt-6 max-w-md rounded-2xl border-l-4 border-[color:var(--color-blockchain)] bg-secondary p-4 text-left">
                <p className="text-xs text-muted-foreground">Transaction Hash</p>
                <p className="mt-1 break-all font-mono text-xs text-foreground">
                  0xa3f9c27e91d4b6f80c12a5e7f3b8d92c
                </p>
                <div className="mt-3 h-1 overflow-hidden rounded-full bg-card">
                  <div className="h-full w-full animate-shimmer" />
                </div>
              </div>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <button
                  onClick={() => {
                    setStep(1);
                    setScanned(false);
                  }}
                  className="rounded-lg border border-input bg-card px-5 py-3 text-sm font-medium"
                >
                  Add another cattle
                </button>
                <Link
                  to="/dashboard"
                  className="rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
                >
                  Go to dashboard
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-muted-foreground">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}
