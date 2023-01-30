import { useState } from "react";

export default function useChange(initialState = "") {
  const [value, setValue] = useState(initialState);

  const handleOnChange = (event) => {
    setValue(event.target.value);
  };

  return [value, handleOnChange];
}
