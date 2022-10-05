/* eslint-disable @typescript-eslint/no-empty-function */
import React, { FocusEventHandler, MouseEventHandler, Ref } from "react";
import styled from "styled-components";
import { MdPlayCircleFilled } from "react-icons/md";

interface Props {
  summary?: string;
  playCircleColor: string;
  editableBlockRef?: Ref<HTMLDivElement>;
  onClickPlayCircle?: MouseEventHandler<SVGElement>;
  onBlurEditableBlock: FocusEventHandler<HTMLDivElement>;
}

function MilestoneEditableBlock({
  summary,
  playCircleColor,
  editableBlockRef,
  onClickPlayCircle,
  onBlurEditableBlock,
}: Props) {
  return (
    <MilestoneEditableBlockWrap>
      <MdPlayCircleFilled
        cursor="pointer"
        color={playCircleColor}
        size="35px"
        onClick={onClickPlayCircle}
      />
      <EditableBlock
        ref={editableBlockRef}
        placeholder="목표를 입력해주세요"
        contentEditable="true"
        suppressContentEditableWarning
        onBlur={onBlurEditableBlock}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.currentTarget.blur();
            window.getSelection().removeAllRanges();
          }
        }}
      >
        {summary}
      </EditableBlock>
    </MilestoneEditableBlockWrap>
  );
}

const EditableBlock = styled.div`
  width: 100%;
  padding: 10px;
`;

const MilestoneEditableBlockWrap = styled.div`
  display: flex;
  align-items: center;

  svg {
    padding: 0 5px;
  }
`;

MilestoneEditableBlock.defaultProps = {
  editableBlockRef: null,
  summary: "",
  onClickPlayCircle: () => {},
};

export default MilestoneEditableBlock;
