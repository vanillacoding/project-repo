import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { v4 as uuidv4 } from "uuid";
import { createRoomAction } from "../actions/gameActionCreators";

/**
 *
 * @param {string} gameTitle current game title
 * @param {object} player current player
 * @returns function create new room
 */
const useCreateRoom = (gameTitle, player) => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const createRoom = useCallback(async () => {
    const newRoomId = uuidv4();

    await dispatch(createRoomAction(gameTitle, newRoomId, player._id));

    history.push(`${location.pathname}/${newRoomId}`);
  }, [history, location.pathname, dispatch, gameTitle, player]);

  return createRoom;
};

export default useCreateRoom;
