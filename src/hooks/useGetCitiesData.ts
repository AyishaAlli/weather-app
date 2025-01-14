import { useQuery } from "@tanstack/react-query";

import { getCitiesData } from "../services/api";

export function useGetWeatherData() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["cities"],
    queryFn: () => getCitiesData(),
    enabled: true,
    staleTime: 1000 * 60 * 60, // Data stays fresh for 60 minutes
  });

  return { data, error, isLoading };
}

export default useGetWeatherData;
