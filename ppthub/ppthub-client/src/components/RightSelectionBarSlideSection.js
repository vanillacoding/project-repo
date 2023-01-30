import React from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";

import DIFF_TYPES from "../config/constants/diffTypes";
import THEME_COLORS from "../config/constants/themeColors";
import {
  toggleSlideChecked,
  toggleSlideHovered,
} from "../features/diffDataReducer";
import RightSelectionBarItemSection from "./RightSelectionBarItemSection";

const getHighlightByDiffState = (isHovered, isChecked) => {
  if (isHovered) {
    return THEME_COLORS.HIGHLIGHT_HOVERED;
  }

  return isChecked
    ? THEME_COLORS.HIGHLIGHT_ADDED
    : THEME_COLORS.HIGHLIGHT_DELETED;
};

function RightSelectionBarSlideSection({ slideData }) {
  const dispatch = useDispatch();
  const { slideId, slideName, isChecked, isHovered } = slideData;
  const slideDiffData = useSelector(({ diffData }) => diffData[slideId]);
  const isChangedSlide =
    slideData.diff === DIFF_TYPES.ADDED ||
    slideData.diff === DIFF_TYPES.DELETED;
  const slideItems = Object.entries(slideData.items ?? {}).filter(
    (item) =>
      item[1].diff === DIFF_TYPES.MODIFIED ||
      item[1].diff === DIFF_TYPES.ADDED ||
      item[1].diff === DIFF_TYPES.DELETED,
  );

  return (
    <SlideSectionContainer>
      {isChangedSlide ? (
        <SlideLabel
          highlight={getHighlightByDiffState(isHovered, isChecked)}
          onMouseEnter={() => dispatch(toggleSlideHovered(slideId))}
          onMouseLeave={() => dispatch(toggleSlideHovered(slideId))}
        >
          <SlideHeader
            isChanged={isChangedSlide}
            isShadowed={isChecked}
            highlight={getHighlightByDiffState(isHovered, isChecked)}
          >
            <CheckStatus>{isChecked ? "+" : "-"}</CheckStatus>
            {slideName}
          </SlideHeader>
          <Checkbox
            type="checkbox"
            checked={slideDiffData.isChecked}
            onChange={() => {
              window.location.href = `#${slideId}-PPT_DATA_TYPES/ORIGINAL_PPT_DATA`;
              dispatch(toggleSlideChecked(slideId));
            }}
          />
        </SlideLabel>
      ) : (
        <>
          <SlideHeader
            onClick={() => {
              window.location.href = `#${slideId}-PPT_DATA_TYPES/ORIGINAL_PPT_DATA`;
            }}
          >
            {slideName}
          </SlideHeader>
          <ModifiedSlideItems>
            {slideItems.map((item) => (
              <RightSelectionBarItemSection
                key={item[0]}
                itemData={{ itemId: item[0], ...item[1] }}
                slideId={slideId}
              />
            ))}
          </ModifiedSlideItems>
        </>
      )}
    </SlideSectionContainer>
  );
}

const SlideSectionContainer = styled.li`
  overflow: auto;
`;

const SlideLabel = styled.label`
  display: block;
  overflow-y: hidden;
`;

const SlideHeader = styled.h1`
  position: relative;
  margin: 1rem 0 0 2.5rem;
  font-size: 1.4rem;
  text-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;
  color: ${({ highlight }) => highlight};
`;

const Checkbox = styled.input`
  display: none;
`;

const ModifiedSlideItems = styled.ul`
  margin-left: 1rem;
`;

const CheckStatus = styled.span`
  position: absolute;
  left: -1.2rem;
  font-size: 1.4rem;
  color: inherit;
  text-shadow: none;
`;

export default RightSelectionBarSlideSection;
