import { useEffect, useState } from "react";

export default function useGeolocation() {
  const [loading, setloading] = useState(true);
  const [error, setError] = useState<{ message: string } | null>(null);
  const [data, setData] = useState({ longitude: 0, latitude: 0 });

  useEffect(() => {
    const onSuccess = (e) => {
      setloading(false);
      setError(null);
      setData(e.coords);
    };

    const onError = (e) => {
      setloading(false);
      setError(e);
    };
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  return { loading, error, data };
}
