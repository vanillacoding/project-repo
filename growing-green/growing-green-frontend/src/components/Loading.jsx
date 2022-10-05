import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Loading = ({ size = '80px', text = '로딩중...' }) => {
  return (
    <Wrapper>
      <LoadingSpinner size={size} data-testid="loading-spinner" />
      <p>{text}</p>
    </Wrapper>
  );
};

Loading.propTypes = {
  size: PropTypes.string,
  text: PropTypes.string,
};

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoadingSpinner = styled.div`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: 50%;
  border: 6px solid #999;
  box-sizing: border-box;
  -webkit-animation: rsm-sweep 1s linear alternate infinite,
    rsm-rotate 0.8s linear infinite;
  animation: rsm-sweep 1s linear alternate infinite,
    rsm-rotate 0.8s linear infinite;

  @keyframes rsm-rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes rsm-sweep {
    0% {
      -webkit-clip-path: polygon(
        0% 0%,
        0% 0%,
        0% 0%,
        50% 50%,
        0% 0%,
        0% 0%,
        0% 0%
      );
      clip-path: polygon(0% 0%, 0% 0%, 0% 0%, 50% 50%, 0% 0%, 0% 0%, 0% 0%);
    }
    50% {
      clip-path: polygon(
        0% 0%,
        0% 100%,
        0% 100%,
        50% 50%,
        100% 0%,
        100% 0%,
        0% 0%
      );
    }
    100% {
      clip-path: polygon(
        0% 0%,
        0% 100%,
        100% 100%,
        50% 50%,
        100% 100%,
        100% 0%,
        0% 0%
      );
    }
  }
`;

export default Loading;
