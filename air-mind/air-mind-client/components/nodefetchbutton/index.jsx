import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';

import { getNodesData } from '../../service/noderequests';
import { mindMapInfo, nodesInfo, userInfo } from '../../store/states';

export default function NodeFetchButton({ x, y, nodeId }) {
  const [nodeData, setNodeData] = useRecoilState(nodesInfo);
  const userData = useRecoilValue(userInfo);
  const { _id: userId } = userData;
  const mindMapData = useRecoilValue(mindMapInfo);
  const { _id: mindMapId } = mindMapData;

  const nodeFetcher = async e => {
    e.stopPropagation();
    try {
      const response = await getNodesData(userId, mindMapId, nodeId);

      if (response.result === 'ok') {
        setNodeData({ ...nodeData, ...response.node });
      } else if (response.result === 'error') {
        throw response.error;
      }
    } catch (error) {
      error.message = `Error during fetching node data : ${error.message}`;
      console.error(error);
    }
  };

  return (
    <foreignObject x={x - 20} y={y} width={50} height={50}>
      <FetchButton onClick={nodeFetcher}>+</FetchButton>
    </foreignObject>
  );
}

const FetchButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  border: 2px solid black;
  background-color: white;
  font-weight: 500;
`;

NodeFetchButton.propTypes = {
  x: PropTypes.node.isRequired,
  y: PropTypes.node.isRequired,
  nodeId: PropTypes.string.isRequired,
};
