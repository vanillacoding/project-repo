import uniqueId from 'lodash.uniqueid';
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { ProjectContext } from '../../contexts/ProjectContext';
import blocksDefaultDataMap from '../../utils/blocksDefaultDataMap';

export default function useBlocks() {
  const { userId } = useContext(AuthContext);
  const { project, setProject } = useContext(ProjectContext);
  const [blocks, setBlocks] = useState(project.blocks);

  function resetBlockContents(index, contents) {
    setBlocks((prev) => {
      const prevCopy = [...prev];
      prevCopy[index].data.contents = contents;

      return prevCopy;
    });
  }

  function handleChangeBlock(e, index, name) {
    setBlocks((prev) => (
      [...prev].map((each, idx) => {
        if (index === idx) {
          each.data.contents[name] = e.target.value;
        }

        return each;
      })
    ));
  }

  function handleChangeStyle(value, index, prop) {
    setBlocks((prev) => (
      [...prev].map((each, idx) => {
        if (index === idx) {
          each.data.styles[prop] = value;
        }

        return each;
      })
    ));
  }

  function swapBlocks(index1, index2) {
    setBlocks((prev) => {
      const prevCopy = [...prev];
      const firstItem = prevCopy[index1];
      prevCopy[index1] = prevCopy[index2];
      prevCopy[index2] = firstItem;

      return prevCopy;
    });
  }

  function deleteBlock(targetIndex) {
    setBlocks((prev) => (
      [...prev].filter((block, index) => index !== targetIndex)
    ));
  }

  function insertBlock(index, blockId) {
    if (!blockId) {
      return;
    }

    // TODO: 보기좋게
    const defaultData = blocksDefaultDataMap.get(blockId)();
    const id = uniqueId();
    const newBlock = {
      id,
      type: blockId,
      data: defaultData,
    };

    setBlocks((prev) => {
      const prevCopy = [...prev];
      prevCopy.splice(index, 0, newBlock);
      return prevCopy;
    });
  }

  function handleClickSave(color) {
    setProject((prev) => ({
      ...prev,
      blocks,
      backgroundColor: color,
      creatorId: userId,
    }));
  }

  return {
    blocks,
    setBlocks,
    resetBlockContents,
    handleChangeBlock,
    handleChangeStyle,
    swapBlocks,
    deleteBlock,
    insertBlock,
    handleClickSave,
  };
}
