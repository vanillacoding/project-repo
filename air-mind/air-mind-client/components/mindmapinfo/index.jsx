import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Image from 'next/image';
import router from 'next/router';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';

import flexCenter from '../shared/flexcentercontainer';

import {
  userInfo,
  errorInfo,
  mindMapInfo,
  currentUserInfo,
  socketInfo,
  foldLockInfo,
  nodesInfo,
} from '../../store/states';
import {
  deleteMindMapData,
  updateMindMapData,
} from '../../service/mindmaprequests';
import { getNodesData } from '../../service/noderequests';
import {
  FAIL_DELETE_MIND_MAP,
  FAIL_DELETE_MIND_MAP_BY_SERVER_PROBLEM,
  FAIL_CHANGE_MIND_MAP_PUBLIC_OPTION,
  DELETE_CONFIRM_MESSAGE,
  FOLD_UNLOCK_MESSAGE,
  FOLD_LOCK_MESSAGE,
} from '../../constants/constants';
import debounce from '../../utils/debounce';

export default function MindMapInfo({ mindMapId }) {
  const [mindMapData, setMindMapData] = useRecoilState(mindMapInfo);
  const [isFoldLock, setIsFoldLock] = useRecoilState(foldLockInfo);
  const setError = useSetRecoilState(errorInfo);
  const setNodeData = useSetRecoilState(nodesInfo);
  const userData = useRecoilValue(userInfo);
  const currentUser = useRecoilValue(currentUserInfo);
  const { _id: currentUserId } = currentUser;
  const socket = useRecoilValue(socketInfo);

  const [title, setTitle] = useState(() =>
    mindMapData.title ? mindMapData.title : 'Untitled',
  );

  let userId;

  if (userData && Object.keys(userData).length > 0) {
    ({ _id: userId } = userData);
  }

  const handleMindMapTitle = event => {
    if (currentUser && Object.keys(currentUser).length > 0) {
      const newMindMapData = { ...mindMapData, title: event.target.value };
      setTitle(event.target.value);
      setMindMapData(newMindMapData);

      debounce(() => {
        updateMindMapData(userId, mindMapId, newMindMapData);
      }, 1500);

      socket.emit(
        'mindMapTitleChange',
        mindMapId,
        mindMapData,
        event.target.value,
      );
    }
  };

  const handlePublicOption = async event => {
    if (currentUser && Object.keys(currentUser).length > 0) {
      try {
        if (userId === currentUserId) {
          const newMindMapData = { ...mindMapData, access: event.target.value };

          setMindMapData(newMindMapData);

          await updateMindMapData(userId, mindMapId, newMindMapData);

          socket.emit(
            'publicOptionChange',
            mindMapId,
            mindMapData,
            event.target.value,
          );
        } else {
          alert(FAIL_CHANGE_MIND_MAP_PUBLIC_OPTION);
        }
      } catch (error) {
        setError(error);
      }
    }
  };

  const handleMindMapDelete = async () => {
    if (currentUser && Object.keys(currentUser).length > 0) {
      try {
        if (userId === currentUserId) {
          const confirmCheck = window.confirm(DELETE_CONFIRM_MESSAGE);

          if (!confirmCheck) {
            return;
          }

          const response = await deleteMindMapData(userId, mindMapId);
          const { result } = response;

          socket.emit('deleteMindMap', mindMapId, result);

          if (result === 'ok') {
            router.push('/');
          }
        } else {
          alert(FAIL_DELETE_MIND_MAP);
        }
      } catch (error) {
        setError(FAIL_DELETE_MIND_MAP_BY_SERVER_PROBLEM);
      }
    }
  };

  const handleFoldSharingOption = async () => {
    if (isFoldLock) {
      const confirmCheck = window.confirm(FOLD_UNLOCK_MESSAGE);

      if (!confirmCheck) {
        return;
      }

      setIsFoldLock(false);
    } else {
      const confirmCheck = window.confirm(FOLD_LOCK_MESSAGE);

      if (!confirmCheck) {
        return;
      }

      const responseNodes = await getNodesData(
        userId,
        mindMapId,
        mindMapData.headNode,
        50,
      );

      if (responseNodes.result === 'error') {
        throw responseNodes.error;
      }

      setNodeData(responseNodes.node);
      setIsFoldLock(true);
    }
  };

  const copyUrlHandler = async () => {
    if (!navigator.clipboard) return;

    const path = window.location.href;
    await navigator.clipboard.writeText(path);
    alert(`Copied the text: ${path}`);
  };

  return (
    <MindMapInfoWrapper>
      <MindMapTitle value={title} onChange={handleMindMapTitle} />
      <MindMapPublicSelect
        onChange={handlePublicOption}
        value={mindMapData.access}
      >
        <MindMapPublicOption>public</MindMapPublicOption>
        <MindMapPrivateOption>private</MindMapPrivateOption>
      </MindMapPublicSelect>
      <Icons>
        <Icon onClick={handleFoldSharingOption}>
          {isFoldLock ? (
            <Image
              src="/images/unlock.png"
              width="30px"
              height="30px"
              className="lockButton"
            />
          ) : (
            <Image
              src="/images/lock.png"
              width="30px"
              height="30px"
              className="lockButton"
            />
          )}
        </Icon>
        <Icon onClick={handleMindMapDelete}>
          <Image
            src="/images/recycle-bin.png"
            width="30px"
            height="30px"
            className="icon"
          />
        </Icon>
        <Icon onClick={copyUrlHandler}>
          <Image
            src="/images/link.png"
            width="30px"
            height="30px"
            className="icon"
          />
        </Icon>
      </Icons>
    </MindMapInfoWrapper>
  );
}

MindMapInfo.propTypes = {
  mindMapId: PropTypes.string.isRequired,
};

const Icon = styled(flexCenter)`
  width: 40px;
  height: 35px;
  transition: background-color 0.3s ease;
  cursor: pointer;

  &:hover {
    &:hover {
      filter: invert(12%) sepia(14%) saturate(3643%) hue-rotate(24deg)
        brightness(96%) contrast(104%);
    }
  }
`;

const Icons = styled.div`
  display: flex;
  justify-content: center;
  width: 90%;
  margin-left: 10px;
  color: white;
  filter: invert(100%);
`;

const MindMapInfoWrapper = styled.div`
  display: flex;
`;

const MindMapTitle = styled.input`
  width: 140%;
  padding: 0 10px;
  border: none;
  border-radius: 5px;
  background-color: #4d6ef4;
  font-size: 18px;
  color: white;
`;

const MindMapPublicSelect = styled.select`
  width: 60%;
  height: 35px;
  margin-left: 20px;
  padding-left: 5px;
  border: none;
  border-radius: 5px;
  background: white;
  font-size: 14px;
  color: gray;
`;

const MindMapPublicOption = styled.option`
  display: flex;
  min-height: 20px;
  padding: 0px 2px 1px;
  background: white;
  color: black;
  white-space: pre;
`;

const MindMapPrivateOption = styled.option`
  display: flex;
  min-height: 20px;
  padding: 0px 2px 1px;
  background: white;
  color: black;
  white-space: pre;
`;
