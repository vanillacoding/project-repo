import React from 'react';
import styled from 'styled-components';
import { POSITION_GUIDE_MATRIX } from '../../../common/constants/chess';
import { flexCenter } from '../../styles/mixin';

export default function PositionGuide() {
  return (
    <>
      {POSITION_GUIDE_MATRIX.map((row, x) => {
        return row.map((data, y) => {
          if (data === 0) return <EmptyDiv key={`EmptyDiv${x}${y}`} />;
          return (
            <BorderPositionInfo key={`PositionGuide${x}${y}`} x={y} y={x + 1}>
              <BorderPositionInfoInnerBox>{data}</BorderPositionInfoInnerBox>
            </BorderPositionInfo>
          );
        });
      })}
    </>
  );
}

const EmptyDiv = styled.div`
  width: 80px;
  height: 80px;
`;

const BorderPositionInfo = styled.div`
  ${flexCenter}
  height: 80px;
  width: 80px;
  grid-gap: 0px;
  grid-column: ${({ x }) => x};
  grid-row: ${({ y }) => y};
`;

const BorderPositionInfoInnerBox = styled.div`
  font-size: 70px;
`;
