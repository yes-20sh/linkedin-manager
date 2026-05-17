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
import { Calendar, Trash2, Edit, Sparkles, ChevronDown } from "lucide-react";
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

export interface PostTopic {
  id: string;
  topic: string;
  scheduleDate: string;
  status: "Pending" | "AI Created";
}

interface PostTopicsProps {
  topics: PostTopic[];
  onDelete: (id: string) => void;
  onBulkDelete: (ids: string[]) => void;
  onEdit: (id: string) => void;
  onGenerate: (id: string) => void;
  onStatusChange?: (id: string, status: "Pending" | "AI Created") => void;
}

export function PostTopics({
  topics,
  onDelete,
  onBulkDelete,
  onEdit,
  onGenerate,
  onStatusChange,
}: PostTopicsProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [showBulkConfirm, setShowBulkConfirm] = useState(false);

  const handleSelectAll = () => {
    if (topics.length > 0 && selectedIds.length === topics.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(topics.map((t) => t.id));
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
          <CardTitle className="text-base font-semibold">Post Topics</CardTitle>
          <CardDescription className="text-xs">
            Manage your post topics, schedule dates, and AI generation status.
          </CardDescription>
        </div>

        {selectedIds.length > 0 && topics.length > 0 && (
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
        {topics.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <Calendar className="h-10 w-10 text-muted-foreground/45 mb-3" />
            <p className="text-xs font-semibold text-foreground">
              No topics available
            </p>
            <p className="text-[10px] text-muted-foreground mt-0.5">
              Add new topics to start planning your content pipeline.
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
                      topics.length > 0 && selectedIds.length === topics.length
                    }
                    onChange={handleSelectAll}
                    className="h-4 w-4 rounded border-border/40 text-purple-600 focus:ring-purple-600/25 bg-secondary/15 accent-purple-600 transition-all cursor-pointer"
                  />
                </TableHead>
                <TableHead className="px-6 py-4 text-left text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  Post Topic
                </TableHead>
                <TableHead className="px-6 py-4 text-left text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  Schedule Date
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
              {topics.map((topic) => {
                const isSelected = selectedIds.includes(topic.id);
                return (
                  <TableRow
                    key={topic.id}
                    className={`hover:bg-secondary/5 transition-colors ${
                      isSelected ? "bg-purple-500/5 hover:bg-purple-500/10" : ""
                    }`}
                  >
                    <TableCell className="w-12 px-6 py-4">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleSelectRow(topic.id)}
                        className="h-4 w-4 rounded border-border/40 text-purple-600 focus:ring-purple-600/25 bg-secondary/15 accent-purple-600 transition-all cursor-pointer"
                      />
                    </TableCell>
                    <TableCell className="px-6 py-4 whitespace-normal">
                      <p className="text-xs font-bold text-foreground truncate max-w-xs sm:max-w-sm">
                        {topic.topic}
                      </p>
                    </TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap text-xs text-foreground font-semibold">
                      {topic.scheduleDate}
                    </TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap">
                      <DropdownMenu>
                        <DropdownMenuTrigger className="outline-none">
                          <Badge
                            variant="outline"
                            className={`gap-1 px-3 py-1 text-sm font-semibold cursor-pointer transition-colors rounded-full ${
                              topic.status === "AI Created"
                                ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400 hover:bg-emerald-500/20"
                                : "bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400 hover:bg-amber-500/20"
                            }`}
                          >
                            {topic.status}
                            <ChevronDown className="h-3.5 w-3.5" />
                          </Badge>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="start"
                          className="min-w-[120px]"
                        >
                          <DropdownMenuItem
                            className="text-xs cursor-pointer"
                            onClick={() =>
                              onStatusChange?.(topic.id, "Pending")
                            }
                          >
                            Pending
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-xs cursor-pointer"
                            onClick={() =>
                              onStatusChange?.(topic.id, "AI Created")
                            }
                          >
                            AI Created
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap text-center text-xs">
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onGenerate(topic.id)}
                          title="Generate AI Content"
                          className="h-8 w-8 bg-purple-500/10 text-purple-600 hover:bg-purple-500 hover:text-white rounded-lg cursor-pointer transition-colors"
                        >
                          <Sparkles className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onEdit(topic.id)}
                          title="Edit Topic"
                          className="h-8 w-8 bg-blue-500/10 text-blue-600 hover:bg-blue-500 hover:text-white rounded-lg cursor-pointer transition-colors"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleteTargetId(topic.id)}
                          title="Delete Topic"
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

      <AlertDialog
        open={deleteTargetId !== null}
        onOpenChange={(open) => !open && setDeleteTargetId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This topic will be permanently
              deleted.
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
              Yes, delete topic
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={showBulkConfirm}
        onOpenChange={(open) => !open && setShowBulkConfirm(false)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete multiple topics?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the {selectedIds.length} selected
              topics? This action cannot be undone.
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
              Yes, delete {selectedIds.length} topics
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
