import React from "react";
import PropTypes from "prop-types";

import Floor from "./models/Floor";
import Furniture from "./models/Furniture";
import useFurniture from "../hooks/useFurniture";

function RoomFurniture({
  isSocketReady,
  room,
  isEditMode,
  dispatch,
}) {
  const {
    furnitures,
    currentFurnitureId,
    handleFurnitureSelect,
    handleFurnitureMove,
  } = useFurniture({
    isSocketReady,
    room,
    isEditMode,
    dispatch,
  });

  return (
    <>
      {furnitures && furnitures.map((furniture) => {
        const { _id, name, position } = furniture;

        function handleClick(e) {
          e.stopPropagation();
          handleFurnitureSelect(_id, position);
        }

        return (
          <Furniture
            key={_id}
            id={_id}
            name={name}
            position={position}
            isEditMode={isEditMode}
            onClick={handleClick}
          />
        );
      })}
      <Floor
        width={12}
        height={12}
        onClick={handleFurnitureMove}
        currentFurnitureId={currentFurnitureId}
      />
    </>
  );
}

RoomFurniture.propTypes = {
  isSocketReady: PropTypes.bool,
  room: PropTypes.any,
  isEditMode: PropTypes.bool,
  dispatch: PropTypes.func,
};

export default RoomFurniture;
