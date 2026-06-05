"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { AssetSidebar } from "./AssetSidebar";
import { ComicCanvas } from "./ComicCanvas";
import { PropertiesPanel } from "./PropertiesPanel";
import { EditorHeaderActions } from "./EditorHeaderActions";
import { useEditorStore } from "@/store/useEditorStore";
import templatesData from "@/data/templates.json";
import { Comic } from "@/types";
import { KeyboardShortcuts } from "./KeyboardShortcuts";

export function EditorWorkspace() {
  const searchParams = useSearchParams();
  const setComic = useEditorStore(state => state.setComic);

  useEffect(() => {
    const templateId = searchParams.get('template');
    if (templateId) {
      const template = templatesData.find(t => t.id === templateId);
      if (template) {
        setComic(template.comic as Comic);
      }
    }
  }, [searchParams, setComic]);

  return (
    <>
      <KeyboardShortcuts />
      <EditorHeaderActions />
      <div className="flex h-full w-full">
        <div className="w-80 border-r bg-card flex-shrink-0 flex flex-col">
          <AssetSidebar />
        </div>
        <div className="flex-1 bg-muted/30 overflow-auto relative p-8 flex flex-col items-center">
          <ComicCanvas />
        </div>
        <div className="w-64 border-l bg-card flex-shrink-0 flex flex-col">
          <PropertiesPanel />
        </div>
      </div>
    </>
  );
}
