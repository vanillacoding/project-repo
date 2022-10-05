import React from "react";

import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";

const loadingAnimation = keyframes`
  0% {
    transform: scaleY(1);
  }

  25% {
    transform: scaleY(3);
  }

  50% {
    transform: scaleY(1);
  }

  100% {
    transform: scaleY(1);
  }
`;

const Loading = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  color: ${({ theme }) => theme.color.white};

  &.full-screen {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 20;

    & > div {
      top: calc(50% - 55px);
      left: calc(50% - 55px);
    }
  }
`;

const Loader = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
`;

const LoadingIcon = styled.ul`
  li {
    list-style: none;
    display: inline-block;
    width: 5px;  height: 40px;
    margin: 0 3px;
    background: ${({ theme }) => theme.color.white};
    animation: ${loadingAnimation} 1.5s infinite linear;
  }

  li:first-child {
    animation-delay: 0s;
  }
  li:nth-child(2) {
    animation-delay: 0.1s;
  }
  li:nth-child(3) {
    animation-delay: 0.2s;
  }
  li:nth-child(4) {
    animation-delay: 0.3s;
  }
  li:nth-child(5) {
    animation-delay: 0.4s;
  }
  li:nth-child(6) {
    animation-delay: 0.5s;
  }
  li:nth-child(7) {
    animation-delay: 0.6s;
  }
  li:nth-child(8) {
    animation-delay: 0.7s;
  }
  li:last-child {
    animation-delay: 0.8s;
  }
`;

const LoadingText = styled.div`
  width: 100%;
  margin: 50px 0 0 0;
  text-align: center;
  color: ${({ theme }) => theme.color.white};
`;

function SharedLoading({ isFullScreen }) {
  return (
    <Loading
      className={isFullScreen && "full-screen"}
    >
      <Loader>
        <LoadingIcon>
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
        </LoadingIcon>
        <LoadingText>Loading...</LoadingText>
      </Loader>
    </Loading>
  );
}

SharedLoading.propTypes = {
  isFullScreen: PropTypes.bool.isRequired,
};

export default SharedLoading;
