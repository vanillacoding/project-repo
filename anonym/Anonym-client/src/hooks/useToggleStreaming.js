import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { generateStreaming, removeStreaming } from "../actions/streamingActionCreators";

const useToggleStreaming = (isOn, streamTitle, avatarRef) => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (isOn) {
        const streamingThumnail = avatarRef.current.toDataURL("image/png");

        dispatch(generateStreaming(streamTitle.trim(), streamingThumnail));
      }

      if (isOn === false) {
        dispatch(removeStreaming());
      }
    })();

    return () => {
      dispatch(removeStreaming());
    };
  }, [isOn, avatarRef, dispatch]);
};

export default useToggleStreaming;
