import React from "react";
import useReceiveStreaming from "../../hooks/useReceiveStreaming";

function Viewer() {
  const { videoRef, streamingRef } = useReceiveStreaming();

  return (
    <div>
      <div className="canvas-container">
        <img ref={streamingRef} alt="streaming" className="streaming-image" />
      </div>
      <video className="viewer-video" ref={videoRef} autoPlay />
    </div>
  );
}

export default Viewer;
