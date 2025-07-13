"use client";
import { Suspense } from "react";
import Episodes from "./episodes";

export default function EpisodesPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <Episodes />
    </Suspense>
  );
}
