"use client";

import { useState, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEditorStore } from "@/store/useEditorStore";
import charactersData from "@/data/characters.json";
import scenesData from "@/data/scenes.json";
import propsData from "@/data/props.json";
import bubblesData from "@/data/bubbles.json";
import { ElementType, Size } from "@/types";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";

export function AssetSidebar() {
  const [activeTab, setActiveTab] = useState<ElementType | "uploads">("character");
  const [uploadType, setUploadType] = useState<ElementType>("character");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addElement, selectedPanelId, customAssets, addCustomAsset } = useEditorStore();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      addCustomAsset({
        id: uuidv4(),
        name: file.name,
        src: dataUrl,
        type: uploadType,
        defaultSize: { width: 100, height: 100 }
      });
    };
    reader.readAsDataURL(file);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAddAsset = (asset: {id: string; defaultSize?: Size; [key: string]: unknown}) => {
    if (!selectedPanelId) {
      alert("Please select a panel first to add an asset!");
      return;
    }

    const defaultSize = asset.defaultSize || { width: 100, height: 100 };
    // Add mostly to the center
    const initialPos = { x: 50, y: 50 };
    const resolvedType = 'type' in asset ? (asset.type as ElementType) : (activeTab as ElementType);
    addElement(selectedPanelId, asset.id, resolvedType, defaultSize, initialPos);
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
        <Tabs defaultValue="character" onValueChange={(v) => setActiveTab(v as ElementType | "uploads")}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="character" className="text-xs">Chars</TabsTrigger>
            <TabsTrigger value="scene" className="text-xs">Scenes</TabsTrigger>
            <TabsTrigger value="prop" className="text-xs">Props</TabsTrigger>
            <TabsTrigger value="bubble" className="text-xs">Text</TabsTrigger>
            <TabsTrigger value="uploads" className="text-xs">Uploads</TabsTrigger>
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
          <TabsContent value="uploads" className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 mt-4 bg-muted/50 p-3 rounded-md border border-border">
              <label className="text-xs font-semibold text-foreground">Upload New Asset</label>
              <select
                value={uploadType}
                onChange={(e) => setUploadType(e.target.value as ElementType)}
                className="bg-background text-foreground text-xs p-1.5 rounded border border-border"
              >
                <option value="character">Character</option>
                <option value="scene">Scene</option>
                <option value="prop">Prop</option>
                <option value="bubble">Bubble</option>
              </select>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileUpload}
                className="hidden"
              />
              <Button size="sm" onClick={() => fileInputRef.current?.click()}>
                Select File
              </Button>
            </div>
            {customAssets.length === 0 ? (
              <p className="text-xs text-center text-muted-foreground mt-4">No custom assets yet.</p>
            ) : (
              renderGrid(customAssets)
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
