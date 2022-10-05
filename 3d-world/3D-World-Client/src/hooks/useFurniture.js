import { useEffect, useState } from "react";

import fetchData from "../utils/fetchData";
import checkArea from "../utils/checkArea";
import { furnitureSocket } from "../utils/socket";
import { updateError } from "../reducers/roomSlice";

function useFurniture({
  isSocketReady,
  room,
  isEditMode,
  dispatch,
}) {
  const [furnitures, setFurnitures] = useState(room?.furniture);
  const [currentFurnitureId, setCurrentFurnitureId] = useState(null);

  useEffect(() => {
    if (!room) return;

    setFurnitures(room?.furniture);
  }, [room]);

  useEffect(() => {
    if (!isSocketReady) return;

    furnitureSocket.listenFurnitureMovement(updateFurniture);
  }, [isSocketReady]);

  function updateFurniture({ _id, position }) {
    setFurnitures((prev) => prev.map((furniture) => {
      if (furniture._id !== _id) {
        return furniture;
      }

      return { ...furniture, position };
    }));
  }

  function handleFurnitureSelect(furnitureId) {
    if (!isEditMode || currentFurnitureId === furnitureId) return;

    setFurnitures((prev) => prev.map((furniture) => {
      if (furniture._id !== furnitureId) {
        return furniture;
      }

      const [x, y, z] = furniture.position;

      return { ...furniture, position: [x, y + 20, z] };
    }));

    setCurrentFurnitureId(furnitureId);
  }

  async function handleFurnitureMove(x, y) {
    if (!currentFurnitureId || !isEditMode) return;
    if (checkArea(x, y).isOccupied) return;

    const height = furnitures.find((furniture) => furniture._id === currentFurnitureId).position[1];
    const furniturePosition = [(x * 40), height - 20, (y * 40)];
    const changedFurniture = { _id: currentFurnitureId, position: furniturePosition };

    updateFurniture(changedFurniture);
    setCurrentFurnitureId(null);

    furnitureSocket.sendUpdatedFurniture(changedFurniture);

    try {
      await fetchData("PATCH", "/furniture", changedFurniture);
    } catch (err) {
      dispatch(updateError(err.message));
    }
  }

  return {
    furnitures,
    currentFurnitureId,
    handleFurnitureSelect,
    handleFurnitureMove,
  };
}

export default useFurniture;
