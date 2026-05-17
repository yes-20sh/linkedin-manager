"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Trash2, Eye, Pencil, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

interface ScheduledPost {
  id: string;
  title: string;
  content: string;
  time: string;
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
  onBulkDelete,
  onStatusChange,
}: ScheduledQueueProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Deletion confirm states
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [showBulkConfirm, setShowBulkConfirm] = useState(false);

  // Selection handlers
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
            Scheduled Queue
          </CardTitle>
          <CardDescription className="text-xs">
            Manage upcoming posts in your active LinkedIn pipeline queue.
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

      <CardContent className="p-0 overflow-x-auto">
        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <Calendar className="h-10 w-10 text-muted-foreground/45 mb-3" />
            <p className="text-xs font-semibold text-foreground">
              No scheduled posts
            </p>
            <p className="text-[10px] text-muted-foreground mt-0.5">
              Use the creator to build and schedule your next outreach tips!
            </p>
          </div>
        ) : (
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
                  Post Details & Content
                </TableHead>
                <TableHead className="px-6 py-4 text-left text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  Scheduled Time
                </TableHead>
                <TableHead className="px-6 py-4 text-left text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  Status
                </TableHead>
                <TableHead className="px-6 py-4 text-center text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post) => {
                const isSelected = selectedIds.includes(post.id);
                return (
                  <TableRow
                    key={post.id}
                    className={`h-[80px] hover:bg-secondary/5 transition-colors ${
                      isSelected ? "bg-purple-500/5 hover:bg-purple-500/10" : ""
                    }`}
                  >
                    <TableCell className="w-12 px-6 py-4">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleSelectRow(post.id)}
                        className="h-4 w-4 rounded border-border/40 text-purple-600 focus:ring-purple-600/25 bg-secondary/15 accent-purple-600 transition-all cursor-pointer"
                      />
                    </TableCell>
                    <TableCell className="px-6 py-4 whitespace-normal">
                      <div className="space-y-0.5 max-w-sm sm:max-w-md">
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
                    <TableCell className="px-6 py-4 whitespace-nowrap">
                      <DropdownMenu>
                        <DropdownMenuTrigger className="outline-none">
                          <Badge
                            variant="outline"
                            className="gap-1 px-3 py-1 text-sm font-semibold bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400 cursor-pointer hover:bg-amber-500/20 transition-colors rounded-full"
                          >
                            {post.status}
                            <ChevronDown className="h-3.5 w-3.5" />
                          </Badge>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="start"
                          className="min-w-[120px]"
                        >
                          <DropdownMenuItem
                            className="text-xs cursor-pointer"
                            onClick={() => onStatusChange?.(post.id, "Pending")}
                          >
                            Pending
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-xs cursor-pointer"
                            onClick={() => onStatusChange?.(post.id, "Ready")}
                          >
                            Ready
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap text-center text-xs">
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 bg-blue-500/10 text-blue-600 hover:bg-blue-500 hover:text-white rounded-lg cursor-pointer transition-colors"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500 hover:text-white rounded-lg cursor-pointer transition-colors"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleteTargetId(post.id)}
                          className="h-8 w-8 bg-red-500/10 text-red-600 hover:bg-red-600 hover:text-white rounded-lg cursor-pointer transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </CardContent>

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

      {/* Bulk deletion confirm dialog */}
      <AlertDialog
        open={showBulkConfirm}
        onOpenChange={(open) => !open && setShowBulkConfirm(false)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete multiple scheduled posts?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the {selectedIds.length} selected
              scheduled posts? This will permanently remove them from your
              outreach pipeline queue.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={() => {
                onBulkDelete(selectedIds);
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
