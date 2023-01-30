import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useRouter } from 'next/router';

import { CgFileDocument as DocumentIcon } from 'react-icons/cg';
import { SlLock as LockIcon } from 'react-icons/sl';
import { CiSettings as Option } from 'react-icons/ci';
import MindMapThumbnail from '../mindmapthumbnail';

import {
  mindMapInfo,
  userInfo,
  currentUserInfo,
  foldLockInfo,
} from '../../store/states';
import { deleteMindMapData } from '../../service/mindmaprequests';
import {
  DELETE_CONFIRM_MESSAGE,
  FAIL_RENAME_MIND_MAP,
} from '../../constants/constants';
import generatedateformat from '../../utils/generatedateformat';

export default function MindMapCard({ mindMap, renameTitleHandler }) {
  const router = useRouter();

  const inputRef = useRef();

  const setUserData = useSetRecoilState(userInfo);
  const currentUser = useRecoilValue(currentUserInfo);
  const setMindMapData = useSetRecoilState(mindMapInfo);
  const setIsFoldLock = useSetRecoilState(foldLockInfo);

  const [title, setTitle] = useState(mindMap.title || '');
  const [isTitleEditMode, setIsTitleEditMode] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [url, setUrl] = useState('');

  const { _id: mindMapId } = mindMap;

  useEffect(() => {
    if (!mindMap) return;

    setMindMapData(mindMap);
    setUrl(`${process.env.NEXT_PUBLIC_CLIENT_URL}/mind-map/${mindMapId}`);
  }, [mindMap]);

  const modalShowOn = () => {
    setModalShow(!modalShow);
  };

  const mindMapLoader = () => {
    setIsFoldLock(true);
    setMindMapData(mindMap);

    setUserData(mindMap.author);
    router.push(`/mind-map/${mindMapId}`);
  };

  const deleteHandler = async () => {
    if (!mindMap) return;

    if (currentUser.email !== mindMap.author.email) {
      alert(FAIL_RENAME_MIND_MAP);
      return;
    }

    const confirmCheck = window.confirm(DELETE_CONFIRM_MESSAGE);

    if (!confirmCheck) {
      return;
    }

    try {
      await deleteMindMapData(mindMap.author, mindMapId);
    } catch (error) {
      console.log(error);
    }

    setModalShow(!modalShow);
    router.reload('/');
  };

  const renameHandler = () => {
    if (currentUser.email !== mindMap.author.email) {
      alert(FAIL_RENAME_MIND_MAP);
      return;
    }

    inputRef.current.focus();

    setIsTitleEditMode(true);
    setModalShow(false);
  };

  const renameSubmitHandler = e => {
    e.preventDefault();
    setIsTitleEditMode(false);

    const { _id: authorId } = mindMap.author;
    if (currentUser.email !== mindMap.author.email) return;
    renameTitleHandler(authorId, mindMapId, title);
  };

  return (
    <Card>
      <Wrapper onClick={mindMapLoader} data-testid="thumbnailWrapper">
        {mindMap.access === 'private' ? (
          <LockPageWrapper data-testid="lockWrapper">
            <LockIcon className="lockIcon" size={50} />
            <PrivatePageThumbnail />
            <MindMapThumbnail url={url} className="thumbnail" width={300} />
          </LockPageWrapper>
        ) : (
          <MindMapThumbnail url={url} className="thumbnail" width={300} />
        )}
      </Wrapper>
      <Footer>
        <FoooterLeft>
          <ShortInfo>
            <DocumentIcon size={25} className="documentIcon" />
            <form type="submit">
              <TitleInput
                ref={inputRef}
                value={title}
                onChange={e => setTitle(e.target.value)}
                onClick={renameHandler}
                readOnly={!isTitleEditMode}
              />
              {isTitleEditMode && (
                <TitleButton type="submit" onClick={renameSubmitHandler}>
                  ✔
                </TitleButton>
              )}
            </form>
          </ShortInfo>
          <AuthorDate>
            <div className="infoAuthor">{mindMap.author?.userName}</div>
          </AuthorDate>
        </FoooterLeft>
        <FoooterRight>
          <OptionModal>
            {modalShow && (
              <OptionMenu>
                <Menu className="open" onClick={mindMapLoader}>
                  Open
                </Menu>
                <Menu onClick={renameHandler}>Rename</Menu>
                <Menu className="delete" onClick={deleteHandler}>
                  Delete
                </Menu>
              </OptionMenu>
            )}
            <BottomButton>
              <AccessIcon access={mindMap.access}>{mindMap.access}</AccessIcon>
              <OptionButton onClick={modalShowOn}>
                <Option size={21} />
              </OptionButton>
            </BottomButton>
          </OptionModal>
          <Date className="date">{generatedateformat(mindMap?.createdAt)}</Date>
        </FoooterRight>
      </Footer>
    </Card>
  );
}

MindMapCard.propTypes = {
  mindMap: PropTypes.object.isRequired,
  renameTitleHandler: PropTypes.func.isRequired,
};

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 0;
  width: 95%;
  padding: 10px;
  border: 1px solid #e8e8e8;
  border-radius: 5px;

  &:hover {
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  }
`;

const Wrapper = styled.div`
  width: 300px;
  height: 230px;
  cursor: pointer;

  .thumbnail {
    position: relative;
    width: 100%;
    height: 100%;
    border: 1px solid black;
  }
`;

const LockPageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: inherit;
  height: 100%;
  color: white;

  .lockIcon {
    position: absolute;
    z-index: 2;
    width: 100%;
  }
`;

const PrivatePageThumbnail = styled.div`
  position: absolute;
  z-index: 1;
  width: inherit;
  height: inherit;
  background-color: #0073ff;
  opacity: 0.15;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 90%;
  height: 50px;
  margin: 10px 0 0 5px;
`;

const FoooterLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  height: 100%;

  .documentIcon {
    margin-right: 5px;
  }
`;

const ShortInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .infoTitle {
    overflow: hidden;
  }

  .infoAuthor {
    font-size: 80%;
    overflow: hidden;
  }
`;

const AuthorDate = styled.div`
  display: flex;
  width: 100%;

  .infoAuthor {
    margin-left: 30px;
    font-size: 13px;
    color: gray;
  }
`;

const TitleInput = styled.input`
  height: 20px;
  margin: 3px 0;
  border: 1px solid #eff0f5;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.8);

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #529cca inset;
  }
`;

const TitleButton = styled.button`
  z-index: 10;
  width: 25px;
  height: 23px;
  margin-left: 3px;
  border: none;
  background-color: none;
  cursor: pointer;
`;

const FoooterRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const OptionModal = styled.div`
  display: flex;
  align-items: center;
  z-index: 100;
  height: 25px;
  margin: 3px 0;
`;

const Date = styled.div`
  margin-right: 10px;
  font-size: 13px;
  color: gray;
`;

const OptionMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  position: absolute;
  z-index: 100;
  width: 100px;
  height: 100px;
  margin: 10px;
  border: 1px solid black;
  border-radius: 10px;
  transform: translate(-30px, -70px);

  .open {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  .delete {
    border-bottom: none;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;

    &:hover {
      background-color: red;
      color: white;
    }
  }
`;

const Menu = styled.div`
  width: inherit;
  height: inherit;
  padding: 5px 0;
  border-bottom: 1px solid black;
  background-color: rgba(255, 255, 255, 0.5);
  transition: all 0.5s;
  color: black;

  &:hover {
    background-color: gray;
    color: white;
  }
`;

const BottomButton = styled.div`
  display: flex;
  align-items: center;
  height: 20px;
  transform: translateX(-10px);
`;

const AccessIcon = styled.div`
  padding: 0 5px;
  border: 2px solid brown;
  border-radius: 10%;
  background-color: royalBlue;
  background-color: ${props =>
    props.access === 'private' ? 'red' : 'royalBlue'};
  font-size: 80%;
  color: white;
`;

const OptionButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  width: 30px;
  height: 20px;
  border: none;
  border-radius: 10%;
  background-color: #f3f3f3;
  color: gray;
  cursor: pointer;

  &:hover {
    background-color: rgb(255, 245, 209);
  }
`;
