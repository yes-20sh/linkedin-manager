"use client";

import React, { useState } from "react";
import {
  SquarePen,
  Calendar,
  History,
  FileText,
  CheckCircle,
  AlertCircle,
  X,
  Lightbulb,
} from "lucide-react";

import { ScheduledQueue } from "./scheduled-queue/scheduled-queue";
import { SharedHistory } from "./shared-history/shared-history";
import { TemplatesGrid } from "./templates-grid/templates-grid";
import { PostTopics, type PostTopic } from "./post-topics/post-topics";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface ScheduledPost {
  id: string;
  title: string;
  content: string;
  time: string;
  status: "Pending" | "Ready";
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

export function LinkedinPostContainer() {
  const [activeTab, setActiveTab] = useState<
    "scheduled" | "shared" | "topics" | "templates"
  >("shared");

  // Post Editor States
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [isInstantPublish, setIsInstantPublish] = useState(false);
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
    },
    {
      id: "s2",
      title: "10 CSS Tricks for Premium Web Layouts",
      content: "Let's explore gradients, custom backdrops...",
      time: "2026-05-20 02:30 PM",
      status: "Pending",
    },
  ]);

  const [sharedPosts, setSharedPosts] = useState<SharedPost[]>([
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
  ]);

  const [postTopics, setPostTopics] = useState<PostTopic[]>([
    {
      id: "pt1",
      topic: "The evolution of frontend frameworks in 2026",
      scheduleDate: "2026-05-25",
      status: "AI Created",
    },
    {
      id: "pt2",
      topic: "How to negotiate a higher salary as a developer",
      scheduleDate: "2026-06-01",
      status: "Pending",
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

  // Handle Actions
  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle || !postContent) {
      triggerAlert("error", "Please provide both a title and post content.");
      return;
    }

    if (isInstantPublish) {
      const newPost: SharedPost = {
        id: "p_" + Date.now(),
        title: postTitle,
        content: postContent,
        time: "Just now",
        link: "https://linkedin.com/posts/simulated_" + Date.now(),
        likes: 0,
        comments: 0,
      };
      setSharedPosts([newPost, ...sharedPosts]);
      triggerAlert("success", "Post successfully shared to LinkedIn!");
    } else {
      if (!scheduledTime) {
        triggerAlert("error", "Please select a scheduled date and time.");
        return;
      }
      const newScheduled: ScheduledPost = {
        id: "s_" + Date.now(),
        title: postTitle,
        content: postContent,
        time: scheduledTime.replace("T", " "),
        status: "Pending",
      };
      setScheduledPosts([newScheduled, ...scheduledPosts]);
      triggerAlert("success", "Post successfully scheduled!");
    }

    // Reset fields
    setPostTitle("");
    setPostContent("");
    setScheduledTime("");
  };

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

    // Filter out emojis from draft title
    const cleanTitle = template.title
      .replace(
        /[\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD00-\uDFFF]/g,
        "",
      )
      .trim();
    setPostTitle(cleanTitle + " Draft");
    setPostContent(template.content || "");
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
        id: "t_" + Date.now(),
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

  const handleDeleteTopic = (id: string) => {
    setPostTopics(postTopics.filter((t) => t.id !== id));
    triggerAlert("success", "Topic successfully deleted.");
  };

  const handleBulkDeleteTopics = (ids: string[]) => {
    setPostTopics(postTopics.filter((t) => !ids.includes(t.id)));
    triggerAlert("success", `Successfully removed ${ids.length} topics.`);
  };

  const handleTopicStatusChange = (
    id: string,
    status: "Pending" | "AI Created",
  ) => {
    setPostTopics(postTopics.map((t) => (t.id === id ? { ...t, status } : t)));
    triggerAlert("success", `Topic status changed to ${status}.`);
  };

  const handleGenerateContent = (id: string) => {
    triggerAlert(
      "success",
      "AI generation started! This will take a few seconds.",
    );
    // Simulate generation
    setTimeout(() => {
      handleTopicStatusChange(id, "AI Created");
    }, 2000);
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
    <div className="space-y-6 max-w-6xl mx-auto animate-in fade-in duration-300">
      {/* Floating Popover Alerts with Close Dismissal */}
      {alertMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 max-w-md w-[calc(100vw-3rem)] animate-in fade-in slide-in-from-top-4 duration-300">
          <Alert
            variant={alertMessage.type === "error" ? "destructive" : "default"}
            className={`shadow-2xl border backdrop-blur-md relative pr-10 ${
              alertMessage.type === "success"
                ? "bg-purple-500/10 border-purple-500/20 text-purple-600 dark:text-purple-400"
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

      {/* Official Shadcn UI Tabs Controller */}
      <Tabs
        value={activeTab}
        onValueChange={(val) => setActiveTab(val as any)}
        className="w-full"
      >
        <TabsList className="flex gap-1.5 p-1 bg-secondary/15 dark:bg-black/20 border border-border/40 backdrop-blur-md rounded-xl max-w-md mb-6 w-full h-auto!">
          <TabsTrigger
            value="shared"
            className={`flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all cursor-pointer flex-1 h-auto! ${
              activeTab === "shared"
                ? "bg-purple-600! text-white! shadow-md! shadow-purple-600/10!"
                : "text-muted-foreground hover:bg-secondary/40 hover:text-foreground bg-transparent! border-none!"
            }`}
          >
            <History className="h-3.5 w-3.5" />
            Shared
          </TabsTrigger>
          <TabsTrigger
            value="scheduled"
            className={`flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all cursor-pointer flex-1 h-auto! ${
              activeTab === "scheduled"
                ? "bg-purple-600! text-white! shadow-md! shadow-purple-600/10!"
                : "text-muted-foreground hover:bg-secondary/40 hover:text-foreground bg-transparent! border-none!"
            }`}
          >
            <Calendar className="h-3.5 w-3.5" />
            Scheduled
          </TabsTrigger>
          <TabsTrigger
            value="topics"
            className={`flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all cursor-pointer flex-1 h-auto! ${
              activeTab === "topics"
                ? "bg-purple-600! text-white! shadow-md! shadow-purple-600/10!"
                : "text-muted-foreground hover:bg-secondary/40 hover:text-foreground bg-transparent! border-none!"
            }`}
          >
            <Lightbulb className="h-3.5 w-3.5" />
            Topics
          </TabsTrigger>
          <TabsTrigger
            value="templates"
            className={`flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all cursor-pointer flex-1 h-auto! ${
              activeTab === "templates"
                ? "bg-purple-600! text-white! shadow-md! shadow-purple-600/10!"
                : "text-muted-foreground hover:bg-secondary/40 hover:text-foreground bg-transparent! border-none!"
            }`}
          >
            <FileText className="h-3.5 w-3.5" />
            Templates
          </TabsTrigger>
        </TabsList>

        <TabsContent value="shared" className="mt-4 outline-none">
          <SharedHistory posts={sharedPosts} />
        </TabsContent>

        <TabsContent value="scheduled" className="mt-4 outline-none">
          <ScheduledQueue
            posts={scheduledPosts}
            onDelete={handleDeleteScheduled}
            onBulkDelete={handleBulkDeleteScheduled}
          />
        </TabsContent>

        <TabsContent value="topics" className="mt-4 outline-none">
          <PostTopics
            topics={postTopics}
            onDelete={handleDeleteTopic}
            onBulkDelete={handleBulkDeleteTopics}
            onEdit={(id) =>
              triggerAlert(
                "success",
                "Edit topic functionality to be implemented!",
              )
            }
            onGenerate={handleGenerateContent}
            onStatusChange={handleTopicStatusChange}
          />
        </TabsContent>

        <TabsContent value="templates" className="mt-4 outline-none">
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
        </TabsContent>
      </Tabs>
    </div>
  );
}
