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
      <div className="space-y-12">
        {/* Header */}
        <div>
          <h1 className="mb-3 text-4xl font-light tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground text-base font-light">
            Overview of your OpenRouter account.
          </p>
        </div>

        {/* Stats */}
        {isLoading ? (
          <div className="text-muted-foreground flex items-center gap-3 py-12 text-sm font-light">
            <Loader2 className="size-4 animate-spin" strokeWidth={1.5} />
            Loading...
          </div>
        ) : (
          <div className="bg-border grid grid-cols-1 gap-px sm:grid-cols-3">
            <Card className="border-0 bg-[#121212]">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-xs font-light tracking-wider uppercase">
                    Active API Keys
                  </span>
                  <Key
                    className="text-muted-foreground/40 size-4"
                    strokeWidth={1.5}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-2 text-4xl font-light tracking-tight">
                  {activeKeys.length}
                </p>
                <p className="text-muted-foreground text-xs font-light">
                  {apiKeys.length} total
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-[#121212]">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-xs font-light tracking-wider uppercase">
                    Credits Used
                  </span>
                  <Coins
                    className="text-muted-foreground/40 size-4"
                    strokeWidth={1.5}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-2 text-4xl font-light tracking-tight">
                  {totalCreditsUsed.toLocaleString()}
                </p>
                <p className="text-muted-foreground text-xs font-light">
                  across all keys
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-[#121212]">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-xs font-light tracking-wider uppercase">
                    Available Models
                  </span>
                  <Layers
                    className="text-muted-foreground/40 size-4"
                    strokeWidth={1.5}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-2 text-4xl font-light tracking-tight">
                  {modelCount}
                </p>
                <p className="text-muted-foreground text-xs font-light">
                  from all providers
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Quick actions */}
        <div className="bg-border grid grid-cols-1 gap-px sm:grid-cols-2">
          <Card className="hover:bg-foreground/5 border-0 bg-[#121212] transition-colors">
            <CardContent className="pt-8 pb-8">
              <div className="flex items-start justify-between">
                <div>
                  <div className="bg-foreground/5 border-border mb-5 flex size-12 items-center justify-center border">
                    <Plus
                      className="text-muted-foreground size-5"
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className="mb-2 text-base font-medium tracking-wide">
                    Create API Key
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed font-light">
                    Generate a new key to start making requests.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-border hover:bg-foreground/5"
                  render={(props) => <Link to="/api-keys" {...props} />}
                >
                  Go
                  <ArrowRight className="size-3.5" strokeWidth={1.5} />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:bg-foreground/5 border-0 bg-[#121212] transition-colors">
            <CardContent className="pt-8 pb-8">
              <div className="flex items-start justify-between">
                <div>
                  <div className="bg-foreground/5 border-border mb-5 flex size-12 items-center justify-center border">
                    <Coins
                      className="text-muted-foreground size-5"
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className="mb-2 text-base font-medium tracking-wide">
                    Add Credits
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed font-light">
                    Top up your balance to keep making requests.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-border hover:bg-foreground/5"
                  render={(props) => <Link to="/credits" {...props} />}
                >
                  Go
                  <ArrowRight className="size-3.5" strokeWidth={1.5} />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent API keys */}
        {apiKeys.length > 0 && (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-light tracking-tight">
                Your API Keys
              </h2>
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-foreground/5"
                render={(props) => (
                  <Link
                    to="/api-keys"
                    {...props}
                    className="text-sm font-light"
                  />
                )}
              >
                View all
                <ArrowRight className="size-3.5" strokeWidth={1.5} />
              </Button>
            </div>
            <div className="border-border bg-foreground/5 overflow-hidden border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-border border-b">
                    <th className="text-muted-foreground px-6 py-4 text-left text-xs font-light tracking-wider uppercase">
                      Name
                    </th>
                    <th className="text-muted-foreground px-6 py-4 text-left text-xs font-light tracking-wider uppercase">
                      Key
                    </th>
                    <th className="text-muted-foreground px-6 py-4 text-left text-xs font-light tracking-wider uppercase">
                      Status
                    </th>
                    <th className="text-muted-foreground px-6 py-4 text-right text-xs font-light tracking-wider uppercase">
                      Credits Used
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {apiKeys.slice(0, 5).map((key) => (
                    <tr
                      key={key.id}
                      className="border-border hover:bg-foreground/5 border-b transition-colors last:border-0"
                    >
                      <td className="px-6 py-4 font-normal">{key.name}</td>
                      <td className="text-muted-foreground px-6 py-4 font-mono text-xs font-light">
                        {key.apiKey.slice(0, 12)}...{key.apiKey.slice(-4)}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-2 text-xs font-light ${
                            key.disabled
                              ? "text-muted-foreground"
                              : "text-emerald-400"
                          }`}
                        >
                          <span
                            className={`size-1 ${
                              key.disabled
                                ? "bg-muted-foreground"
                                : "bg-emerald-400"
                            }`}
                          />
                          {key.disabled ? "Disabled" : "Active"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right font-light tabular-nums">
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
