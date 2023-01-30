import React from "react";
import { useDispatch, useSelector } from "react-redux";

import styled, { css } from "styled-components";

import DIFF_TYPES from "../config/constants/diffTypes";
import THEME_COLORS from "../config/constants/themeColors";
import {
  toggleSlideChecked,
  toggleSlideHovered,
} from "../features/diffDataReducer";
import SlideListItemSection from "./SlideListItemSection";

const getHighlightByDiffState = (isHovered, isChecked) => {
  if (isHovered) {
    return THEME_COLORS.HIGHLIGHT_HOVERED;
  }

  return isChecked
    ? THEME_COLORS.HIGHLIGHT_ADDED
    : THEME_COLORS.HIGHLIGHT_DELETED;
};

function SlideListSlideSection({ slideData, fileType }) {
  const dispatch = useDispatch();
  const { slideId, slideWidth, slideHeight } = slideData;
  const { diff, isChecked, isHovered } = useSelector(
    ({ diffData }) => diffData[slideId] ?? {},
  );
  const isChangedSlide =
    diff === DIFF_TYPES.ADDED || diff === DIFF_TYPES.DELETED;
  const changedSlideProps = {
    isChangedSlide,
    highlight: getHighlightByDiffState(isHovered, isChecked),
    onClick: () => dispatch(toggleSlideChecked(slideId)),
    onMouseEnter: () => dispatch(toggleSlideHovered(slideId)),
    onMouseLeave: () => dispatch(toggleSlideHovered(slideId)),
  };

  return (
    <SlideSectionContainer
      slideAspectRatio={`${slideWidth} / ${slideHeight}`}
      {...(isChangedSlide && changedSlideProps)}
    >
      {slideData.items.map((item) => (
        <SlideListItemSection
          key={`${item.order}/${item.itemId}`}
          itemData={{ ...item, slideWidth, slideHeight }}
          slideId={slideId}
          fileType={fileType}
        />
      ))}
    </SlideSectionContainer>
  );
}

const SlideSectionContainer = styled.section`
  position: relative;
  margin: 1rem;
  margin-bottom: 0;
  border: 1px solid rgba(0, 0, 0, 0.3);
  background: ${THEME_COLORS.SLIDE_BACKGROUND};
  box-shadow: rgba(6, 24, 44, 0.65) 0px 4px 6px -1px;
  aspect-ratio: ${({ slideAspectRatio }) => slideAspectRatio};
  flex: none;
  font-family: "sans-serif";

  &:last-child {
    margin-bottom: 0;
  }

  ${({ isChangedSlide, highlight }) =>
    isChangedSlide &&
    css`
      &::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        border: 1px solid ${highlight};
        background-color: rgba(0, 0, 0, 0);
        background-image: repeating-linear-gradient(
          -45deg,
          transparent,
          transparent 50px,
          ${highlight} 0,
          ${highlight} 51.5px
        );
        z-index: 100;
      }
    `}
`;

export default SlideListSlideSection;
