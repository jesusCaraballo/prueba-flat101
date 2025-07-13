"use client";
import HeaderDetail from "@/app/components/header-detail";
import Image from "next/image";
import { useEpisodeDetail } from "@/app/context/episode-detail-context";

export default function EpisodeDetail() {
  const {
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
  } = useEpisodeDetail();

  if (loading || !episode) {
    return (
      <div className="text-center mt-8 text-violet-500">
        Cargando episodio...
      </div>
    );
  }

  return (
    <>
      <HeaderDetail title={episode.name} />
      <section className="max-w-2xl mx-auto mt-6 bg-white p-8 rounded-xl shadow">
        <h2 className="text-lg font-bold text-violet-700 mb-0.5">
          {episode.episode}: {episode.name}
        </h2>
        <p className="text-gray-700 mb-4">{episode.air_date}</p>
        <h3 className="text-base font-semibold mt-6 mb-2">Personajes</h3>
        <div className="flex flex-row gap-5 overflow-x-auto pb-2 mb-6">
          {characters.map((char) => (
            <div
              key={char.id}
              className="flex flex-col items-center min-w-[90px]"
            >
              <Image
                src={char.image}
                alt={char.name}
                width={64}
                height={64}
                className="rounded-full border border-violet-200 shadow"
              />
              <span className="mt-2 text-xs text-gray-700 text-center w-20 truncate">
                {char.name}
              </span>
            </div>
          ))}
        </div>
        <form
          className="flex flex-col gap-4 mt-8"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <label className="font-semibold text-base mb-1">Comentarios</label>
          <input
            type="text"
            placeholder="Tu nombre"
            value={name}
            maxLength={60}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-violet-500"
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            maxLength={100}
            onChange={(e) => setEmail(e.target.value)}
            className={`border rounded px-3 py-2 focus:outline-none ${
              email
                ? emailValid
                  ? "border-gray-300 focus:border-violet-500"
                  : "border-red-500 focus:border-red-500"
                : "border-gray-300 focus:border-violet-500"
            }`}
          />
          <textarea
            placeholder="Comentario (máx. 500 caracteres)"
            value={comment}
            maxLength={500}
            rows={3}
            onChange={(e) => setComment(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-violet-500 resize-none"
          />
          <button
            type="submit"
            disabled={
              !name.trim() || !email.trim() || !emailValid || !comment.trim()
            }
            className={`mt-2 bg-violet-600 text-white rounded py-2 px-6 font-semibold tracking-wide shadow hover:bg-violet-700 transition disabled:bg-violet-300 disabled:cursor-not-allowed`}
          >
            ENVIAR
          </button>
          {error && (
            <span className="text-red-500 text-sm font-medium mt-1">
              {error}
            </span>
          )}
          {sent && (
            <span className="text-green-600 text-sm font-medium mt-1">
              ¡Comentario enviado! (API imaginaria)
            </span>
          )}
        </form>
      </section>
    </>
  );
}
