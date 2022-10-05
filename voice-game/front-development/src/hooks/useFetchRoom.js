import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import Pusher from "pusher-js";

import { fetchRoomsAction } from "../actions/gameActionCreators";

/**
 *
 * @param {string} gameTitle current game title
 * @param {function} showErrorMessage functioin display current error message
 */
const useFetchRooms = (gameTitle, showErrorMessage) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const fetchRooms = useCallback(() => {
    dispatch(fetchRoomsAction(gameTitle));
  }, [dispatch, gameTitle]);

  useEffect(() => {
    if (location.state) {
      showErrorMessage(location.state);
      location.state = null;
    }

    fetchRooms(gameTitle);

    const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
      cluster: "ap3",
    });
    const channel = pusher.subscribe("rooms");

    channel.bind("changed", () => {
      fetchRooms(gameTitle);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [fetchRooms, location, gameTitle, location.state, showErrorMessage]);
};

export default useFetchRooms;
