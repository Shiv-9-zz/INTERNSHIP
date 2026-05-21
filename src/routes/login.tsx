import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Login — PashuBazaar" }] }),
  component: LoginPage,
});

function LoginPage() {
  return (
    <div className="grid min-h-[calc(100dvh-4rem)] place-items-center bg-[color:var(--color-surface-2)] px-4 py-12">
      <div className="w-full max-w-md">
        <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
          <div className="text-center">
            <span className="grid mx-auto h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground">
              <ShieldCheck className="h-6 w-6" />
            </span>
            <h1 className="mt-4 font-display text-2xl">Welcome back</h1>
            <p className="font-hindi text-sm text-muted-foreground">पुनः स्वागत है</p>
          </div>

          <div className="mt-6 space-y-4">
            <label className="block">
              <span className="text-xs font-semibold text-muted-foreground">Phone or User UID</span>
              <input
                placeholder="10-digit mobile or USR-…"
                className="mt-1 h-12 w-full rounded-lg border border-input bg-card px-3 outline-none focus:border-accent"
              />
            </label>
            <button className="h-12 w-full rounded-lg bg-accent font-semibold text-[color:var(--color-accent-foreground)] hover:bg-[color:var(--color-accent-light)]">
              Send OTP
            </button>
          </div>

          <div className="mt-6 border-t border-border pt-6 text-center text-sm text-muted-foreground">
            New here?{" "}
            <Link to="/register" className="font-semibold text-primary hover:underline">
              Verify your Aadhaar to register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
