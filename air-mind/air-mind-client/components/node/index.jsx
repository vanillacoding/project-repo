import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import * as d3 from 'd3';

import NodeHoverOption from '../nodehoveroption';
import NodeFoldOption from '../nodefoldoption';
import NodeFetchButton from '../nodefetchbutton';
import NodeCoworkers from '../nodecoworkers';

import NODE_COLOR from '../../constants/nodecolor';
import NODE_SIZE from '../../constants/nodesize';
import setMovePosition from '../../utils/d3/setmoveposition';
import makeAncestors from '../../utils/makeancestors';
import {
  isOpenNodeOptionModal,
  clickedNodeId,
  currentUserInfo,
  mindMapInfo,
  socketInfo,
  searchInfo,
} from '../../store/states';

export default function Node({ nodeId, nodeData, setNodeData, socketUsers }) {
  const groupRef = useRef();
  const textRef = useRef();

  const [isOptionMode, setIsOptionMode] = useState(false);
  const [nodeRightOptionMode, setNodeRightOptionMode] = useRecoilState(
    isOpenNodeOptionModal,
  );
  const [currentNodeId, setCurrentNodeId] = useRecoilState(clickedNodeId);
  const currentUser = useRecoilValue(currentUserInfo);
  const mindMap = useRecoilValue(mindMapInfo);
  const { _id: mindMapId } = mindMap;
  const socket = useRecoilValue(socketInfo);
  const searched = useRecoilValue(searchInfo);
  const isSearched = searched.has(nodeId);

  const [textX, setTextX] = useState(0);
  const [textY, setTextY] = useState(0);

  const node = nodeData[nodeId];

  let nodeAttribute;
  let nodeTitle;
  let nodeX;
  let nodeY;
  let nodeWidth;
  let nodeHeight;
  let nodeColor;
  let isFold;

  if (node && Object.keys(node)?.length > 0) {
    ({ attribute: nodeAttribute, title: nodeTitle } = node);
    ({ cordX: nodeX, cordY: nodeY, isFold } = nodeAttribute);
    ({ width: nodeWidth, height: nodeHeight } = NODE_SIZE[nodeAttribute.size]);
    nodeColor = NODE_COLOR[nodeAttribute.color];
  }

  useEffect(() => {
    if (node && Object.keys(node)?.length > 0) {
      const nodeSelected = d3.select(groupRef.current);

      if (currentUser && Object.keys(currentUser).length > 0) {
        setMovePosition(
          nodeSelected,
          nodeX,
          nodeY,
          nodeId,
          nodeData,
          setNodeData,
          mindMap,
          socket,
        );
      }
    }
  }, [node]);

  useEffect(() => {
    const textRect = textRef.current?.getBoundingClientRect();
    setTextX(
      textRef.current ? nodeX + (nodeWidth - textRect.width) / 2 : nodeX,
    );
    setTextY(
      textRef.current
        ? nodeY + nodeHeight - (nodeHeight - (textRect.height - 5)) / 2
        : nodeY,
    );
  }, [node]);

  const onClickHandler = e => {
    e.stopPropagation();
    if (!nodeRightOptionMode) {
      setNodeRightOptionMode(true);
      setCurrentNodeId(nodeId);
      socket.emit(
        'enterNode',
        socket.id,
        currentUser.profile,
        makeAncestors(nodeId, nodeData),
        mindMapId,
      );
    } else if (nodeId === currentNodeId) {
      setNodeRightOptionMode(false);
      setCurrentNodeId('');
      socket.emit('leaveNode', socket.id, mindMapId);
    } else {
      setCurrentNodeId(nodeId);
      socket.emit(
        'enterNode',
        socket.id,
        currentUser.profile,
        makeAncestors(nodeId, nodeData),
        mindMapId,
      );
    }
  };

  const hoverHandler = () => {
    setIsOptionMode(true);
  };

  return (
    <g
      id={`node${nodeId}`}
      ref={groupRef}
      x={nodeX}
      y={nodeY}
      onMouseOver={hoverHandler}
      onMouseOut={() => setIsOptionMode(false)}
      onClick={onClickHandler}
    >
      <RectSvg
        x={nodeX}
        y={nodeY}
        width={nodeWidth}
        height={nodeHeight}
        rx={20}
        selectedColor={nodeColor}
        isSearched={isSearched}
      />
      <TextSvg ref={textRef} x={textX} y={textY - 8} dominantBaseline="middle">
        {nodeTitle}
      </TextSvg>
      {isOptionMode && (
        <NodeHoverOption
          x={nodeX}
          y={nodeY}
          setIsOptionMode={setIsOptionMode}
          selectedColor={nodeColor}
          nodeId={nodeId}
        />
      )}
      {node?.children.length > 0 && nodeData[node.children[0]] && (
        <NodeFoldOption x={nodeX} y={nodeY} nodeId={nodeId} isFold={isFold} />
      )}
      {node?.children.length > 0 && !nodeData[node?.children[0]] && (
        <NodeFetchButton x={nodeX} y={nodeY} nodeId={nodeId} />
      )}
      <NodeCoworkers x={nodeX} y={nodeY} socketUsers={socketUsers} />
    </g>
  );
}

const RectSvg = styled.rect`
  fill: ${props => props.selectedColor};
  stroke: ${props => (props.isSearched ? 'red' : 'none')};
  stroke-width: 4;
`;

const TextSvg = styled.text`
  font-size: 18px;
  font-weight: 500;
`;

Node.propTypes = {
  nodeId: PropTypes.string.isRequired,
  nodeData: PropTypes.object.isRequired,
  setNodeData: PropTypes.func.isRequired,
  socketUsers: PropTypes.array.isRequired,
};
