import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function DiffList({ targetDiffList, handleDiffClick }) {
  const history = useHistory();
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleClick = (diff, index) => {
    handleDiffClick(diff);
    setSelectedIndex(index);

    history.push('/repository/diff');
  };

  return (
    <Wrapper>
      {targetDiffList?.map((diff, index) => (
        <FileName
          key={diff.fileName}
          className={`${selectedIndex === index ? 'selected' : ''}`}
          onClick={() => {
            handleClick(diff, index);
          }}
        >
          {diff.fileName}
        </FileName>
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 80%;
  box-sizing: border-box;
  margin-left: 20px;
  background-color: ${({ theme: { background } }) => background.grey3};
  color: ${({ theme: { font } }) => font.color.white};
  font-family: Arial, Helvetica, sans-serif;

  .selected {
    color: black;
    background-color: #ffffff9c;
  }
`;

const FileName = styled.div`
  width: 100%;
  margin: 10px 0;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  :hover {
    background-color: #ffffff1f;
  }
`;

DiffList.defaultProps = {
  targetDiffList: [],
  handleDiffClick: () => {},
};

DiffList.propTypes = {
  targetDiffList: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(
          PropTypes.objectOf(
            PropTypes.oneOfType([
              PropTypes.string,
              PropTypes.objectOf(
                PropTypes.oneOfType([
                  PropTypes.number,
                  PropTypes.arrayOf(PropTypes.string),
                ]),
              ),
            ]),
          ),
        ),
      ]),
    ),
  ),
  handleDiffClick: PropTypes.func,
};
