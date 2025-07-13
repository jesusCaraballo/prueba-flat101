"use client";
import { useEffect, useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLocations } from "../context/locations-context";
import { useSearch } from "../context/search-context";

type Location = {
  id: number;
  name: string;
  type: string;
  dimension: string;
};

export default function Locations() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);

  const { search } = useSearch();

  const { getLocations, pages, loading } = useLocations();
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    let ignore = false;
    getLocations(page).then((locs) => {
      if (!ignore) setLocations(locs);
    });
    return () => {
      ignore = true;
    };
  }, [page, getLocations]);

  const filteredLocations = useMemo(() => {
    if (!search) return locations;
    return locations.filter((loc) =>
      loc.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, locations]);

  const goToPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    router.push(`/locations?${params.toString()}`);
  };

  const goToDetail = (id: number) => {
    router.push(`/locations/detail/${id}`);
  };

  return (
    <section className="max-w-2xl mx-auto pt-4 px-6 pb-8">
      <ul className="divide-y divide-gray-200">
        {loading ? (
          <li className="text-center py-8 text-violet-500 font-medium">
            Cargando localizaciones...
          </li>
        ) : filteredLocations.length > 0 ? (
          filteredLocations.map((loc) => (
            <li
              key={loc.id}
              onClick={() => goToDetail(loc.id)}
              className="py-4 cursor-pointer transition-colors duration-200 hover:bg-violet-50"
            >
              <span className="block text-xs uppercase text-violet-700 font-semibold tracking-widest mb-1">
                {loc.type || "UNKNOWN"}
              </span>
              <span className="block text-base font-medium">{loc.name}</span>
              <span className="block text-sm text-gray-500 mt-0.5">
                {loc.dimension || "unknown"}
              </span>
            </li>
          ))
        ) : (
          <li className="text-center text-white py-8 bg-violet-400 rounded">
            No se encontraron localizaciones.
          </li>
        )}
      </ul>
      <ul className="flex justify-center gap-2 mt-8 mb-8">
        {[...Array(pages)].map((_, i) => (
          <li key={i}>
            <button
              onClick={() => goToPage(i + 1)}
              className={`px-3 py-1 rounded border font-semibold ${
                page === i + 1
                  ? "bg-violet-600 text-white border-violet-600"
                  : "bg-white text-violet-700 border-violet-200 hover:bg-violet-100"
              } transition-colors duration-200`}
              disabled={page === i + 1}
              aria-current={page === i + 1 ? "page" : undefined}
            >
              {i + 1}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
