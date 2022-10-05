import { useEffect } from "react";

export default function useLoading(currentUser, setIsReady, isReady) {
  useEffect(() => {
    const loadingCount = () => setTimeout(() => {
      setIsReady(true);
    }, 3000);

    if (currentUser && !isReady) {
      loadingCount();
    }

    return () => clearTimeout(loadingCount());
  }, [currentUser]);
}
