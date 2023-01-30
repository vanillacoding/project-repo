import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useSetRecoilState, useRecoilValue } from 'recoil';

import { NavBarButton } from '../shared/button';

import { createMindMapData } from '../../service/mindmaprequests';
import {
  currentUserInfo,
  errorInfo,
  foldLockInfo,
  mindMapInfo,
  userInfo,
} from '../../store/states';

export default function NavBar() {
  const router = useRouter();

  const setError = useSetRecoilState(errorInfo);
  const setUserData = useSetRecoilState(userInfo);
  const setMindMapData = useSetRecoilState(mindMapInfo);
  const setIsFoldLock = useSetRecoilState(foldLockInfo);
  const currentUser = useRecoilValue(currentUserInfo);

  const handleCreateButton = async () => {
    if (currentUser && Object.keys(currentUser).length > 0) {
      try {
        const { _id: userId } = currentUser;
        const data = await createMindMapData(userId);
        const { mindMap } = data;
        const { _id: mindMapId } = mindMap;

        setIsFoldLock(true);
        setUserData(currentUser);
        setMindMapData(mindMap);

        router.push({
          pathname: `/mind-map/${mindMapId}`,
        });
      } catch (error) {
        setError(error);
      }
    }
  };

  return (
    <NavBarContainer>
      <NavBarWrapper>
        <NavBarCreateButton onClick={handleCreateButton}>
          Create
        </NavBarCreateButton>
        <NavBarPublicButton
          onClick={() => {
            router.push('/');
          }}
        >
          Public
        </NavBarPublicButton>
        {currentUser?.username && (
          <NavBarMyWorkButton
            onClick={() => {
              router.push('/my-works');
            }}
          >
            My Work
          </NavBarMyWorkButton>
        )}
      </NavBarWrapper>
    </NavBarContainer>
  );
}

const NavBarContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  position: sticky;
  top: 100px;
  z-index: 1;
  width: 100%;
  height: 80px;
  background-color: white;
`;

const NavBarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin: 0 10%;
  width: 90.5%;
  border-bottom: 3px solid #2c2c2c;
`;

const NavBarCreateButton = styled(NavBarButton)`
  &:hover {
    color: #e64c82;
  }
`;

const NavBarPublicButton = styled(NavBarButton)`
  &:hover {
    color: #82c91e;
  }
`;

const NavBarMyWorkButton = styled(NavBarButton)`
  &:hover {
    color: #fab004;
  }
`;
