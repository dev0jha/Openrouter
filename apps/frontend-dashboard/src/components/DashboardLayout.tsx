import { Link, useLocation } from "react-router";

import { Coins, Key, LayoutDashboard, LogOut, Zap } from "lucide-react";

import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "API Keys", href: "/api-keys", icon: Key },
  { label: "Credits", href: "/credits", icon: Coins },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <div className="dark bg-background flex min-h-screen">
      {/* Sidebar */}
      <aside className="border-border/50 bg-card/30 flex w-64 flex-col border-r">
        {/* Brand */}
        <div className="border-border/50 flex h-16 items-center gap-2.5 border-b px-5">
          <div className="bg-primary/10 border-primary/20 flex size-8 items-center justify-center rounded-lg border">
            <Zap className="text-primary size-3.5" />
          </div>
          <span className="text-foreground text-sm font-semibold tracking-tight">
            OpenRouter
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                )}
              >
                <item.icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-border/50 border-t px-3 py-4">
          <Link
            to="/signin"
            className="text-muted-foreground hover:text-foreground hover:bg-accent/50 flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
          >
            <LogOut className="size-4" />
            Sign out
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-5xl px-8 py-8">{children}</div>
      </main>
    </div>
  );
}
