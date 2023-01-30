import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { cloneDeep } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  updateTranslatedBlocks,
  resetExecutingBlock,
} from "../../features/block/blockSlice";
import { WINDOW, BLOCK_NAMES, COLOR } from "../../config/constants";
import { sleep } from "../../utils/sleep";

function BlockCombinator({
  submittedBlockInfo,
  availableBlocks,
  limitCount,
  mapId,
}) {
  const { MOVE, TURN_RIGHT, TURN_LEFT, ATTACK, IF, WHILE, REPEAT } =
    BLOCK_NAMES;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectBlocksRef = useRef([]);
  const selectOptionRef = useRef({});
  const repeatCountRef = useRef({});
  const previousBlock = useRef([]);

  const [logicBlocks, setLogicBlocks] = useState([]);
  const [blocksCount, setBlocksCount] = useState(limitCount);
  const [blockLimitAlarm, setBlockLimitAlarm] = useState(COLOR.GRAY);
  const [isBlockFreezed, setIsBlockFreezed] = useState(false);

  const blocks = [
    { name: MOVE, isNestable: "false" },
    { name: TURN_RIGHT, isNestable: "false" },
    { name: TURN_LEFT, isNestable: "false" },
    { name: ATTACK, isNestable: "false" },
    { name: IF, isNestable: "false" },
    { name: WHILE, isNestable: "true" },
    { name: REPEAT, isNestable: "true" },
  ];
  const whileBlock = { type: WHILE, content: [] };
  const repeatBlock = { type: REPEAT, content: [] };

  const selectExecutingBlock = useSelector(
    (state) => state.block.executingBlock,
  );

  useEffect(() => {
    if (submittedBlockInfo) {
      translateBlocks();
      setIsBlockFreezed(true);
    } else {
      setIsBlockFreezed(false);
    }
  }, [submittedBlockInfo]);

  useEffect(() => {
    setBlocksCount(limitCount);
  }, [limitCount]);

  useEffect(() => {
    setBlocksCount(limitCount);

    return () => {
      setLogicBlocks([]);
      setIsBlockFreezed(false);
      setBlocksCount(limitCount);
      dispatch(resetExecutingBlock());
      selectBlocksRef.current = [];
      selectOptionRef.current = {};
      repeatCountRef.current = {};
      previousBlock.current = [];
    };
  }, [mapId]);

  useEffect(() => {
    try {
      if (selectExecutingBlock) {
        const indexes = selectExecutingBlock.split("-");

        if (selectExecutingBlock !== "end") {
          highlightBlock(indexes, COLOR.YELLOW, "5px");
        }

        if (previousBlock.current.length !== 0) {
          highlightBlock(previousBlock.current, COLOR.DEEP_BLUE, "3px");
        }

        selectExecutingBlock === "end"
          ? (previousBlock.current = [])
          : (previousBlock.current = indexes);
      }
    } catch (error) {
      navigate("/error", { state: { error } });
    }
  }, [selectExecutingBlock]);

  const highlightBlock = (indexes, color, width) => {
    try {
      if (!selectBlocksRef.current[indexes[0]]) return;

      if (indexes.length === 2) {
        selectBlocksRef.current[indexes[0]].childNodes[
          indexes[1]
        ].style.borderColor = color;
        selectBlocksRef.current[indexes[0]].childNodes[
          indexes[1]
        ].style.borderWidth = width;
      } else {
        selectBlocksRef.current[indexes[0]].style.borderColor = color;
        selectBlocksRef.current[indexes[0]].style.borderWidth = width;
      }
    } catch (error) {
      navigate("/error", { state: { error } });
    }
  };

  const handleCodeBlockDragStart = (event, group, type) => {
    if (isBlockFreezed) return false;

    if (blocksCount === 0) {
      handleBlockLimitAlarm();

      return false;
    }

    if (type === WHILE || type === REPEAT) {
      const currentBlock =
        type === WHILE ? { ...whileBlock } : { ...repeatBlock };
      event.dataTransfer.setData("currentBlock", JSON.stringify(currentBlock));
    } else {
      event.dataTransfer.setData("currentBlock", JSON.stringify(type));
    }

    event.dataTransfer.setData("currentBlockGroup", group);
  };

  const handleLogicBlockDragStart = (event, group, type, index) => {
    if (isBlockFreezed) return false;

    if (type === WHILE || type === REPEAT) {
      const currentBlock = cloneDeep(logicBlocks[index]);

      event.dataTransfer.setData("currentBlock", JSON.stringify(currentBlock));
    } else {
      event.dataTransfer.setData("currentBlock", JSON.stringify(type));
    }

    event.dataTransfer.setData("currentBlockGroup", group);
    event.dataTransfer.setData("currentBlockIndex", index);
  };

  const handleChildBlockDragStart = (event, group, type, index, childIndex) => {
    event.stopPropagation();
    event.dataTransfer.setData("currentBlockGroup", group);
    event.dataTransfer.setData("currentBlockIndex", index);
    event.dataTransfer.setData("currentBlockChildIndex", childIndex);
    event.dataTransfer.setData("currentBlock", JSON.stringify(type));
  };

  const handleEmptyBlockDrop = (event) => {
    event.stopPropagation();

    const newLogicBlocks = logicBlocks.slice();
    const currentBlockGroup = event.dataTransfer.getData("currentBlockGroup");
    const currentBlock = JSON.parse(event.dataTransfer.getData("currentBlock"));
    const currentBlockIndex = event.dataTransfer.getData("currentBlockIndex");
    const currentBlockChildIndex = event.dataTransfer.getData(
      "currentBlockChildIndex",
    );

    if (currentBlockGroup === "codeBlock") {
      newLogicBlocks.push(currentBlock);
      setBlocksCount(blocksCount - 1);
    } else if (currentBlockGroup === "logicBlock") {
      newLogicBlocks.splice(currentBlockIndex, 1);
      newLogicBlocks.push(currentBlock);
    } else if (currentBlockGroup === "childBlock") {
      newLogicBlocks[currentBlockIndex]["content"].splice(
        currentBlockChildIndex,
        1,
      );
      newLogicBlocks.push(currentBlock);
    }

    setLogicBlocks(newLogicBlocks);
  };

  const handleNonNestableBlockDrop = (event, targetBlockIndex) => {
    event.stopPropagation();

    const newLogicBlocks = logicBlocks.slice();
    const currentBlockGroup = event.dataTransfer.getData("currentBlockGroup");
    const currentBlock = JSON.parse(event.dataTransfer.getData("currentBlock"));
    const currentBlockIndex = event.dataTransfer.getData("currentBlockIndex");
    const currentBlockChildIndex = event.dataTransfer.getData(
      "currentBlockChildIndex",
    );

    if (currentBlockGroup === "codeBlock") {
      newLogicBlocks.splice(targetBlockIndex + 1, 0, currentBlock);
      setBlocksCount(blocksCount - 1);
    } else if (currentBlockGroup === "logicBlock") {
      newLogicBlocks.splice(currentBlockIndex, 1);
      newLogicBlocks.splice(targetBlockIndex, 0, currentBlock);
    } else if (currentBlockGroup === "childBlock") {
      newLogicBlocks[currentBlockIndex]["content"].splice(
        currentBlockChildIndex,
        1,
      );
      newLogicBlocks.splice(targetBlockIndex + 1, 0, currentBlock);
    }

    setLogicBlocks(newLogicBlocks);
  };

  const handleNestableBlockDrop = (event, targetBlockIndex) => {
    event.stopPropagation();

    const newLogicBlocks = logicBlocks.slice();
    const currentBlockGroup = event.dataTransfer.getData("currentBlockGroup");
    const currentBlock = JSON.parse(event.dataTransfer.getData("currentBlock"));
    const currentBlockIndex = event.dataTransfer.getData("currentBlockIndex");
    const currentBlockChildIndex = event.dataTransfer.getData(
      "currentBlockChildIndex",
    );

    if (currentBlockGroup === "codeBlock") {
      if (typeof currentBlock === "object") {
        newLogicBlocks.splice(targetBlockIndex + 1, 0, currentBlock);
      } else {
        newLogicBlocks[targetBlockIndex]["content"].push(currentBlock);
      }

      setBlocksCount(blocksCount - 1);
    } else if (currentBlockGroup === "logicBlock") {
      if (typeof currentBlock === "object") {
        newLogicBlocks.splice(currentBlockIndex, 1);
        newLogicBlocks.splice(targetBlockIndex, 0, currentBlock);
      } else {
        newLogicBlocks[targetBlockIndex]["content"].push(currentBlock);
        newLogicBlocks.splice(currentBlockIndex, 1);
      }
    } else if (currentBlockGroup === "childBlock") {
      newLogicBlocks[targetBlockIndex]["content"].push(currentBlock);
      newLogicBlocks[currentBlockIndex]["content"].splice(
        currentBlockChildIndex,
        1,
      );
    }

    setLogicBlocks(newLogicBlocks);
  };

  const handleChildBlockDrop = (
    event,
    targetBlockIndex,
    targetBlockChildIndex,
  ) => {
    event.stopPropagation();

    const newLogicBlocks = logicBlocks.slice();
    const currentBlockGroup = event.dataTransfer.getData("currentBlockGroup");
    const currentBlock = JSON.parse(event.dataTransfer.getData("currentBlock"));
    const currentBlockIndex = event.dataTransfer.getData("currentBlockIndex");
    const currentBlockChildIndex = event.dataTransfer.getData(
      "currentBlockChildIndex",
    );

    if (currentBlockGroup === "codeBlock") {
      if (typeof currentBlock === "object") {
        newLogicBlocks.splice(targetBlockIndex + 1, 0, currentBlock);
      } else {
        newLogicBlocks[targetBlockIndex]["content"].splice(
          targetBlockChildIndex + 1,
          0,
          currentBlock,
        );
      }

      setBlocksCount(blocksCount - 1);
    } else if (currentBlockGroup === "logicBlock") {
      if (typeof currentBlock === "object") {
        newLogicBlocks.splice(currentBlockIndex, 1);
        newLogicBlocks.splice(targetBlockIndex, 0, currentBlock);
      } else {
        newLogicBlocks[targetBlockIndex]["content"].splice(
          targetBlockChildIndex + 1,
          0,
          currentBlock,
        );
        newLogicBlocks.splice(currentBlockIndex, 1);
      }
    } else if (currentBlockGroup === "childBlock") {
      newLogicBlocks[currentBlockIndex]["content"].splice(
        currentBlockChildIndex,
        1,
      );
      newLogicBlocks[targetBlockIndex]["content"].splice(
        targetBlockChildIndex,
        0,
        currentBlock,
      );
    }

    setLogicBlocks(newLogicBlocks);
  };

  const limitNumberRange = (event) => {
    if (event.target.value < 0) {
      event.target.value = 9;
    } else if (event.target.value > 9) {
      event.target.value %= 10;
    }
  };

  const handleBlockLimitAlarm = async () => {
    setBlockLimitAlarm(COLOR.RED);

    await sleep(500);

    setBlockLimitAlarm(COLOR.GRAY);
  };

  const handleRemoveLogicBlock = (event) => {
    const newLogicBlocks = logicBlocks.slice();
    const currentBlockGroup = event.dataTransfer.getData("currentBlockGroup");
    const currentBlockIndex = event.dataTransfer.getData("currentBlockIndex");
    const currentBlockChildIndex = event.dataTransfer.getData(
      "currentBlockChildIndex",
    );

    if (currentBlockGroup === "logicBlock") {
      if (typeof newLogicBlocks[currentBlockIndex] === "string") {
        newLogicBlocks.splice(currentBlockIndex, 1);
        setBlocksCount(blocksCount + 1);
      } else {
        const contentCount =
          newLogicBlocks[currentBlockIndex]["content"].length;

        newLogicBlocks.splice(currentBlockIndex, 1);
        setBlocksCount(blocksCount + contentCount + 1);
      }
      setLogicBlocks(newLogicBlocks);
    } else if (currentBlockGroup === "childBlock") {
      newLogicBlocks[currentBlockIndex]["content"].splice(
        currentBlockChildIndex,
        1,
      );
      setBlocksCount(blocksCount + 1);
      setLogicBlocks(newLogicBlocks);
    }
  };

  const handleAllowDrop = (event) => {
    event.preventDefault();
  };

  const translateBlocks = () => {
    const translatedBlocks = cloneDeep(logicBlocks);

    for (const key in selectOptionRef.current) {
      const indexes = key.split("-");

      if (selectOptionRef.current[key]) {
        if (indexes.length === 2) {
          translatedBlocks[indexes[0]]["content"][indexes[1]] =
            selectOptionRef.current[key].value;
        } else {
          translatedBlocks[indexes[0]] = selectOptionRef.current[key].value;
        }
      }
    }

    for (const key in repeatCountRef.current) {
      if (repeatCountRef.current[key]) {
        translatedBlocks[key]["count"] = repeatCountRef.current[key].value;
      }
    }

    dispatch(updateTranslatedBlocks(translatedBlocks));
  };

  const clearLogicBlock = () => {
    if (!isBlockFreezed) {
      setLogicBlocks([]);
      setBlocksCount(limitCount);
      selectOptionRef.current = {};
      repeatCountRef.current = {};
    }
  };

  return (
    <Wrapper>
      <SelectionBlocks
        onDrop={handleRemoveLogicBlock}
        onDragOver={handleAllowDrop}
      >
        <Title>{WINDOW.BLOCKS_SELECTION}</Title>
        {blocks.map((block) => {
          if (availableBlocks.includes(block.name)) {
            return block.isNestable === "false" ? (
              <NonNestableBlock
                key={block.name}
                draggable={!isBlockFreezed}
                onDragStart={(event) =>
                  handleCodeBlockDragStart(event, "codeBlock", block.name)
                }
              >
                {block.name}
              </NonNestableBlock>
            ) : (
              <NestableBlock
                backGroundColor={block.name === WHILE ? COLOR.RED : COLOR.GREEN}
                key={block.name}
                draggable={!isBlockFreezed}
                onDragStart={(event) =>
                  handleCodeBlockDragStart(event, "codeBlock", block.name)
                }
              >
                {block.name}
              </NestableBlock>
            );
          }
        })}
      </SelectionBlocks>
      <LogicBlocks
        backGroundColor={blockLimitAlarm}
        onDragOver={handleAllowDrop}
      >
        <Title>
          {WINDOW.BLOCKS_LOGIC}
          <ClearButton onClick={clearLogicBlock}>🗑️</ClearButton>
        </Title>
        {logicBlocks.map((blockType, index) =>
          blockType === IF ? (
            <NonNestableBlock
              key={`${blockType}${index}`}
              ref={(element) => (selectBlocksRef.current[index] = element)}
              draggable={!isBlockFreezed}
              onDragStart={(event) =>
                handleLogicBlockDragStart(event, "logicBlock", blockType, index)
              }
              onDrop={(event) => handleNonNestableBlockDrop(event, index)}
            >
              {blockType}
              <SelectOption
                ref={(element) =>
                  (selectOptionRef.current[`${index}`] = element)
                }
              >
                <option value={"left"}>{"왼쪽으로 갈 수 있다면, ↪️"}</option>
                <option value={"right"}>{"오른쪽으로 갈 수 있다면, ↩️"}</option>
              </SelectOption>
            </NonNestableBlock>
          ) : typeof blockType === "string" ? (
            <NonNestableBlock
              key={`${blockType}${index}`}
              ref={(element) => (selectBlocksRef.current[index] = element)}
              draggable={!isBlockFreezed}
              onDragStart={(event) =>
                handleLogicBlockDragStart(event, "logicBlock", blockType, index)
              }
              onDrop={(event) => handleNonNestableBlockDrop(event, index)}
            >
              {blockType}
            </NonNestableBlock>
          ) : (
            <NestableBlock
              backGroundColor={
                blockType["type"] === REPEAT ? COLOR.GREEN : COLOR.RED
              }
              key={`${blockType["type"]}${index}`}
              ref={(element) => (selectBlocksRef.current[index] = element)}
              onDragStart={(event) =>
                handleLogicBlockDragStart(event, "logicBlock", blockType, index)
              }
              onDrop={(event) => handleNestableBlockDrop(event, index)}
              draggable={!isBlockFreezed}
            >
              <div>
                {blockType["type"]}
                {blockType["type"] === REPEAT && (
                  <CountInput
                    type={"number"}
                    ref={(element) =>
                      (repeatCountRef.current[`${index}`] = element)
                    }
                    onChange={limitNumberRange}
                    defaultValue={1}
                  ></CountInput>
                )}
              </div>
              {blockType["content"].map((childBlockType, childIndex) =>
                childBlockType === IF ? (
                  <NonNestableBlock
                    key={`${blockType["type"]}${index}${childIndex}`}
                    draggable={!isBlockFreezed}
                    onDragStart={(event) =>
                      handleChildBlockDragStart(
                        event,
                        "childBlock",
                        childBlockType,
                        index,
                        childIndex,
                      )
                    }
                    onDrop={(event) =>
                      handleChildBlockDrop(event, index, childIndex)
                    }
                  >
                    {childBlockType}
                    <SelectOption
                      ref={(element) =>
                        (selectOptionRef.current[`${index}-${childIndex}`] =
                          element)
                      }
                    >
                      <option value={"left"}>
                        {"왼쪽으로 갈 수 있다면, ↪️"}
                      </option>
                      <option value={"right"}>
                        {"오른쪽으로 갈 수 있다면, ↩️"}
                      </option>
                    </SelectOption>
                  </NonNestableBlock>
                ) : (
                  <NonNestableBlock
                    key={`${blockType["type"]}${index}${childIndex}`}
                    draggable={!isBlockFreezed}
                    onDragStart={(event) =>
                      handleChildBlockDragStart(
                        event,
                        "childBlock",
                        childBlockType,
                        index,
                        childIndex,
                      )
                    }
                    onDrop={(event) =>
                      handleChildBlockDrop(event, index, childIndex)
                    }
                  >
                    {childBlockType}
                  </NonNestableBlock>
                ),
              )}
            </NestableBlock>
          ),
        )}
        {Array(blocksCount)
          .fill("")
          .map((blockType, index) => (
            <EmptyBlock
              key={`emptyBlock${logicBlocks.length + index}`}
              onDrop={handleEmptyBlockDrop}
            >
              {blockType}
            </EmptyBlock>
          ))}
      </LogicBlocks>
    </Wrapper>
  );
}

const Title = styled.div`
  padding: 0.5rem;
  color: ${COLOR.DEEP_BLUE};
  font-size: 1.7rem;
  font-weight: bolder;
  text-align: center;
`;

const ClearButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 1.8rem;
  transition: all 300ms;
  cursor: pointer;

  &:hover {
    transform: scale(1.1) rotate(180deg);
  }
`;

const Wrapper = styled.div`
  display: flex;
`;

const SelectionBlocks = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 22vw;
  height: 70vh;
  margin-right: 2rem;
  border: 2.5px solid ${COLOR.BLACK};
  background-color: ${COLOR.YELLOW};
  box-shadow: 0rem 0.3rem 0.3rem rgba(0, 0, 0, 0.25);
`;

const LogicBlocks = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 22vw;
  height: 70vh;
  margin-right: 2rem;
  border: 2.5px solid ${COLOR.BLACK};
  background-color: ${(props) => props.backGroundColor};
  box-shadow: 0rem 0.3rem 0.3rem rgba(0, 0, 0, 0.25);
`;

const NonNestableBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  height: 2.5rem;
  margin: 0.1rem 0;
  background-color: ${COLOR.BLUE};
  border: 2px solid ${COLOR.BLACK};
  color: white;
  font-weight: bolder;
  font-size: 1vw;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
`;

const NestableBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90%;
  margin: 0.1rem 0;
  padding: 0.5rem 0.05rem;
  border: 2px solid ${COLOR.BLACK};
  background-color: ${(props) => props.backGroundColor};
  color: white;
  font-weight: bolder;
  font-size: 1vw;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
`;

const EmptyBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  height: 2.3rem;
  margin: 0.1rem 0;
  border: 2px dashed ${COLOR.BLACK};
  background-color: transparent;
  color: ${COLOR.WHITE};
  font-weight: bolder;
`;

const SelectOption = styled.select`
  width: 65%;
  margin-left: 0.5rem;
  border-radius: 4px;
  font-size: 0.6rem;
`;

const CountInput = styled.input`
  width: 2rem;
  margin-left: 0.5rem;
  border-radius: 4px;
  text-align: center;
`;

BlockCombinator.propTypes = {
  submittedBlockInfo: PropTypes.bool.isRequired,
  setSubmittedBlockInfo: PropTypes.func.isRequired,
  availableBlocks: PropTypes.array.isRequired,
  limitCount: PropTypes.number.isRequired,
  mapId: PropTypes.string.isRequired,
};

export { BlockCombinator };
