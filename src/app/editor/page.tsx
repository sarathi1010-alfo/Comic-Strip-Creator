"use client";

import { Suspense } from "react";
import { EditorWorkspace } from "@/components/editor/EditorWorkspace";

export default function EditorPage() {
  return (
    <Suspense fallback={<div className="flex h-full items-center justify-center">Loading Editor...</div>}>
      <EditorWorkspace />
    </Suspense>
  );
}
