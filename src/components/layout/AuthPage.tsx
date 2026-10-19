import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Mail, LockKeyhole, Moon, Sun } from "lucide-react";
import { useState, type FormEvent, type ReactNode } from "react";
import heroImage from "@/assets/udaipur-hero.jpg";
import { Logo } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTheme } from "@/hooks/use-theme";

type AuthMode = "login" | "signup" | "reset";

export function AuthPage({ mode }: { mode: AuthMode }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const isLogin = mode === "login";
  const isSignup = mode === "signup";
  const isReset = mode === "reset";
  const { theme, toggle } = useTheme();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    navigate({ to: isReset ? "/login" : "/app/dashboard" });
  }

  function handleSocialAuth() {
    navigate({ to: "/app/dashboard" });
  }

  return (
    <main className="relative isolate flex min-h-dvh items-center justify-center overflow-hidden bg-background px-4 py-8">
      <img
        src={heroImage}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-20 h-full w-full scale-105 object-cover blur-[10px]"
      />
      <div className="absolute inset-0 -z-10 bg-photo-overlay/75 backdrop-blur-[1px]" />

      <div className="w-full max-w-md">
        <div className="mb-6 flex items-center justify-between">
          <Logo textClassName="font-bold text-white" />
          <div className="flex items-center gap-1.5">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggle}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              className="text-photo-foreground hover:bg-white/10 hover:text-white"
            >
              {theme === "dark" ? <Sun /> : <Moon />}
            </Button>
            <Button asChild variant="ghost" className="h-9 text-photo-foreground hover:bg-white/10 hover:text-white">
              <Link to="/">
                <ArrowLeft className="h-4 w-4" /> Back home
              </Link>
            </Button>
          </div>
        </div>

        <section className="rounded-2xl border border-white/20 bg-card/90 p-6 text-card-foreground shadow-lift backdrop-blur-xl sm:p-8">
          <div className="mb-7 space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              {isLogin ? "Welcome back" : isSignup ? "Create your account" : "Reset your password"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {isLogin
                ? "Sign in to continue planning your next Indian journey."
                : isSignup
                  ? "Start building thoughtful trips across India with AI."
                  : "Enter your email and we’ll send you a reset link."}
            </p>
          </div>

          {!isReset && (
            <>
              <div className="grid gap-3 sm:grid-cols-2">
                <SocialButton onClick={handleSocialAuth}>
                  <img src="/google-icon.png" alt="" className="h-5 w-5 object-contain" />
                  Continue with Google
                </SocialButton>
                <SocialButton onClick={handleSocialAuth}>
                  <img src="/apple-icon.png" alt="" className="h-[23px] w-[23px] object-contain" />
                  Continue with Apple
                </SocialButton>
              </div>

              <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
                <span className="h-px flex-1 bg-border" />
                <span>or continue with email</span>
                <span className="h-px flex-1 bg-border" />
              </div>
            </>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            {isSignup && (
              <Field label="Full name" htmlFor="name">
                <Input id="name" name="name" placeholder="Aarav Sharma" autoComplete="name" required />
              </Field>
            )}
            <Field label="Email address" htmlFor="email">
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="pl-9"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>
            </Field>
            {!isReset && (
              <Field label="Password" htmlFor="password">
                <div className="relative">
                  <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder={isLogin ? "Enter your password" : "At least 8 characters"}
                    autoComplete={isLogin ? "current-password" : "new-password"}
                    minLength={8}
                    className="pl-9"
                    required
                  />
                </div>
              </Field>
            )}
            {isLogin && (
              <div className="flex justify-end">
                <Link to="/forgot-password" className="text-xs font-semibold text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
            )}
            <Button type="submit" className="h-11 w-full">
              {isLogin ? "Sign in" : isSignup ? "Create account" : "Send reset link"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {isLogin ? "Don't have an account?" : isSignup ? "Already have an account?" : "Remember your password?"}{" "}
            <Link
              to={isLogin ? "/signup" : "/login"}
              className="font-bold text-primary hover:underline"
            >
              {isLogin ? "Sign up" : "Log in"}
            </Link>
          </p>
        </section>

        <p className="mt-5 text-center text-xs text-white/70">
          By continuing, you agree to AI Trip Buddy&apos;s terms and privacy policy.
        </p>
      </div>
    </main>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
    </div>
  );
}

function SocialButton({ children, onClick }: { children: ReactNode; onClick: () => void }) {
  return (
    <Button type="button" variant="outline" className="h-10 bg-background/70 text-xs sm:text-sm" onClick={onClick}>
      {children}
    </Button>
  );
}
