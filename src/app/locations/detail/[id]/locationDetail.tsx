"use client";
import HeaderDetail from "@/app/components/header-detail";
import Image from "next/image";
import { useLocationDetail } from "@/app/context/location-detail-context";

export default function LocationDetail() {
  const { location, residents, loading } = useLocationDetail();

  if (loading || !location) {
    return (
      <div className="text-center mt-8 text-violet-500">
        Cargando localización...
      </div>
    );
  }

  return (
    <>
      <HeaderDetail title={location.name} />
      <section className="max-w-2xl mx-auto mt-6 bg-white p-8 rounded-xl shadow">
        <h2 className="text-lg font-bold text-violet-700 mb-0.5">
          {location.type}: {location.name}
        </h2>
        <p className="text-gray-700 mb-1">
          <span className="font-semibold">Dimensión:</span>{" "}
          {location.dimension || "Desconocida"}
        </p>
        <h3 className="text-base font-semibold mt-6 mb-2">Residentes</h3>
        {residents.length === 0 ? (
          <p className="text-gray-400 text-sm mb-2">
            Sin residentes conocidos.
          </p>
        ) : (
          <div className="flex flex-row gap-5 overflow-x-auto pb-2 mb-6">
            {residents.map((char) => (
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
        )}
      </section>
    </>
  );
}
