"use client";

import React, { useState } from "react";
import { CheckCircle, AlertCircle, X } from "lucide-react";

import { ScheduledQueue } from "./scheduled-queue/scheduled-queue";
import { SharedHistory } from "./shared-history/shared-history";
import { TemplatesGrid } from "./templates-grid/templates-grid";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useSearchParams } from "next/navigation";

interface ScheduledPost {
  id: string;
  title: string;
  content: string;
  time: string;
  status: "Pending" | "Ready";
  imageUrl?: string;
}

interface SharedPost {
  id: string;
  title: string;
  content: string;
  time: string;
  link: string;
  likes: number;
  comments: number;
  topic?: string;
  imageUrl?: string;
}

interface PostTemplate {
  id: string;
  title: string;
  topic?: string;
  description?: string;
  aiPrompt?: string;
  htmlImageTemplate?: string;
  category?: string;
  content?: string;
  image?: string;
  uses?: number;
}

const generateId = (prefix: string) =>
  `${prefix}_${Math.random().toString(36).substr(2, 9)}`;

export function LinkedinPostContainer() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "shared";

  const [alertMessage, setAlertMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Template Form States
  const [showAddTemplate, setShowAddTemplate] = useState(false);
  const [templateTitle, setTemplateTitle] = useState("");
  const [templateTopic, setTemplateTopic] = useState("");
  const [templateDescription, setTemplateDescription] = useState("");
  const [templateAiPrompt, setTemplateAiPrompt] = useState("");
  const [templateHtmlImageTemplate, setTemplateHtmlImageTemplate] =
    useState("");

  // Simulated Database State
  const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>([
    {
      id: "s1",
      title: "Unlocking High-Performance Automation in Node.js",
      content: "Deep dive into performance optimizations...",
      time: "2026-05-18 10:00 AM",
      status: "Pending",
      imageUrl: "https://images.unsplash.com/photo-1627398240411-8bbeb736561f?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "s2",
      title: "10 CSS Tricks for Premium Web Layouts",
      content: "Let's explore gradients, custom backdrops...",
      time: "2026-05-20 02:30 PM",
      status: "Pending",
    },
  ]);

  const [sharedPosts] = useState<SharedPost[]>([
    {
      id: "p1",
      title: "Why AI Agents are the Future of Software Engineering",
      content:
        "The transition from copilot autocomplete tools to fully agentic pair programming...",
      time: "2 days ago",
      link: "https://linkedin.com/posts/ai-agents-future",
      likes: 142,
      comments: 28,
      topic: "Tech & AI",
      imageUrl:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "p2",
      title: "How to Build Glassmorphic UI with TailwindCSS",
      content:
        "Glassmorphism elements remain highly premium if backed by robust contrasts...",
      time: "5 days ago",
      link: "https://linkedin.com/posts/glassmorphic-ui-tailwind",
      likes: 89,
      comments: 12,
      topic: "Design",
      imageUrl:
        "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "p3",
      title: "Our Pre-Seed Funding Round is Officially Closed!",
      content:
        "Overjoyed to announce that we successfully locked in our seed backing...",
      time: "1 week ago",
      link: "https://linkedin.com/posts/preseed-closed",
      likes: 512,
      comments: 94,
      topic: "Startup",
    },
    {
      id: "p4",
      title: "Mastering Next.js 14 App Router",
      content:
        "Server Components have completely changed the way we think about React architecture...",
      time: "2 weeks ago",
      link: "https://linkedin.com/posts/nextjs-14-router",
      likes: 320,
      comments: 45,
      topic: "Web Dev",
      imageUrl:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "p5",
      title: "The Reality of Remote Work in 2026",
      content:
        "Is the hybrid model actually working? Here is what the data from 500 tech companies reveals...",
      time: "3 weeks ago",
      link: "https://linkedin.com/posts/remote-work-reality",
      likes: 215,
      comments: 56,
      topic: "Culture",
    },
  ]);

  const [templates, setTemplates] = useState<PostTemplate[]>([
    {
      id: "t1",
      title: "🔥 Industry Hook Format",
      topic: "Thought Leadership",
      category: "Thought Leadership",
      description:
        "Most people think [Common Belief] is the only way to succeed. But after [Time/Experience], I realized the exact opposite is true. Here is why...",
      content:
        "Most people think [Common Belief] is the only way to succeed. But after [Time/Experience], I realized the exact opposite is true. Here is why...",
      image:
        "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=400&q=80",
      uses: 48,
    },
    {
      id: "t2",
      title: "🚀 Product Launch Announcement",
      topic: "Product Launch",
      category: "Product Launch",
      description:
        "Today is the day! We are officially launching [Product Name]. 🚀 Built to solve [Problem], this tool will help you [Benefit 1] and [Benefit 2]. Try it out now at [URL]!",
      content:
        "Today is the day! We are officially launching [Product Name]. 🚀 Built to solve [Problem], this tool will help you [Benefit 1] and [Benefit 2]. Try it out now at [URL]!",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80",
      uses: 12,
    },
    {
      id: "t3",
      title: "💡 Quick Value Tip",
      topic: "Education",
      category: "Education",
      description:
        "Here is a 30-second tip that will save you hours of work when [Activity]:\n\n1. [Step 1]\n2. [Step 2]\n3. [Step 3]\n\nSimple, but extremely powerful. What is your go-to trick for [Activity]?",
      content:
        "Here is a 30-second tip that will save you hours of work when [Activity]:\n\n1. [Step 1]\n2. [Step 2]\n3. [Step 3]\n\nSimple, but extremely powerful. What is your go-to trick for [Activity]?",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80",
      uses: 29,
    },
  ]);

  const [editingTemplateId, setEditingTemplateId] = useState<string | null>(
    null,
  );

  const handleDeleteScheduled = (id: string) => {
    setScheduledPosts(scheduledPosts.filter((post) => post.id !== id));
    triggerAlert("success", "Scheduled post successfully removed.");
  };

  const handleBulkDeleteScheduled = (ids: string[]) => {
    setScheduledPosts(scheduledPosts.filter((post) => !ids.includes(post.id)));
    triggerAlert(
      "success",
      `Successfully removed ${ids.length} scheduled posts.`,
    );
  };

  const handleUseTemplate = (template: PostTemplate) => {
    // Increment template uses count
    setTemplates((prev) =>
      prev.map((t) =>
        t.id === template.id ? { ...t, uses: (t.uses || 0) + 1 } : t,
      ),
    );

    triggerAlert("success", `Loaded "${template.title}" into draft editor!`);
  };

  const handleCreateTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!templateTitle || !templateTopic) {
      triggerAlert("error", "Please fill in both the Title and Topic.");
      return;
    }

    const getCategoryImage = (cat: string) => {
      if (cat === "Thought Leadership")
        return "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=400&q=80";
      if (cat === "Product Launch")
        return "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80";
      if (cat === "Education")
        return "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80";
      return "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80";
    };

    if (editingTemplateId) {
      setTemplates(
        templates.map((t) =>
          t.id === editingTemplateId
            ? {
                ...t,
                title: templateTitle,
                topic: templateTopic,
                category: templateTopic,
                description: templateDescription,
                content: templateDescription || templateAiPrompt || "",
                aiPrompt: templateAiPrompt,
                htmlImageTemplate: templateHtmlImageTemplate,
                image: getCategoryImage(templateTopic),
              }
            : t,
        ),
      );
      setEditingTemplateId(null);
      triggerAlert("success", "Template successfully updated!");
    } else {
      const newTemplate: PostTemplate = {
        id: generateId("t"),
        title: templateTitle,
        topic: templateTopic,
        category: templateTopic,
        description: templateDescription,
        content: templateDescription || templateAiPrompt || "",
        aiPrompt: templateAiPrompt,
        htmlImageTemplate: templateHtmlImageTemplate,
        image: getCategoryImage(templateTopic),
      };
      setTemplates([...templates, newTemplate]);
      triggerAlert("success", "New template successfully added!");
    }

    setTemplateTitle("");
    setTemplateTopic("");
    setTemplateDescription("");
    setTemplateAiPrompt("");
    setTemplateHtmlImageTemplate("");
    setShowAddTemplate(false);
  };

  const handleDeleteTemplate = (id: string) => {
    setTemplates(templates.filter((t) => t.id !== id));
    triggerAlert("success", "Template successfully deleted!");
  };

  const handleEditTemplate = (template: PostTemplate) => {
    setTemplateTitle(template.title);
    setTemplateTopic(template.topic || template.category || "");
    setTemplateDescription(template.description || template.content || "");
    setTemplateAiPrompt(template.aiPrompt || "");
    setTemplateHtmlImageTemplate(template.htmlImageTemplate || "");
    setEditingTemplateId(template.id);
    setShowAddTemplate(true);
  };

  const triggerAlert = (type: "success" | "error", text: string) => {
    setAlertMessage({ type, text });
    setTimeout(() => setAlertMessage(null), 4000);
  };

  return (
    <div className="space-y-6 w-full animate-in fade-in duration-300 p-2 min-h-screen">
      {/* Floating Popover Alerts with Close Dismissal */}
      {alertMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 max-w-md w-[calc(100vw-3rem)] animate-in fade-in slide-in-from-top-4 duration-300">
          <Alert
            variant={alertMessage.type === "error" ? "destructive" : "default"}
            className={`shadow-2xl border backdrop-blur-md relative pr-10 ${
              alertMessage.type === "success"
                ? "bg-indigo-500/10 border-indigo-500/20 text-indigo-600 dark:text-indigo-400"
                : "bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400"
            }`}
          >
            {alertMessage.type === "success" ? (
              <CheckCircle className="h-4 w-4 shrink-0" />
            ) : (
              <AlertCircle className="h-4 w-4 shrink-0" />
            )}
            <AlertTitle className="text-xs sm:text-sm font-bold capitalize leading-none mb-1">
              {alertMessage.type === "success" ? "Success" : "Error"}
            </AlertTitle>
            <AlertDescription className="text-xs sm:text-sm font-medium">
              {alertMessage.text}
            </AlertDescription>
            <button
              type="button"
              onClick={() => setAlertMessage(null)}
              className="absolute top-2.5 right-2.5 p-1 rounded-md text-muted-foreground hover:text-foreground cursor-pointer transition-colors active:scale-95"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </Alert>
        </div>
      )}

      {/* Dynamic Content based on selected tab from Sidebar */}
      <div className="outline-none">
        {activeTab === "shared" && <SharedHistory posts={sharedPosts} />}

        {activeTab === "scheduled" && (
          <ScheduledQueue
            posts={scheduledPosts}
            onDelete={handleDeleteScheduled}
            onBulkDelete={handleBulkDeleteScheduled}
          />
        )}

        {activeTab === "templates" && (
          <TemplatesGrid
            templates={templates}
            onUseTemplate={handleUseTemplate}
            showAddTemplate={showAddTemplate}
            setShowAddTemplate={setShowAddTemplate}
            templateTopic={templateTopic}
            setTemplateTopic={setTemplateTopic}
            templateTitle={templateTitle}
            setTemplateTitle={setTemplateTitle}
            templateDescription={templateDescription}
            setTemplateDescription={setTemplateDescription}
            templateAiPrompt={templateAiPrompt}
            setTemplateAiPrompt={setTemplateAiPrompt}
            templateHtmlImageTemplate={templateHtmlImageTemplate}
            setTemplateHtmlImageTemplate={setTemplateHtmlImageTemplate}
            onSubmitTemplate={handleCreateTemplate}
            onDeleteTemplate={handleDeleteTemplate}
            onEditTemplate={handleEditTemplate}
          />
        )}
      </div>
    </div>
  );
}
