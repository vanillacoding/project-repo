import { MouseEventHandler, ReactChild, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  width: fit-content;
  height: fit-content;
`;

const Message = styled.div<{ top: string; left: string }>`
  position: fixed;
  ${({ top, left }) => `top: ${top}; left: ${left};`}
  display: flex;
  align-items: center;
  width: max-content;
  height: 20px;
  line-height: 20px;
  font-size: 10px;
  overflow: hidden;
  border-radius: 0;
  color: white;
  background-color: #0000006f;
  z-index: 9999;
`;

interface TooltipProps {
  children: ReactChild;
  message: string;
}

export default function Tooltip({ children, message }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: "0px", left: "0px" });

  const handleMouseEnter: MouseEventHandler<HTMLDivElement> = (event) => {
    setPosition({ top: `${event.clientY}px`, left: `${event.clientX}px` });
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  const { top, left } = position;

  return (
    <Wrapper onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {children}
      {isVisible && (
        <Message top={top} left={left} className="tooltip">
          {message}
        </Message>
      )}
    </Wrapper>
  );
}
