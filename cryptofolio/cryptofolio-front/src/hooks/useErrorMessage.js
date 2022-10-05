import { useState, useEffect, useCallback } from "react";

/**
 *
 * @param {string} message
 * @returns error message & show message func
 */
const useErrorMessage = (message = "") => {
  const [error, setError] = useState(message);
  const showMessage = useCallback((errMessage) => {
    setError(errMessage);
  }, []);

  useEffect(() => {
    const hideMessage = setTimeout(() => {
      setError("");
    }, 2000);

    return () => clearTimeout(hideMessage);
  }, [error]);

  return [error, showMessage];
};

export default useErrorMessage;
