import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { Graphics } from '@inlet/react-pixi';
import { convertColor } from '../utils/color';

const INITIAL_POSITION_X = 100;
const INITIAL_POSITION_Y = 25;

export default function DrawLine({ lineList }) {
  const drawLine = useCallback(
    (graph) => {
      const calcPosition = (linePosition) => {
        const modifiedPosition = {
          x: linePosition[0] + INITIAL_POSITION_X,
          y: linePosition[1] + INITIAL_POSITION_Y,
        };

        return modifiedPosition;
      };

      graph.clear();
      lineList.forEach((line) => {
        const color = convertColor(line.color);
        const points = [...line.points];
        const firstPoint = points.shift();
        const firstPosition = calcPosition(firstPoint);

        graph.lineStyle(2, color);
        graph.moveTo(firstPosition.x, firstPosition.y);

        line.points.forEach((point) => {
          const pointPosition = calcPosition(point);
          graph.lineTo(pointPosition.x, pointPosition.y);
        });
      });

      graph.endFill();
    },
    [lineList],
  );

  return <Graphics draw={drawLine} />;
}

DrawLine.propTypes = {
  lineList: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string.isRequired,
      points: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number.isRequired)),
    }),
  ).isRequired,
};
