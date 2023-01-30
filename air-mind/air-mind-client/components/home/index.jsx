import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';

import Header from '../header';
import NavBar from '../navbar';
import MindMapCard from '../mindmapcard';

import getPublicMindMapData, {
  updateMindMapData,
} from '../../service/mindmaprequests';
import { errorInfo } from '../../store/states';

export default function Home() {
  const [currentError, setCurrentError] = useRecoilState(errorInfo);

  const [mindMapData, setMindMapData] = useState([]);

  useEffect(() => {
    const fetchPublicMindMapData = async () => {
      try {
        const data = await getPublicMindMapData();

        setMindMapData(data.mindMap);
      } catch (error) {
        setCurrentError(error);
      }
    };
    fetchPublicMindMapData();
  }, [setMindMapData]);

  const renameHandler = useCallback(
    (authorId, mindMapId, updatedTitle) => {
      let updatedMindMap;

      const updatedMindmaps = mindMapData.map(mindMap => {
        const { _id: id } = mindMap;
        if (id === mindMapId) {
          updatedMindMap = { ...mindMap, title: updatedTitle };
          return updatedMindMap;
        }
        return mindMap;
      });
      setMindMapData(updatedMindmaps);

      return updateMindMapData(authorId, mindMapId, updatedMindMap);
    },
    [mindMapData],
  );

  return (
    <Wrapper>
      <Header />
      <NavBar />
      {currentError.message && (
        <ErrorMessage>{currentError.message}</ErrorMessage>
      )}
      <MindMapsWrapper>
        {mindMapData.map(mindMap => {
          const { _id: id } = mindMap;
          return (
            <MindMapCard
              key={id}
              mindMap={mindMap}
              renameTitleHandler={renameHandler}
            />
          );
        })}
      </MindMapsWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
`;

const MindMapsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(330px, 350px));
  grid-template-rows: 320px 350px 320px;
  justify-content: center;
  column-gap: 20px;
  row-gap: 20px;
  padding: 2em 0 0;
  width: 90%;
`;

const ErrorMessage = styled.div``;
