import PropTypes from 'prop-types';
import React, { createRef } from 'react';
import AnimateBlocks from '../AnimateBlocks';
import EditableBlock from '../shared/EditableBlock';
import blocksMap from '../../utils/blocksMap';

export default function EditableProject({
  blocks,
  swapBlocks,
  insertBlock,
  resetBlockContents,
  handleChangeBlock,
  handleChangeStyle,
  deleteBlock,
}) {
  return (
    <AnimateBlocks>
      {blocks.map((block, index) => {
        const Block = blocksMap.get(block.type);
        return (
          <div
            ref={createRef()}
            key={block.id}
          >
            <EditableBlock
              index={index}
              insertBlock={insertBlock}
              swapBlocks={swapBlocks}
              deleteBlock={deleteBlock}
            >
              <Block
                index={index}
                data={block.data}
                // NOTE: text는 onchange, link는 reset을 쓸 듯.
                onChange={handleChangeBlock}
                handleChangeStyle={handleChangeStyle}
                resetBlockContents={resetBlockContents}
              />
            </EditableBlock>
          </div>
        );
      })}
    </AnimateBlocks>
  );
}

EditableProject.propTypes = {
  blocks: PropTypes.array.isRequired,
  insertBlock: PropTypes.func.isRequired,
  deleteBlock: PropTypes.func.isRequired,
  swapBlocks: PropTypes.func.isRequired,
  resetBlockContents: PropTypes.func.isRequired,
  handleChangeBlock: PropTypes.func.isRequired,
  handleChangeStyle: PropTypes.func.isRequired,
};
