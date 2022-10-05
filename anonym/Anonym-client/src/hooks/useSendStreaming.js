import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { endStreaming, sendStreaming } from "../api/webRTC";

const useSendStreaming = (isOn, videoRef, characterRef) => {
  const { id } = useParams();

  useEffect(() => {
    if (isOn) {
      const stream = videoRef.current.srcObject;

      sendStreaming(stream, id, characterRef);
    }

    return () => {
      if (isOn === false) {
        endStreaming(id);
      }
    };
  }, [isOn, videoRef, characterRef, id]);
};

export default useSendStreaming;
