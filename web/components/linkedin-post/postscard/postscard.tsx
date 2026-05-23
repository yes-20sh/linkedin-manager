import Image from "next/image";
import { Card } from "@/components/ui/card";
import { ExternalLink, Trash2, Eye, Pencil, ChevronDown } from "lucide-react";
import { SharedPost } from "../shared-history/shared-history";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface PostsCardProps {
  post: SharedPost;
  onDelete?: (id: string) => void;
  onStatusChange?: (id: string, status: "Pending" | "Ready") => void;
  onEdit?: (id: string) => void;
  onView?: (id: string) => void;
}

export function PostsCard({
  post,
  onDelete,
  onStatusChange,
  onEdit,
  onView,
}: PostsCardProps) {
  return (
    <Card className="relative rounded-sm overflow-hidden transition-all hover:shadow-md bg-white dark:bg-zinc-900 p-4 flex flex-col gap-4">
      <div className="flex justify-between items-start gap-4">
        {post.status && onStatusChange ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              <span
                className={`inline-flex items-center text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider cursor-pointer transition-colors ${
                  post.status === "Ready"
                    ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 dark:text-emerald-400"
                    : "bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 dark:text-amber-400"
                }`}
              >
                {post.status} <ChevronDown className="h-3 w-3 ml-1" />
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="min-w-[120px]">
              <DropdownMenuItem
                className="text-xs cursor-pointer"
                onClick={() => onStatusChange(post.id, "Pending")}
              >
                Pending
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-xs cursor-pointer"
                onClick={() => onStatusChange(post.id, "Ready")}
              >
                Ready
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <span className="inline-flex items-center text-[10px] font-semibold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 px-2.5 py-1 rounded-full uppercase tracking-wider">
            {post.topic || "General"}
          </span>
        )}
      </div>

      <div className="flex-1 space-y-2">
        <p
          className="text-sm font-bold text-foreground line-clamp-2"
          title={post.title}
        >
          {post.title}
        </p>
        <p
          className="text-xs text-muted-foreground line-clamp-3"
          title={post.content}
        >
          {post.content}
        </p>
        {post.imageUrl && (
          <div className="relative w-full h-50 overflow-hidden bg-muted border border-border/50 mt-3 shrink-0">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-border/10 mt-auto">
        <span className="text-xs text-foreground font-semibold">
          {post.time}
        </span>
        <div className="flex items-center gap-2">
          {onView && (
            <button
              onClick={() => onView(post.id)}
              className="p-1.5 bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 rounded-md transition-colors"
              title="View"
            >
              <Eye className="h-4 w-4" />
            </button>
          )}
          {onEdit && (
            <button
              onClick={() => onEdit(post.id)}
              className="p-1.5 bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 rounded-md transition-colors"
              title="Edit"
            >
              <Pencil className="h-4 w-4" />
            </button>
          )}
          {post.link && !onView && !onEdit && (
            <a
              href={post.link}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 bg-indigo-500/10 text-indigo-600 hover:bg-indigo-500/20 rounded-md transition-colors"
              title="View Post"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
          <button
            onClick={() => onDelete?.(post.id)}
            className="p-1.5 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-md transition-colors"
            title="Delete Post"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </Card>
  );
}
