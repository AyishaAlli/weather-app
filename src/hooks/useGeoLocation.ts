import { useEffect, useState } from "react";

interface GeolocationData {
  latitude: number;
  longitude: number;
}

interface GeolocationError {
  message: string;
}

export default function useGeolocation(city: string | null) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<GeolocationError | null>(null);
  const [data, setData] = useState<GeolocationData>({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    if (city) {
      // If a city is provided, reset the error state
      setError(null);
      setLoading(false);
      return; // Skip geolocation logic if city is provided
    }

    const onSuccess = (e: GeolocationPosition) => {
      setLoading(false);
      setError(null);
      setData({
        latitude: e.coords.latitude,
        longitude: e.coords.longitude,
      });
    };

    const onError = (e: GeolocationPositionError) => {
      setLoading(false);
      if (e.code === e.PERMISSION_DENIED) {
        setError({
          message:
            "Geolocation permission denied. Please allow location access or type a city.",
        });
      } else {
        setError({
          message: "An error occurred while trying to access your location.",
        });
      }
    };

    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
      setLoading(false);
      setError({ message: "Geolocation is not supported by this browser." });
    }

    return () => {
      setLoading(false); // Cleaning up loading state if component unmounts
    };
  }, [city]); // Re-run effect if `city` changes

  return { loading, error, data };
}
