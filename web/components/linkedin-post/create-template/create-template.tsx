"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Eye, X } from "lucide-react";

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
      <Card className="bg-card/25 border-border/40 backdrop-blur-sm shadow-xs animate-in slide-in-from-top-2 duration-200">
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
                  className="h-10 bg-secondary/10 border-border/40 text-xs sm:text-sm placeholder:text-muted-foreground/60 rounded-lg"
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
                  className="h-10 bg-secondary/10 border-border/40 text-xs sm:text-sm placeholder:text-muted-foreground/60 rounded-lg"
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
                className="bg-secondary/10 border-border/40 text-xs sm:text-sm min-h-[70px] rounded-lg"
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
                className="bg-secondary/10 border-border/40 text-xs sm:text-sm min-h-[70px] rounded-lg font-mono"
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
                  className="h-10 text-sm gap-1.5 px-4 hover:bg-purple-500/10 hover:text-purple-600 border-purple-500/20 text-muted-foreground cursor-pointer transition-all active:scale-[0.98] rounded-lg"
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
                className="bg-secondary/10 border-border/40 text-xs sm:text-sm min-h-[90px] rounded-lg font-mono"
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
                className="h-10 text-sm px-4 bg-purple-600 hover:bg-purple-500 text-white font-semibold shadow-md shadow-purple-600/10 cursor-pointer rounded-lg"
              >
                Add Template
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Dynamic Template Render Preview Modal */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
          <div
            className="fixed inset-0 cursor-pointer"
            onClick={() => setIsPreviewOpen(false)}
          />
          <Card className="relative w-full max-w-2xl bg-card border border-border/40 shadow-2xl overflow-hidden rounded-2xl animate-in zoom-in-95 duration-200 z-10 flex flex-col h-[500px]">
            <CardHeader className="pb-2 border-b border-border/10 flex flex-row items-center justify-between shrink-0">
              <CardTitle className="text-sm font-bold flex items-center gap-1.5">
                <Eye className="h-4 w-4 text-purple-500" />
                HTML Image Template Preview
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsPreviewOpen(false)}
                className="h-8 w-8 rounded-full text-muted-foreground hover:bg-secondary cursor-pointer transition-all active:scale-90"
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="flex-1 p-6 bg-secondary/5 overflow-hidden flex flex-col justify-center items-center">
              <div className="w-full h-full max-h-[360px] bg-white rounded-xl border border-border/40 shadow-md overflow-hidden relative">
                <iframe
                  title="HTML Template Preview"
                  srcDoc={`
                    <!DOCTYPE html>
                    <html>
                      <head>
                        <meta charset="utf-8">
                        <style>
                          body, html { margin: 0; padding: 0; width: 100%; height: 100%; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; overflow: hidden; }
                        </style>
                      </head>
                      <body>
                        ${templateHtmlImageTemplate}
                      </body>
                    </html>
                  `}
                  className="w-full h-full border-none"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
