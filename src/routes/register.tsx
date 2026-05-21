import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Lock, Tag, ShoppingBag, ArrowRight, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Register — PashuBazaar" }] }),
  component: RegisterPage,
});

function RegisterPage() {
  const [step, setStep] = useState<1 | 2>(1);
  const [aadhaar, setAadhaar] = useState("");
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [role, setRole] = useState<"sell" | "buy" | null>(null);
  const navigate = useNavigate();

  const formatAadhaar = (v: string) =>
    v.replace(/\D/g, "").slice(0, 12).replace(/(\d{4})(?=\d)/g, "$1 ");

  const handleOtp = (i: number, v: string) => {
    const next = [...otp];
    next[i] = v.slice(-1);
    setOtp(next);
    if (v && i < 5) {
      const el = document.getElementById(`otp-${i + 1}`);
      el?.focus();
    }
  };

  return (
    <div className="grid min-h-[calc(100dvh-4rem)] place-items-center bg-[color:var(--color-surface-2)] px-4 py-12">
      <div className="w-full max-w-lg">
        {/* Stepper */}
        <ol className="mb-6 flex items-center justify-center gap-3 text-xs">
          {[1, 2].map((n) => (
            <li key={n} className="flex items-center gap-2">
              <span
                className={`grid h-7 w-7 place-items-center rounded-full font-semibold ${
                  step >= n
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {n}
              </span>
              <span className={step >= n ? "text-foreground" : "text-muted-foreground"}>
                {n === 1 ? "Verify Aadhaar" : "Choose Role"}
              </span>
              {n < 2 && <span className="ml-1 h-px w-8 bg-border" />}
            </li>
          ))}
        </ol>

        <div className="rounded-3xl border border-border bg-card p-7 shadow-sm md:p-9">
          {step === 1 && (
            <>
              <div className="text-center">
                <span className="grid mx-auto h-12 w-12 place-items-center rounded-full bg-[color:var(--color-verified)]/10">
                  <ShieldCheck className="h-6 w-6 text-[color:var(--color-verified)]" />
                </span>
                <h1 className="mt-4 font-display text-2xl">Verify Your Identity</h1>
                <p className="font-hindi text-sm text-muted-foreground">अपनी पहचान सत्यापित करें</p>
                <p className="mt-3 text-sm text-muted-foreground text-balance">
                  Your Aadhaar is used only for verification. We store only a secure hash —
                  never your Aadhaar number.
                </p>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">
                    Aadhaar Number
                  </label>
                  <input
                    value={aadhaar}
                    onChange={(e) => setAadhaar(formatAadhaar(e.target.value))}
                    placeholder="XXXX XXXX XXXX"
                    inputMode="numeric"
                    className="mt-1 h-12 w-full rounded-lg border border-input bg-card px-3 font-mono tracking-widest outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Phone</label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    placeholder="10-digit mobile"
                    inputMode="numeric"
                    className="mt-1 h-12 w-full rounded-lg border border-input bg-card px-3 outline-none focus:border-accent"
                  />
                </div>

                {!otpSent ? (
                  <button
                    onClick={() => setOtpSent(true)}
                    disabled={aadhaar.length < 14 || phone.length < 10}
                    className="h-12 w-full rounded-lg bg-accent font-semibold text-[color:var(--color-accent-foreground)] transition hover:bg-[color:var(--color-accent-light)] disabled:opacity-50"
                  >
                    Send OTP
                  </button>
                ) : (
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground">
                      Enter the 6-digit OTP
                    </label>
                    <div className="mt-2 flex justify-between gap-2">
                      {otp.map((d, i) => (
                        <input
                          key={i}
                          id={`otp-${i}`}
                          value={d}
                          onChange={(e) => handleOtp(i, e.target.value)}
                          maxLength={1}
                          inputMode="numeric"
                          className="h-12 w-12 rounded-lg border border-input bg-card text-center font-display text-xl outline-none focus:border-accent"
                        />
                      ))}
                    </div>
                    <button
                      onClick={() => setStep(2)}
                      className="mt-5 h-12 w-full rounded-lg bg-primary font-semibold text-primary-foreground transition hover:bg-[color:var(--color-primary-light)]"
                    >
                      Verify & Continue
                    </button>
                  </div>
                )}

                <p className="flex items-start gap-2 text-xs text-muted-foreground">
                  <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  Your Aadhaar number is hashed locally with SHA-256. Only the hash leaves
                  your device.
                </p>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="text-center">
                <h1 className="font-display text-2xl">How do you want to use PashuBazaar?</h1>
                <p className="font-hindi text-sm text-muted-foreground">
                  आप PashuBazaar का उपयोग कैसे करना चाहते हैं?
                </p>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <RoleCard
                  selected={role === "sell"}
                  onSelect={() => setRole("sell")}
                  icon={Tag}
                  title="Sell Cattle"
                  hi="बेचें"
                  desc="Register your cattle with CV verification and list on the marketplace"
                  features={["CV verification", "Blockchain KYC", "Secure escrow"]}
                  accent="primary"
                />
                <RoleCard
                  selected={role === "buy"}
                  onSelect={() => setRole("buy")}
                  icon={ShoppingBag}
                  title="Buy Cattle"
                  hi="खरीदें"
                  desc="Browse verified listings and purchase with Aadhaar-backed trust"
                  features={["Verified sellers", "Health reports", "Escrow protection"]}
                  accent="accent"
                />
              </div>

              <button
                disabled={!role}
                onClick={() => navigate({ to: role === "sell" ? "/register/cattle" : "/marketplace" })}
                className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary font-semibold text-primary-foreground transition hover:bg-[color:var(--color-primary-light)] disabled:opacity-50"
              >
                Continue <ArrowRight className="h-4 w-4" />
              </button>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                You can switch roles anytime from your dashboard.
              </p>
            </>
          )}
        </div>

        <p className="mt-5 text-center text-xs text-muted-foreground">
          Already verified?{" "}
          <Link to="/login" className="font-semibold text-primary hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

function RoleCard({
  selected,
  onSelect,
  icon: Icon,
  title,
  hi,
  desc,
  features,
  accent,
}: {
  selected: boolean;
  onSelect: () => void;
  icon: typeof Tag;
  title: string;
  hi: string;
  desc: string;
  features: string[];
  accent: "primary" | "accent";
}) {
  const border = selected
    ? accent === "primary"
      ? "border-primary ring-4 ring-primary/10"
      : "border-accent ring-4 ring-accent/15"
    : "border-border";
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`text-left card-lift rounded-2xl border-2 bg-card p-5 transition ${border}`}
    >
      <span
        className={`grid h-11 w-11 place-items-center rounded-xl ${
          accent === "primary"
            ? "bg-primary/10 text-primary"
            : "bg-accent/15 text-[color:var(--color-primary)]"
        }`}
      >
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="mt-4 font-display text-lg">
        {title} <span className="font-hindi text-sm text-muted-foreground">· {hi}</span>
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
      <ul className="mt-3 space-y-1 text-xs text-muted-foreground">
        {features.map((f) => (
          <li key={f} className="flex gap-1.5">
            <span className="text-[color:var(--color-verified)]">✓</span> {f}
          </li>
        ))}
      </ul>
    </button>
  );
}
