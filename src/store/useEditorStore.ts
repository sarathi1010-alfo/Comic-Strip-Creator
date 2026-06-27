import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Comic, PanelElement, ElementType, Position, Size } from '@/types';
import { v4 as uuidv4 } from 'uuid';

interface EditorState {
  comic: Comic;
  selectedPanelId: string | null;
  selectedElementId: string | null;

  // Actions
  setComic: (comic: Comic) => void;
  updateComicTitle: (title: string) => void;
  addPanel: () => void;
  removePanel: (panelId: string) => void;
  selectPanel: (panelId: string | null) => void;

  addElement: (panelId: string, assetId: string, type: ElementType, defaultSize: Size, initialPos?: Position) => void;
  updateElement: (panelId: string, elementId: string, updates: Partial<PanelElement>) => void;
  removeElement: (panelId: string, elementId: string) => void;
  selectElement: (elementId: string | null) => void;

  bringForward: (panelId: string, elementId: string) => void;
  sendBackward: (panelId: string, elementId: string) => void;
  duplicateElement: (panelId: string, elementId: string) => void;
  applyLayoutPreset: (preset: 'vertical' | 'classic' | 'hero' | 'grid') => void;
  distributeEvenly: () => void;
  customAssets: Array<{ id: string; name: string; src: string; type: 'character' | 'scene' | 'prop' | 'bubble'; defaultSize: { width: number; height: number } }>;
  addCustomAsset: (asset: { id: string; name: string; src: string; type: 'character' | 'scene' | 'prop' | 'bubble'; defaultSize: { width: number; height: number } }) => void;
}

const generateInitialComic = (): Comic => ({
  id: uuidv4(),
  title: 'Untitled Comic',
  panels: [
    { id: uuidv4(), order: 0, elements: [] },
    { id: uuidv4(), order: 1, elements: [] },
    { id: uuidv4(), order: 2, elements: [] }
  ],
  layoutMode: 'vertical'
});

export const useEditorStore = create<EditorState>()(
  persist(
    (set) => ({
      comic: generateInitialComic(),
      selectedPanelId: null,
      selectedElementId: null,
      customAssets: [],

      setComic: (comic) => set({ comic, selectedPanelId: null, selectedElementId: null }),

      updateComicTitle: (title) => set((state) => ({ comic: { ...state.comic, title } })),

      addPanel: () => set((state) => ({
        comic: {
          ...state.comic,
          panels: [
            ...state.comic.panels,
            {
              id: uuidv4(),
              order: state.comic.panels.length,
              elements: []
            }
          ]
        }
      })),

      removePanel: (panelId) => set((state) => {
        const newPanels = state.comic.panels
          .filter(p => p.id !== panelId)
          .map((p, idx) => ({ ...p, order: idx }));
        return {
          comic: { ...state.comic, panels: newPanels },
          selectedPanelId: state.selectedPanelId === panelId ? null : state.selectedPanelId
        };
      }),

      selectPanel: (panelId) => set({ selectedPanelId: panelId }),

      addElement: (panelId, assetId, type, defaultSize, initialPos) => set((state) => {
        const newElementId = uuidv4();
        const panels = state.comic.panels.map(panel => {
          if (panel.id !== panelId) return panel;

          const zIndex = panel.elements.length > 0
            ? Math.max(...panel.elements.map(e => e.zIndex)) + 1
            : (type === 'scene' ? 0 : 1);

          const newElement: PanelElement = {
            id: newElementId,
            assetId,
            type,
            position: initialPos || { x: 50, y: 50 },
            size: defaultSize,
            zIndex,
            text: type === 'bubble' ? 'Double click to edit' : undefined
          };

          return {
            ...panel,
            elements: [...panel.elements, newElement]
          };
        });

        return {
          comic: { ...state.comic, panels },
          selectedElementId: newElementId
        };
      }),

      updateElement: (panelId, elementId, updates) => set((state) => {
        const panels = state.comic.panels.map(panel => {
          if (panel.id !== panelId) return panel;
          return {
            ...panel,
            elements: panel.elements.map(el =>
              el.id === elementId ? { ...el, ...updates } : el
            )
          };
        });
        return { comic: { ...state.comic, panels } };
      }),

      removeElement: (panelId, elementId) => set((state) => {
        const panels = state.comic.panels.map(panel => {
          if (panel.id !== panelId) return panel;
          return {
            ...panel,
            elements: panel.elements.filter(el => el.id !== elementId)
          };
        });
        return {
          comic: { ...state.comic, panels },
          selectedElementId: state.selectedElementId === elementId ? null : state.selectedElementId
        };
      }),

      selectElement: (elementId) => set({ selectedElementId: elementId }),

      bringForward: (panelId, elementId) => set((state) => {
        const panels = state.comic.panels.map(panel => {
          if (panel.id !== panelId) return panel;
          const targetEl = panel.elements.find(el => el.id === elementId);
          if (!targetEl) return panel;

          const elementsAbove = panel.elements.filter(el => el.zIndex > targetEl.zIndex);
          if (elementsAbove.length === 0) return panel;

          const nextEl = elementsAbove.reduce((prev, curr) => prev.zIndex < curr.zIndex ? prev : curr);

          return {
            ...panel,
            elements: panel.elements.map(el => {
              if (el.id === elementId) return { ...el, zIndex: nextEl.zIndex };
              if (el.id === nextEl.id) return { ...el, zIndex: targetEl.zIndex };
              return el;
            })
          };
        });
        return { comic: { ...state.comic, panels } };
      }),

      sendBackward: (panelId, elementId) => set((state) => {
        const panels = state.comic.panels.map(panel => {
          if (panel.id !== panelId) return panel;
          const targetEl = panel.elements.find(el => el.id === elementId);
          if (!targetEl) return panel;

          if (targetEl.type === 'scene' && targetEl.zIndex === 0) return panel;

          const elementsBelow = panel.elements.filter(el => el.zIndex < targetEl.zIndex);
          if (elementsBelow.length === 0) return panel;

          const prevEl = elementsBelow.reduce((prev, curr) => prev.zIndex > curr.zIndex ? prev : curr);

          return {
            ...panel,
            elements: panel.elements.map(el => {
              if (el.id === elementId) return { ...el, zIndex: prevEl.zIndex };
              if (el.id === prevEl.id) return { ...el, zIndex: targetEl.zIndex };
              return el;
            })
          };
        });
        return { comic: { ...state.comic, panels } };
      }),

      applyLayoutPreset: (preset) => set((state) => {
        const targetCount = preset === 'grid' ? 4 : 3; // vertical/classic/hero = 3, grid = 4
        let newPanels = [...state.comic.panels];

        if (newPanels.length < targetCount) {
          // Add panels
          while (newPanels.length < targetCount) {
            newPanels.push({ id: uuidv4(), order: newPanels.length, elements: [] });
          }
        } else if (newPanels.length > targetCount) {
          // Remove panels (only if empty to be safe, or just truncate for simplicity of preset)
          newPanels = newPanels.slice(0, targetCount);
        }

        return {
          comic: {
            ...state.comic,
            layoutMode: preset,
            panels: newPanels
          }
        };
      }),

      distributeEvenly: () => set((state) => ({
        comic: {
          ...state.comic,
          layoutMode: 'vertical'
        }
      })),

      addCustomAsset: (asset) => set((state) => ({
        customAssets: [...state.customAssets, asset]
      })),

      duplicateElement: (panelId, elementId) => set((state) => {
        const newElementId = uuidv4();
        const panels = state.comic.panels.map(panel => {
          if (panel.id !== panelId) return panel;
          const targetEl = panel.elements.find(el => el.id === elementId);
          if (!targetEl) return panel;

          const newElement: PanelElement = {
            ...targetEl,
            id: newElementId,
            position: {
              x: Math.min(100, targetEl.position.x + 5),
              y: Math.min(100, targetEl.position.y + 5)
            },
            zIndex: Math.max(...panel.elements.map(el => el.zIndex)) + 1
          };

          return {
            ...panel,
            elements: [...panel.elements, newElement]
          };
        });

        return {
          comic: { ...state.comic, panels },
          selectedElementId: newElementId
        };
      })
    }),
    {
      name: 'comic-strip-storage',
      storage: createJSONStorage(() => localStorage),
      // Only persist the comic, not the UI selection state
      partialize: (state) => ({ comic: state.comic, customAssets: state.customAssets })
    }
  )
);
