import { useQuery } from "@tanstack/react-query";

import { getCitiesData } from "../services/openWeatherAPI";

export function useGetWeatherData() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["cities"],
    queryFn: () => getCitiesData(),

    enabled: true,
    staleTime: 1000 * 60 * 10, // Data stays fresh for 10 minutes
  });

  return { data, error, isLoading };
}

export default useGetWeatherData;
