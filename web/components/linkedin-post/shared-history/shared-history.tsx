"use client";

import React from "react";
import { PostsCard } from "../postscard/postscard";

export interface SharedPost {
  id: string;
  title: string;
  content: string;
  time: string;
  link?: string;
  likes?: number;
  comments?: number;
  topic?: string;
  imageUrl?: string;
  status?: "Pending" | "Ready";
}

interface SharedHistoryProps {
  posts: SharedPost[];
  onBulkDelete?: (ids: string[]) => void;
}

export function SharedHistory({ posts, onBulkDelete }: SharedHistoryProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-1.5">
        <h2 className="text-xl font-semibold tracking-tight">
          Shared History & Analytics
        </h2>
        <p className="text-sm text-muted-foreground">
          Performance tracking on historically published LinkedIn outreach
          posts.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {posts.map((post) => (
          <PostsCard
            key={post.id}
            post={post}
            onDelete={(id) => onBulkDelete?.([id])}
          />
        ))}
      </div>
    </div>
  );
}
