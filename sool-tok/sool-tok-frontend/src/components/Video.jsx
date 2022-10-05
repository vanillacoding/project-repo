import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function Video({ peer }) {
  const ref = useRef();

  useEffect(() => {
    if (!peer) return;

    peer.on('stream', stream => {
      ref.current.srcObject = stream;
    });
  }, [peer]);

  return (<StyledVideo ref={ref} autoPlay playsInline />);
}

export const StyledVideo = styled.video`
  object-fit: cover;
  background-color: #ff3cac;
  background-image: linear-gradient(225deg, #ff3cac 0%, #784ba0 50%, #2b86c5 100%);
  border-radius: 160px;
  width: 320px;
  height: 320px;
  transform: scaleX(-1);
`;

export default Video;

Video.propTypes = {
  peer: PropTypes.object,
};
