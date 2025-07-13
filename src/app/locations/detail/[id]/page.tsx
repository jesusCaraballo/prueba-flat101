import { LocationDetailProvider } from "@/app/context/location-detail-context";
import LocationDetail from "./locationDetail";

export default function LocationDetailPage() {
  return (
    <LocationDetailProvider>
      <LocationDetail />
    </LocationDetailProvider>
  );
}
