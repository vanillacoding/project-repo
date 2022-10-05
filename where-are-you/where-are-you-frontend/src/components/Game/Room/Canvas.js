import React, { useRef } from "react";

import PropTypes from "prop-types";

import useCanvas from "../../../hooks/useCanvas";
import LeftButton from "../../Shared/LeftButton";
import RightButton from "../../Shared/RightButton";

function RoomCavnas(props) {
  const {
    runImageAction,
    room,
    items,
    leftButton,
    rightButton,
    description
  } = props;

  const canvasRef = useRef();

  useCanvas(room, canvasRef, items, runImageAction);

  return (
    <>
      {leftButton
        && <LeftButton path={leftButton.path} text={leftButton.text} />}
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
      >
        <h2>{room}</h2>
        <p className="sr-only">{description}</p>
      </canvas>
      {rightButton
        && <RightButton path={rightButton.path} text={rightButton.text} />}
    </>
  );
}

RoomCavnas.propTypes = {
  runImageAction: PropTypes.func.isRequired,
  room: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  leftButton: PropTypes.object,
  rightButton: PropTypes.object,
  description: PropTypes.string.isRequired
};

RoomCavnas.defaultProps = {
  leftButton: null,
  rightButton: null
};

export default RoomCavnas;
