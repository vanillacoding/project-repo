import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import Header from '../header';
import NavBar from '../navbar';
import MindMapCard from '../mindmapcard';

import {
  getMyMindMapData,
  updateMindMapData,
} from '../../service/mindmaprequests';
import { currentUserInfo } from '../../store/states';

export default function MyWorks() {
  const currentUserData = useRecoilValue(currentUserInfo);
  const { _id: currentUserId } = currentUserData;

  const [myMindMapData, setMyMindMapData] = useState([]);
  const [currentError, setCurrentError] = useState({});

  useEffect(() => {
    const fetchMyMindMapData = async id => {
      try {
        const data = await getMyMindMapData(id);

        setMyMindMapData(data.mindMap);
      } catch (error) {
        console.log(error);
        setCurrentError(error);
      }
    };

    if (currentUserId) {
      fetchMyMindMapData(currentUserId);
    }
  }, [currentUserId]);

  const renameHandler = useCallback(
    (authorId, mindMapId, updatedTitle) => {
      let updatedMindMap;

      const updatedMindmaps = myMindMapData.map(mindMap => {
        const { _id: id } = mindMap;
        if (id === mindMapId) {
          updatedMindMap = { ...mindMap, title: updatedTitle };
          return updatedMindMap;
        }
        return mindMap;
      });
      setMyMindMapData(updatedMindmaps);

      return updateMindMapData(authorId, mindMapId, updatedMindMap);
    },
    [myMindMapData],
  );

  return (
    <Wrapper>
      <Header />
      <NavBar />
      {currentError.message && (
        <ErrorMessage>{currentError.message}</ErrorMessage>
      )}
      <MindMapsWrapper>
        {myMindMapData[0] &&
          myMindMapData.map(mindMap => {
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
  position: relative;
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
  width: 90%;
  padding: 2em 0 0;
`;

const ErrorMessage = styled.div``;
