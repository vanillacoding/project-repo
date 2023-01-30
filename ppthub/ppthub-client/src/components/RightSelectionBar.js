import React from "react";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

import styled, { keyframes } from "styled-components";

import THEME_COLORS from "../config/constants/themeColors";
import RightSelectionBarSlideSection from "./RightSelectionBarSlideSection";

function RightSelectionBar() {
  const selectionListSelector = createSelector(
    (state) => state.diffData,
    (state) => state.slideOrderList,
    (diffData, slideOrderList) =>
      slideOrderList.map((slideId, index) => {
        const slideDiffData = diffData[slideId];
        return {
          slideId,
          slideName: `Slide ${index + 1}`,
          ...slideDiffData,
        };
      }),
  );
  const selectionList = useSelector(selectionListSelector);

  return (
    <SelectionBarContainer>
      <SelectionBarList>
        {selectionList.map((slideSelectionData) => (
          <RightSelectionBarSlideSection
            key={slideSelectionData.slideId}
            slideData={slideSelectionData}
          />
        ))}
      </SelectionBarList>
    </SelectionBarContainer>
  );
}

const slide = keyframes`
  from {
    width: 0;
  }
  to {
    width: 25%;
  }
`;

const SelectionBarContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 25%;
  height: 100%;
  background-color: ${THEME_COLORS.MAIN_BACKGROUND};
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
  animation: ${slide} 1s ease-out;
  z-index: 2;
  scrollbar-width: none;
  -ms-overflow-style: none;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const SelectionBarList = styled.ul`
  height: 75%;
  overflow: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export default React.memo(RightSelectionBar);
