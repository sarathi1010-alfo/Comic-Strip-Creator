"use client";

import { useEditorStore } from "@/store/useEditorStore";
import { Copy, Trash2, BringToFront, SendToBack, FlipHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export function PropertiesPanel() {
  const {
    comic,
    selectedPanelId,
    selectedElementId,
    updateElement,
    removeElement,
    bringForward,
    sendBackward,
    duplicateElement
  } = useEditorStore();

  const selectedPanel = comic.panels.find(p => p.id === selectedPanelId);
  const selectedElement = selectedPanel?.elements.find(e => e.id === selectedElementId);

  if (!selectedPanelId) {
    return (
      <div className="p-4 text-center text-muted-foreground flex flex-col items-center justify-center h-full">
        <p>Select a panel to edit.</p>
      </div>
    );
  }

  if (!selectedElement) {
    return (
      <div className="p-4 text-center text-muted-foreground flex flex-col items-center justify-center h-full">
        <p>Select an element inside the panel to see properties.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <h2 className="font-bangers text-xl text-primary tracking-wide">Properties</h2>
      </div>

      <div className="p-4 flex-1 overflow-y-auto space-y-6">
        <div className="space-y-2">
          <Label>Type</Label>
          <div className="text-sm font-medium capitalize bg-muted p-2 rounded-md">
            {selectedElement.type}
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-sm font-medium">Actions</h3>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full flex items-center gap-2"
              onClick={() => bringForward(selectedPanelId, selectedElement.id)}
            >
              <BringToFront className="w-4 h-4" /> Forward
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full flex items-center gap-2"
              onClick={() => sendBackward(selectedPanelId, selectedElement.id)}
            >
              <SendToBack className="w-4 h-4" /> Backward
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full flex items-center gap-2"
              onClick={() => updateElement(selectedPanelId, selectedElement.id, { flipX: !selectedElement.flipX })}
            >
              <FlipHorizontal className="w-4 h-4" /> Flip X
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full flex items-center gap-2"
              onClick={() => duplicateElement(selectedPanelId, selectedElement.id)}
            >
              <Copy className="w-4 h-4" /> Duplicate
            </Button>
            <Button
              variant="destructive"
              size="sm"
              className="w-full flex items-center gap-2 col-span-2"
              onClick={() => removeElement(selectedPanelId, selectedElement.id)}
            >
              <Trash2 className="w-4 h-4" /> Delete
            </Button>
          </div>
        </div>

        {selectedElement.type === 'bubble' && (
          <>
            <Separator />
            <div className="space-y-2">
              <Label>Text content</Label>
              <Input
                value={selectedElement.text || ''}
                onChange={(e) => updateElement(selectedPanelId, selectedElement.id, { text: e.target.value })}
                className="font-comic"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
