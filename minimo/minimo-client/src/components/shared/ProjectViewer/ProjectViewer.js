/* eslint-disable react/no-array-index-key */
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import blocksMap from '../../../utils/blocksMap';

export default function ProjectViewer({ project }) {
  const { backgroundColor, blocks } = project;

  return (
    <MobileView
      bgColor={backgroundColor}
    >
      {blocks.map((block, index) => {
        const Block = blocksMap.get(block.type);

        return (
          <BlockWrapper
            key={block.id}
            draggable={false}
          >
            <Block
              index={index}
              data={block.data}
              isEditable={false}
            />
          </BlockWrapper>
        );
      })}
    </MobileView>
  );
}

ProjectViewer.propTypes = {
  project: PropTypes.shape({
    backgroundColor: PropTypes.string.isRequired,
    blocks: PropTypes.array.isRequired,
  }),
};

const BlockWrapper = styled.div`
  position: relative;
  padding: 0.5rem 2rem;
  outline: ${({ isActive }) => (isActive ? '1px solid #00da89' : 'none')};
`;

const MobileView = styled.div`
  width: 375px;
  height: 812px;
  margin: auto;
  overflow: scroll;
  background: ${({ bgColor }) => bgColor ?? 'none'};
`;
