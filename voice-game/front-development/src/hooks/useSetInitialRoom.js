/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router";
import { joinRoomAction } from "../actions/gameActionCreators";

/**
 *
 * @param {object} socket socket
 * @param {function} updateOtherPlayers
 * @returns memoized function for setting initial room
 */
const useSetInitialRoom = (socket, updateOtherPlayers) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const param = useParams();

  const roomData = useSelector((state) => state.roomReducer);
  const { playerData } = useSelector((state) => state.authReducer);

  const gameTitle = location.pathname.split("/")[2];
  const roomId = param.roomId;
  const currentRoom = roomData[gameTitle].filter(
    (room) => room.roomId === roomId
  )[0];

  return useCallback(() => {
    socket.emit("join-room", roomId, playerData);

    if (currentRoom?.createdBy !== playerData._id) {
      dispatch(joinRoomAction(gameTitle, roomId, playerData));

      const existingPlayers = currentRoom?.players.filter(
        (player) => player.playerId !== playerData.playerId
      );

      updateOtherPlayers(existingPlayers);
    }
  }, []);
};

export default useSetInitialRoom;
