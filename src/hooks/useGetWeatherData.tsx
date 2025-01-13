import { useQuery } from "@tanstack/react-query";

import { GeolocationData } from "../types/weather";
import {
  fetchWeatherDataByCoords,
  fetchWeatherDataByCity,
} from "../services/openWeatherAPI";

export function useGetWeatherData(
  geoData: GeolocationData,
  searchQuery: string
) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["weather", searchQuery, JSON.stringify(geoData)], // Stable key for geoData as was causing too many re-renders
    queryFn: () =>
      searchQuery
        ? fetchWeatherDataByCity(searchQuery)
        : fetchWeatherDataByCoords(geoData),
    enabled: !!geoData?.latitude || !!geoData?.longitude || !!searchQuery,
    staleTime: 1000 * 60 * 10, // Data stays fresh for 10 minutes
  });

  return { data, error, isLoading };
}

export default useGetWeatherData;
