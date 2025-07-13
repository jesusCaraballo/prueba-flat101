import { ReactNode } from "react";
import { LocationsProvider } from "../context/locations-context";

export default function LocationsLayout({ children }: { children: ReactNode }) {
  return <LocationsProvider>{children}</LocationsProvider>;
}
