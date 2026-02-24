import { Link } from "react-router";

import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  BarChart3,
  Code2,
  Globe,
  Layers,
  Shield,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useElysiaClient } from "@/providers/Eden";

const features = [
  {
    icon: Globe,
    title: "200+ Models",
    description:
      "Access GPT-4, Claude, Llama, Gemini, and hundreds more through a single endpoint.",
  },
  {
    icon: Layers,
    title: "Unified API",
    description:
      "One integration, every model. Switch providers without changing your code.",
  },
  {
    icon: BarChart3,
    title: "Usage Analytics",
    description:
      "Track spending, monitor usage, and optimize costs across all your API keys.",
  },
  {
    icon: Shield,
    title: "Enterprise Ready",
    description:
      "SOC 2 compliant infrastructure with 99.9% uptime and global edge routing.",
  },
  {
    icon: Code2,
    title: "Developer First",
    description:
      "OpenAI-compatible API. Drop-in replacement — just change the base URL.",
  },
  {
    icon: Zap,
    title: "Instant Routing",
    description:
      "Automatic failover and smart routing finds the fastest, cheapest provider.",
  },
];

export function Landing() {
  const elysiaClient = useElysiaClient();

  const modelsQuery = useQuery({
    queryKey: ["models"],
    queryFn: async () => {
      const response = await elysiaClient.models.get();
      if (response.error) return null;
      return response.data;
    },
  });

  const modelCount = modelsQuery.data?.models?.length ?? 200;

  return (
    <div className="dark bg-background text-foreground min-h-screen">
      {/* Navigation */}
      <header className="border-border/50 bg-background/80 fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2.5">
            <div className="bg-primary/10 border-primary/20 flex size-8 items-center justify-center rounded-lg border">
              <Zap className="text-primary size-3.5" />
            </div>
            <span className="text-sm font-semibold tracking-tight">
              OpenRouter
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/signin">Sign in</Link>
            </Button>
            <Button size="sm" asChild>
              <Link to="/signup">
                Get started
                <ArrowRight className="size-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-24">
        {/* Background effects */}
        <div
          className="absolute h-[800px] w-[800px] rounded-full opacity-[0.06] blur-[150px]"
          style={{
            background:
              "radial-gradient(circle, oklch(0.7 0.15 55) 0%, transparent 70%)",
            top: "-20%",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.3]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, oklch(1 0 0 / 0.06) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative mx-auto max-w-6xl px-6 text-center">
          <div className="border-border/60 bg-card/50 text-muted-foreground mb-8 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium backdrop-blur-sm">
            <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />
            {modelCount}+ models available
          </div>

          <h1 className="mx-auto max-w-4xl text-5xl leading-[1.1] font-bold tracking-tight sm:text-6xl lg:text-7xl">
            One API for{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, oklch(0.85 0.15 55), oklch(0.7 0.2 330), oklch(0.65 0.25 264))",
              }}
            >
              every AI model
            </span>
          </h1>

          <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg leading-relaxed sm:text-xl">
            Route to the best models from OpenAI, Anthropic, Google, Meta, and
            more. One integration, infinite possibilities.
          </p>

          <div className="mt-10 flex items-center justify-center gap-4">
            <Button size="lg" asChild className="h-12 px-8 text-base">
              <Link to="/signup">
                Start building
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="h-12 px-8 text-base"
            >
              <Link to="/dashboard">View dashboard</Link>
            </Button>
          </div>

          {/* Code snippet */}
          <div className="mx-auto mt-16 max-w-2xl">
            <div className="border-border/50 bg-card/60 overflow-hidden rounded-xl border text-left shadow-2xl backdrop-blur-sm">
              <div className="border-border/50 flex items-center gap-2 border-b px-4 py-3">
                <span className="size-3 rounded-full bg-red-500/60" />
                <span className="size-3 rounded-full bg-yellow-500/60" />
                <span className="size-3 rounded-full bg-green-500/60" />
                <span className="text-muted-foreground ml-2 font-mono text-xs">
                  request.ts
                </span>
              </div>
              <pre className="overflow-x-auto p-5 font-mono text-sm leading-relaxed">
                <code>
                  <span className="text-muted-foreground">
                    {"// Just change the base URL — that's it\n"}
                  </span>
                  <span className="text-blue-400">{"const "}</span>
                  <span className="text-foreground">{"response "}</span>
                  <span className="text-muted-foreground">{"= "}</span>
                  <span className="text-blue-400">{"await "}</span>
                  <span className="text-yellow-300">{"fetch"}</span>
                  <span className="text-foreground">{"(\n"}</span>
                  <span className="text-emerald-400">
                    {'  "https://openrouter.ai/api/v1/chat"'}
                  </span>
                  <span className="text-foreground">{",\n  { "}</span>
                  <span className="text-foreground">{"method: "}</span>
                  <span className="text-emerald-400">{'"POST"'}</span>
                  <span className="text-foreground">
                    {",\n    body: JSON."}
                  </span>
                  <span className="text-yellow-300">{"stringify"}</span>
                  <span className="text-foreground">{"({\n"}</span>
                  <span className="text-foreground">{"      model: "}</span>
                  <span className="text-emerald-400">
                    {'"anthropic/claude-sonnet-4-5"'}
                  </span>
                  <span className="text-foreground">
                    {",\n      messages: [{ role: "}
                  </span>
                  <span className="text-emerald-400">{'"user"'}</span>
                  <span className="text-foreground">{", content: "}</span>
                  <span className="text-emerald-400">{'"Hello!"'}</span>
                  <span className="text-foreground">
                    {" }]\n    })\n  }\n)"}
                  </span>
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-border/30 border-t py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need to ship AI
            </h2>
            <p className="text-muted-foreground mx-auto mt-4 max-w-xl text-lg">
              Built for developers who want to move fast without being locked
              into a single provider.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group border-border/40 bg-card/30 hover:border-border/80 hover:bg-card/60 rounded-xl border p-6 transition-all duration-300"
              >
                <div className="bg-primary/5 border-border/50 group-hover:bg-primary/10 mb-4 flex size-10 items-center justify-center rounded-lg border transition-colors">
                  <feature.icon className="text-muted-foreground group-hover:text-primary size-5 transition-colors" />
                </div>
                <h3 className="mb-2 text-sm font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Models preview */}
      {modelsQuery.data?.models && modelsQuery.data.models.length > 0 && (
        <section className="border-border/30 border-t py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Popular models
              </h2>
              <p className="text-muted-foreground mt-4 text-lg">
                Access the latest and greatest from every major provider.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {modelsQuery.data.models.slice(0, 9).map((model) => (
                <div
                  key={model.id}
                  className="border-border/40 bg-card/20 hover:border-border/80 flex items-center gap-3 rounded-lg border px-4 py-3 transition-colors"
                >
                  <div className="bg-primary/5 border-border/50 text-muted-foreground flex size-8 items-center justify-center rounded-md border text-xs font-bold">
                    {model.company.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{model.name}</p>
                    <p className="text-muted-foreground text-xs">
                      {model.company.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="border-border/30 border-t py-24">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to start building?
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-xl text-lg">
            Create a free account and start making API calls in minutes.
          </p>
          <Button size="lg" asChild className="mt-8 h-12 px-8 text-base">
            <Link to="/signup">
              Create free account
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-border/30 border-t py-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <Zap className="text-muted-foreground size-3.5" />
            <span className="text-muted-foreground text-xs">OpenRouter</span>
          </div>
          <p className="text-muted-foreground text-xs">
            &copy; 2026 OpenRouter. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
