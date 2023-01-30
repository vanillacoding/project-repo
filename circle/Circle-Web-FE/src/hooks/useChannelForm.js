import { useState } from "react";
import useChange from "./useChange";

export default function useChannelForm(
  initTitle = "",
  initDescription = "",
  initIsActive = true
) {
  const [title, handleOnTitle] = useChange(initTitle);
  const [description, handleOnDescription] = useChange(initDescription);
  const [isActive, setIsActive] = useState(initIsActive);

  const handleOnIsActive = (event) => {
    setIsActive(event.target.checked);
  };

  const formData = {
    title,
    description,
    isActive,
  };

  const handleFormData = {
    handleOnTitle,
    handleOnDescription,
    handleOnIsActive,
  };

  return [formData, handleFormData];
}
