import React from 'react';
import styled from 'styled-components';
import { fullWidthAndHeight } from '../../styles/mixin';

export default function Cell({ colorIndex }) {
  return <CellInnerBox colorIndex={colorIndex} />;
}

const CellInnerBox = styled.div`
  ${fullWidthAndHeight}
  background-color: ${({ colorIndex }) => (colorIndex ? '#805B3D' : '#573C12')};
`;
