import { LocationsProvider } from "../context/locations-context";

export default function LocationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LocationsProvider>{children}</LocationsProvider>;
}
