"use client";

import { useEffect } from "react";
import { useEditorStore } from "@/store/useEditorStore";

export function KeyboardShortcuts() {
  const {
    comic,
    selectedPanelId,
    selectedElementId,
    removeElement,
    updateElement,
    duplicateElement
  } = useEditorStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      if (!selectedPanelId || !selectedElementId) return;

      const panel = comic.panels.find(p => p.id === selectedPanelId);
      const element = panel?.elements.find(el => el.id === selectedElementId);
      if (!panel || !element) return;

      switch (e.key) {
        case "Backspace":
        case "Delete":
          e.preventDefault();
          removeElement(selectedPanelId, selectedElementId);
          break;

        case "ArrowUp":
          e.preventDefault();
          updateElement(selectedPanelId, selectedElementId, {
            position: { ...element.position, y: element.position.y - (e.shiftKey ? 5 : 1) }
          });
          break;
        case "ArrowDown":
          e.preventDefault();
          updateElement(selectedPanelId, selectedElementId, {
            position: { ...element.position, y: element.position.y + (e.shiftKey ? 5 : 1) }
          });
          break;
        case "ArrowLeft":
          e.preventDefault();
          updateElement(selectedPanelId, selectedElementId, {
            position: { ...element.position, x: element.position.x - (e.shiftKey ? 5 : 1) }
          });
          break;
        case "ArrowRight":
          e.preventDefault();
          updateElement(selectedPanelId, selectedElementId, {
            position: { ...element.position, x: element.position.x + (e.shiftKey ? 5 : 1) }
          });
          break;

        case "d":
        case "D":
          if (e.metaKey || e.ctrlKey) {
            e.preventDefault();
            duplicateElement(selectedPanelId, selectedElementId);
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [comic, selectedPanelId, selectedElementId, removeElement, updateElement, duplicateElement]);

  return null;
}
