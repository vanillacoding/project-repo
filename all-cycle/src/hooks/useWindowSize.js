import { useEffect, useState } from "react";

function useWindowSize() {
  const [idealResolution, setIdealResolution] = useState({ width: 529, height: 833 });

  function handleSetResolution() {
    if (window.innerWidth <= 400) {
      setIdealResolution({ width: 375, height: 812 });
      return;
    }
    if (window.innerWidth <= 550) {
      setIdealResolution({ width: 529, height: 833 });
      return;
    }

    setIdealResolution({ width: 640, height: 480 });
  }

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.addEventListener("resize", handleSetResolution);

    handleSetResolution();

    // eslint-disable-next-line consistent-return
    return () => window.removeEventListener("resize", handleSetResolution);
  }, []);

  return { idealResolution };
}

export default useWindowSize;
