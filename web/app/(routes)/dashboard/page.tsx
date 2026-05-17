import React from "react";
import { Metadata } from "next";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { History, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Dashboard - Bunny",
  description: "Manage your LinkedIn automation, campaigns, and stats.",
};

const DashboardPage = () => {
  const stats = [
    {
      title: "Shared Posts",
      value: "3",
      description: "posts published to LinkedIn",
      icon: History,
      color: "text-purple-500 bg-purple-500/10",
    },
    {
      title: "Scheduled Posts",
      value: "2",
      description: "posts queued for publishing",
      icon: Calendar,
      color: "text-amber-500 bg-amber-500/10",
    },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Dashboard
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 sm:mt-1">
          Welcome back! Here is an overview of your LinkedIn posts.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 max-w-xl">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.title}
              className="bg-card/25 border-border/40 backdrop-blur-sm shadow-xs relative overflow-hidden group hover:border-border/80 transition-all duration-300 pb-0"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-600/5 dark:bg-purple-600/2 rounded-full translate-x-8 -translate-y-8 blur-2xl group-hover:scale-150 transition-transform duration-500" />
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {stat.title}
                </span>
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent className="pb-6">
                <div className="text-3xl font-bold tracking-tight text-foreground">
                  {stat.value}
                </div>
                <p className="text-[11px] text-muted-foreground mt-1.5">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardPage;
