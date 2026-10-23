import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  House,
  Compass,
  Route as RouteIcon,
  CalendarRange,
  Sparkles,
  BedDouble,
  Wallet,
  Bookmark,
  Settings,
  Menu,
  Search,
  Bell,
  Moon,
  Sun,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Home", icon: House },
  { to: "/app/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/app/explore", label: "Explore", icon: Compass },
  { to: "/app/planner", label: "Trip Planner", icon: RouteIcon },
  { to: "/app/itinerary", label: "Itinerary", icon: CalendarRange },
  { to: "/app/assistant", label: "AI Assistant", icon: Sparkles },
  { to: "/app/hotels", label: "Hotels", icon: BedDouble },
  { to: "/app/budget", label: "Budget", icon: Wallet },
  { to: "/app/saved", label: "Saved Trips", icon: Bookmark },
  { to: "/app/settings", label: "Settings", icon: Settings },
] as const;

export function Logo({ compact = false, textClassName }: { compact?: boolean; textClassName?: string }) {
  return (
    <Link to="/" className="flex min-w-0 items-center gap-2.5 overflow-visible">
      <img
        src="/logo.png"
        alt="GoWander logo"
        className="h-9 w-9 shrink-0 rounded-lg object-cover shadow-soft"
      />
      {!compact && (
        <span
          className={cn(
            "font-mugle inline-block whitespace-nowrap text-[18px] font-normal leading-[1.35] tracking-tight",
            textClassName,
          )}
        >
          GoWander
        </span>
      )}
    </Link>
  );
}

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav aria-label="Main" className="flex flex-col gap-1">
      {nav.map(({ to, label, icon: Icon }) => {
        const active = pathname === to;
        return (
          <Link
            key={to}
            to={to}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              active
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
            )}
          >
            <Icon className="h-4.5 w-4.5 shrink-0" />
            <span className="truncate">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-dvh bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-card/85 backdrop-blur-xl">
        <div className="grid h-16 grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 sm:flex sm:justify-between lg:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 bg-sidebar p-4">
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <div className="mb-6">
                  <Logo />
                </div>
                <NavList onNavigate={() => setOpen(false)} />
              </SheetContent>
            </Sheet>
            <div className="hidden lg:block lg:w-52">
              <Logo />
            </div>
            <div className="relative hidden min-w-0 flex-1 md:block md:max-w-md">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search destinations, trips, hotels…"
                aria-label="Global search"
                className="rounded-xl bg-muted/60 pl-9"
              />
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1.5">
            <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
              <Bell className="h-4.5 w-4.5" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-amber" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Toggle theme" title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"} onClick={toggle}>
              {theme === "dark" ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
            </Button>
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full p-0"
              aria-label="Open profile"
              title="Open profile"
            >
              <Link to="/app/profile">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-primary-soft text-sm font-semibold text-primary">
                    AR
                  </AvatarFallback>
                </Avatar>
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="sticky top-16 hidden h-[calc(100dvh-4rem)] w-64 shrink-0 border-r border-sidebar-border bg-sidebar px-3 py-5 lg:block">
          <NavList />
          <div className="mt-6 space-y-5">
            <div className="space-y-2 rounded-lg border border-sidebar-border bg-muted/40 p-4">
              <Badge className="bg-amber text-amber-foreground">Pro trial</Badge>
              <p className="text-sm font-medium">12 AI itineraries left</p>
              <p className="text-xs text-muted-foreground">Renews on 1 Sep 2026</p>
              <Button size="sm" className="w-full">
                Upgrade
              </Button>
            </div>
          </div>
        </aside>

        <main className="min-w-0 flex-1 px-4 py-7 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  );
}
