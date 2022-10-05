import React from "react";

import { faPlus, faBaseballBall, faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import styled from "styled-components";

import SlotSkeleton from "./SlotSkeleton";

const Wrapper = styled.div`
  display: grid;
  grid-template: repeat(10, 1fr) / repeat(14, 1fr);
  grid-area: ${(props) => props.wrapperGridArea};
`;

const SlotBox = styled.div`
  background: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  grid-area: ${(props) => props.cardGridArea};
  position: relative;
`;

const Position = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  grid-row: ${(props) => props.rowStart};
  grid-column-start: ${(props) => props.columnStart};
  grid-column-end: span 5;

  p {
    font-family: "Bebas Neue";
    font-size: ${({ theme }) => theme.fontSize.base};
    text-align: center;
    color: ${({ theme }) => theme.color.white};
  }
`;

const PlayerImage = styled.img`
  width: 100%;
  height: 100%;
`;

const PlayerInfo = styled.div`
  grid-row: ${(props) => props.rowStart};
  grid-column-start: ${(props) => props.columnStart};
  grid-column-end: span 5;

  p {
    padding: 0.2em 0;
    font-family: "Bebas Neue";
    font-size: 15px;
    text-align: center;
    color: ${({ theme }) => theme.color.white};
    word-break: break-word;
  }
`;

const ResultInfo = styled.ul`
  padding: 0.3rem 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  font-size: 0.7rem;
  color: ${({ theme }) => theme.color.white};

  li {
    display: block;

    &:first-child {
      margin: 0 0 0.3rem 0;
    }

    span {
      margin: 0 0 0 0.3rem;
    }
  }
`;

function Slot({ slotPosition, roasterPosition, isSkeleton }) {
  const {
    title,
    wrapperGridArea,
    cardGridArea,
    rowStart,
    columnStart,
  } = slotPosition;

  const {
    name,
    playerPhotoUrl,
    team,
    score,
    totalBettingMoney,
  } = roasterPosition;

  return (
    <Wrapper wrapperGridArea={wrapperGridArea}>
      {!isSkeleton
        && (
        <Position rowStart={rowStart} columnStart={columnStart}>
          <p>{title}</p>
        </Position>
        )}
      <SlotBox cardGridArea={cardGridArea}>
        {isSkeleton
          ? <SlotSkeleton />
          : (
            name
              ? <PlayerImage src={playerPhotoUrl} />
              : <FontAwesomeIcon icon={faPlus} color="#0f4cd9" />
          )}
      </SlotBox>
      <PlayerInfo rowStart={rowStart + 6} columnStart={columnStart}>
        {name
          && <p>{`${name} / ${team}`}</p>}
        {score
          && (
            <ResultInfo>
              <li>
                <FontAwesomeIcon icon={faBaseballBall} color="white" />
                <span>{score}</span>
              </li>
              <li>
                <FontAwesomeIcon icon={faCoins} color="white" />
                <span>{totalBettingMoney}</span>
              </li>
            </ResultInfo>
          )}
      </PlayerInfo>
    </Wrapper>
  );
}

Slot.propTypes = {
  slotPosition: PropTypes.instanceOf(Object).isRequired,
  roasterPosition: PropTypes.instanceOf(Object).isRequired,
  isSkeleton: PropTypes.bool,
};

Slot.defaultProps = {
  isSkeleton: false,
};

export default React.memo(Slot);
