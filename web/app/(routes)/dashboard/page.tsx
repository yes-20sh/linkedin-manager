import { Metadata } from "next";
import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Share2, Briefcase } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard - Bunny",
  description: "Manage your LinkedIn automation, campaigns, and stats.",
};

const DashboardPage = () => {
  const cards = [
    {
      title: "LinkedIn Post",
      description: "Manage, create, and schedule your LinkedIn posts",
      icon: Share2,
      color:
        "bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-sm",
      href: "/linkedin-post",
    },
    {
      title: "Job Hunting AI",
      description: "AI-powered tools to accelerate your job search",
      icon: Briefcase,
      color:
        "bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-sm",
      href: "#",
    },
  ];

  return (
    <div className="space-y-6  mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Dashboard
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 sm:mt-1">
          Welcome back! Select a module to get started.
        </p>
      </div>

      {/* Category Filters / Quick Links */}
      <div className="flex flex-wrap gap-2.5">
        <Badge
          variant="default"
          className="cursor-pointer shadow-sm hover:bg-indigo-600 px-4 py-4 text-sm font-medium"
        >
          All
        </Badge>
        <Badge
          variant="secondary"
          className="cursor-pointer hover:bg-secondary/80 px-4 py-4 text-sm font-medium"
        >
          Social Media
        </Badge>
        <Badge
          variant="secondary"
          className="cursor-pointer hover:bg-secondary/80 px-4 py-4 text-sm font-medium"
        >
          Job Hunting
        </Badge>
        <Badge
          variant="secondary"
          className="cursor-pointer hover:bg-secondary/80 px-4 py-4 text-sm font-medium"
        >
          Interview Prep
        </Badge>
        <Badge
          variant="secondary"
          className="cursor-pointer hover:bg-secondary/80 px-4 py-4 text-sm font-medium"
        >
          Networking
        </Badge>
      </div>

      {/* Action Cards */}
      <div className="flex flex-wrap gap-4 mt-16">
        {cards.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.title}
              href={item.href}
              className="block group w-32 sm:w-36"
            >
              <Card
                className={`aspect-square border-none shadow-md relative overflow-hidden transition-all duration-300 flex flex-col justify-center items-center p-3 hover:-translate-y-0.5 hover:shadow-lg ${item.color}`}
              >
                {/* Subtle glowing blob */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full translate-x-8 -translate-y-8 blur-xl group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-black/5 rounded-full -translate-x-6 translate-y-6 blur-lg" />

                <div className="mb-3 relative z-10 p-2.5 bg-white/10 backdrop-blur-sm rounded-2xl shadow-inner border border-white/10">
                  <Icon className="h-6 w-6 text-white drop-shadow-sm" />
                </div>
                <CardTitle className="text-sm font-semibold text-center leading-tight text-white relative z-10">
                  {item.title}
                </CardTitle>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardPage;
