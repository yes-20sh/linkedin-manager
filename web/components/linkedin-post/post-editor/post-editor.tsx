"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Clock } from "lucide-react";

interface PostEditorProps {
  postTitle: string;
  setPostTitle: (val: string) => void;
  postContent: string;
  setPostContent: (val: string) => void;
  scheduledTime: string;
  setScheduledTime: (val: string) => void;
  isInstantPublish: boolean;
  setIsInstantPublish: (val: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function PostEditor({
  postTitle,
  setPostTitle,
  postContent,
  setPostContent,
  scheduledTime,
  setScheduledTime,
  isInstantPublish,
  setIsInstantPublish,
  onSubmit,
}: PostEditorProps) {
  return (
    <Card className="bg-card/25 border-border/40 backdrop-blur-sm shadow-xs">
      <CardHeader>
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-indigo-500" />
          Craft Your Next Post
        </CardTitle>
        <CardDescription className="text-xs">
          Write a compelling post, schedule it for maximum organic reach, or publish it directly.
        </CardDescription>
      </CardHeader>
      <CardContent className="border-t border-border/20 p-4 sm:p-6">
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-xs font-semibold text-foreground/80">
              Post Label / Title
            </Label>
            <Input
              id="title"
              placeholder="e.g. Scaling automation sheet tip"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              className="h-10 bg-secondary/10 border-border/40 text-xs sm:text-sm placeholder:text-muted-foreground/60 focus-visible:ring-indigo-600/25 focus-visible:border-indigo-600/50"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="content" className="text-xs font-semibold text-foreground/80">
                Post Content
              </Label>
              <span className="text-[10px] text-muted-foreground">
                {postContent.length} characters
              </span>
            </div>
            <Textarea
              id="content"
              rows={8}
              placeholder="What do you want to share with your network today?"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              className="bg-secondary/10 border-border/40 text-xs sm:text-sm placeholder:text-muted-foreground/60 focus-visible:ring-indigo-600/25 focus-visible:border-indigo-600/50 min-h-[160px]"
            />
          </div>

          {/* Scheduling Parameters */}
          <div className="p-4 rounded-xl border border-border/30 bg-secondary/5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-xs font-semibold text-foreground/90">
                  Publish Instantly
                </Label>
                <p className="text-[10px] text-muted-foreground">
                  Post will be shared to LinkedIn directly upon submission.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsInstantPublish(!isInstantPublish)}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  isInstantPublish ? "bg-indigo-600" : "bg-muted"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    isInstantPublish ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {!isInstantPublish && (
              <div className="space-y-2 pt-2 border-t border-border/10 animate-in fade-in duration-200">
                <Label htmlFor="time" className="text-xs font-semibold text-foreground/80 flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-indigo-500" />
                  Schedule Date & Time
                </Label>
                <Input
                  id="time"
                  type="datetime-local"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                  className="h-10 bg-secondary/10 border-border/40 text-xs sm:text-sm focus-visible:ring-indigo-600/25 focus-visible:border-indigo-600/50 max-w-xs"
                />
              </div>
            )}
          </div>

          <Button
            type="submit"
            className="w-full h-10 text-xs sm:text-sm bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-lg shadow-indigo-600/10 transition-all hover:scale-[1.01]"
          >
            {isInstantPublish ? "Share Post Now" : "Schedule LinkedIn Post"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
