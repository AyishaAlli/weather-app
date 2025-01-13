import { useEffect, useState } from "react";

interface GeolocationData {
  latitude: number;
  longitude: number;
}

interface GeolocationError {
  message: string;
}

export default function useGeolocation() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<GeolocationError | null>(null);
  const [data, setData] = useState<GeolocationData>({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    const onSuccess = (e: GeolocationPosition) => {
      setLoading(true);
      setError(null);
      setData({
        latitude: e.coords.latitude,
        longitude: e.coords.longitude,
      });
    };

    const onError = (e: GeolocationPositionError) => {
      setLoading(false);
      setError({ message: e.message });
    };

    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
      setLoading(false);
      setError({ message: "Geolocation is not supported by this browser." });
    }

    return () => {
      setLoading(false); // Clean up loading state if component unmounts
    };
  }, []);

  return { loading, error, data };
}
