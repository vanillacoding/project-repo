import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

/**
 * hook to deal with flash error message
 * @param {string|null} initialState - of error message
 * @param {number} delay - duration of flash message
 * @returns error message state and setState function
 */
function useErrorMessage(initialState = null, delay = 2000) {
  const [errorMsg, setErrorMsg] = useState(initialState);

  useFocusEffect(useCallback(() => {
    if (errorMsg === null) return;

    const timer = setTimeout(() => setErrorMsg(null), delay);
    return () => clearTimeout(timer);
  }, [errorMsg, delay]));

  return { errorMsg, setErrorMsg };
}

export default useErrorMessage;
