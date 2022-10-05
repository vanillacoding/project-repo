import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function PlayerVideo({ peer }) {
  const ref = useRef();

  useEffect(() => {
    if (!peer) return;

    peer.on('stream', (stream) => {
      ref.current.srcObject = stream;
    });
  }, [peer]);

  return <video ref={ref} autoPlay width="220px" height="150px" />;
}

PlayerVideo.propTypes = {
  peer: PropTypes.object,
};
