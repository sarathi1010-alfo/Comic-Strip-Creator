"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEditorStore } from "@/store/useEditorStore";
import charactersData from "@/data/characters.json";
import scenesData from "@/data/scenes.json";
import propsData from "@/data/props.json";
import bubblesData from "@/data/bubbles.json";
import { ElementType, Size } from "@/types";

export function AssetSidebar() {
  const [activeTab, setActiveTab] = useState<ElementType>("character");
  const { addElement, selectedPanelId } = useEditorStore();

  const handleAddAsset = (asset: {id: string; defaultSize?: Size; [key: string]: unknown}) => {
    if (!selectedPanelId) {
      alert("Please select a panel first to add an asset!");
      return;
    }

    const defaultSize = asset.defaultSize || { width: 100, height: 100 };
    // Add mostly to the center
    const initialPos = { x: 50, y: 50 };
    addElement(selectedPanelId, asset.id, activeTab, defaultSize, initialPos);
  };

  const renderGrid = (items: {id: string; name: string; src: string; defaultSize?: Size; [key: string]: unknown}[]) => (
    <div className="grid grid-cols-2 gap-2 mt-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="bg-muted p-2 rounded-md cursor-pointer hover:bg-accent/20 border border-transparent hover:border-accent flex flex-col items-center justify-center aspect-square transition-all"
          onClick={() => handleAddAsset(item)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.src}
            alt={item.name}
            className="w-16 h-16 object-contain pointer-events-none"
            draggable={false}
          />
          <span className="text-xs mt-2 text-center text-muted-foreground font-medium">
            {item.name}
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <h2 className="font-bangers text-xl text-primary tracking-wide">Assets</h2>
      </div>
      <div className="p-4 flex-1 overflow-y-auto">
        <Tabs defaultValue="character" onValueChange={(v) => setActiveTab(v as ElementType)}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="character" className="text-xs">Chars</TabsTrigger>
            <TabsTrigger value="scene" className="text-xs">Scenes</TabsTrigger>
            <TabsTrigger value="prop" className="text-xs">Props</TabsTrigger>
            <TabsTrigger value="bubble" className="text-xs">Text</TabsTrigger>
          </TabsList>

          <TabsContent value="character">
            {renderGrid(charactersData)}
          </TabsContent>
          <TabsContent value="scene">
            {renderGrid(scenesData)}
          </TabsContent>
          <TabsContent value="prop">
            {renderGrid(propsData)}
          </TabsContent>
          <TabsContent value="bubble">
            {renderGrid(bubblesData)}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
