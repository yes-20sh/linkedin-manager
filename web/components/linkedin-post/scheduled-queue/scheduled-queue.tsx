"use client";

import React, { useState } from "react";
import { Calendar } from "lucide-react";
import { PostsCard } from "../postscard/postscard";
import { SharedPost } from "../shared-history/shared-history";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ScheduledPost extends Omit<SharedPost, "status"> {
  status: "Pending" | "Ready";
}

interface ScheduledQueueProps {
  posts: ScheduledPost[];
  onDelete: (id: string) => void;
  onBulkDelete: (ids: string[]) => void;
  onStatusChange?: (id: string, status: "Pending" | "Ready") => void;
}

export function ScheduledQueue({
  posts,
  onDelete,
  onStatusChange,
}: ScheduledQueueProps) {
  // Deletion confirm states
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="space-y-1.5">
        <h2 className="text-xl font-semibold tracking-tight">
          Scheduled Queue
        </h2>
        <p className="text-sm text-muted-foreground">
          Manage upcoming posts in your active LinkedIn pipeline queue.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center bg-card/25 border border-border/40 rounded-xl">
          <Calendar className="h-10 w-10 text-muted-foreground/45 mb-3" />
          <p className="text-sm font-semibold text-foreground">
            No scheduled posts
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Use the creator to build and schedule your next outreach tips!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {posts.map((post) => (
            <PostsCard
              key={post.id}
              post={post}
              onDelete={() => setDeleteTargetId(post.id)}
              onStatusChange={onStatusChange}
              onView={(id) => console.log("View", id)}
              onEdit={(id) => console.log("Edit", id)}
            />
          ))}
        </div>
      )}

      {/* Individual deletion confirm dialog */}
      <AlertDialog
        open={deleteTargetId !== null}
        onOpenChange={(open) => !open && setDeleteTargetId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This post will be permanently
              deleted from your scheduled outreach pipeline queue.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={() => {
                if (deleteTargetId) {
                  onDelete(deleteTargetId);
                  setDeleteTargetId(null);
                }
              }}
            >
              Yes, delete post
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
