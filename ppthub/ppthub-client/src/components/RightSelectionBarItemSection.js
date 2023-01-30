import React from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";

import THEME_COLORS from "../config/constants/themeColors";
import {
  toggleItemChecked,
  toggleItemHovered,
} from "../features/diffDataReducer";

const getItemHighlightByDiffState = (isHovered, isChecked) => {
  if (isHovered) {
    return THEME_COLORS.HIGHLIGHT_HOVERED;
  }

  return isChecked
    ? THEME_COLORS.HIGHLIGHT_ADDED
    : THEME_COLORS.HIGHLIGHT_DELETED;
};

function RightSelectionBarItemSection({ itemData, slideId }) {
  const dispatch = useDispatch();
  const { isChecked, isHovered } = useSelector(
    ({ diffData }) => diffData[slideId].items[itemData.itemId],
  );

  return (
    <li>
      <ItemLabel
        highlight={getItemHighlightByDiffState(isHovered, isChecked)}
        onMouseEnter={() =>
          dispatch(toggleItemHovered({ itemId: itemData.itemId, slideId }))
        }
        onMouseLeave={() =>
          dispatch(toggleItemHovered({ itemId: itemData.itemId, slideId }))
        }
      >
        <ItemHeader
          highlight={getItemHighlightByDiffState(isHovered, isChecked)}
        >
          <CheckStatus>{isChecked ? "+" : "-"}</CheckStatus>
          {itemData.itemId}
        </ItemHeader>
        <Checkbox
          checked={isChecked}
          type="checkbox"
          onChange={() => {
            window.location.href = `#${slideId}-PPT_DATA_TYPES/ORIGINAL_PPT_DATA`;
            dispatch(toggleItemChecked({ itemId: itemData.itemId, slideId }));
          }}
        />
      </ItemLabel>
    </li>
  );
}

const ItemLabel = styled.label`
  display: block;
`;

const ItemHeader = styled.h2`
  position: relative;
  margin: 1rem 0 0 3rem;
  font-size: 1.1rem;
  text-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;
  color: ${({ highlight }) => highlight};
`;

const Checkbox = styled.input`
  display: none;
`;

const CheckStatus = styled.span`
  position: absolute;
  top: -0.2rem;
  left: -1rem;
  font-size: 1.4rem;
  color: inherit;
  text-shadow: none;
`;

export default RightSelectionBarItemSection;
