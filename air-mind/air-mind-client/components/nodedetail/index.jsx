import React, { useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import { RiDeleteBin6Line as RecycleBinIcon } from 'react-icons/ri';

import flexCenter from '../shared/flexcentercontainer';
import NodeImageDropZone from '../nodeimagedropzone';

import {
  clickedNodeId,
  isOpenNodeOptionModal,
  clickedImgPath,
  mindMapInfo,
  nodesInfo,
  userInfo,
  socketInfo,
  currentUserInfo,
} from '../../store/states';
import debounce from '../../utils/debounce';
import { putNodesData, deleteImagesData } from '../../service/noderequests';

export default function NodeDetail() {
  const [nodeData, setNodeData] = useRecoilState(nodesInfo);
  const [nodeRightOptionMode, setNodeRightOptionMode] = useRecoilState(
    isOpenNodeOptionModal,
  );
  const userData = useRecoilValue(userInfo);
  const mindMapData = useRecoilValue(mindMapInfo);
  const currentNodeId = useRecoilValue(clickedNodeId);
  const socket = useRecoilValue(socketInfo);
  const currentUser = useRecoilValue(currentUserInfo);
  const setClickedImagePath = useSetRecoilState(clickedImgPath);

  const [isVisibleBin, setIsVisibleBin] = useState(false);
  const [hoverImgPath, setHoverImgPath] = useState('');

  const { _id: userId } = userData;
  const { _id: mindMapId } = mindMapData;

  const writeTitleHandler = e => {
    if (currentUser && Object.keys(currentUser).length > 0) {
      const tempData = { ...nodeData };

      tempData[currentNodeId] = {
        ...tempData[currentNodeId],
        title: e.target.value,
      };

      setNodeData(tempData);

      debounce(() => {
        putNodesData(userId, mindMapId, currentNodeId, tempData[currentNodeId]);
      }, 1500);

      socket.emit('titleChange', mindMapId, currentNodeId, e.target.value);
    }
  };

  const writeDescriptionHandler = e => {
    if (currentUser && Object.keys(currentUser).length > 0) {
      const tempData = { ...nodeData };

      tempData[currentNodeId] = {
        ...tempData[currentNodeId],
        content: e.target.value,
      };

      setNodeData(tempData);

      debounce(() => {
        putNodesData(userId, mindMapId, currentNodeId, tempData[currentNodeId]);
      }, 1500);

      socket.emit('contentChange', mindMapId, currentNodeId, e.target.value);
    }
  };

  const addImageHandler = imageArray => {
    const tempData = { ...nodeData };
    tempData[currentNodeId] = {
      ...tempData[currentNodeId],
      images: imageArray,
    };

    setNodeData(tempData);
  };

  const clickImageHandler = imgPath => {
    setClickedImagePath(imgPath);
  };

  const imgHoverHandler = id => {
    setHoverImgPath(id);
    setIsVisibleBin(true);
  };

  const imgHoverOutHandler = () => {
    setHoverImgPath('');
    setIsVisibleBin(false);
  };

  const imgDeleteHandler = async imgPath => {
    const updatedNode = await deleteImagesData(
      userId,
      mindMapId,
      currentNodeId,
      imgPath,
    );
    const tempData = { ...nodeData };
    tempData[currentNodeId] = {
      ...tempData[currentNodeId],
      images: updatedNode.node.images,
    };
    setNodeData(tempData);
  };

  return (
    <Container isOpen={nodeRightOptionMode}>
      <MenuBody className="closeButton">
        <Image
          src="/images/close.png"
          width="20px"
          height="20px"
          className="closeIcon"
          onClick={() => {
            setNodeRightOptionMode(false);
            socket.emit('leaveNode', socket.id, mindMapId);
          }}
        />
      </MenuBody>
      <ScrollWrapper>
        <Scroll>
          <MenuWrapper>
            <TitleMenu className="title">
              <MenuTitle>Title</MenuTitle>
              <TitleInput
                value={nodeData[currentNodeId]?.title || ''}
                onChange={writeTitleHandler}
              />
            </TitleMenu>
            <DescriptionMenu className="description">
              <MenuTitle>Description</MenuTitle>
              <DescriptionTextArea
                value={nodeData[currentNodeId]?.content || ''}
                onChange={writeDescriptionHandler}
              />
            </DescriptionMenu>
            <ImageMenu className="image">
              <MenuTitle>Image</MenuTitle>
              <NodeImageDropZone
                userId={userId}
                mindMapId={mindMapId}
                nodeId={currentNodeId}
                addImage={addImageHandler}
                className="dragZone"
              />
            </ImageMenu>
            <ImageList>
              <MenuTitle>Image List</MenuTitle>
              <ImagesWrapper>
                {nodeData[currentNodeId]?.images.map(img => {
                  const { _id: id } = img;
                  return (
                    <ImageWrapper
                      key={id}
                      onMouseEnter={() => imgHoverHandler(img.path)}
                      onMouseLeave={imgHoverOutHandler}
                    >
                      {isVisibleBin && hoverImgPath === img.path && (
                        <IconWrapper onClick={() => imgDeleteHandler(img.path)}>
                          <RecycleBinIcon size={22} className="bin" />
                        </IconWrapper>
                      )}
                      <NodeImg
                        src={img.path}
                        alt={img.originalName}
                        className="img"
                        onClick={() => clickImageHandler(img.path)}
                      />
                    </ImageWrapper>
                  );
                })}
              </ImagesWrapper>
            </ImageList>
          </MenuWrapper>
        </Scroll>
      </ScrollWrapper>
    </Container>
  );
}

const Container = styled(flexCenter)`
  flex-grow: 1;
  z-index: 100;
  width: 100%;
  min-height: 500px;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.7);
  transform: ${props => (props.isOpen ? 'translateX(0)' : 'translateX(400px)')};
  transition: all 0.6s ease-in-out;

  .closeButton {
    flex-grow: 0;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    min-height: 30px;
    max-height: 30px;
    cursor: pointer;
  }

  .closeIcon {
    margin: 10px;
    padding-right: 10px;
    border-bottom: 1px solid black;
  }
`;

const ScrollWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  height: 90vh;
`;

const Scroll = styled.div`
  flex-grow: 1;
  overflow: auto;
`;

const MenuWrapper = styled.div`
  flex-grow: 1;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  min-height: 150px;
`;

export const MenuBody = styled(flexCenter)`
  flex-grow: 1;
  justify-content: flex-start;
  width: 100%;
  min-height: 150px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

const MenuTitle = styled.div`
  width: 100%;
  margin: 10px 0 0 10px;
  font-size: 15px;
`;

const TitleMenu = styled(MenuBody)`
  flex-grow: 0;
  justify-content: space-between;
  min-height: 100px;
  max-height: 100px;
`;

const TitleInput = styled.input`
  width: 90%;
  height: 50px;
  margin: 10px 0;
  border: 1px solid #eff0f5;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.8);

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #529cca inset;
  }
`;

const DescriptionMenu = styled(MenuBody)`
  flex-grow: 0;
  min-height: 200px;
`;

const DescriptionTextArea = styled.textarea`
  width: 90%;
  height: 150px;
  max-height: 500px;
  margin: 10px 0;
  border: 1px solid #eff0f5;
  border-radius: 10px;
  resize: none;
  background-color: rgba(255, 255, 255, 0.8);

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #529cca inset;
  }
`;

const ImageMenu = styled(MenuBody)``;

const ImagesWrapper = styled(flexCenter)`
  flex-direction: row;
  flex-wrap: wrap;
  margin: 10px 0;
`;

const ImageList = styled(MenuBody)`
  flex-grow: 1;
  height: 100%;

  .img {
    margin: 0 5px;
  }
`;

const ImageWrapper = styled(flexCenter)`
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  position: relative;
  margin: 10px 0;
  width: 130px;
`;

const IconWrapper = styled.div`
  position: absolute;
  z-index: 4;
  width: 100px;
  margin: 5px 15px 0 0;
  text-align: right;
  font-weight: 900;
  cursor: pointer;

  .bin {
    padding: 5px;
    border-radius: 50px;
    background-color: rgba(255, 255, 255, 0.5);
    color: black;

    &:hover {
      color: #a00000;
    }
  }
`;

const NodeImg = styled.img`
  width: 130px;
  margin: 20px;
  cursor: pointer;
`;
