"use client";
import { useRef, useEffect, useState, ChangeEvent } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useSearch } from "../context/search-context";

export default function Header() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const [showSearch, setShowSearch] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { search, setSearch } = useSearch();

  useEffect(() => {
    if (showSearch && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showSearch]);

  useEffect(() => {
    setSearch("");
  }, [pathname, page, setSearch]);
  if (
    pathname.startsWith("/episodes/detail") ||
    pathname.startsWith("/locations/detail")
  ) {
    return null;
  }

  const activeTab = pathname.startsWith("/locations")
    ? "localizaciones"
    : pathname.startsWith("/episodes")
    ? "episodios"
    : "";

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  return (
    <header className="bg-violet-600 rounded-xl p-4 shadow-md w-full max-w-2xl mx-auto mt-8">
      <div className="flex items-center justify-between">
        <h1 className="text-white text-2xl font-semibold">Rick and Morty</h1>
        {showSearch ? (
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              placeholder="Buscar..."
              value={search}
              className="px-3 py-1 rounded bg-white text-black outline-none"
              onChange={handleInputChange}
              onBlur={() => setShowSearch(false)}
            />
            <button
              className="text-white text-lg"
              onClick={() => setShowSearch(false)}
              aria-label="Cerrar búsqueda"
              tabIndex={-1}
            >
              &#10005;
            </button>
          </div>
        ) : (
          <button
            className="text-white"
            onClick={() => setShowSearch(true)}
            aria-label="Abrir búsqueda"
          >
            <svg
              width={24}
              height={24}
              fill="none"
              stroke="white"
              strokeWidth={2}
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        )}
      </div>
      <div className="flex mt-4 border-b border-violet-400">
        <button
          className={`flex-1 pb-2 text-center uppercase text-white tracking-wider font-medium transition 
            ${
              activeTab === "episodios"
                ? "border-b-2 border-white"
                : "border-b-2 border-transparent opacity-70 hover:opacity-100"
            }
          `}
          onClick={() => {
            router.push("/episodes");
          }}
        >
          EPISODIOS
        </button>
        <button
          className={`flex-1 pb-2 text-center uppercase text-white tracking-wider font-medium transition 
            ${
              activeTab === "localizaciones"
                ? "border-b-2 border-white"
                : "border-b-2 border-transparent opacity-70 hover:opacity-100"
            }
          `}
          onClick={() => {
            router.push("/locations");
          }}
        >
          LOCALIZACIONES
        </button>
      </div>
    </header>
  );
}
