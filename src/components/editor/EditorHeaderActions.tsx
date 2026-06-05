"use client";

import { useEditorStore } from "@/store/useEditorStore";
import { Button } from "@/components/ui/button";
import { Trash2, Download } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { toPng, toJpeg } from "html-to-image";
import { saveAs } from "file-saver";

export function EditorHeaderActions() {
  const { comic, updateComicTitle, selectedPanelId, removePanel, selectPanel, selectElement } = useEditorStore();
  const [mounted, setMounted] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleExport = async (format: 'png' | 'jpg') => {
    // 1. Deselect everything to hide selection outlines
    selectPanel(null);
    selectElement(null);

    // 2. Small delay to ensure React state updates and selection outlines disappear
    await new Promise((resolve) => setTimeout(resolve, 100));

    const exportNode = document.getElementById("comic-export-area");
    if (!exportNode) return;

    setIsExporting(true);

    try {
      // Configuration for high quality
      const config = {
        quality: 1,
        pixelRatio: 2, // High resolution
        backgroundColor: '#ffffff'
      };

      let dataUrl = '';
      if (format === 'png') {
        dataUrl = await toPng(exportNode, config);
      } else {
        dataUrl = await toJpeg(exportNode, config);
      }

      const fileName = `${comic.title.replace(/\s+/g, '-').toLowerCase()}.${format}`;
      saveAs(dataUrl, fileName);

    } catch (error) {
      console.error("Export failed:", error);
      alert("Failed to export comic. Check console for details.");
    } finally {
      setIsExporting(false);
    }
  };

  const content = (
    <>
      <input
        value={comic.title}
        onChange={(e) => updateComicTitle(e.target.value)}
        className="bg-transparent border-none outline-none font-bangers text-xl text-center w-64 text-foreground placeholder:text-muted-foreground focus:ring-1 focus:ring-primary rounded px-2"
        placeholder="Comic Title"
      />
      <div className="flex items-center gap-2 ml-4">
        {selectedPanelId && (
          <Button
            variant="destructive"
            size="sm"
            onClick={() => removePanel(selectedPanelId)}
            className="gap-2"
            disabled={isExporting}
          >
            <Trash2 className="w-4 h-4" /> Remove Panel
          </Button>
        )}
        <Button
          variant="default"
          size="sm"
          onClick={() => handleExport('png')}
          className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2 font-bold"
          disabled={isExporting}
        >
          <Download className="w-4 h-4" /> Export PNG
        </Button>
      </div>
    </>
  );

  if (!mounted) return null;

  const headerActionsContainer = document.getElementById("editor-header-actions");
  if (!headerActionsContainer) return null;

  return createPortal(content, headerActionsContainer);
}
