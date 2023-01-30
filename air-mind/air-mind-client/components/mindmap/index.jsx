import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { io } from 'socket.io-client';

import Header from '../header';
import NodeComment from '../nodecomment';
import NodeDetail from '../nodedetail';
import flexCenter from '../shared/flexcentercontainer';

import receiveSocket from '../../utils/socket/receivesocker';
import preventBodyScrolling from '../../utils/preventbodyscrolling';
import makeSearched from '../../utils/makesearched';
import {
  userInfo,
  errorInfo,
  nodesInfo,
  mindMapInfo,
  isOpenNodeCommentModal,
  isOpenNodeOptionModal,
  clickedImgPath,
  socketInfo,
  socketUserInfo,
  foldLockInfo,
  searchInfo,
} from '../../store/states';
import pageLoader from '../../utils/pageloader';

const NodeCanvas = dynamic(() => import('../nodecanvas'), {
  ssr: false,
});

export default function MindMap({ mindMapId }) {
  const router = useRouter();

  const [nodeData, setNodeData] = useRecoilState(nodesInfo);
  const [userData, setUserData] = useRecoilState(userInfo);
  const [mindMapData, setMindMapData] = useRecoilState(mindMapInfo);
  const [isOpenNodeCommentMenu, setIsOpenNodeCommentMenu] = useRecoilState(
    isOpenNodeCommentModal,
  );
  const [isOpenNodeOptionMenu, setIsOpenNodeOptionMenu] = useRecoilState(
    isOpenNodeOptionModal,
  );
  const [clickedImagePath, setClickedImagePath] =
    useRecoilState(clickedImgPath);
  const [socket, setSocket] = useRecoilState(socketInfo);
  const setSearched = useSetRecoilState(searchInfo);
  const setError = useSetRecoilState(errorInfo);
  const setSocketUserData = useSetRecoilState(socketUserInfo);
  const setIsFoldLock = useSetRecoilState(foldLockInfo);

  const [isSearchMode, setIsSearchMode] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    setIsOpenNodeCommentMenu(false);
    setIsOpenNodeOptionMenu(false);

    if (!socket || Object.keys(socket).length <= 0) {
      setSocket(
        io(process.env.NEXT_PUBLIC_BASE_URL, {
          transports: ['websocket'],
        }),
      );

      return () => {};
    }

    socket.on('connect', () => {
      console.log(' client socket connected');
    });

    socket.emit('joinMindMap', mindMapId);

    setSocket(socket);
    receiveSocket(
      socket,
      setNodeData,
      setMindMapData,
      router,
      setSocketUserData,
      setIsFoldLock,
    );

    return () => {
      socket.emit('leaveMindMap', mindMapId);
      socket.off('broadcast');
      setSocket({});
    };
  }, [socket]);

  useEffect(() => {
    return preventBodyScrolling();
  }, []);

  useEffect(() => {
    if (mindMapId) {
      pageLoader(
        userData,
        setUserData,
        mindMapData,
        setMindMapData,
        setNodeData,
        setError,
        router,
        mindMapId,
      );
    }
  }, [mindMapId]);

  useEffect(() => {
    if (!searchKeyword) {
      setSearched(new Set());
    }

    setSearched(makeSearched(nodeData, searchKeyword));
  }, [nodeData, searchKeyword]);

  return (
    <Container>
      <Header />
      {isOpenNodeCommentMenu && <NodeComment />}
      {clickedImagePath && (
        <ImageModal onClick={() => setClickedImagePath('')}>
          <img src={clickedImagePath} alt="nodeImage" />
        </ImageModal>
      )}
      <RightMenu>
        <RightMenuContainer>
          <RightMenuWrapper>
            <SearchBar>
              <Image
                src="/images/noun-search-5247523.png"
                width="50px"
                height="50px"
                className="dragIcon"
                onClick={() => {
                  setIsSearchMode(!isSearchMode);
                  setSearchKeyword('');
                }}
              />
              <SearchInput
                searchMode={isSearchMode}
                value={searchKeyword}
                onChange={e => setSearchKeyword(e.target.value)}
              />
            </SearchBar>
            {isOpenNodeOptionMenu && <NodeDetail />}
          </RightMenuWrapper>
        </RightMenuContainer>
      </RightMenu>
      <NodeCanvas headNode={mindMapData?.headNode || ''} />
    </Container>
  );
}

MindMap.propTypes = {
  mindMapId: PropTypes.string.isRequired,
};

const Container = styled.div`
  height: 100vh;
  border: 1px solid black;
`;

const ImageModal = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 0;
  width: 100%;
  height: 100%;

  img {
    height: inherit;
  }
`;

const RightMenu = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const RightMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  position: absolute;
`;

const RightMenuWrapper = styled(flexCenter)`
  justify-content: flex-start;
  z-index: 1000;
  width: 300px;
`;

const SearchBar = styled.div`
  flex-grow: 0;
  display: flex;
  justify-content: flex-end;
  width: 300px;
  height: 50px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  cursor: pointer;
`;

const SearchInput = styled.input`
  width: ${props => (props.searchMode ? '250px' : '-0')};
  border: none;
  border-bottom: ${props => (props.searchMode ? '1px solid black' : 'none')};
  background-color: none;
  transition: all 1.5s ease-in-out;
`;
