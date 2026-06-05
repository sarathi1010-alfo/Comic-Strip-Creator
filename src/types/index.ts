export type ElementType = "character" | "scene" | "prop" | "bubble";

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface PanelElement {
  id: string; // Unique ID in the panel
  assetId: string; // ID from the asset database
  type: ElementType;
  position: Position;
  size: Size;
  rotation?: number;
  zIndex: number;

  // Specific properties
  text?: string; // For bubbles
  flipX?: boolean;
}

export interface Panel {
  id: string;
  elements: PanelElement[];
  order: number;
}

export interface Comic {
  id: string;
  title: string;
  panels: Panel[];
}

// Asset Database Models
export interface CharacterAsset {
  id: string;
  name: string;
  src: string;
  defaultSize: Size;
}

export interface SceneAsset {
  id: string;
  name: string;
  src: string;
}

export interface PropAsset {
  id: string;
  name: string;
  src: string;
  defaultSize: Size;
}

export interface BubbleAsset {
  id: string;
  name: string;
  src: string;
  defaultSize: Size;
}

export interface Template {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  comic: Comic;
}
