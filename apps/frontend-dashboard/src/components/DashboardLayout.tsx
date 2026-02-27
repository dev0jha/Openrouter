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
    <div className="dark relative flex min-h-screen bg-[#121212]">
      {/* Decorative left border */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden h-full w-10 -translate-x-14 border-r border-[rgba(255,255,255,0.1)] bg-[repeating-linear-gradient(315deg,rgba(255,255,255,0.1)_0px,rgba(255,255,255,0.1)_1px,transparent_1px,transparent_10px)] sm:block sm:w-14" />

      {/* Sidebar */}
      <aside className="border-border bg-foreground/5 flex w-72 flex-col border-r">
        {/* Brand */}
        <div className="border-border flex h-20 items-center gap-3 border-b px-6">
          <div className="bg-foreground/5 border-border flex size-10 items-center justify-center border">
            <Zap className="text-foreground size-4" strokeWidth={1.5} />
          </div>
          <span className="text-foreground text-lg font-light tracking-widest uppercase">
            OpenRouter
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-4 py-6">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-4 border-l-2 py-3 pr-4 pl-5 text-sm font-light tracking-wide transition-all",
                  isActive
                    ? "border-foreground text-foreground bg-foreground/5"
                    : "text-muted-foreground hover:text-foreground hover:border-muted-foreground/30 border-transparent"
                )}
              >
                <item.icon className="size-4" strokeWidth={1.5} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-border border-t px-4 py-6">
          <Link
            to="/signin"
            className="text-muted-foreground hover:text-foreground hover:bg-foreground/5 flex items-center gap-4 border-l-2 border-transparent py-3 pr-4 pl-5 text-sm font-light tracking-wide transition-all"
          >
            <LogOut className="size-4" strokeWidth={1.5} />
            Sign out
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-6xl px-12 py-12">{children}</div>
      </main>
    </div>
  );
}
