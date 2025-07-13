"use client";
import { useRouter } from "next/navigation";

export default function HeaderDetail({ title }: { title: string }) {
  const router = useRouter();

  return (
    <header className="bg-violet-600 rounded-xl p-4 flex items-center gap-3 shadow-md w-full max-w-2xl mx-auto mt-8">
      <button
        className="text-white text-xl cursor-pointer"
        aria-label="Volver"
        onClick={() => router.back()}
      >
        <svg
          width={24}
          height={24}
          fill="none"
          stroke="white"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <span className="text-white text-lg font-semibold">{title}</span>
    </header>
  );
}
