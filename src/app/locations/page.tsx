"use client";
import { Suspense } from "react";
import Locations from "./locations";

export default function LocationsPage() {
  return (
    <Suspense fallback={<div>Cargando localizaciones...</div>}>
      <Locations />
    </Suspense>
  );
}
