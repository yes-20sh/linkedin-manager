"use client";

import React from "react";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash2 } from "lucide-react";

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

interface TemplateCardProps {
  template: PostTemplate;
  onUseTemplate: (template: PostTemplate) => void;
  onDeleteTemplate: (id: string) => void;
  onEditTemplate: (template: PostTemplate) => void;
  onViewTemplate: (template: PostTemplate) => void;
}

export function TemplateCard({
  template,
  onUseTemplate,
  onDeleteTemplate,
  onEditTemplate,
  onViewTemplate,
}: TemplateCardProps) {
  return (
    <Card className="bg-card/25 border-border/40 backdrop-blur-sm hover:border-purple-600/40 hover:shadow-[0_0_15px_rgba(147,51,234,0.06)] relative overflow-hidden group transition-all duration-300 flex flex-col justify-between p-2 rounded-2xl">
      {template.image && (
        <div className="relative w-full aspect-square overflow-hidden rounded-xl border border-border/10 shrink-0">
          <img
            src={template.image}
            alt={template.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}

      <div className="flex-1 flex flex-col px-3 pb-3 space-y-3 justify-between">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="inline-flex px-2 py-0.5 rounded-full text-[9px] font-bold bg-purple-500/10 text-purple-600 uppercase tracking-wider">
              {template.topic || template.category || "General"}
            </span>

            {/* Use Count */}
            <span className="text-[10px] text-muted-foreground/80 font-semibold bg-secondary/20 px-2 py-0.5 rounded-full flex items-center gap-1 select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
              {template.uses || 0} uses
            </span>
          </div>

          <CardTitle className="text-sm font-semibold group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-1">
            {template.title}
          </CardTitle>

          <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
            {template.description || template.content}
          </p>
        </div>

        {/* Bottom Actions Row */}
        <div className="flex items-center justify-end gap-2 pt-2.5 border-t border-border/10 mt-auto">
          <Button
            size="icon"
            onClick={() => onViewTemplate(template)}
            className="h-8 w-8 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 hover:bg-purple-500/20 cursor-pointer transition-colors"
            title="View Template"
          >
            <Eye className="h-3.5 w-3.5" />
          </Button>

          <Button
            size="icon"
            onClick={() => onEditTemplate(template)}
            className="h-8 w-8 rounded-lg bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 cursor-pointer transition-colors"
            title="Edit Template"
          >
            <Pencil className="h-3.5 w-3.5" />
          </Button>

          <Button
            size="icon"
            onClick={() => onDeleteTemplate(template.id)}
            className="h-8 w-8 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 cursor-pointer transition-colors"
            title="Delete Template"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
