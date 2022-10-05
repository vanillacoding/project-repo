import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Graphics } from '@inlet/react-pixi';

import { convertColor } from '../utils/color';
import { calcRectInfos } from '../utils/calcLayout';
import theme from '../context/theme';

export default function DrawButton({
  log,
  index,
  targetCommit,
  onClickHandler,
}) {
  const {
    size: { graph2dNodeSpacing, graph2dNodeRadius, graph2dButtonAlpha },
  } = theme;
  const buttonGraphics = useCallback(
    (button) => {
      button.clear();
      button.alpha = log.hash === targetCommit ? graph2dButtonAlpha : 0;
      button.beginFill(convertColor(log.color));
      button.buttonMode = true;
      button.drawRect(
        ...calcRectInfos(index, graph2dNodeSpacing, graph2dNodeRadius),
      );
      button.interactive = true;
      button.click = () => {
        onClickHandler(index, log.hash);
      };
      button.on('mouseover', () => {
        button.alpha = 0.3;
      });
      button.on('mouseout', () => {
        button.alpha = log.hash === targetCommit ? graph2dButtonAlpha : 0;
      });
      button.buttonMode = true;
    },
    [log.hash === targetCommit],
  );

  return <Graphics draw={buttonGraphics} />;
}

DrawButton.defaultProps = {
  targetCommit: '',
};

DrawButton.propTypes = {
  log: PropTypes.shape({
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
  }).isRequired,
  index: PropTypes.number.isRequired,
  targetCommit: PropTypes.string,
  onClickHandler: PropTypes.func.isRequired,
};
