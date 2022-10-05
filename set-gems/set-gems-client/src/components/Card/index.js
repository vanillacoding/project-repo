import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";

import "./Card.css";
import { getBackgroundImageUri, getGemImageUri } from "../../helper/image";
import {
  GEM_COLOR,
  GEM_SHAPE,
  METAL_COLOR,
  METAL_SHAPE,
} from "../../constants/cardProperty";

function Card({
  index,
  state,
  gemColor,
  gemShape,
  metalColor,
  metalShape,
  onClick,
}) {
  const animationTime = 500;
  const [isNew, setIsNew] = useState(false);
  const canvasRef = useRef(null);
  const backgroundImageUri = getBackgroundImageUri(metalColor, metalShape);
  const gemImageUri = getGemImageUri(gemColor, gemShape);

  useEffect(() => {
    setIsNew(true);

    const canvas = canvasRef.current;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const context = canvas?.getContext("2d");

    (async function drawImages() {
      const backgroundImage = new Image();
      backgroundImage.src = backgroundImageUri;
      await backgroundImage.decode();

      const gemImage = new Image();
      gemImage.src = gemImageUri;
      await gemImage.decode();

      const gemX = canvas.width / 4;
      const gemY = canvas.height / 4;
      const gemWidth = canvas.width / 2;
      const gemHeight = canvas.height / 2;

      context?.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
      context?.drawImage(gemImage, gemX, gemY, gemWidth, gemHeight);
    }) ();

    const timer = setTimeout(() => {
      setIsNew(false);
    }, animationTime);

    return () => clearTimeout(timer);
  }, [gemColor, gemShape, metalColor, metalShape]);

  const handleClick = ({ currentTarget }) => {
    if (onClick) {
      onClick(index, currentTarget);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={isNew ? "new card" : `${state} card`}
    >
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

Card.propTypes = {
  index: PropTypes.number,
  state: PropTypes.string,
  gemColor: PropTypes.oneOf(Object.values(GEM_COLOR)).isRequired,
  gemShape: PropTypes.oneOf(Object.values(GEM_SHAPE)).isRequired,
  metalColor: PropTypes.oneOf(Object.values(METAL_COLOR)).isRequired,
  metalShape: PropTypes.oneOf(Object.values(METAL_SHAPE)).isRequired,
  onClick: PropTypes.func,
};

export default React.memo(Card);
