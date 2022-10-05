import { useState } from "react";

const useToggleOnOff = () => {
  const [isOn, setIsOn] = useState(null);

  const toggleOnOff = () => {
    if (isOn) {
      setIsOn(false);
    } else {
      setIsOn(true);
    }
  };

  return { isOn, toggleOnOff };
};

export default useToggleOnOff;
