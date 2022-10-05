import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Route, Switch } from 'react-router-dom';

import loadable from '@loadable/component';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import NavBar from '../../components/layouts/NavBar';
import BranchBar from '../../components/layouts/BranchBar';
import ContentBox from '../../components/layouts/ContentBox';
import GraphBox from '../../components/layouts/GraphBox';
import DiffBox from '../../components/layouts/DiffBox';
import DiffBar from '../../components/layouts/DiffBar';

import { BodyWrapper, HeaderWrapper } from '../../components/styles';
import Button from '../../components/Button';
import BranchList from '../../components/BranchList';
import Graph2d from '../../components/Graph2d';
import Graph3d from '../../components/Graph3d';
import DiffList from '../../components/DiffList';

import { fetchDiff } from '../../api/git';
import { getBranchList } from '../../utils/git';
import UI from '../../constants/ui';

import logo from '../../image/logo.ico';

const Diff = loadable(() => import('./Diff'));

export default function Repository({
  repoUrl,
  repoData,
  handleResetRepository,
}) {
  const [targetBranch, setTargetBranch] = useState(null);
  const [targetCommit, setTargetCommit] = useState(repoData.logList[0].hash);
  const [targetDiffList, setTargetDiffList] = useState(null);
  const [targetDiffFile, setTargetDiffFile] = useState(null);
  const [is2dGraphMode, setIs2dGraphMode] = useState(true);
  const [isDiffMode, setIsDiffMode] = useState(false);

  const branchList = useMemo(() => getBranchList(repoData), [repoData]);

  const handleBranchClick = useCallback(
    (branch) => {
      setTargetBranch(branch);
    },
    [setTargetBranch],
  );

  const handleNodeClick = useCallback(
    (hash) => {
      setTargetCommit(hash);
    },
    [setTargetCommit],
  );

  const handleDiffClick = useCallback(
    (file) => {
      setTargetDiffFile(file);
      setIsDiffMode(true);
    },
    [setTargetDiffFile, setIsDiffMode],
  );

  const handleGraphMode = useCallback(
    (event) => {
      const { name } = event.target;
      const mode = name === UI.TWO_DIMENSION;

      setIs2dGraphMode(mode);
    },
    [setIs2dGraphMode],
  );

  const handleDiffMode = useCallback(() => {
    setIsDiffMode(false);
  }, [setIsDiffMode]);

  useEffect(() => {
    if (!targetBranch) {
      setTargetCommit(repoData.logList[0].hash);
    } else {
      setTargetCommit(targetBranch.hash);
    }
  }, [targetBranch]);

  useEffect(() => {
    (async () => {
      if (repoUrl && targetCommit) {
        const diffList = await fetchDiff(repoUrl, targetCommit);

        setTargetDiffList(diffList.changedFileList);
      }
    })();
  }, [targetCommit]);

  useEffect(() => {
    if (!targetDiffList) {
      setTargetDiffFile(null);
    } else {
      setTargetDiffFile(targetDiffList[0]);
    }
  }, [targetDiffList]);

  return (
    <>
      <HeaderWrapper>
        <NavBar>
          <Wrapper>
            <LogoWrapper>
              <Logo src={logo} onClick={handleResetRepository} />
              <RepositoryName>{repoData.repoName}</RepositoryName>
            </LogoWrapper>
            <ButtonWrapper>
              {isDiffMode ? (
                <></>
              ) : (
                <>
                  <Button name={UI.TWO_DIMENSION} onClick={handleGraphMode}>
                    {UI.TWO_DIMENSION}
                  </Button>
                  <Button name={UI.THREE_DIMENSION} onClick={handleGraphMode}>
                    {UI.THREE_DIMENSION}
                  </Button>
                </>
              )}
            </ButtonWrapper>
          </Wrapper>
        </NavBar>
      </HeaderWrapper>
      <BodyWrapper>
        <Switch>
          <Route exact path="/repository">
            <ContentBox>
              <BranchBar>
                <BranchList
                  branchList={branchList}
                  targetCommit={targetCommit}
                  handleBranchClick={handleBranchClick}
                />
              </BranchBar>
              <GraphBox>
                {is2dGraphMode ? (
                  <Graph2d
                    repoData={repoData}
                    targetCommit={targetCommit}
                    handleNodeClick={handleNodeClick}
                  />
                ) : (
                  <Graph3d
                    repoData={repoData}
                    targetCommit={targetCommit}
                    handleNodeClick={handleNodeClick}
                  />
                )}
              </GraphBox>
            </ContentBox>
            <DiffBar>
              <DiffList
                targetDiffList={targetDiffList}
                handleDiffClick={handleDiffClick}
              />
            </DiffBar>
          </Route>
          <Route path="/repository/diff">
            <ContentBox>
              <DiffBox>
                <Diff
                  targetDiff={targetDiffFile}
                  handleDiffMode={handleDiffMode}
                />
              </DiffBox>
            </ContentBox>
            <DiffBar>
              <DiffList
                targetDiffList={targetDiffList}
                handleDiffClick={handleDiffClick}
              />
            </DiffBar>
          </Route>
        </Switch>
      </BodyWrapper>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  background-color: ${({ theme: { background } }) => background.black};
  color: ${({ theme: { font } }) => font.color.grey};
`;

const Logo = styled.img`
  src: ${({ src }) => src || null};
  width: ${({ width }) => width || '50px'};
  height: ${({ height }) => height || '50px'};
  margin-left: 10px;
  cursor: pointer;
`;

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const RepositoryName = styled.div`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  width: auto;
  border: 2px solid #ffffff43;
  background-color: #ffffff5a;
  color: white;
  text-align: center;
  text-decoration: none;
`;

Repository.defaultProps = {
  repoUrl: 'repoUrl',
  repoData: {
    repoName: 'repoName',
    logList: [
      {
        message: 'Message',
        hash: 'hash',
      },
    ],
  },
  handleResetRepository: () => {},
};

Repository.propTypes = {
  repoUrl: PropTypes.string,
  repoData: PropTypes.shape({
    repoName: PropTypes.string.isRequired,
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
  handleResetRepository: PropTypes.func,
};
