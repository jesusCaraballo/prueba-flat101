"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  FormEvent,
} from "react";
import { useParams } from "next/navigation";

type Character = {
  id: number;
  name: string;
  image: string;
};

type Episode = {
  id: number;
  name: string;
  episode: string;
  air_date: string;
  characters: string[];
};

type EpisodeDetailContextType = {
  episode: Episode | null;
  characters: Character[];
  loading: boolean;
  name: string;
  setName: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  comment: string;
  setComment: (v: string) => void;
  sent: boolean;
  error: string | null;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  emailValid: boolean;
};

const EpisodeDetailContext = createContext<
  EpisodeDetailContextType | undefined
>(undefined);

export function EpisodeDetailProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { id } = useParams<{ id: string }>();
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const emailValid = !email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`https://rickandmortyapi.com/api/episode/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setEpisode(data);
        if (data.characters && data.characters.length) {
          Promise.all(
            data.characters.map((url: string) =>
              fetch(url)
                .then((res) => res.json())
                .then((char) => ({
                  id: char.id,
                  name: char.name,
                  image: char.image,
                }))
            )
          ).then((chars) => setCharacters(chars));
        } else {
          setCharacters([]);
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSent(false);

    try {
      await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ episodeId: id, name, email, comment }),
      });
      setSent(true);
      setName("");
      setEmail("");
      setComment("");
    } catch {
      setSent(true);
      setName("");
      setEmail("");
      setComment("");
    }
  };

  return (
    <EpisodeDetailContext.Provider
      value={{
        episode,
        characters,
        loading,
        name,
        setName,
        email,
        setEmail,
        comment,
        setComment,
        sent,
        error,
        handleSubmit,
        emailValid,
      }}
    >
      {children}
    </EpisodeDetailContext.Provider>
  );
}

export function useEpisodeDetail() {
  const ctx = useContext(EpisodeDetailContext);
  if (!ctx)
    throw new Error(
      "useEpisodeDetail debe usarse dentro de EpisodeDetailProvider"
    );
  return ctx;
}
