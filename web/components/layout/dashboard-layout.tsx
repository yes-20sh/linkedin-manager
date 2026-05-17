"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Sidebar } from "./sidebar";
import { Header } from "./header";

interface DashboardShellProps {
  children: React.ReactNode;
}

export default function DashboardShell({ children }: DashboardShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  // Prevent hydration mismatches
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar (Desktop and Mobile Drawer) */}
      <Sidebar
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        pathname={pathname}
        handleLogout={handleLogout}
      />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Header Pane */}
        <Header
          setMobileMenuOpen={setMobileMenuOpen}
          mounted={mounted}
          theme={theme}
          setTheme={setTheme}
          handleLogout={handleLogout}
        />

        {/* Main Content Pane */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-secondary/5 dark:bg-black/10">
          {children}
        </main>
      </div>
    </div>
  );
}
