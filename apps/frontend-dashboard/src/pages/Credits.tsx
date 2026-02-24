import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AlertCircle,
  CheckCircle2,
  Coins,
  Loader2,
  Plus,
  TrendingUp,
  Wallet,
} from "lucide-react";

import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useElysiaClient } from "@/providers/Eden";

export function Credits() {
  const elysiaClient = useElysiaClient();
  const queryClient = useQueryClient();

  const apiKeysQuery = useQuery({
    queryKey: ["api-keys"],
    queryFn: async () => {
      const response = await elysiaClient["api-keys"].get();
      if (response.error) throw new Error("Failed to fetch API keys");
      return response.data;
    },
  });

  const userProfileQuery = useQuery({
    queryKey: ["user-profile"],
    queryFn: async () => {
      const response = await elysiaClient["auth"].profile.get();
      if (response.error) throw new Error("Error while fetching user details");
      return response.data;
    },
  });

  const onrampMutation = useMutation({
    mutationFn: async () => {
      const response = await elysiaClient.payments.onramp.post();
      if (response.error) {
        const errValue = response.error.value as
          | { message?: string }
          | undefined;
        throw new Error(errValue?.message || "Failed to add credits");
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["api-keys"] });
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    },
  });

  const apiKeys = apiKeysQuery.data?.apiKeys ?? [];
  const totalCreditsUsed = apiKeys.reduce(
    (sum, k) => sum + (k.credisConsumed ?? 0),
    0
  );
  const credits = userProfileQuery.data?.credits;

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Credits</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Manage your account balance and add credits.
          </p>
        </div>

        {/* Balance & usage */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {onrampMutation.isSuccess && onrampMutation.data && (
            <Card className="bg-card/50 border-emerald-500/20 sm:col-span-2">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-emerald-500/10">
                    <Wallet className="size-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-emerald-400">
                      Current Balance
                    </p>
                    <p className="text-3xl font-bold tracking-tight">
                      {onrampMutation.data.credits?.toLocaleString() ?? "—"}{" "}
                      credits
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="bg-card/50 border-border/50">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">
                  Credits available
                </span>
                <TrendingUp className="text-muted-foreground/60 size-4" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold tracking-tight">
                {userProfileQuery.isLoading ? (
                  <Loader2 className="text-muted-foreground size-5 animate-spin" />
                ) : (
                  credits
                )}
              </p>
              <p className="text-muted-foreground mt-1 text-xs">
                across {apiKeys.length} API key{apiKeys.length !== 1 ? "s" : ""}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">
                  Per-Key Breakdown
                </span>
                <Coins className="text-muted-foreground/60 size-4" />
              </div>
            </CardHeader>
            <CardContent>
              {apiKeysQuery.isLoading ? (
                <Loader2 className="text-muted-foreground size-5 animate-spin" />
              ) : apiKeys.length === 0 ? (
                <p className="text-muted-foreground text-sm">No API keys yet</p>
              ) : (
                <div className="space-y-2">
                  {apiKeys.slice(0, 4).map((key) => (
                    <div
                      key={key.id}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-muted-foreground mr-4 truncate">
                        {key.name}
                      </span>
                      <span className="font-medium tabular-nums">
                        {(key.credisConsumed ?? 0).toLocaleString()}
                      </span>
                    </div>
                  ))}
                  {apiKeys.length > 4 && (
                    <p className="text-muted-foreground text-xs">
                      +{apiKeys.length - 4} more
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Add credits */}
        <Card className="bg-card/30 border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Add Credits</CardTitle>
            <CardDescription>
              Top up your account with 1,000 credits per transaction.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <div className="border-border/50 bg-card/50 flex flex-1 items-center gap-3 rounded-lg border px-4 py-3">
                <Coins className="text-muted-foreground size-5" />
                <div>
                  <p className="text-sm font-medium">1,000 Credits</p>
                  <p className="text-muted-foreground text-xs">
                    Standard top-up
                  </p>
                </div>
              </div>

              <Button
                size="lg"
                className="h-12 px-6"
                onClick={() => onrampMutation.mutate()}
                disabled={onrampMutation.isPending}
              >
                {onrampMutation.isPending ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Plus className="size-4" />
                    Add credits
                  </>
                )}
              </Button>
            </div>

            {onrampMutation.isSuccess && (
              <div className="mt-4 flex items-start gap-2.5 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-3 text-sm text-emerald-400">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
                <span>
                  1,000 credits added successfully! Your new balance:{" "}
                  {onrampMutation.data?.credits?.toLocaleString() ?? "—"}{" "}
                  credits.
                </span>
              </div>
            )}

            {onrampMutation.isError && (
              <div className="text-destructive bg-destructive/10 border-destructive/20 mt-4 flex items-start gap-2.5 rounded-lg border px-3.5 py-3 text-sm">
                <AlertCircle className="mt-0.5 size-4 shrink-0" />
                <span>
                  {onrampMutation.error?.message ||
                    "Failed to add credits. Please try again."}
                </span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
