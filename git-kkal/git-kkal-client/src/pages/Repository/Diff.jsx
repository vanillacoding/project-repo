import React from 'react';
import { useHistory } from 'react-router-dom';

import PropTypes from 'prop-types';
import styled from 'styled-components';

import DiffParagraphCode from '../../components/diffCode/DiffParagraphCode';
import Button from '../../components/Button';
import UI from '../../constants/ui';

export default function Diff({ targetDiff, handleDiffMode }) {
  const history = useHistory();

  const handleButtonClick = () => {
    handleDiffMode();
    history.push('/repository');
  };

  return (
    <Wrapper>
      <FileNameWrapper>
        <DiffFileName>{targetDiff.fileName}</DiffFileName>
        <Button onClick={handleButtonClick}>{UI.REPO}</Button>
      </FileNameWrapper>
      {targetDiff.changedLog.map((log) => (
        <DiffParagraph key={log.codeLineOffsetString}>
          <DiffParagraphTitle>
            {`${log.codeLineOffsetString} ${log.codeBeginHunk}`}
          </DiffParagraphTitle>
          <DiffParagraphCode paragraph={log} />
        </DiffParagraph>
      ))}
    </Wrapper>
  );
}

const FileNameWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0px;
  padding: 0 10px;
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  border-top: 1px solid ${({ theme }) => theme.font.color.grey};
  background-color: ${({ theme }) => theme.background.black};
  color: ${({ theme }) => theme.font.color.grey};
`;

const DiffFileName = styled.div``;

const DiffParagraph = styled.div`
  margin: 10px;
`;

const DiffParagraphTitle = styled.div``;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
`;

Diff.defaultProps = {
  targetDiff: {
    fileName: '',
    changedLog: [],
  },
  handleDiffMode: () => {},
};

Diff.propTypes = {
  targetDiff: PropTypes.objectOf(
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
  handleDiffMode: PropTypes.func,
};
