import { useEffect, useRef } from "react";

import StyledVideo from "../shared/StyledVideo";

export default function SubVideo({ peer }) {
  const ref = useRef();

  useEffect(() => {
    if (!peer) {
      return;
    }

    peer.on("stream", (stream) => {
      ref.current.srcObject = stream;
    });
  }, [peer]);

  return (
    <StyledVideo playsInline autoPlay ref={ref} />
  );
}
