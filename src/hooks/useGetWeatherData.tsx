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
    queryKey: ["weather", searchQuery || geoData],

    queryFn: () =>
      searchQuery
        ? fetchWeatherDataByCity(searchQuery)
        : fetchWeatherDataByCoords(geoData),
    enabled: (!!geoData?.latitude && !!geoData?.longitude) || !!searchQuery,
  });

  return { data, error, isLoading };
}

export default useGetWeatherData;
