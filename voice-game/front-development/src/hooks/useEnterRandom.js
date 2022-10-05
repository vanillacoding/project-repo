import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import pickRandomRoom from "../utils/pickRandomRoom";

/**
 *
 * @param {string} gameTitle current game title
 * @param {function} showErrorMessage function display current error message
 */
const useEnterRandom = (gameTitle, showErrorMessage) => {
  const history = useHistory();
  const location = useLocation();
  const roomList = useSelector((state) => state.roomReducer[gameTitle]);

  const enterRandomRoom = useCallback(() => {
    const picked = pickRandomRoom(roomList);

    if (picked) {
      history.push(`${location.pathname}/${picked.roomId}`);

      return;
    }

    showErrorMessage("입장 가능한 방이 없습니다.");
  }, [history, location.pathname, roomList, showErrorMessage]);

  return enterRandomRoom;
};

export default useEnterRandom;
