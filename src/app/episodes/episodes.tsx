"use client";
import { useEpisodes } from "../context/episodes-context";
import { useSearch } from "../context/search-context";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";

type Episode = { id: number; name: string; episode: string; air_date: string };

export default function Episodes() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const { search } = useSearch();
  const { getEpisodes, pages, loading } = useEpisodes();
  const [episodes, setEpisodes] = useState<Episode[]>([]);

  useEffect(() => {
    let ignore = false;
    getEpisodes(page).then((eps) => {
      if (!ignore) setEpisodes(eps);
    });
    return () => {
      ignore = true;
    };
  }, [page, getEpisodes]);

  const filteredEpisodes = useMemo(() => {
    if (!search) return episodes;
    return episodes.filter((ep) =>
      ep.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, episodes]);

  const goToPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    router.push(`/episodes?${params.toString()}`);
  };

  const goToDetail = (id: number) => {
    router.push(`/episodes/detail/${id}`);
  };

  return (
    <section className="max-w-2xl mx-auto pt-6">
      <ul className="divide-y divide-gray-200">
        {loading ? (
          <li className="text-center py-8 text-violet-500 font-medium">
            Cargando episodios...
          </li>
        ) : filteredEpisodes.length > 0 ? (
          filteredEpisodes.map((ep) => (
            <li
              key={ep.id}
              onClick={() => goToDetail(ep.id)}
              className="py-4 flex flex-col cursor-pointer transition-colors duration-200 hover:bg-violet-50"
              tabIndex={0}
              role="button"
              aria-label={`Ver detalle del episodio ${ep.name}`}
            >
              <span className="text-xs text-violet-700 font-semibold tracking-widest">
                {ep.episode}
              </span>
              <span className="text-base font-medium mt-1">{ep.name}</span>
              <span className="text-sm text-gray-500 mt-0.5">
                {ep.air_date}
              </span>
            </li>
          ))
        ) : (
          <li className="text-center text-white py-8 bg-violet-400 rounded">
            No se encontraron episodios.
          </li>
        )}
      </ul>
      <div className="flex justify-center mt-8 gap-2">
        {[...Array(pages)].map((_, i) => (
          <button
            key={i}
            onClick={() => goToPage(i + 1)}
            className={`px-3 py-1 rounded border font-semibold ${
              page === i + 1
                ? "bg-violet-600 text-white border-violet-600"
                : "bg-white text-violet-700 border-violet-200 hover:bg-violet-100"
            } transition-colors duration-200`}
            disabled={page === i + 1}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </section>
  );
}
