import React, { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

function ShadowDomRenderer({ htmlContent }: { htmlContent: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      let root = containerRef.current.shadowRoot;
      if (!root) {
        root = containerRef.current.attachShadow({ mode: "open" });
      }
      // Inject the HTML safely encapsulated inside the shadow root
      root.innerHTML = htmlContent;
    }
  }, [htmlContent]);

  return (
    <div
      ref={containerRef}
      className="w-full flex flex-col items-center"
      style={{ padding: "60px 0", zoom: 0.35 }}
    />
  );
}

interface TemplatePreviewProps {
  isOpen: boolean;
  onClose: () => void;
  htmlContent: string;
}

export function TemplatePreview({
  isOpen,
  onClose,
  htmlContent,
}: TemplatePreviewProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/95 animate-in fade-in duration-200">
      <div className="fixed inset-0 cursor-pointer" onClick={onClose} />
      <Card className="relative w-full max-w-2xl bg-card border-border shadow-2xl rounded-sm animate-in zoom-in-95 duration-200 z-10 flex flex-col h-[500px]">
        <CardHeader className="border-b border-border/10 flex flex-row items-center justify-between shrink-0">
          <CardTitle className="text-sm font-bold flex items-center gap-1.5">
            HTML Image Template Preview
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 rounded-full text-muted-foreground hover:bg-secondary cursor-pointer transition-all active:scale-90"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="flex-1 p-0  overflow-auto relative">
          <ShadowDomRenderer htmlContent={htmlContent} />
        </CardContent>
      </Card>
    </div>
  );
}
