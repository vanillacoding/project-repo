import React from "react";

import Game from "../../games/littleForest";
import BackGround from "../../games/littleForest/Background";
import Loading from "../Loading/Loading";
import GameManual from "../GameManual/GameManual";
import GameMap from "../../games/littleForest/GameMap";

import useAudio from "../../hooks/useAudio";
import useCanvas from "../../hooks/useCanvas";
import useNextMap from "../../hooks/useNextMap";
import useLoadedImage from "../../hooks/useLoadedImage";
import usePitchDetector from "../../hooks/usePitchDetector";
import useRandomCharacter from "../../hooks/useRandomCharacter";

import Canvas from "../shared/Canvas/Canvas";
import Wrapper from "../shared/Wrapper/Wrapper";

import manualImage from "../../images/manuals/manual_littleForest.png";
import mapList from "../../games/littleForest/mapList";

const LittleForestContainer = () => {
  const { image, isLoaded } = useLoadedImage("littleForest");
  const pitchDetectorRef = usePitchDetector(
    useAudio({ samplerate: 12000 }, { audio: true, video: false })
    );
  const [currentMap, getNextMap] = useNextMap(mapList);
  const characterIndex = useRandomCharacter(image);

  const TILE_SIZE = 32;
  const WIDTH = TILE_SIZE * 34;
  const HEIGHT = TILE_SIZE * 19;

  const { staticDots, staticMap, interactionList } = new GameMap(
    TILE_SIZE,
    WIDTH,
    HEIGHT,
    currentMap
  ).gameMap;

  const game = useCanvas(
    Game,
    {
      pitchDetectorRef,
      staticDots,
      interactionList,
      getNextMap,
      images: image,
      characterIndex,
    },
    isLoaded
  );

  const background = useCanvas(
    BackGround,
    {
      staticMap,
      images: image,
    },
    isLoaded
  );

  return (
    <>
      {isLoaded ? (
        <Wrapper>
          {currentMap === 0 && <GameManual imgSrc={manualImage} />}
          <Canvas
            id="game-layer"
            ref={game}
            position="absolute"
            width={WIDTH}
            height={HEIGHT}
          />
          <Canvas
            id="background-layer"
            ref={background}
            position="absolute"
            width={WIDTH}
            height={HEIGHT}
            bgImage={image.backgrounds[currentMap].src}
          />
          <div>W: 점프 A: 좌 D: 우</div>
        </Wrapper>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default LittleForestContainer;
