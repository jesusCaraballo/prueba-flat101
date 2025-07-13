import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";
import { ReactNode, Suspense } from "react";
import Header from "@/app/components/header";
import { SearchProvider } from "./context/search-context";
import { EpisodesProvider } from "./context/episodes-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Prueba técnica Jesús Caraballo FLAT101",
  description: "Prueba técnica FLAT101",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SearchProvider>
          <EpisodesProvider>
            <Suspense fallback={null}>
              <Header />
            </Suspense>
            {children}
          </EpisodesProvider>
        </SearchProvider>
      </body>
    </html>
  );
}
