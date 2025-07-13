"use client";
import { createContext, useContext, useState, ReactNode } from "react";

const SearchContext = createContext<{
  search: string;
  setSearch: (val: string) => void;
}>({ search: "", setSearch: () => {} });

export function SearchProvider({ children }: { children: ReactNode }) {
  const [search, setSearch] = useState("");
  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
}

export const useSearch = () => useContext(SearchContext);
