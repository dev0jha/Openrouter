import { useRef } from "react";
import { Link, useNavigate } from "react-router";

import { useMutation } from "@tanstack/react-query";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Loader2,
  Lock,
  Mail,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useElysiaClient } from "@/providers/Eden";

export function Signup() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const elysiaClient = useElysiaClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const response = await elysiaClient.auth["sign-up"].post({
        email,
        password,
      });
      if (response.error) {
        const errValue = response.error.value as
          | { message?: string }
          | undefined;
        throw new Error(errValue?.message || "Failed to create account");
      }
      return response.data;
    },
    onSuccess: () => {
      setTimeout(() => navigate("/signin"), 1500);
    },
  });

  return (
    <div className="dark relative flex min-h-screen items-center justify-center overflow-hidden bg-[#121212]">
      {/* Decorative left border */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden h-full w-10 -translate-x-14 border-r border-[rgba(255,255,255,0.1)] bg-[repeating-linear-gradient(315deg,rgba(255,255,255,0.1)_0px,rgba(255,255,255,0.1)_1px,transparent_1px,transparent_10px)] sm:block sm:w-14" />

      {/* Decorative right border */}
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden h-full w-10 translate-x-14 border-l border-[rgba(255,255,255,0.1)] bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.1)_0px,rgba(255,255,255,0.1)_1px,transparent_1px,transparent_10px)] sm:block sm:w-14" />

      {/* SVG Beams */}
      <svg
        className="pointer-events-none absolute inset-0 z-0"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id="beam-gradient-signup"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.1)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>
        <line
          x1="0"
          y1="20%"
          x2="100%"
          y2="20%"
          stroke="url(#beam-gradient-signup)"
          strokeWidth="1"
          opacity="0.3"
        />
        <line
          x1="0"
          y1="50%"
          x2="100%"
          y2="50%"
          stroke="url(#beam-gradient-signup)"
          strokeWidth="1"
          opacity="0.2"
        />
        <line
          x1="0"
          y1="80%"
          x2="100%"
          y2="80%"
          stroke="url(#beam-gradient-signup)"
          strokeWidth="1"
          opacity="0.3"
        />
      </svg>

      {/* Content */}
      <div className="relative z-10 w-full max-w-120 px-8">
        {/* Brand */}
        <div className="mb-16 flex items-center justify-center gap-3">
          <div className="bg-foreground/5 border-border flex size-10 items-center justify-center border">
            <Zap className="text-foreground size-4" strokeWidth={1.5} />
          </div>
          <span className="text-lg font-light tracking-widest uppercase">
            OpenRouter
          </span>
        </div>

        <Card className="border-border bg-foreground/5 relative overflow-hidden">
          {/* Card corner accents */}
          <div className="border-foreground/20 absolute top-0 left-0 h-8 w-8 border-t-2 border-l-2" />
          <div className="border-foreground/20 absolute top-0 right-0 h-8 w-8 border-t-2 border-r-2" />
          <div className="border-foreground/20 absolute bottom-0 left-0 h-8 w-8 border-b-2 border-l-2" />
          <div className="border-foreground/20 absolute right-0 bottom-0 h-8 w-8 border-r-2 border-b-2" />

          <CardHeader className="space-y-3 pt-10 pb-8">
            <CardTitle className="text-3xl font-light tracking-tight">
              Create your account
            </CardTitle>
            <CardDescription className="text-muted-foreground text-base font-light">
              Access 200+ AI models through a single API
            </CardDescription>
          </CardHeader>

          <CardContent className="px-10">
            <form
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                mutation.mutate({
                  email: emailRef.current!.value,
                  password: passwordRef.current!.value,
                });
              }}
            >
              <div className="space-y-3">
                <Label
                  htmlFor="email"
                  className="text-sm font-normal tracking-wide"
                >
                  Email
                </Label>
                <div className="relative">
                  <Mail
                    className="text-muted-foreground/40 absolute top-1/2 left-4 size-4 -translate-y-1/2"
                    strokeWidth={1.5}
                  />
                  <Input
                    id="email"
                    ref={emailRef}
                    type="email"
                    placeholder="you@example.com"
                    className="bg-background/50 border-border h-12 pl-11"
                    required
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="password"
                  className="text-sm font-normal tracking-wide"
                >
                  Password
                </Label>
                <div className="relative">
                  <Lock
                    className="text-muted-foreground/40 absolute top-1/2 left-4 size-4 -translate-y-1/2"
                    strokeWidth={1.5}
                  />
                  <Input
                    id="password"
                    ref={passwordRef}
                    type="password"
                    placeholder="Min. 8 characters"
                    className="bg-background/50 border-border h-12 pl-11"
                    required
                  />
                </div>
              </div>

              {mutation.isError && (
                <div className="text-destructive bg-destructive/10 border-destructive/30 flex items-start gap-3 border px-4 py-3.5 text-sm font-light">
                  <AlertCircle
                    className="mt-0.5 size-4 shrink-0"
                    strokeWidth={1.5}
                  />
                  <span>
                    {mutation.error?.message ||
                      "Something went wrong. Please try again."}
                  </span>
                </div>
              )}

              {mutation.isSuccess && (
                <div className="flex items-start gap-3 border border-emerald-500/30 bg-emerald-500/10 px-4 py-3.5 text-sm font-light text-emerald-400">
                  <CheckCircle2
                    className="mt-0.5 size-4 shrink-0"
                    strokeWidth={1.5}
                  />
                  <span>Account created! Redirecting to sign in...</span>
                </div>
              )}

              <Button
                type="submit"
                className="bg-foreground text-background hover:bg-foreground/90 mt-4 h-12 w-full"
                disabled={mutation.isPending || mutation.isSuccess}
              >
                {mutation.isPending ? (
                  <>
                    <Loader2
                      className="size-4 animate-spin"
                      strokeWidth={1.5}
                    />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create account
                    <ArrowRight className="size-4" strokeWidth={1.5} />
                  </>
                )}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="justify-center pt-6 pb-10">
            <p className="text-muted-foreground text-sm font-light">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="text-foreground font-normal underline-offset-4 transition-colors hover:underline"
              >
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>

        <p className="text-muted-foreground/50 mt-8 text-center text-xs leading-relaxed font-light">
          By creating an account, you agree to our{" "}
          <a
            href="#"
            className="hover:text-muted-foreground underline underline-offset-2 transition-colors"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="#"
            className="hover:text-muted-foreground underline underline-offset-2 transition-colors"
          >
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
}
