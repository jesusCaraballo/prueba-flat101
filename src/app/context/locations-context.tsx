"use client";
import React, { createContext, useContext, useState, useCallback } from "react";

type Location = {
  id: number;
  name: string;
  type: string;
  dimension: string;
};

type ApiResponse = {
  info: {
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Location[];
};

type LocationsContextType = {
  getLocations: (page: number) => Promise<Location[]>;
  pages: number;
  loading: boolean;
};

const LocationsContext = createContext<LocationsContextType | undefined>(
  undefined
);

export const LocationsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const getLocations = useCallback(async (page: number) => {
    setLoading(true);
    const res = await fetch(
      `https://rickandmortyapi.com/api/location?page=${page}`
    );
    const data: ApiResponse = await res.json();
    setPages(data.info.pages);
    setLoading(false);
    return data.results;
  }, []);

  return (
    <LocationsContext.Provider value={{ getLocations, pages, loading }}>
      {children}
    </LocationsContext.Provider>
  );
};

export function useLocations() {
  const ctx = useContext(LocationsContext);
  if (!ctx)
    throw new Error("useLocations debe usarse dentro de LocationsProvider");
  return ctx;
}
