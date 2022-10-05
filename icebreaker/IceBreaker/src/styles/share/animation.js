import { keyframes } from 'styled-components';

export const bounce = keyframes`
  0% {
    transform: translateY(-0px);
  }

  50% {
    transform: translateY(-5px);
  }

  100% {
    transform: translateY(0px);
  }
`;

export const pounding = keyframes`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.02);
  }

  100% {
    transform: scale(1);
  }
`;

export const smallPounding = keyframes`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.008);
  }

  100% {
    transform: scale(1);
  }
`;

export const rightAndLeft = keyframes`
  0% {
    transform: rotate(-4deg);
  }

  50% {
    transform: rotate(4deg);
  }

  100% {
    transform: rotate(-4deg);
  }
`;

export const emergency = keyframes`
 0% {
    transform: rotate(-10deg) scale(1);
  }

  50% {
    transform: scale(1.3);
  }

  100% {
    transform: rotate(10deg) scale(1);
  }
`;
