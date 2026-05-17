"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Shapes, Settings, X, Zap } from "lucide-react";

interface SidebarProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  pathname: string;
}

export function Sidebar({
  mobileMenuOpen,
  setMobileMenuOpen,
  pathname,
}: SidebarProps) {
  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "LinkedIn Posts", href: "/linkedin-post", icon: Shapes },
  ];

  const inlinePandaSvg = (className = "h-6 w-6") => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      fill="currentColor"
      className={className}
    >
      {/* Ears */}
      <circle cx="12" cy="14" r="9" fill="currentColor" opacity="0.85" />
      <circle cx="52" cy="14" r="9" fill="currentColor" opacity="0.85" />
      {/* Head */}
      <circle
        cx="32"
        cy="32"
        r="22"
        fill="white"
        stroke="currentColor"
        strokeWidth="2"
      />
      {/* Eye patches */}
      <ellipse
        cx="21"
        cy="28"
        rx="7"
        ry="6"
        fill="currentColor"
        opacity="0.9"
      />
      <ellipse
        cx="43"
        cy="28"
        rx="7"
        ry="6"
        fill="currentColor"
        opacity="0.9"
      />
      {/* Eyes */}
      <circle cx="21" cy="28" r="3" fill="white" />
      <circle cx="43" cy="28" r="3" fill="white" />
      <circle cx="22" cy="27" r="1.5" fill="currentColor" />
      <circle cx="44" cy="27" r="1.5" fill="currentColor" />
      {/* Nose */}
      <ellipse
        cx="32"
        cy="37"
        rx="4"
        ry="3"
        fill="currentColor"
        opacity="0.7"
      />
      {/* Mouth */}
      <path
        d="M28 40 Q32 44 36 40"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-card/30 border-r border-border/40 backdrop-blur-xl shrink-0">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-border/40 gap-2">
          <div className="p-1.5 rounded-lg bg-purple-600/10 text-purple-600 dark:text-purple-400">
            {inlinePandaSvg()}
          </div>
          <span className="font-semibold text-lg tracking-tight bg-linear-to-r from-foreground via-foreground/90 to-foreground/75 bg-clip-text text-transparent">
            Bunny
          </span>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group relative ${
                  isActive
                    ? "bg-purple-600/10 text-purple-600 dark:text-purple-400 font-semibold"
                    : "text-muted-foreground hover:bg-secondary/40 hover:text-foreground"
                }`}
              >
                <Icon
                  className={`h-4 w-4 shrink-0 transition-transform group-hover:scale-110 ${
                    isActive
                      ? "text-purple-600 dark:text-purple-400"
                      : "text-muted-foreground group-hover:text-foreground"
                  }`}
                />
                {item.name}
                {isActive && (
                  <span className="absolute right-3 w-1.5 h-1.5 rounded-full bg-purple-600 dark:bg-purple-400 animate-pulse" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-border/40 bg-card/10 space-y-1">
          <Link
            href="/dashboard/assistant"
            className={`flex items-center w-full gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group ${
              pathname === "/dashboard/assistant"
                ? "bg-purple-600/10 text-purple-600 dark:text-purple-400 font-semibold"
                : "text-muted-foreground hover:bg-secondary/40 hover:text-foreground"
            }`}
          >
            <Zap className="h-4 w-4 shrink-0" />
            Personal Assistant
          </Link>
          <Link
            href="/dashboard/settings"
            className={`flex items-center w-full gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group ${
              pathname === "/dashboard/settings"
                ? "bg-purple-600/10 text-purple-600 dark:text-purple-400 font-semibold"
                : "text-muted-foreground hover:bg-secondary/40 hover:text-foreground"
            }`}
          >
            <Settings className="h-4 w-4 shrink-0" />
            Settings
          </Link>
        </div>
      </aside>

      {/* Mobile Drawer (Sidebar Overlay) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <aside className="relative flex flex-col w-64 max-w-xs bg-card border-r border-border shadow-2xl animate-in slide-in-from-left duration-200">
            {/* Close Button */}
            <div className="absolute top-4 right-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(false)}
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Logo */}
            <div className="h-16 flex items-center px-6 border-b border-border gap-2">
              <div className="p-1.5 rounded-lg bg-purple-600/10 text-purple-600">
                {inlinePandaSvg()}
              </div>
              <span className="font-semibold text-lg tracking-tight">
                Bunny
              </span>
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? "bg-purple-600/10 text-purple-600 dark:text-purple-400 font-semibold"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* Sidebar Footer */}
            <div className="p-4 border-t border-border bg-card/20 space-y-1">
              <Link
                href="/dashboard/assistant"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center w-full gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  pathname === "/dashboard/assistant"
                    ? "bg-purple-600/10 text-purple-600 dark:text-purple-400 font-semibold"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <Zap className="h-4 w-4 shrink-0" />
                Personal Assistant
              </Link>
              <Link
                href="/dashboard/settings"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center w-full gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  pathname === "/dashboard/settings"
                    ? "bg-purple-600/10 text-purple-600 dark:text-purple-400 font-semibold"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <Settings className="h-4 w-4 shrink-0" />
                Settings
              </Link>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
