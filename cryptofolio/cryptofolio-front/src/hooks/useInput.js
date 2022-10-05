import { useState, useCallback } from "react";

/**
 *
 * @param {string} initialValue
 * @returns input value and input handler
 */
const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handler = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  return [value, handler];
};

export default useInput;
