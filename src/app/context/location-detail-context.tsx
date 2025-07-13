"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useParams } from "next/navigation";

type Character = {
  id: number;
  name: string;
  image: string;
};

type Location = {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
};

type LocationDetailContextType = {
  location: Location | null;
  residents: Character[];
  loading: boolean;
};

const LocationDetailContext = createContext<
  LocationDetailContextType | undefined
>(undefined);

export function LocationDetailProvider({ children }: { children: ReactNode }) {
  const { id } = useParams<{ id: string }>();
  const [location, setLocation] = useState<Location | null>(null);
  const [residents, setResidents] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`https://rickandmortyapi.com/api/location/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setLocation(data);
        if (data.residents && data.residents.length) {
          Promise.all(
            data.residents.map((url: string) =>
              fetch(url)
                .then((res) => res.json())
                .then((char) => ({
                  id: char.id,
                  name: char.name,
                  image: char.image,
                }))
            )
          ).then((chars) => setResidents(chars));
        } else {
          setResidents([]);
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <LocationDetailContext.Provider
      value={{
        location,
        residents,
        loading,
      }}
    >
      {children}
    </LocationDetailContext.Provider>
  );
}

export function useLocationDetail() {
  const ctx = useContext(LocationDetailContext);
  if (!ctx)
    throw new Error(
      "useLocationDetail debe usarse dentro de LocationDetailProvider"
    );
  return ctx;
}
