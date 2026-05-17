"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Eye, Pencil, Trash2, X } from "lucide-react";
import { TemplateCard } from "../template-card/template-card";
import { CreateTemplate } from "../create-template/create-template";

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

interface TemplatesGridProps {
  templates: PostTemplate[];
  onUseTemplate: (template: PostTemplate) => void;
  showAddTemplate: boolean;
  setShowAddTemplate: (show: boolean) => void;
  templateTopic: string;
  setTemplateTopic: (val: string) => void;
  templateTitle: string;
  setTemplateTitle: (val: string) => void;
  templateDescription: string;
  setTemplateDescription: (val: string) => void;
  templateAiPrompt: string;
  setTemplateAiPrompt: (val: string) => void;
  templateHtmlImageTemplate: string;
  setTemplateHtmlImageTemplate: (val: string) => void;
  onSubmitTemplate: (e: React.FormEvent) => void;
  onDeleteTemplate: (id: string) => void;
  onEditTemplate: (template: PostTemplate) => void;
}

export function TemplatesGrid({
  templates,
  onUseTemplate,
  showAddTemplate,
  setShowAddTemplate,
  templateTopic,
  setTemplateTopic,
  templateTitle,
  setTemplateTitle,
  templateDescription,
  setTemplateDescription,
  templateAiPrompt,
  setTemplateAiPrompt,
  templateHtmlImageTemplate,
  setTemplateHtmlImageTemplate,
  onSubmitTemplate,
  onDeleteTemplate,
  onEditTemplate,
}: TemplatesGridProps) {
  const [selectedViewTemplate, setSelectedViewTemplate] =
    useState<PostTemplate | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-[16px] text-muted-foreground">
          Save structures to quickly reuse high-performance formats.
        </p>
        <Button
          onClick={() => setShowAddTemplate(!showAddTemplate)}
          className="h-10 text-sm px-4 bg-purple-600 hover:bg-purple-500 text-white font-semibold gap-1.5 shadow-lg shadow-purple-600/10 transition-all active:scale-[0.98]"
        >
          {showAddTemplate ? "Collapse Editor" : "Create New Template"}
        </Button>
      </div>

      {/* Inline template creator */}
      {showAddTemplate && (
        <CreateTemplate
          templateTitle={templateTitle}
          setTemplateTitle={setTemplateTitle}
          templateTopic={templateTopic}
          setTemplateTopic={setTemplateTopic}
          templateDescription={templateDescription}
          setTemplateDescription={setTemplateDescription}
          templateAiPrompt={templateAiPrompt}
          setTemplateAiPrompt={setTemplateAiPrompt}
          templateHtmlImageTemplate={templateHtmlImageTemplate}
          setTemplateHtmlImageTemplate={setTemplateHtmlImageTemplate}
          onSubmitTemplate={onSubmitTemplate}
          onCancel={() => setShowAddTemplate(false)}
        />
      )}

      {/* Grid display of templates cards */}
      {!showAddTemplate && (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {templates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onUseTemplate={onUseTemplate}
              onDeleteTemplate={onDeleteTemplate}
              onEditTemplate={onEditTemplate}
              onViewTemplate={setSelectedViewTemplate}
            />
          ))}
        </div>
      )}

      {/* View Template Modal Overlay */}
      {selectedViewTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
          <div
            className="fixed inset-0 cursor-pointer"
            onClick={() => setSelectedViewTemplate(null)}
          />
          <Card className="relative w-full max-w-xl bg-card border border-border/40 backdrop-blur-xl shadow-2xl overflow-hidden rounded-2xl animate-in zoom-in-95 duration-200 z-10 max-h-[90vh] flex flex-col">
            {selectedViewTemplate.image && (
              <div className="relative w-full h-40 rounded-t-2xl overflow-hidden border-b border-border/10 shrink-0">
                <img
                  src={selectedViewTemplate.image}
                  alt={selectedViewTemplate.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-background/80 to-transparent pointer-events-none" />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedViewTemplate(null)}
                  className="absolute top-4 right-4 h-8 w-8 rounded-full bg-black/35 hover:bg-black/50 text-white border border-white/10 backdrop-blur-md cursor-pointer transition-all active:scale-90"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}

            <CardHeader className="pb-2 relative shrink-0">
              {!selectedViewTemplate.image && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedViewTemplate(null)}
                  className="absolute top-4 right-4 h-8 w-8 rounded-full hover:bg-secondary text-muted-foreground cursor-pointer transition-all active:scale-90"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
              <div className="flex justify-between items-start">
                <span className="inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/10 text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                  {selectedViewTemplate.topic ||
                    selectedViewTemplate.category ||
                    "General"}
                </span>
              </div>
              <CardTitle className="text-base font-bold mt-2">
                {selectedViewTemplate.title}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4 pt-2 pb-6 overflow-y-auto flex-1 px-6">
              {/* Description */}
              {(selectedViewTemplate.description ||
                selectedViewTemplate.content) && (
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-purple-500/80 tracking-wider">
                    Description
                  </span>
                  <p className="text-xs text-foreground leading-relaxed whitespace-pre-wrap">
                    {selectedViewTemplate.description ||
                      selectedViewTemplate.content}
                  </p>
                </div>
              )}

              {/* AI Prompt */}
              {selectedViewTemplate.aiPrompt && (
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-purple-500/80 tracking-wider">
                    System Prompt Instruction
                  </span>
                  <div className="bg-secondary/15 dark:bg-black/20 border border-border/30 rounded-xl p-3 max-h-32 overflow-y-auto">
                    <pre className="text-[11px] font-mono text-muted-foreground whitespace-pre-wrap select-all leading-normal">
                      {selectedViewTemplate.aiPrompt}
                    </pre>
                  </div>
                </div>
              )}

              {/* HTML Image Template Live Render */}
              {selectedViewTemplate.htmlImageTemplate && (
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-purple-500/80 tracking-wider">
                    HTML Image Template Preview
                  </span>
                  <div className="w-full h-48 bg-white rounded-xl border border-border/30 overflow-hidden shadow-sm relative">
                    <iframe
                      title="HTML Template View"
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
                            ${selectedViewTemplate.htmlImageTemplate}
                          </body>
                        </html>
                      `}
                      className="w-full h-full border-none"
                    />
                  </div>
                </div>
              )}

              {/* Use & Close Action Footer inside Content to prevent overflow */}
              <div className="flex gap-3 justify-end pt-4 border-t border-border/10">
                <Button
                  variant="outline"
                  onClick={() => setSelectedViewTemplate(null)}
                  className="h-10 text-sm border-border/40 hover:bg-secondary cursor-pointer rounded-lg px-4"
                >
                  Close
                </Button>
                <Button
                  onClick={() => {
                    onUseTemplate(selectedViewTemplate);
                    setSelectedViewTemplate(null);
                  }}
                  className="h-10 text-sm bg-purple-600 hover:bg-purple-500 text-white font-semibold shadow-md shadow-purple-600/10 cursor-pointer rounded-lg gap-1.5 px-4 animate-pulse-subtle"
                >
                  <Copy className="h-3.5 w-3.5" />
                  Use Format
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
