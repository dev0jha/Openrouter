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
    <div className="dark text-foreground relative min-h-screen bg-[#121212]">
      {/* Decorative left border */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden h-full w-10 -translate-x-14 border-r border-[rgba(255,255,255,0.1)] bg-[repeating-linear-gradient(315deg,rgba(255,255,255,0.1)_0px,rgba(255,255,255,0.1)_1px,transparent_1px,transparent_10px)] sm:block sm:w-14" />

      {/* Navigation */}
      <header className="border-border/40 fixed inset-x-0 top-0 z-50 border-b bg-transparent">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
          <div className="flex items-center gap-3">
            <div className="bg-foreground/5 border-border flex size-10 items-center justify-center border">
              <Zap className="text-foreground size-4" strokeWidth={1.5} />
            </div>
            <span className="text-lg font-light tracking-widest uppercase">
              OpenRouter
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-foreground/5"
              render={(props) => <Link to="/signin" {...props} />}
            >
              Sign in
            </Button>
            <Button
              size="sm"
              className="bg-foreground text-background hover:bg-foreground/90"
              render={(props) => <Link to="/signup" {...props} />}
            >
              Get started
              <ArrowRight className="size-3.5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden pt-40 pb-32">
        <div className="relative mx-auto max-w-7xl px-8">
          <div className="border-border/60 bg-foreground/5 text-muted-foreground mb-12 inline-flex items-center gap-2.5 border px-5 py-2 text-xs font-light tracking-wider uppercase backdrop-blur-sm">
            <span className="size-1 bg-emerald-400" />
            {modelCount}+ models available
          </div>

          <h1 className="mx-auto mb-8 max-w-5xl text-6xl leading-[1.1] font-light tracking-tight sm:text-7xl lg:text-8xl">
            One API for{" "}
            <span className="font-normal italic">every AI model</span>
          </h1>

          <p className="text-muted-foreground mx-auto max-w-2xl text-xl leading-relaxed font-light">
            Route to the best models from OpenAI, Anthropic, Google, Meta, and
            more. One integration, infinite possibilities.
          </p>

          <div className="mt-16 flex items-center gap-5">
            <Button
              size="lg"
              className="bg-foreground text-background hover:bg-foreground/90 h-14 px-10 text-base"
              render={(props) => <Link to="/signup" {...props} />}
            >
              Start building
              <ArrowRight className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-border hover:bg-foreground/5 h-14 px-10 text-base"
              render={(props) => <Link to="/dashboard" {...props} />}
            >
              View dashboard
            </Button>
          </div>

          {/* Code snippet */}
          <div className="mx-auto mt-24 max-w-3xl">
            <div className="border-border bg-foreground/5 overflow-hidden border text-left">
              <div className="border-border flex items-center gap-2 border-b px-6 py-4">
                <span className="size-2.5 bg-red-500/40" />
                <span className="size-2.5 bg-yellow-500/40" />
                <span className="size-2.5 bg-green-500/40" />
                <span className="text-muted-foreground ml-3 font-mono text-xs tracking-wider">
                  request.ts
                </span>
              </div>
              <pre className="overflow-x-auto p-8 font-mono text-sm leading-loose">
                <code>
                  <span className="text-muted-foreground">
                    {"// Just change the base URL — that's it\n"}
                  </span>
                  <span className="text-blue-300">{"const "}</span>
                  <span className="text-foreground">{"response "}</span>
                  <span className="text-muted-foreground">{"= "}</span>
                  <span className="text-blue-300">{"await "}</span>
                  <span className="text-yellow-200">{"fetch"}</span>
                  <span className="text-foreground">{"(\n"}</span>
                  <span className="text-emerald-300">
                    {'  "https://openrouter.ai/api/v1/chat"'}
                  </span>
                  <span className="text-foreground">{",\n  { "}</span>
                  <span className="text-foreground">{"method: "}</span>
                  <span className="text-emerald-300">{'"POST"'}</span>
                  <span className="text-foreground">
                    {",\n    body: JSON."}
                  </span>
                  <span className="text-yellow-200">{"stringify"}</span>
                  <span className="text-foreground">{"({\n"}</span>
                  <span className="text-foreground">{"      model: "}</span>
                  <span className="text-emerald-300">
                    {'"anthropic/claude-sonnet-4-5"'}
                  </span>
                  <span className="text-foreground">
                    {",\n      messages: [{ role: "}
                  </span>
                  <span className="text-emerald-300">{'"user"'}</span>
                  <span className="text-foreground">{", content: "}</span>
                  <span className="text-emerald-300">{'"Hello!"'}</span>
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
      <section className="border-border/20 border-t py-32">
        <div className="mx-auto max-w-7xl px-8">
          <div className="mb-20 max-w-2xl">
            <h2 className="mb-6 text-5xl font-light tracking-tight">
              Everything you need to ship AI
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed font-light">
              Built for developers who want to move fast without being locked
              into a single provider.
            </p>
          </div>

          <div className="bg-border grid grid-cols-1 gap-px md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group hover:bg-foreground/5 bg-[#121212] p-10 transition-all duration-300"
              >
                <feature.icon
                  className="text-foreground/60 mb-6 size-6"
                  strokeWidth={1.5}
                />
                <h3 className="mb-3 text-base font-medium tracking-wide">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed font-light">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Models preview */}
      {modelsQuery.data?.models && modelsQuery.data.models.length > 0 && (
        <section className="border-border/20 border-t py-32">
          <div className="mx-auto max-w-7xl px-8">
            <div className="mb-16 max-w-2xl">
              <h2 className="mb-6 text-5xl font-light tracking-tight">
                Popular models
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed font-light">
                Access the latest and greatest from every major provider.
              </p>
            </div>

            <div className="bg-border grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-3">
              {modelsQuery.data.models.slice(0, 9).map((model) => (
                <div
                  key={model.id}
                  className="hover:bg-foreground/5 flex items-center gap-4 bg-[#121212] px-8 py-6 transition-colors"
                >
                  <div className="bg-foreground/5 border-border text-muted-foreground flex size-10 items-center justify-center border text-xs font-light">
                    {model.company.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{model.name}</p>
                    <p className="text-muted-foreground text-xs font-light tracking-wide">
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
      <section className="border-border/20 border-t py-32">
        <div className="mx-auto max-w-7xl px-8">
          <div className="max-w-2xl">
            <h2 className="mb-6 text-5xl font-light tracking-tight">
              Ready to start building?
            </h2>
            <p className="text-muted-foreground mb-10 text-lg leading-relaxed font-light">
              Create a free account and start making API calls in minutes.
            </p>
            <Button
              size="lg"
              className="bg-foreground text-background hover:bg-foreground/90 h-14 px-10 text-base"
              render={(props) => <Link to="/signup" {...props} />}
            >
              Create free account
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-border/20 border-t py-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8">
          <div className="flex items-center gap-2.5">
            <Zap className="text-muted-foreground size-4" strokeWidth={1.5} />
            <span className="text-muted-foreground text-xs tracking-widest uppercase">
              OpenRouter
            </span>
          </div>
          <p className="text-muted-foreground text-xs font-light">
            &copy; 2026 OpenRouter. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
