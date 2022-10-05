import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import CommitList from './CommitList';

export default function Description({ logList, targetCommit, onClickHandler }) {
  return (
    <CommitListWrapper>
      <CommitList
        logList={logList}
        targetCommit={targetCommit}
        onClickHandler={onClickHandler}
      />
    </CommitListWrapper>
  );
}

const CommitListWrapper = styled.ul`
  width: 100%;
  margin: 0;
  padding: 0;
`;

Description.defaultProps = {
  targetCommit: '',
};

Description.propTypes = {
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
