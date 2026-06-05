"use client";

import { useEditorStore } from "@/store/useEditorStore";
import { PanelElement } from "@/types";
import { useDraggable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import charactersData from "@/data/characters.json";
import scenesData from "@/data/scenes.json";
import propsData from "@/data/props.json";
import bubblesData from "@/data/bubbles.json";

interface PanelElementNodeProps {
  element: PanelElement;
  panelId: string;
}

export function PanelElementNode({ element, panelId }: PanelElementNodeProps) {
  const { selectedElementId, selectElement } = useEditorStore();
  const isSelected = selectedElementId === element.id;

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `element-${element.id}`,
    data: {
      type: "element",
      elementId: element.id,
      panelId
    }
  });

  // Calculate position
  const style = {
    left: `${element.position.x}%`,
    top: `${element.position.y}%`,
    width: `${element.size.width}px`,
    height: `${element.size.height}px`,
    zIndex: element.zIndex,
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
  };

  // Find asset source
  let src = "";
  if (element.type === 'character') src = charactersData.find(c => c.id === element.assetId)?.src || "";
  if (element.type === 'scene') src = scenesData.find(c => c.id === element.assetId)?.src || "";
  if (element.type === 'prop') src = propsData.find(c => c.id === element.assetId)?.src || "";
  if (element.type === 'bubble') src = bubblesData.find(c => c.id === element.assetId)?.src || "";

  const isScene = element.type === 'scene';
  const sceneStyle = isScene ? {
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    transform: 'none',
    zIndex: element.zIndex
  } : {};

  return (
    <div
      ref={setNodeRef}
      style={isScene ? sceneStyle : style}
      className={cn(
        "absolute flex items-center justify-center -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing group",
        isSelected && !isScene && "ring-2 ring-primary ring-offset-1 border border-dashed border-primary",
        isScene && "translate-x-0 translate-y-0 cursor-default"
      )}
      onClick={(e) => {
        e.stopPropagation();
        selectElement(element.id);
      }}
      {...(isScene ? {} : listeners)}
      {...(isScene ? {} : attributes)}
    >
      <div
        className={cn(
          "w-full h-full relative flex items-center justify-center transition-transform",
          element.flipX ? "-scale-x-100" : ""
        )}
      >
        {/* Asset Image */}
        {src && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={element.type}
            className="w-full h-full object-contain pointer-events-none"
            draggable={false}
          />
        )}

        {/* Bubble Text - Needs to stay un-flipped if image is flipped */}
        {element.type === 'bubble' && (
          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center p-4 pointer-events-none",
              element.flipX ? "-scale-x-100" : "" // un-flip text
            )}
          >
            <span className="font-comic text-black text-center text-sm font-bold leading-tight break-words max-w-full">
              {element.text}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
