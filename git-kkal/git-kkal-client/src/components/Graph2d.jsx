import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import DrawGraph from '../canvas/DrawGraph';
import Description from './commitDetails/Description';

import theme from '../context/theme';
import UI from '../constants/ui';

export default function Graph2d({ repoData, targetCommit, handleNodeClick }) {
  if (!repoData.repoName) {
    return <div>데이터없음</div>;
  }

  const { logList, lineList, maxPipeCount } = repoData;
  const limitedLogList = logList.slice(0, theme.limit.maxNodeCount);
  const limitedLineList = lineList.slice(0, theme.limit.maxNodeCount);

  const onClickHandler = (_, hash) => {
    handleNodeClick(hash);
  };

  return (
    <Graph2dWrapper>
      <NavBar>
        <Item
          width={`${(maxPipeCount + 1) * theme.size.graph2dNodeSpacing}px`}
          borderRight
        >
          {UI.GRAPH}
        </Item>
        <Item borderRight>{UI.HASH}</Item>
        <Item>{UI.COMMIT}</Item>
      </NavBar>
      <Content>
        <DrawGraph
          logList={limitedLogList}
          lineList={limitedLineList.flat()}
          targetCommit={targetCommit}
          maxPipeCount={maxPipeCount}
          onClickHandler={onClickHandler}
        />
        <Description
          logList={limitedLogList}
          targetCommit={targetCommit}
          onClickHandler={onClickHandler}
        />
      </Content>
    </Graph2dWrapper>
  );
}

const Graph2dWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const NavBar = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: ${(props) => props.theme.size.graphNavBarHeight};
  background-color: ${(props) => props.theme.background.grey2};
  color: ${(props) => props.theme.font.grey};
`;

const Item = styled.div`
  width: ${({ width }) => width || '100px'};
  margin-left: 10px;
  border-right: ${(props) => (props.borderRight ? `2px solid grey` : '')};
  font-size: 0.8rem;
  box-sizing: border-box;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  height: ${(props) => `calc(100% - ${props.theme.size.graphNavBarHeight});`};
  overflow: scroll;
`;

Graph2d.defaultProps = {
  repoData: {
    repoName: '',
    logList: [
      {
        message: 'Message',
      },
    ],
  },
  targetCommit: '',
};

Graph2d.propTypes = {
  repoData: PropTypes.shape({
    repoName: PropTypes.string.isRequired,
    maxPipeCount: PropTypes.number.isRequired,
    logList: PropTypes.arrayOf(
      PropTypes.objectOf(
        PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
          PropTypes.bool,
          PropTypes.arrayOf(PropTypes.string),
        ]),
      ),
    ).isRequired,
    lineList: PropTypes.arrayOf(
      PropTypes.arrayOf(
        PropTypes.shape({
          color: PropTypes.string.isRequired,
          points: PropTypes.arrayOf(
            PropTypes.arrayOf(PropTypes.number.isRequired),
          ),
        }),
      ),
    ),
  }),
  targetCommit: PropTypes.string,
  handleNodeClick: PropTypes.func.isRequired,
};
