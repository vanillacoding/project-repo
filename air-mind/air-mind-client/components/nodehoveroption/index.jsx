import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import {
  BiCommentDetail as CommentIcon,
  BiPlusMedical as PlusIcon,
  BiUpArrowCircle as BiggerIcon,
  BiDownArrowCircle as SmallerIcon,
} from 'react-icons/bi';
import { TbResize as SizeIcon } from 'react-icons/tb';
import { RiDeleteBin6Line as RecycleBinIcon } from 'react-icons/ri';

import flexCenter from '../shared/flexcentercontainer';

import {
  isOpenNodeCommentModal,
  mindMapInfo,
  socketInfo,
  nodesInfo,
  currentUserInfo,
  clickedNodeId,
  isOpenNodeOptionModal,
} from '../../store/states';
import NODE_COLOR from '../../constants/nodecolor';
import calculateNewNodePosition from '../../utils/d3/calculatenewnodeposition';
import deleteNodeHelper from '../../utils/deletenodehelper';
import {
  deleteNodesData,
  postNodesData,
  putNodesData,
} from '../../service/noderequests';
import { DELETE_CONFIRM_MESSAGE } from '../../constants/constants';

export default function NodeHoverOption({
  x,
  y,
  setIsOptionMode,
  selectedColor,
  nodeId,
}) {
  const [currentNodeId, setCurrentNodeId] = useRecoilState(clickedNodeId);
  const [nodeCommentMode, setNodeCommentMode] = useRecoilState(
    isOpenNodeCommentModal,
  );
  const [nodeData, setNodeData] = useRecoilState(nodesInfo);
  const isHead = nodeData[nodeId]?.parent === undefined;
  const setNodeRightOptionMode = useSetRecoilState(isOpenNodeOptionModal);
  const mindMap = useRecoilValue(mindMapInfo);
  const { _id: mindMapId } = mindMap;
  const { _id: authorId } = mindMap.author;
  const currentUser = useRecoilValue(currentUserInfo);
  const socket = useRecoilValue(socketInfo);

  const [isSelectColorMode, setIsSelectColorMode] = useState(false);
  const [isSelectSizeMode, setIsSelectSizeMode] = useState(false);

  const onClickColorPalette = (e, item) => {
    e.stopPropagation();
    if (currentUser && Object.keys(currentUser).length > 0) {
      setNodeData(prev => {
        const temp = { ...prev };
        const tempSel = { ...temp[nodeId] };

        tempSel.attribute = {
          ...tempSel.attribute,
          color: item,
        };
        temp[nodeId] = tempSel;

        putNodesData(authorId, mindMapId, nodeId, temp[nodeId]);

        return temp;
      });

      socket.emit('colorChange', mindMapId, nodeId, item);

      setIsSelectColorMode(prev => !prev);
    }
  };

  const onClickResize = (e, change) => {
    e.stopPropagation();
    if (currentUser && Object.keys(currentUser).length > 0) {
      setNodeData(prev => {
        const temp = { ...prev };
        const tempSel = { ...temp[nodeId] };

        const currentSize = tempSel.attribute.size;
        let newSize;

        if (change === 'bigger') {
          switch (currentSize) {
            case 'SMALL':
              newSize = 'MEDIUM';
              break;
            case 'MEDIUM':
              newSize = 'LARGE';
              break;
            default:
              newSize = 'LARGE';
          }
        } else {
          switch (currentSize) {
            case 'LARGE':
              newSize = 'MEDIUM';
              break;
            case 'MEDIUM':
              newSize = 'SMALL';
              break;
            default:
              newSize = 'SMALL';
          }
        }

        tempSel.attribute = {
          ...tempSel.attribute,
          size: newSize,
        };
        temp[nodeId] = tempSel;

        putNodesData(authorId, mindMapId, nodeId, temp[nodeId]);

        return temp;
      });

      setIsSelectSizeMode(prev => !prev);
    }
    socket.emit('sizeChange', mindMapId, nodeId, change);
  };

  const createNode = async (id, headId) => {
    if (currentUser && Object.keys(currentUser).length > 0) {
      const calculated = calculateNewNodePosition(id, headId);
      const newNode = await postNodesData(authorId, mindMapId, nodeId, {
        attribute: calculated,
      });

      setNodeData(prev => {
        const tempData = { ...prev };
        const { _id: newId } = newNode.node;
        const newParent = {
          ...tempData[nodeId],
          children: [...tempData[nodeId].children, newId],
        };

        tempData[nodeId] = newParent;
        tempData[newId] = newNode.node;

        return { ...prev, ...tempData };
      });
      socket.emit('addNode', mindMapId, newNode, nodeId);
    }
  };

  const deleteNode = async e => {
    e.stopPropagation();

    const confirmCheck = window.confirm(DELETE_CONFIRM_MESSAGE);
    if (!confirmCheck) {
      return;
    }

    if (currentUser && Object.keys(currentUser).length > 0) {
      deleteNodeHelper(nodeId, nodeData, setNodeData);
      await deleteNodesData(authorId, mindMapId, nodeId);

      socket.emit('deleteNode', nodeId, nodeData, authorId, mindMapId);
    }

    setCurrentNodeId('');
    setNodeRightOptionMode(false);
    setNodeCommentMode(false);
    socket.emit('leaveNode', socket.id, mindMapId);
  };

  const commentNode = e => {
    e.stopPropagation();
    setCurrentNodeId(nodeId);

    if (currentNodeId === nodeId) {
      setNodeCommentMode(!nodeCommentMode);
      return;
    }

    setNodeCommentMode(true);
  };

  return (
    <foreignObject x={x + 20} y={y - 180} width={125} height={180}>
      <HoverContainer>
        {isSelectColorMode && (
          <ColorPalette>
            {Object.keys(NODE_COLOR).map(item => (
              <ColorButton
                key={item}
                selectedColor={NODE_COLOR[item]}
                onClick={e => onClickColorPalette(e, item)}
              />
            ))}
          </ColorPalette>
        )}
        {isSelectSizeMode && (
          <SizePalette>
            <BiggerIcon
              className="sizeButton"
              onClick={e => onClickResize(e, 'bigger')}
            />
            <SmallerIcon
              className="sizeButton"
              onClick={e => onClickResize(e, 'smaller')}
            />
          </SizePalette>
        )}
        <Menu
          onMouseOver={() => setIsOptionMode(true)}
          onMouseOut={() => setIsOptionMode(false)}
        >
          <Icon
            className="leftIcon"
            onClick={e => {
              e.stopPropagation();
              setIsSelectColorMode(prev => !prev);
            }}
          >
            <ColorButton selectedColor={selectedColor} />
          </Icon>
          <Icon
            onClick={e => {
              e.stopPropagation();
              setIsSelectSizeMode(prev => !prev);
            }}
          >
            <SizeIcon size="24" className="icon" />
          </Icon>
          <Icon
            onClick={e => {
              e.stopPropagation();
              createNode(nodeId, mindMap.headNode);
            }}
          >
            <PlusIcon size="24" className="icon" />
          </Icon>
          {isHead && (
            <Icon className="rightIcon" onClick={commentNode}>
              <CommentIcon size="24" className="icon" />
            </Icon>
          )}
          {!isHead && (
            <>
              <Icon onClick={commentNode}>
                <CommentIcon size="24" className="icon" />
              </Icon>
              <Icon className="rightIcon" onClick={deleteNode}>
                <RecycleBinIcon size="24" className="icon" />
              </Icon>
            </>
          )}
        </Menu>
      </HoverContainer>
    </foreignObject>
  );
}

const HoverContainer = styled(flexCenter)`
  position: relative;
  width: 100%;
  height: 100%;
  transition: background-color 0.5s ease;
`;

const Menu = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 120px;
  height: 30px;
  border-radius: 5px;
  border: 1px solid #e6e6e6;
  background-color: white;
  transform: translateY(73px);

  .leftIcon {
    border-radius: 4px 0 0 4px;
  }

  .rightIcon {
    border: none;
    border-radius: 0 4px 4px 0;
  }
`;

const ColorPalette = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  justify-items: center;
  position: absolute;
  width: 80px;
  height: 80px;
  border-radius: 5px;
  background-color: white;
  transform: translateX(-20px) translateY(16px);
  transition: background-color 0.3s ease;
`;

const ColorButton = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50px;
  background-color: ${props => props.selectedColor};
  transition: 100ms linear;
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 0 1px #696969 inset;
    transform: scale(1.1);
  }
`;

const SizePalette = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-items: center;
  position: absolute;
  width: 50px;
  height: 30px;
  border-radius: 5px;
  background-color: white;
  transform: translateX(-10px) translateY(45px);
  transition: background-color 0.3s ease;

  .sizeButton {
    width: 20px;
    height: 20px;
    border-radius: 50px;
    background-color: ${props => props.selectedColor};
    transition: 100ms linear;
    cursor: pointer;

    &:hover {
      box-shadow: 0 0 0 1px #696969 inset;
      transform: scale(1.1);
    }
  }
`;

const Icon = styled(flexCenter)`
  width: 30px;
  height: 30px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #dbdbdb;
  }
`;

NodeHoverOption.propTypes = {
  x: PropTypes.node.isRequired,
  y: PropTypes.node.isRequired,
  setIsOptionMode: PropTypes.func.isRequired,
  selectedColor: PropTypes.string.isRequired,
  nodeId: PropTypes.string.isRequired,
};
