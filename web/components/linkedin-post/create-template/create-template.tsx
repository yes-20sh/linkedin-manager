"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Eye } from "lucide-react";
import { TemplatePreview } from "../template-preview/template-preview";

interface CreateTemplateProps {
  templateTitle: string;
  setTemplateTitle: (val: string) => void;
  templateTopic: string;
  setTemplateTopic: (val: string) => void;
  templateDescription: string;
  setTemplateDescription: (val: string) => void;
  templateAiPrompt: string;
  setTemplateAiPrompt: (val: string) => void;
  templateHtmlImageTemplate: string;
  setTemplateHtmlImageTemplate: (val: string) => void;
  onSubmitTemplate: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export function CreateTemplate({
  templateTitle,
  setTemplateTitle,
  templateTopic,
  setTemplateTopic,
  templateDescription,
  setTemplateDescription,
  templateAiPrompt,
  setTemplateAiPrompt,
  templateHtmlImageTemplate,
  setTemplateHtmlImageTemplate,
  onSubmitTemplate,
  onCancel,
}: CreateTemplateProps) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  return (
    <>
      <Card className="bg-card border-border shadow-xs animate-in slide-in-from-top-2 duration-200">
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            New Template
          </CardTitle>
        </CardHeader>
        <CardContent className="border-t border-border/20 p-4 space-y-4">
          <form onSubmit={onSubmitTemplate} className="space-y-4">
            {/* Topic & Title Row */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="t_topic" className="text-xs font-semibold">
                  Topic
                </Label>
                <Input
                  id="t_topic"
                  placeholder="e.g. Thought Leadership"
                  value={templateTopic}
                  onChange={(e) => setTemplateTopic(e.target.value)}
                  className="h-10 bg-background border-border text-xs sm:text-sm placeholder:text-muted-foreground rounded-lg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="t_title" className="text-xs font-semibold">
                  Title
                </Label>
                <Input
                  id="t_title"
                  placeholder="e.g. Industry Hook Format"
                  value={templateTitle}
                  onChange={(e) => setTemplateTitle(e.target.value)}
                  className="h-10 bg-background border-border text-xs sm:text-sm placeholder:text-muted-foreground rounded-lg"
                />
              </div>
            </div>

            {/* Description Row */}
            <div className="space-y-2">
              <Label htmlFor="t_description" className="text-xs font-semibold">
                Description
              </Label>
              <Textarea
                id="t_description"
                rows={3}
                placeholder="Brief explanation of when and how to use this template..."
                value={templateDescription}
                onChange={(e) => setTemplateDescription(e.target.value)}
                className="bg-background border-border text-xs sm:text-sm min-h-[70px] max-h-[320px] rounded-lg"
              />
            </div>

            {/* AI Prompt Row */}
            <div className="space-y-2">
              <Label htmlFor="t_aiPrompt" className="text-xs font-semibold">
                System Prompt Instruction
              </Label>
              <Textarea
                id="t_aiPrompt"
                rows={3}
                placeholder="Instructions or prompt context to generate posts using this template..."
                value={templateAiPrompt}
                onChange={(e) => setTemplateAiPrompt(e.target.value)}
                className="bg-background border-border text-xs sm:text-sm min-h-[70px] max-h-[320px] rounded-lg font-mono"
              />
            </div>

            {/* HTML Image Template Row */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="t_html" className="text-xs font-semibold">
                  HTML Image Template
                </Label>
                <Button
                  type="button"
                  variant="outline"
                  size="default"
                  disabled={!templateHtmlImageTemplate.trim()}
                  onClick={() => setIsPreviewOpen(true)}
                  className="h-10 text-sm gap-1.5 px-4 hover:bg-indigo-500/10 hover:text-indigo-600 border-indigo-500/20 text-muted-foreground cursor-pointer transition-all active:scale-[0.98] rounded-lg"
                >
                  <Eye className="h-4 w-4" />
                  Preview Template
                </Button>
              </div>
              <Textarea
                id="t_html"
                rows={4}
                placeholder="<div style='padding: 24px; background: linear-gradient(135deg, #6366f1, #a855f7); color: white; border-radius: 12px; height: 100%; display: flex; flex-direction: column; justify-content: center;'><h2>Template Title</h2><p>Template Body</p></div>"
                value={templateHtmlImageTemplate}
                onChange={(e) => setTemplateHtmlImageTemplate(e.target.value)}
                className="bg-background border-border text-xs sm:text-sm min-h-[90px] max-h-[320px] rounded-lg font-mono"
              />
            </div>

            {/* Form Actions */}
            <div className="flex gap-3 justify-end pt-2">
              <Button
                type="button"
                variant="ghost"
                onClick={onCancel}
                className="h-10 text-sm px-4 text-muted-foreground hover:text-foreground cursor-pointer rounded-lg"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="h-10 text-sm px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-md shadow-indigo-600/10 cursor-pointer rounded-lg"
              >
                Add Template
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <TemplatePreview
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        htmlContent={templateHtmlImageTemplate}
      />
    </>
  );
}
