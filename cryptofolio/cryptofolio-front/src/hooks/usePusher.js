import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import Pusher from "pusher-js";

import actionCreator from "../actions/actionCreator";

/**
 *
 * @param {string} gameTitle current game title
 * @param {function} showErrorMessage functioin display current error message
 */
const usePusher = () => {
  const dispatch = useDispatch();

  const getPushedData = useCallback(() => {
    dispatch(actionCreator.getDataAction());
  }, [dispatch]);

  useEffect(() => {
    const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
      cluster: "ap3",
    });

    const metadataChannel = pusher.subscribe("metadatas");
    metadataChannel.bind("changed", () => {
      getPushedData();
    });

    return () => {
      metadataChannel.unbind_all();
      metadataChannel.unsubscribe();
    };
  }, [getPushedData]);
};

export default usePusher;
