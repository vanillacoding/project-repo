import React, { useRef, useCallback } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { debounce } from "lodash";

import { Link } from "react-router-dom";
import ContentViewer from "../components/ContentViewer";
import ContentViewerWrapper from "../components/Wrapper";
import SIZE from "../constants/numbers";

const { CONTENT_PER_PAGE } = SIZE;
const CELL_GAP = 7;
const WHEEL_TIME = 300;

const LinkWrapper = styled(Link).attrs(({ $marginLeft }) => ({ $marginLeft }))`
  margin-left: ${(props) => props.$marginLeft + "px"};
`;

const ContentSpectatorWrapper = styled.div`
  display: grid;
  width: 600px;
  height: 600px;
  grid-template-rows: repeat(${CONTENT_PER_PAGE}, 80px);
  grid-rows-gap: ${CELL_GAP}px;
  margin: 10px;

  ::-webkit-scrollbar {
    display: none;
  }

  ${LinkWrapper} {
    position: relative;
  }

  ${LinkWrapper}:not(:last-child):hover {
    transform: translate(0, -70%);
    transition: 0.1s transform;
  }

  ${LinkWrapper}:hover > ${ContentViewerWrapper} {
    background-color: ${({ theme }) => theme.background.point};
  }
`;

function getMarginByIndex(index) {
  const divider = 2;
  const center = Math.floor(CONTENT_PER_PAGE / divider);
  const multiplier = center - Math.abs(center - index) - 1;
  const unitSize = 60;

  return multiplier * unitSize;
}

function calcRange(deltaY) {
  const delta = Math.abs(deltaY);
  const divider = 2;
  const onePoint = 50;
  const halfPoint = 200;
  const half = Math.ceil(CONTENT_PER_PAGE / divider);

  if (delta < onePoint) {
    return 1;
  }

  if (delta < halfPoint) {
    return half;
  }

  return CONTENT_PER_PAGE;
}

function ContentSpectator({
  creatorId, category, contents, onWheel,
}) {
  const scrollWrapper = useRef(null);

  const handleWheel = function ({ deltaY }) {
    const isAscending = deltaY > 0;
    const range = calcRange(deltaY);

    onWheel(isAscending, range);
  };

  const debouncedHandleWheel = useCallback(debounce(handleWheel, WHEEL_TIME));

  return (
    <ContentSpectatorWrapper ref={scrollWrapper} onWheel={debouncedHandleWheel}>
      {contents.map((content, index) => (
        <LinkWrapper
          to={`/${creatorId}/${category}/${content._id}`}
          key={content._id + index}
          $marginLeft={getMarginByIndex(index)}
        >
          <ContentViewer
            key={content._id}
            date={content.date}
            heartCount={content.rating?.heartCount}
            url={content.url || "/img/no-picture.png"}
            hasText={false}
          >
          </ContentViewer>
        </LinkWrapper>
      ))}
    </ContentSpectatorWrapper>
  );
}

ContentSpectator.propTypes = {
  creatorId: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  contents: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      rating: PropTypes.shape({
        heartCount: PropTypes.number,
      }),
      url: PropTypes.string,
    })),
  onWheel: PropTypes.func.isRequired,
};

export default ContentSpectator;
