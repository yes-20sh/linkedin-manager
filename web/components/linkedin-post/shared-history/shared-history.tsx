"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExternalLink, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

interface SharedHistoryProps {
  posts: SharedPost[];
  onBulkDelete?: (ids: string[]) => void;
}

export function SharedHistory({ posts, onBulkDelete }: SharedHistoryProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showBulkConfirm, setShowBulkConfirm] = useState(false);

  const handleSelectAll = () => {
    if (posts.length > 0 && selectedIds.length === posts.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(posts.map((p) => p.id));
    }
  };

  const handleSelectRow = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  return (
    <Card className="bg-card/25 border-border/40 backdrop-blur-sm shadow-xs overflow-hidden relative pb-0">
      <CardHeader className="flex flex-row items-start sm:items-center justify-between space-y-0 pb-4 gap-4">
        <div className="space-y-1.5">
          <CardTitle className="text-base font-semibold">
            Shared History & Analytics
          </CardTitle>
          <CardDescription className="text-xs">
            Performance tracking on historically published LinkedIn outreach
            posts.
          </CardDescription>
        </div>

        {/* Bulk action action bar */}
        {selectedIds.length > 0 && posts.length > 0 && (
          <div className="flex items-center gap-3 bg-purple-500/10 border border-purple-500/20 px-3 py-1.5 rounded-lg animate-in fade-in zoom-in-95 duration-200">
            <span className="text-xs font-semibold text-purple-600 dark:text-purple-400">
              {selectedIds.length} selected
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowBulkConfirm(true)}
              className="h-7 text-xs text-red-500 hover:text-white hover:bg-red-600 font-medium px-2 rounded-md cursor-pointer transition-all"
            >
              <Trash2 className="h-3.5 w-3.5 mr-1" />
              Delete
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent className="border-t border-border/20 p-0 overflow-x-auto">
        <Table>
          <TableHeader className="bg-purple-600/5 dark:bg-purple-950/30 border-b border-purple-500/10">
            <TableRow>
              <TableHead className="w-12 px-6 py-4">
                <input
                  type="checkbox"
                  checked={
                    posts.length > 0 && selectedIds.length === posts.length
                  }
                  onChange={handleSelectAll}
                  className="h-4 w-4 rounded border-border/40 text-purple-600 focus:ring-purple-600/25 bg-secondary/15 accent-purple-600 transition-all cursor-pointer"
                />
              </TableHead>
              <TableHead className="px-6 py-4 text-left text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                Topic
              </TableHead>
              <TableHead className="px-6 py-4 text-left text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                Shared Title
              </TableHead>
              <TableHead className="px-6 py-4 text-left text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                Time Shared
              </TableHead>
              <TableHead className="pl-4 pr-10 py-4 text-right text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                LinkedIn Link
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => (
              <TableRow
                key={post.id}
                className={`h-[80px] hover:bg-secondary/5 transition-colors ${
                  selectedIds.includes(post.id)
                    ? "bg-purple-500/5 hover:bg-purple-500/10"
                    : ""
                }`}
              >
                <TableCell className="w-12 px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(post.id)}
                    onChange={() => handleSelectRow(post.id)}
                    className="h-4 w-4 rounded border-border/40 text-purple-600 focus:ring-purple-600/25 bg-secondary/15 accent-purple-600 transition-all cursor-pointer"
                  />
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center text-[10px] font-semibold bg-purple-500/10 text-purple-600 dark:text-purple-400 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {post.topic || "General"}
                  </span>
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-normal">
                  <div className="space-y-1 max-w-xs sm:max-w-sm">
                    <p className="text-xs font-bold text-foreground truncate">
                      {post.title}
                    </p>
                    <p className="text-[10px] text-muted-foreground truncate">
                      {post.content}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-xs text-foreground font-semibold">
                  {post.time}
                </TableCell>
                <TableCell className="pl-4 pr-10 py-4 whitespace-nowrap text-xs text-right">
                  <a
                    href={post.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-purple-600 hover:text-purple-500 hover:underline justify-end font-semibold"
                  >
                    View Post <ExternalLink className="h-3 w-3" />
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      {/* Bulk deletion confirm dialog */}
      <AlertDialog
        open={showBulkConfirm}
        onOpenChange={(open) => !open && setShowBulkConfirm(false)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete multiple shared posts?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the {selectedIds.length} selected
              shared posts? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={() => {
                if (onBulkDelete) {
                  onBulkDelete(selectedIds);
                }
                setSelectedIds([]);
                setShowBulkConfirm(false);
              }}
            >
              Yes, delete {selectedIds.length} posts
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
