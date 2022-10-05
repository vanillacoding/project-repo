import { useEffect, useState } from 'react';

export default function useFetch(url, options) {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);

      try {
        const res = await fetch(url, options);
        const json = await res.json();

        setResponse(json);
        setIsLoading(false);
      } catch (err) {
        setError(err);
      }
    }

    fetchData();
  }, []);

  return { response, error, isLoading };
}
