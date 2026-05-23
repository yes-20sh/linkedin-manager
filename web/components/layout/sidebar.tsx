"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Shapes, Settings, X, Zap } from "lucide-react";
import LOGO from "@/assets/logo";

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
    {
      name: "LinkedIn Posts",
      href: "/linkedin-post",
      icon: Shapes,
    },
  ];

  return (
    <>
      {/* Desktop Sidebar Placeholder to preserve layout space */}
      <div className="hidden md:block w-[76px] shrink-0" />

      {/* Desktop Sidebar (Floating & Collapsible) */}
      <aside className="group hidden md:flex flex-col w-[76px] hover:w-64 transition-all duration-300 ease-in-out bg-card border-r border-border absolute left-0 top-0 h-full z-40 overflow-hidden shadow-[4px_0_24px_-10px_rgba(0,0,0,0.1)]">
        {/* Logo */}
        <div className="h-16 flex items-center px-5 border-b border-border/40 gap-4 shrink-0 whitespace-nowrap">
          <div className="shrink-0 flex items-center justify-center">
            <Image
              src={LOGO.logo}
              alt="Logo"
              width={32}
              height={32}
              className="object-contain"
              priority
            />
          </div>
          <span className="font-semibold text-lg tracking-tight bg-linear-to-r from-foreground via-foreground/90 to-foreground/75 bg-clip-text text-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Bunny
          </span>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto overflow-x-hidden">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <div key={item.name} className="space-y-1">
                <Link
                  href={item.href}
                  className={`flex items-center gap-4 px-[14px] py-3 rounded-lg text-sm font-medium transition-all relative whitespace-nowrap w-full ${
                    isActive
                      ? "bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 font-semibold"
                      : "text-muted-foreground hover:bg-secondary/40 hover:text-foreground"
                  }`}
                  title={item.name}
                >
                  <Icon
                    className={`h-5 w-5 shrink-0 transition-transform ${
                      isActive
                        ? "text-indigo-600 dark:text-indigo-400"
                        : "text-muted-foreground group-hover:text-foreground"
                    }`}
                  />
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-1 text-left">
                    {item.name}
                  </span>
                </Link>
              </div>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-border/40 bg-card/10 space-y-2 overflow-x-hidden">
          <Link
            href="/dashboard/assistant"
            className={`flex items-center w-full gap-4 px-[14px] py-3 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
              pathname === "/dashboard/assistant"
                ? "bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 font-semibold"
                : "text-muted-foreground hover:bg-secondary/40 hover:text-foreground"
            }`}
            title="Personal Assistant"
          >
            <Zap className="h-5 w-5 shrink-0" />
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-1 text-left">
              Personal Assistant
            </span>
          </Link>
          <Link
            href="/dashboard/settings"
            className={`flex items-center w-full gap-4 px-[14px] py-3 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
              pathname === "/dashboard/settings"
                ? "bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 font-semibold"
                : "text-muted-foreground hover:bg-secondary/40 hover:text-foreground"
            }`}
            title="Settings"
          >
            <Settings className="h-5 w-5 shrink-0" />
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-1 text-left">
              Settings
            </span>
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
              <div className="shrink-0 flex items-center justify-center">
                <Image
                  src={LOGO.logo}
                  alt="Logo"
                  width={32}
                  height={32}
                  className="object-contain"
                  priority
                />
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
                  <div key={item.name} className="space-y-1">
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all w-full ${
                        isActive
                          ? "bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 font-semibold"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      }`}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span className="flex-1 text-left">{item.name}</span>
                    </Link>
                  </div>
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
                    ? "bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 font-semibold"
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
                    ? "bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 font-semibold"
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
