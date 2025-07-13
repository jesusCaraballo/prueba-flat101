import { ReactNode } from "react";
import { EpisodesProvider } from "../context/episodes-context";

export default function EpisodesLayout({ children }: { children: ReactNode }) {
  return <EpisodesProvider>{children}</EpisodesProvider>;
}
