import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { selectFontColor } from '../../utils/color';

export default function CommitList({ logList, targetCommit, onClickHandler }) {
  return (
    <>
      {logList.map((log, index) => (
        <Log
          key={`CommitWrapper${index}${log.hash}`}
          onClick={() => onClickHandler(log.index, log.hash)}
        >
          <Commit className={log.hash === targetCommit ? 'selected' : ''}>
            <CommitHash>{log.hash.slice(0, 7)}</CommitHash>
            {log.branchNames
              ? log.branchNames.map((branch) => (
                  <CommitTag
                    key={`CommitTag${index}${branch}`}
                    backgroundColor={log.color}
                    color={selectFontColor(log.color)}
                  >
                    {branch}
                  </CommitTag>
                ))
              : null}
            <CommitMessage>{log.message}</CommitMessage>
          </Commit>
        </Log>
      ))}
    </>
  );
}

const Log = styled.li`
  display: flex;
  height: 50px;
  align-items: center;
  cursor: pointer;

  .selected {
    border-left: 3px solid aqua;
  }
`;

const Commit = styled.div`
  display: flex;
  align-items: center;
  height: 60%;
  box-sizing: border-box;
`;

const CommitHash = styled.div`
  width: 100px;
  margin-left: 10px;
`;

const CommitTag = styled.div`
  padding: 5px;
  margin-left: 10px;
  border-radius: 10px;
  letter-spacing: 1px;
  white-space: nowrap;
  background-color: ${({ backgroundColor }) => backgroundColor || 'black'};
  color: ${({ color }) => color || 'white'};
`;

const CommitMessage = styled.div`
  margin-left: 10px;
  white-space: nowrap;
`;

CommitList.defaultProps = {
  targetCommit: '',
};

CommitList.propTypes = {
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
  targetCommit: PropTypes.string,
  onClickHandler: PropTypes.func.isRequired,
};
