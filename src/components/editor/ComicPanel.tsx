"use client";

import { useEditorStore } from "@/store/useEditorStore";
import { Panel } from "@/types";
import { cn } from "@/lib/utils";
import { PanelElementNode } from "./PanelElementNode";

interface ComicPanelProps {
  panel: Panel;
}

export function ComicPanel({ panel }: ComicPanelProps) {
  const { selectedPanelId, selectPanel, selectElement } = useEditorStore();
  const isSelected = selectedPanelId === panel.id;

  return (
    <div
      id={`panel-${panel.id}`}
      onClick={() => {
        // e.stopPropagation();
        selectPanel(panel.id);
        selectElement(null); // Deselect elements when clicking the panel background
      }}
      className={cn(
        "relative w-full aspect-[4/3] bg-white border-4 border-black overflow-hidden transition-all group comic-paper-texture",
        isSelected && "ring-4 ring-primary ring-offset-2 ring-offset-white z-10"
      )}
    >
      <div className="absolute inset-0 w-full h-full">
        {panel.elements.map(element => (
          <PanelElementNode key={element.id} element={element} panelId={panel.id} />
        ))}
      </div>

      <div className="absolute top-2 left-2 bg-black text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-sm pointer-events-none z-50">
        {panel.order + 1}
      </div>
    </div>
  );
}
