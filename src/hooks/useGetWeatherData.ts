import { useQuery } from "@tanstack/react-query";

import { GeolocationData } from "../types/weather";
import { getWeatherDataByCoords, getWeatherDataByCity } from "../services/api";

export function useGetWeatherData(
  geoData: GeolocationData,
  searchQuery: string
) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["weather", searchQuery, geoData.latitude, geoData.longitude],
    queryFn: () =>
      searchQuery
        ? getWeatherDataByCity(searchQuery)
        : getWeatherDataByCoords(geoData),
    enabled: (!!geoData?.latitude && !!geoData?.longitude) || !!searchQuery,
    staleTime: 1000 * 60 * 60, // Data stays fresh for 60 minutes
  });

  return { data, error, isLoading };
}

export default useGetWeatherData;
