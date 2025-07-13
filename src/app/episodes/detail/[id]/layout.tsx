import { SearchProvider } from "@/app/context/search-context";

export default function DetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SearchProvider>{children}</SearchProvider>;
}
