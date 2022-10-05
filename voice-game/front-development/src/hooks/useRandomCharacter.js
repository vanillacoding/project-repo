import { useState } from "react";

/**
 *
 * @param {objcet} image image object
 * @returns ramdom index under character list length
 */
const useRandomCharacter = (image) => {
  const listLength = image ? image.characters.length : 0;

  const randomIndex = Math.random() * listLength;
  const floored = Math.floor(randomIndex);
  const [characterIndex, setCharacterIndex] = useState(floored);

  return characterIndex;
}

export default useRandomCharacter;
