"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bell,
  Search,
  Menu,
  Sun,
  Moon,
  LogOut,
  User,
  Settings,
  HelpCircle,
  ChevronDown,
} from "lucide-react";

interface HeaderProps {
  setMobileMenuOpen: (open: boolean) => void;
  mounted: boolean;
  theme: string | undefined;
  setTheme: (theme: string) => void;
  handleLogout: () => void;
}

export function Header({
  setMobileMenuOpen,
  mounted,
  theme,
  setTheme,
  handleLogout,
}: HeaderProps) {
  const pathname = usePathname();

  const getPageTitle = (path: string) => {
    if (path === "/linkedin-post") return "LinkedIn Posts";
    if (path === "/dashboard") return "Dashboard";
    if (path.startsWith("/dashboard/campaigns")) return "Campaigns";
    if (path.startsWith("/dashboard/connections")) return "Connections";
    if (path.startsWith("/dashboard/analytics")) return "Analytics";
    if (path.startsWith("/dashboard/settings")) return "Settings";
    return "Overview";
  };

  return (
    <header className="h-16 flex items-center justify-between px-4 md:px-6 border-b border-border/40 bg-background/55 backdrop-blur-xl z-10 shrink-0">
      {/* Left: Hamburger menu & Dynamic Page Title */}
      <div className="flex items-center gap-3 w-1/3 min-w-0">
        {/* Hamburger menu for mobile */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-muted-foreground hover:text-foreground shrink-0"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Page Title */}
        <h1 className="text-xs sm:text-sm md:text-base font-bold text-foreground truncate select-none">
          {getPageTitle(pathname)}
        </h1>
      </div>

      {/* Center: Search Bar */}
      <div className="flex justify-center flex-1 max-w-sm sm:max-w-md mx-auto w-full">
        <div className="relative w-full hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search campaigns, connections, activities..."
            className="w-full h-9 pl-9 pr-8 bg-secondary/15 border-border/30 text-xs placeholder:text-muted-foreground/75 focus-visible:ring-purple-600/25 focus-visible:border-purple-600/50 rounded-lg transition-all backdrop-blur-sm"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none hidden md:inline-flex h-5 select-none items-center gap-1 rounded border border-border/40 bg-muted px-1.5 font-mono text-[9px] font-medium text-muted-foreground shadow-xs">
            <span>⌘</span>K
          </kbd>
        </div>
      </div>

      {/* Right Header Navigation */}
      <div className="flex items-center justify-end gap-3 w-1/3 shrink-0">
        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="h-9 w-9 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-all active:scale-95 cursor-pointer relative flex items-center justify-center"
          title="Toggle Theme"
        >
          <Sun className="h-4.5 w-4.5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4.5 w-4.5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>

        {/* Notifications with Shadcn Dropdown Menu */}
        <div className="relative">
          <DropdownMenu>
            <DropdownMenuTrigger className="h-9 w-9 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 relative focus:outline-none flex items-center justify-center transition-colors cursor-pointer">
              <Bell className="h-4.5 w-4.5" />
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white ring-2 ring-background">
                3
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-80 bg-card/95 backdrop-blur-xl border border-border/50 rounded-xl shadow-2xl py-2"
            >
              <div className="px-4 py-2 border-b border-border/40 flex justify-between items-center mb-1">
                <span className="font-semibold text-xs text-foreground">
                  Notifications
                </span>
                <button className="text-[10px] text-purple-600 dark:text-purple-400 hover:underline">
                  Mark all as read
                </button>
              </div>
              <div className="max-h-64 overflow-y-auto">
                <DropdownMenuItem className="flex flex-col items-start px-4 py-2.5 hover:bg-secondary/40 transition-colors border-b border-border/20 last:border-0 cursor-pointer">
                  <p className="text-xs text-foreground font-medium">
                    Campaign "Lead Outreach" started
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    5 minutes ago
                  </p>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start px-4 py-2.5 hover:bg-secondary/40 transition-colors border-b border-border/20 last:border-0 cursor-pointer">
                  <p className="text-xs text-foreground font-medium">
                    New connection accepted: Sarah Jenkins
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    2 hours ago
                  </p>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start px-4 py-2.5 hover:bg-secondary/40 transition-colors border-b border-border/20 last:border-0 cursor-pointer">
                  <p className="text-xs text-foreground font-medium">
                    Monthly analytics report is ready
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    1 day ago
                  </p>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Separator */}
        <Separator orientation="vertical" className="h-6 bg-border/40" />

        {/* Account Profile with Shadcn Dropdown Menu */}
        <div className="relative">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 p-1 pl-2 hover:bg-secondary/40 dark:hover:bg-secondary/20 rounded-full transition-all focus:outline-none cursor-pointer">
              <div className="h-7 w-7 rounded-full bg-purple-600 text-white flex items-center justify-center font-semibold text-xs shadow-md shadow-purple-600/10">
                JD
              </div>
              <ChevronDown className="h-3 w-3 text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 bg-card/95 backdrop-blur-xl border border-border/50 rounded-xl shadow-2xl py-2"
            >
              {/* User Info Header */}
              <div className="px-4 py-2 border-b border-border/40 mb-1">
                <p className="text-xs font-semibold text-foreground">
                  John Doe
                </p>
                <p className="text-[10px] text-muted-foreground mt-0.5 truncate">
                  john@example.com
                </p>
              </div>

              {/* Menu Options */}
              <DropdownMenuItem
                render={<Link href="/dashboard/profile" />}
                className="flex items-center gap-2.5 px-4 py-2 text-xs text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
              >
                <User className="h-3.5 w-3.5" />
                My Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                render={<Link href="/dashboard/settings" />}
                className="flex items-center gap-2.5 px-4 py-2 text-xs text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
              >
                <Settings className="h-3.5 w-3.5" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem
                render={<Link href="/dashboard/help" />}
                className="flex items-center gap-2.5 px-4 py-2 text-xs text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
              >
                <HelpCircle className="h-3.5 w-3.5" />
                Help & Support
              </DropdownMenuItem>

              <DropdownMenuSeparator className="my-1 bg-border/40" />

              {/* Logout Option */}
              <div className="px-1 py-1">
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="flex items-center w-full gap-2.5 px-3 py-2 text-xs text-red-500 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  Logout
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
