import { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

import Button from "../../common/Button";
import SnippetSavingModal from "../../SnippetSavingModal";

import { deleteSnippet, shareSnippet } from "../../../api/service";

import { TOOL } from "../../../constants/variants";

import {
  COPY,
  SAVE,
  SHARE,
  DELETE,
} from "../../../constants/names";
import Tooltip from "../../Tooltip/Tooltip";

const ToolWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 320px;
`;

export default function SnippetTool({ creator, language, code, snippetId, hashtagList }) {
  const history = useHistory();
  const [isOpened, setIsOpened] = useState(false);
  const [onTooltip, setOnTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState(null);
  const userId = localStorage.getItem("userId");

  const buttons = [COPY];

  if (userId) {
    buttons.unshift(SAVE);
    buttons.push(SHARE);
  }

  if (userId === String(creator)) {
    buttons.push(DELETE);
  }

  const handleClick = async ({ target, clientX, clientY }) => {
    const buttonName = target.textContent;
    const OFFSET = 15;
    const DELAY = 1000;

    if (buttonName === SAVE) {
      setIsOpened(true);
      return;
    }

    if (buttonName === COPY) {
      if (!onTooltip) {
        await navigator.clipboard.writeText(code);

        setTooltipPosition({
          left: `${clientX + OFFSET}px`,
          top: `${clientY + OFFSET}px`,
        });

        setOnTooltip(true);

        setTimeout(() => {
          setOnTooltip(false);
        }, DELAY);
      }

      return;
    }

    if (buttonName === SHARE) {
      const hashtags = hashtagList.join(" ");
      const snippetData = { language, code, userId, hashtags };

      try {
        await shareSnippet(snippetData);

      } catch (error) {
        alert(error); // 에러처리
      }

      alert("공유 성공!");
      return;
    }

    if (buttonName === DELETE) {
      try {
        await deleteSnippet({ id: snippetId });
      } catch (error) {
        alert(error); // 에러처리
      }

      history.push("/");
    }
  };

  return (
    <>
      <ToolWrapper>
        {buttons.map((name) => (
          <Button
            key={name}
            variant={TOOL}
            onClick={(event) => handleClick(event)}
          >
            {name}
          </Button>
        ))}
      </ToolWrapper>
      {isOpened && (
        <SnippetSavingModal
          creator={creator}
          language={language}
          code={code}
          onClick={setIsOpened}
        />
      )}
      {onTooltip && (
        <Tooltip tooltipPosition={tooltipPosition} content="copied!"/>
      )}
    </>
  );
}
