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

export function Signin() {
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
      const response = await elysiaClient.auth["sign-in"].post({
        email,
        password,
      });
      if (response.error) {
        const errValue = response.error.value as
          | { message?: string }
          | undefined;
        throw new Error(errValue?.message || "Invalid credentials");
      }
      return response.data;
    },
    onSuccess: () => {
      setTimeout(() => navigate("/dashboard"), 1000);
    },
  });

  return (
    <div className="dark bg-background relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Animated gradient orbs */}
      <div
        className="absolute h-[600px] w-[600px] animate-pulse rounded-full opacity-[0.07] blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, oklch(0.6 0.2 264) 0%, transparent 70%)",
          top: "-10%",
          left: "-5%",
          animationDuration: "8s",
        }}
      />
      <div
        className="absolute h-[500px] w-[500px] animate-pulse rounded-full opacity-[0.05] blur-[100px]"
        style={{
          background:
            "radial-gradient(circle, oklch(0.7 0.15 55) 0%, transparent 70%)",
          bottom: "-15%",
          right: "-10%",
          animationDuration: "12s",
          animationDelay: "2s",
        }}
      />

      {/* Dot grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, oklch(1 0 0 / 0.08) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[420px] px-6">
        {/* Brand */}
        <div className="mb-10 flex items-center justify-center gap-2.5">
          <div className="bg-primary/10 border-primary/20 flex size-9 items-center justify-center rounded-lg border">
            <Zap className="text-primary size-4" />
          </div>
          <span className="text-foreground text-lg font-semibold tracking-tight">
            OpenRouter
          </span>
        </div>

        <Card className="border-border/50 bg-card/80 shadow-2xl backdrop-blur-xl">
          <CardHeader className="pb-2 text-center">
            <CardTitle className="text-xl tracking-tight">
              Welcome back
            </CardTitle>
            <CardDescription className="text-muted-foreground/80">
              Sign in to your OpenRouter account
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                mutation.mutate({
                  email: emailRef.current!.value,
                  password: passwordRef.current!.value,
                });
              }}
            >
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="text-muted-foreground/60 absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                  <Input
                    id="email"
                    ref={emailRef}
                    type="email"
                    placeholder="you@example.com"
                    className="h-10 pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="text-muted-foreground/60 absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                  <Input
                    id="password"
                    ref={passwordRef}
                    type="password"
                    placeholder="Enter your password"
                    className="h-10 pl-10"
                    required
                  />
                </div>
              </div>

              {mutation.isError && (
                <div className="text-destructive bg-destructive/10 border-destructive/20 flex items-start gap-2.5 rounded-lg border px-3.5 py-3 text-sm">
                  <AlertCircle className="mt-0.5 size-4 shrink-0" />
                  <span>
                    {mutation.error?.message ||
                      "Something went wrong. Please try again."}
                  </span>
                </div>
              )}

              {mutation.isSuccess && (
                <div className="flex items-start gap-2.5 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-3 text-sm text-emerald-400">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
                  <span>Signed in! Redirecting to dashboard...</span>
                </div>
              )}

              <Button
                type="submit"
                className="mt-2 h-10 w-full"
                disabled={mutation.isPending || mutation.isSuccess}
              >
                {mutation.isPending ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in
                    <ArrowRight className="size-4" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="justify-center">
            <p className="text-muted-foreground text-sm">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-foreground font-medium underline-offset-4 transition-colors hover:underline"
              >
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
