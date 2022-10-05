import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Graphics } from '@inlet/react-pixi';

import { convertColor } from '../utils/color';
import { calcHalf } from '../utils/calcLayout';
import theme from '../context/theme';

export default function DrawNode({ logList }) {
  const draw = useCallback(
    (node) => {
      node.clear();

      logList.forEach((log, index) => {
        const color = convertColor(log.color);

        node.beginFill(color);
        node.drawCircle(
          log.position * theme.size.graph2dNodeSpacing + 50,
          index * theme.size.graph2dNodeSpacing +
            calcHalf(theme.size.graph2dNodeSpacing),
          theme.size.graph2dNodeRadius,
        );
        node.endFill();

        const black = convertColor(theme.background.black);

        node.beginFill(black);
        node.drawCircle(
          log.position * theme.size.graph2dNodeSpacing + 50,
          index * theme.size.graph2dNodeSpacing +
            calcHalf(theme.size.graph2dNodeSpacing),
          theme.size.graph2dSmallNodeRadius,
        );
        node.endFill();
      });
    },
    [logList],
  );

  return <Graphics draw={draw} />;
}

DrawNode.propTypes = {
  logList: PropTypes.arrayOf(
    PropTypes.shape({
      message: PropTypes.string,
      author: PropTypes.string,
      authoredTime: PropTypes.string,
      committer: PropTypes.string,
      committedTime: PropTypes.string,
      parents: PropTypes.arrayOf(PropTypes.string),
      hash: PropTypes.string,
      branchNames: PropTypes.arrayOf(PropTypes.string),
      branchName2: PropTypes.string,
      head: PropTypes.bool,
      index: PropTypes.number,
      position: PropTypes.number,
      color: PropTypes.string,
    }),
  ).isRequired,
};
