import { useState } from "react";

function useAudio() {
  const [isPlaying, setIsPlaying] = useState(true);
  function playAudio(e) {
    e.preventDefault();

    setIsPlaying((prev) => !prev);
  }

  return {
    isPlaying,
    playAudio,
  };
}

export default useAudio;
