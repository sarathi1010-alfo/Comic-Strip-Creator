"use client";

import { useEditorStore } from "@/store/useEditorStore";
import { Button } from "@/components/ui/button";
import { Trash2, Download, LayoutTemplate, AlignVerticalSpaceAround, FileText, Code } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { toPng } from "html-to-image";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";

export function EditorHeaderActions() {
  const { comic, updateComicTitle, selectedPanelId, removePanel, selectPanel, selectElement, applyLayoutPreset, distributeEvenly } = useEditorStore();
  const [mounted, setMounted] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleExport = async (format: 'png' | 'pdf' | 'html') => {
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

      if (format === 'png') {
        const dataUrl = await toPng(exportNode, config);
        const fileName = `${comic.title.replace(/\s+/g, '-').toLowerCase()}.${format}`;
        saveAs(dataUrl, fileName);
      } else if (format === 'pdf') {
        const dataUrl = await toPng(exportNode, config);
        const fileName = `${comic.title.replace(/\s+/g, '-').toLowerCase()}.pdf`;
        const doc = new jsPDF({ orientation: 'landscape' });

        // Wait for image to load to get dimensions
        const img = new Image();
        img.src = dataUrl;
        await new Promise((resolve) => {
          img.onload = resolve;
        });

        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = (img.height * pdfWidth) / img.width;
        doc.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
        doc.save(fileName);
      } else if (format === 'html') {
        const fileName = `${comic.title.replace(/\s+/g, '-').toLowerCase()}.html`;

        let htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${comic.title}</title>
  <style>
    body { font-family: sans-serif; background: #0F172A; color: white; display: flex; flex-direction: column; align-items: center; padding: 2rem; gap: 2rem; }
    .panel { max-width: 100%; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5); }
    img { max-width: 100%; height: auto; border: 4px solid black; background: white; }
    h1 { font-family: 'Comic Sans MS', cursive, sans-serif; text-transform: uppercase; letter-spacing: 2px; }
  </style>
</head>
<body>
  <h1>${comic.title}</h1>
`;

        for (const panel of comic.panels) {
          const panelNode = document.getElementById(`panel-${panel.id}`);
          if (panelNode) {
            const panelDataUrl = await toPng(panelNode, config);
            htmlContent += `  <div class="panel"><img src="${panelDataUrl}" alt="Comic Panel" /></div>\n`;
          }
        }

        htmlContent += `
</body>
</html>
`;
        const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8" });
        saveAs(blob, fileName);
      }

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
        <div className="flex items-center gap-1 border-r border-border pr-2 mr-2">
          <Button variant="outline" size="sm" onClick={() => applyLayoutPreset('vertical')} title="Vertical Layout" className="w-8 h-8 p-0" disabled={isExporting}>
            <LayoutTemplate className="w-4 h-4 rotate-90" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => applyLayoutPreset('classic')} title="Classic Strip Layout" className="w-8 h-8 p-0" disabled={isExporting}>
            <LayoutTemplate className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => applyLayoutPreset('hero')} title="Hero Layout" className="w-8 h-8 p-0" disabled={isExporting}>
            <LayoutTemplate className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => applyLayoutPreset('grid')} title="Grid Layout" className="w-8 h-8 p-0" disabled={isExporting}>
            <LayoutTemplate className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={distributeEvenly} title="Distribute Evenly" className="w-8 h-8 p-0" disabled={isExporting}>
            <AlignVerticalSpaceAround className="w-4 h-4" />
          </Button>
        </div>
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
          <Download className="w-4 h-4" /> PNG
        </Button>
        <Button
          variant="default"
          size="sm"
          onClick={() => handleExport('pdf')}
          className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2 font-bold"
          disabled={isExporting}
        >
          <FileText className="w-4 h-4" /> PDF
        </Button>
        <Button
          variant="default"
          size="sm"
          onClick={() => handleExport('html')}
          className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2 font-bold"
          disabled={isExporting}
        >
          <Code className="w-4 h-4" /> HTML
        </Button>
      </div>
    </>
  );

  if (!mounted) return null;

  const headerActionsContainer = document.getElementById("editor-header-actions");
  if (!headerActionsContainer) return null;

  return createPortal(content, headerActionsContainer);
}
