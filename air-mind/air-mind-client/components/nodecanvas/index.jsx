import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import zoomPanning from '../../utils/d3/zoompanning';
import makeNodeComponentList from '../../utils/d3/makenodecomponentlist';
import decideSocketUserNode from '../../utils/decidesocketusernode';
import {
  nodesInfo,
  socketUserInfo,
  isOpenNodeOptionModal,
  mindMapInfo,
  socketInfo,
  isOpenNodeCommentModal,
} from '../../store/states';

export default function NodeCanvas({ headNode }) {
  const groupRef = useRef();
  const wrapperRef = useRef();

  const [nodeData, setNodeData] = useRecoilState(nodesInfo);
  const setNodeRightOptionMode = useSetRecoilState(isOpenNodeOptionModal);
  const setNodeCommentMode = useSetRecoilState(isOpenNodeCommentModal);
  const socketUserData = useRecoilValue(socketUserInfo);
  const mindMapData = useRecoilValue(mindMapInfo);
  const { _id: mindMapId } = mindMapData;
  const socket = useRecoilValue(socketInfo);

  const [nodeComponentList, setNodeComponentList] = useState([]);
  const [decidedSocketUser, setDecidedSocketUser] = useState({});

  useEffect(() => {
    zoomPanning(groupRef);
  }, []);

  useEffect(() => {
    setDecidedSocketUser(decideSocketUserNode(nodeData, socketUserData));
  }, [nodeData, socketUserData]);

  useEffect(() => {
    if (nodeData && Object.keys(nodeData).length > 0) {
      setNodeComponentList(
        makeNodeComponentList(
          nodeData,
          setNodeData,
          headNode,
          decidedSocketUser,
        ),
      );
    }
  }, [nodeData, decidedSocketUser]);

  const optionHandler = () => {
    setNodeRightOptionMode(false);
    setNodeCommentMode(false);
    socket.emit('leaveNode', socket.id, mindMapId);
  };

  return (
    <Container ref={wrapperRef}>
      <SVG onClick={optionHandler}>
        <g ref={groupRef}>{nodeComponentList}</g>
      </SVG>
    </Container>
  );
}

NodeCanvas.propTypes = {
  headNode: PropTypes.string.isRequired,
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
`;

const SVG = styled.svg`
  width: 100%;
  height: 100%;
`;
