import styled, { css, keyframes } from "styled-components";

const buildStyle = ({
  top,
  left
}) => css`
  top: ${top};
  left: ${left};
`;

const fade = keyframes`
  0% {
    opacity: 0;
  }
  40% {
    opacity: 1;
  }
`;

const StyledTooltip = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 65px;
  height: 25px;
  border-radius: 3px;
  background: black;
  color: white;
  box-shadow: 4px 4px 5px rgba(0, 0, 0, 0.4);
  animation: ${fade} 0.5s alternate infinite;

  ${({ position }) => buildStyle(position)}
`;

export default function Tooltip({ tooltipPosition, content }) {
  return (
    < StyledTooltip position={tooltipPosition}>{content}</StyledTooltip>
  );
}
