import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

function MyVideo ({ stream }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!videoRef.current || !stream) {
      return;
    }

    videoRef.current.srcObject = stream;
  }, [stream]);

  return <video ref={videoRef} autoPlay playsInline muted={true} />;
}

MyVideo.propTypes = {
  stream: PropTypes.object,
};

export default React.memo(MyVideo);
