import { useState } from 'react';

export default function useColorPicker(initialColor = '#fff') {
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [color, setColor] = useState(initialColor);

  function toggleColorPicker() {
    setIsColorPickerOpen((prev) => !prev);
  }

  function handleChangeColor(newColor) {
    setColor(newColor.hex);
  }

  function closeColorPicker() {
    setIsColorPickerOpen(false);
  }

  return {
    color,
    isColorPickerOpen,
    closeColorPicker,
    toggleColorPicker,
    handleChangeColor,
  };
}
