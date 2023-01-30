import React from "react";
import { useSelector } from "react-redux";

function Music() {
  const selectIsMusicPlay = useSelector((state) => state.block.isMusicPlaying);

  return (
    <>
      {selectIsMusicPlay && (
        <audio
          src="/assets/audio/cat_and_soup.mp3"
          autoPlay={true}
          loop={true}
        />
      )}
    </>
  );
}

export { Music };
