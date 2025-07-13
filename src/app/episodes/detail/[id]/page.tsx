"use client";
import { EpisodeDetailProvider } from "@/app/context/episode-detail-context";
import EpisodeDetail from "./episodeDetail";

export default function EpisodeDetailPage() {
  return (
    <EpisodeDetailProvider>
      <EpisodeDetail />
    </EpisodeDetailProvider>
  );
}
