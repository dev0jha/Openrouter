import { Link } from "react-router";

import { useQuery } from "@tanstack/react-query";
import {
  Activity,
  ArrowRight,
  Coins,
  Key,
  Layers,
  Loader2,
  Plus,
} from "lucide-react";

import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useElysiaClient } from "@/providers/Eden";

export function Dashboard() {
  const elysiaClient = useElysiaClient();

  const apiKeysQuery = useQuery({
    queryKey: ["api-keys"],
    queryFn: async () => {
      const response = await elysiaClient["api-keys"].get();
      if (response.error) throw new Error("Failed to fetch API keys");
      return response.data;
    },
  });

  const modelsQuery = useQuery({
    queryKey: ["models"],
    queryFn: async () => {
      const response = await elysiaClient.models.get();
      if (response.error) throw new Error("Failed to fetch models");
      return response.data;
    },
  });

  const apiKeys = apiKeysQuery.data?.apiKeys ?? [];
  const activeKeys = apiKeys.filter((k) => !k.disabled);
  const totalCreditsUsed = apiKeys.reduce(
    (sum, k) => sum + (k.credisConsumed ?? 0),
    0
  );
  const modelCount = modelsQuery.data?.models?.length ?? 0;
  const isLoading = apiKeysQuery.isLoading;

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Overview of your OpenRouter account.
          </p>
        </div>

        {/* Stats */}
        {isLoading ? (
          <div className="text-muted-foreground flex items-center gap-2 py-8 text-sm">
            <Loader2 className="size-4 animate-spin" />
            Loading...
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Card className="bg-card/50 border-border/50">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm">
                    Active API Keys
                  </span>
                  <Key className="text-muted-foreground/60 size-4" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold tracking-tight">
                  {activeKeys.length}
                </p>
                <p className="text-muted-foreground mt-1 text-xs">
                  {apiKeys.length} total
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/50">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm">
                    Credits Used
                  </span>
                  <Coins className="text-muted-foreground/60 size-4" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold tracking-tight">
                  {totalCreditsUsed.toLocaleString()}
                </p>
                <p className="text-muted-foreground mt-1 text-xs">
                  across all keys
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/50">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm">
                    Available Models
                  </span>
                  <Layers className="text-muted-foreground/60 size-4" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold tracking-tight">
                  {modelCount}
                </p>
                <p className="text-muted-foreground mt-1 text-xs">
                  from all providers
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Quick actions */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Card className="bg-card/30 border-border/40 hover:border-border/70 transition-colors">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="bg-primary/5 border-border/50 mb-3 flex size-10 items-center justify-center rounded-lg border">
                    <Plus className="text-muted-foreground size-5" />
                  </div>
                  <h3 className="text-sm font-semibold">Create API Key</h3>
                  <p className="text-muted-foreground mt-1 text-xs">
                    Generate a new key to start making requests.
                  </p>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/api-keys">
                    Go
                    <ArrowRight className="size-3.5" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/30 border-border/40 hover:border-border/70 transition-colors">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="bg-primary/5 border-border/50 mb-3 flex size-10 items-center justify-center rounded-lg border">
                    <Coins className="text-muted-foreground size-5" />
                  </div>
                  <h3 className="text-sm font-semibold">Add Credits</h3>
                  <p className="text-muted-foreground mt-1 text-xs">
                    Top up your balance to keep making requests.
                  </p>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/credits">
                    Go
                    <ArrowRight className="size-3.5" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent API keys */}
        {apiKeys.length > 0 && (
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold">Your API Keys</h2>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/api-keys" className="text-xs">
                  View all
                  <ArrowRight className="size-3" />
                </Link>
              </Button>
            </div>
            <div className="border-border/50 bg-card/30 overflow-hidden rounded-xl border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-border/50 border-b">
                    <th className="text-muted-foreground px-4 py-3 text-left text-xs font-medium">
                      Name
                    </th>
                    <th className="text-muted-foreground px-4 py-3 text-left text-xs font-medium">
                      Key
                    </th>
                    <th className="text-muted-foreground px-4 py-3 text-left text-xs font-medium">
                      Status
                    </th>
                    <th className="text-muted-foreground px-4 py-3 text-right text-xs font-medium">
                      Credits Used
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {apiKeys.slice(0, 5).map((key) => (
                    <tr
                      key={key.id}
                      className="border-border/30 border-b last:border-0"
                    >
                      <td className="px-4 py-3 font-medium">{key.name}</td>
                      <td className="text-muted-foreground px-4 py-3 font-mono text-xs">
                        {key.apiKey.slice(0, 12)}...{key.apiKey.slice(-4)}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center gap-1.5 text-xs font-medium ${
                            key.disabled
                              ? "text-muted-foreground"
                              : "text-emerald-400"
                          }`}
                        >
                          <span
                            className={`size-1.5 rounded-full ${
                              key.disabled
                                ? "bg-muted-foreground"
                                : "bg-emerald-400"
                            }`}
                          />
                          {key.disabled ? "Disabled" : "Active"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right tabular-nums">
                        {(key.credisConsumed ?? 0).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
