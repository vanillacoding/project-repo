import React from "react";

import styled, { keyframes } from "styled-components";

const strokeIt = keyframes`
  to {
    stroke-dashoffset: 0;
  }
`;

const Puzzle = styled.svg`
  width:100px;
  fill: ${({ theme }) => theme.color.background};
  stroke: ${({ theme }) => theme.color.black};
  stroke-width:4px;
  stroke-linecap: round;
  stroke-dasharray: 1400;
  stroke-dashoffset: 1400;
  animation: ${strokeIt} 1.5s ease-in-out forwards;
`;

function PuzzleIcon() {
  return (
    <Puzzle id="puzzleIcon" data-name="Puzzle piece icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 276 228">
      <path d="M3,11S39.2-5,64.5,5.7c28.2,11.9,5.3,28.3.3,49.2C61,71.2,85.1,85.1,98.1,84.8s41.2-2.7,43.9-26.3c2-17.6-24-26.9-8.6-47.5,6.6-9,55.2-8,68.2,3.7,0,0-18.5,49.5,0,73.5,10,13,29.9-9.7,41.6-12.3,0,0,33.3-5,30.3,42.6s-31.9,36.6-38.9,31.3-38-24.9-40.9,18.3c-2,29.3,7.6,35.2,8.3,47.2,0,0-40.9,20.6-70.2.7-12.2-8.3,2.1-29.7,6.1-38.6,2.7-5.5,11.7-16.3-13.7-30.6-16-9-58.5-2.7-58.5,26.9,0,9.3,9,16.1,13.6,33.2,1.2,4.6,1,18.5-33.9,18.6-21,0-40.9-8.9-40.9-8.9Z"/>
    </Puzzle>
  );
}

export default PuzzleIcon;
