import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import fetchData from "@/utils/fetchData";

function usePhoto(handleClose) {
  const router = useRouter();
  const [dataUri, setDataUri] = useState("");
  const [isError, setIsError] = useState(false);
  const [detectedText, setDetectedText] = useState("");
  const [startedCamera, setStartedCamera] = useState(true);

  useEffect(() => {
    if (!isError) return;

    const timeoutId = setTimeout(() => {
      setDataUri("");
      setIsError(false);
      handleClose();
      router.push("/");
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [isError]);

  async function handleTakePhoto(uri) {
    setDataUri(uri);

    const response = await fetchData("POST", "/api/photo", uri);

    if (response.result) {
      const { _id, name } = response.data;

      setDetectedText(name);
      setTimeout(() => {
        router.push(`/product/${_id}`);
      }, 500);
      return;
    }

    setIsError(true);
  }

  function handleStart() {
    setStartedCamera((prev) => !prev);
  }

  return {
    startedCamera,
    isError,
    detectedText,
    dataUri,
    handleTakePhoto,
    handleStart,
  };
}

export default usePhoto;
