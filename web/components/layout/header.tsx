"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
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
  X,
} from "lucide-react";
import AVTAR from "@/assets/avtar";

interface HeaderProps {
  setMobileMenuOpen: (open: boolean) => void;
  mounted: boolean;
  theme: string | undefined;
  setTheme: (theme: string) => void;
  handleLogout: () => void;
}

export function Header({
  setMobileMenuOpen,
  theme,
  setTheme,
  handleLogout,
}: HeaderProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "shared";
  const isLinkedInPosts = pathname === "/linkedin-post";

  const [isGlobalSearch, setIsGlobalSearch] = useState(false);
  const [prevUrl, setPrevUrl] = useState(`${pathname}?tab=${currentTab}`);

  if (`${pathname}?tab=${currentTab}` !== prevUrl) {
    setPrevUrl(`${pathname}?tab=${currentTab}`);
    setIsGlobalSearch(false);
  }

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
    <header className="h-16 flex items-center justify-between px-4 md:px-8 border-b border-border bg-card z-10 shrink-0 gap-4">
      {/* Left: Hamburger menu & Dynamic Page Title */}
      <div className="flex items-center gap-3 shrink-0 lg:w-[200px]">
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

      {/* Center: Dynamic Tabs */}
      <div className="hidden md:flex flex-1 justify-center items-center">
        {isLinkedInPosts && (
          <div className="flex items-center gap-5">
            <Link
              href="/linkedin-post?tab=shared"
              className={`text-sm font-semibold transition-colors border-b-2 py-5 px-2 ${
                currentTab === "shared"
                  ? "border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Shared
            </Link>
            <Link
              href="/linkedin-post?tab=scheduled"
              className={`text-sm font-semibold transition-colors border-b-2 py-5 px-2 ${
                currentTab === "scheduled"
                  ? "border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Scheduled
            </Link>
            <Link
              href="/linkedin-post?tab=templates"
              className={`text-sm font-semibold transition-colors border-b-2 py-5 px-2 ${
                currentTab === "templates"
                  ? "border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Templates
            </Link>
          </div>
        )}
      </div>

      {/* Right Header Navigation */}
      <div className="flex items-center justify-end gap-3 shrink-0 flex-1 lg:flex-none">
        {/* Search Bar at the right */}
        {/* Search Bar at the right */}
        <div className="relative w-full max-w-sm xl:max-w-md hidden sm:flex items-center h-9 px-3 bg-secondary/15 border border-border/30 rounded-lg focus-within:ring-1 focus-within:ring-indigo-600/50 focus-within:border-indigo-600/50 transition-all backdrop-blur-sm shrink">
          <Search className="h-4 w-4 text-muted-foreground shrink-0" />

          {!isGlobalSearch && pathname !== "/" && (
            <div className="flex items-center gap-1.5 ml-2 shrink-0">
              <div className="flex items-center bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 px-1.5 py-0.5 rounded text-[10px] font-medium">
                <span className="truncate max-w-[120px]">{getPageTitle(pathname)}</span>
              </div>
              {isLinkedInPosts && currentTab && (
                <div className="flex items-center bg-violet-600/10 text-violet-600 dark:text-violet-400 px-1.5 py-0.5 rounded text-[10px] font-medium">
                  <span className="truncate max-w-[120px]">
                    {currentTab.charAt(0).toUpperCase() + currentTab.slice(1)}
                  </span>
                </div>
              )}
              <button
                onClick={() => setIsGlobalSearch(true)}
                className="hover:bg-muted/50 rounded-full p-1 text-muted-foreground hover:text-foreground transition-colors"
                title="Clear filter"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}

          <input
            placeholder={
              !isGlobalSearch && pathname !== "/"
                ? "Search in..."
                : "Search globally..."
            }
            className="flex-1 bg-transparent border-none outline-none text-xs ml-2 text-foreground placeholder:text-muted-foreground/75 min-w-0"
          />

          <kbd className="pointer-events-none hidden lg:inline-flex h-5 select-none items-center gap-1 rounded border border-border/40 bg-muted px-1.5 font-mono text-[9px] font-medium text-muted-foreground shadow-xs shrink-0 ml-2">
            <span>⌘</span>K
          </kbd>
        </div>
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
                <button className="text-[10px] text-indigo-600 dark:text-indigo-400 hover:underline">
                  Mark all as read
                </button>
              </div>
              <div className="max-h-64 overflow-y-auto">
                <DropdownMenuItem className="flex flex-col items-start px-4 py-2.5 hover:bg-secondary/40 transition-colors border-b border-border/20 last:border-0 cursor-pointer">
                  <p className="text-xs text-foreground font-medium">
                    Campaign Lead Outreach started
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
              <div className="h-7 w-7 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold text-xs shadow-md shadow-indigo-600/10 overflow-hidden">
                <Image src={AVTAR.avtar} alt="User Avatar" className="h-full w-full object-cover" />
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
