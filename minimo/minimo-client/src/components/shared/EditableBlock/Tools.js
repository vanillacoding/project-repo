import React from 'react';
import PropTypes from 'prop-types';
import * as ICON from 'react-feather';
import styled from 'styled-components';

export default function Tools({
  makeDraggable,
  makeNotDraggable,
  onClickRemove,
}) {
  return (
    <ToolWrapper draggable={false}>
      <MoveTool
        onMouseDown={makeDraggable}
        onBlur={makeNotDraggable}
      >
        <ICON.Move size={19} />
      </MoveTool>
      <RemoveTool
        onClick={onClickRemove}
      >
        <ICON.X size={19} />
      </RemoveTool>
    </ToolWrapper>
  );
}

Tools.propTypes = {
  makeDraggable: PropTypes.func.isRequired,
  makeNotDraggable: PropTypes.func.isRequired,
  onClickRemove: PropTypes.func.isRequired,
};

const MoveTool = styled.div`
  cursor: move;
  background: #169af7;
`;

const RemoveTool = styled.div`
  cursor: pointer;
  background: rgba(255, 85, 4, 0.9);
`;

const ToolWrapper = styled.div`
  position: absolute;
  flex-direction: column;
  width: auto;
  top: 0;
  left: auto;
  right: -40px;

  & div {
    line-height: 0;
    padding: 0.3rem;
    color: white;
  }

  & svg {
    vertical-align: middle;
  }
`;
