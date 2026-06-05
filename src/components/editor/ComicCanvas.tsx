"use client";

import { useCallback } from "react";
import { useEditorStore } from "@/store/useEditorStore";
import { ComicPanel } from "./ComicPanel";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DndContext, DragEndEvent, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";


export function ComicCanvas() {
  const { comic, addPanel, selectPanel, selectElement, updateElement,  } = useEditorStore();


  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5, // Require 5px movement before drag starts (allows clicks to work)
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, delta } = event;

    // We only handle dragging elements inside panels for now, not sorting panels
    if (active.data.current?.type === "element") {
      const elementId = active.data.current.elementId;
      const panelId = active.data.current.panelId;

      // Find the element to get its current percentage position
      const panel = comic.panels.find(p => p.id === panelId);
      const element = panel?.elements.find(e => e.id === elementId);

      if (!element || !panel) return;

      // Convert delta pixel movement to percentage movement
      // Assuming a standard panel width of 800px and height 600px for ratio
      // In reality, we'd measure the panel DOM node, but let's approximate based on aspect ratio
      const panelNode = document.querySelector(`[id="panel-${panelId}"]`);
      if (panelNode) {
        const rect = panelNode.getBoundingClientRect();
        const percentXMove = (delta.x / rect.width) * 100;
        const percentYMove = (delta.y / rect.height) * 100;

        updateElement(panelId, elementId, {
          position: {
            x: Math.max(0, Math.min(100, element.position.x + percentXMove)),
            y: Math.max(0, Math.min(100, element.position.y + percentYMove)),
          }
        });
      }
    }
  }, [comic, updateElement]);

  const handleCanvasClick = (e: React.MouseEvent) => {
    // If they click on the blank canvas area, deselect things
    if (e.target === e.currentTarget) {
      selectPanel(null);
      selectElement(null);
    }
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div
        className="w-full max-w-3xl pb-32 flex flex-col items-center gap-6"
        onClick={handleCanvasClick}
      >
        <div className="w-full bg-white p-6 shadow-2xl space-y-6" id="comic-export-area">
          <h1 className="text-3xl font-bangers text-black text-center mb-8 uppercase tracking-widest border-b-4 border-black pb-4">
            {comic.title}
          </h1>

          <div className="grid grid-cols-1 gap-6 w-full max-w-xl mx-auto">
            {comic.panels.map(panel => (
              <ComicPanel key={panel.id} panel={panel} />
            ))}
          </div>
        </div>

        <Button
          onClick={addPanel}
          size="lg"
          className="rounded-full shadow-lg h-14 px-8 text-lg font-bold gap-2"
        >
          <Plus className="w-6 h-6" /> Add Panel
        </Button>
      </div>
    </DndContext>
  );
}
