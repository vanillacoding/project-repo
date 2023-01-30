import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export default function MindMapThumbnail({ url, width }) {
  const [screenSize, setScreenSize] = useState({});
  const [ratio, setRatio] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!window) return;

    setScreenSize({
      width: window.screen.width,
      height: window.screen.height,
    });

    setRatio(width / screenSize.width);
  }, [containerRef.current?.offsetWidth]);

  const siteLoaded = () => {
    setIsLoading(!isLoading);
  };

  return (
    <Container ref={containerRef}>
      <Wrapper scale={ratio || 1}>
        {isLoading && (
          <Loading data-testid="loading-element" scale={ratio || 1}>
            <span className="loader" />
          </Loading>
        )}
        <Thumbnail
          tabIndex="-1"
          title="mindmap-thumbnail"
          src={url}
          allow="src"
          sandbox="allow-scripts allow-same-origin"
          width={screenSize.width}
          height={screenSize.height}
          scale={ratio || 1}
          onLoad={siteLoaded}
          interactive="false"
          loading="lazy"
        />
      </Wrapper>
    </Container>
  );
}

MindMapThumbnail.propTypes = {
  url: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
};

const Container = styled.div`
  display: block;
  overflow: hidden;
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  pointer-events: none;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  pointer-events: none;
  transform: ${props => `translateY(${props.scale * -100}px)`};
`;

const Thumbnail = styled.iframe`
  display: block;
  position: absolute;
  z-index: 1;
  border: none;
  border-radius: 0;
  pointer-events: none;
  transform-origin: ${props => `-${props.scale + 7}% ${props.scale * -100}px`};
  transform: ${props => `scale(${props.scale + 0.1})`};
`;

const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 2;
  width: 100%;
  height: 100%;
  opacity: 100;
  background-color: #f5f5f5;
  transform: ${props => `translateY(${props.scale * 100}px)`};

  .loader {
    display: inline-block;
    width: 48px;
    height: 48px;
    border: 5px solid #fff;
    border-bottom-color: transparent;
    border-radius: 50%;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
