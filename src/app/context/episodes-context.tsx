"use client";
import React, { createContext, useContext, useState, useCallback } from "react";

type Episode = {
  id: number;
  name: string;
  episode: string;
  air_date: string;
};

type ApiResponse = {
  info: {
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Episode[];
};

type EpisodesContextType = {
  getEpisodes: (page: number) => Promise<Episode[]>;
  pages: number;
  loading: boolean;
};

const EpisodesContext = createContext<EpisodesContextType | undefined>(
  undefined
);

export const EpisodesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const getEpisodes = useCallback(async (page: number) => {
    setLoading(true);
    const res = await fetch(
      `https://rickandmortyapi.com/api/episode?page=${page}`
    );
    const data: ApiResponse = await res.json();
    setPages(data.info.pages);
    setLoading(false);
    return data.results;
  }, []);

  return (
    <EpisodesContext.Provider value={{ getEpisodes, pages, loading }}>
      {children}
    </EpisodesContext.Provider>
  );
};

export function useEpisodes() {
  const ctx = useContext(EpisodesContext);
  if (!ctx)
    throw new Error("useEpisodes debe usarse dentro de EpisodesProvider");
  return ctx;
}
