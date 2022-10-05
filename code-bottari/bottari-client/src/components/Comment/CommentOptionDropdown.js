import { useState } from "react/cjs/react.development";
import styled from "styled-components";

import Button from "../common/Button";
import Dropdown from "../common/Dropdown";

import { deleteComment } from "../../api/service";

import {
  LIST,
  COMMENT_OPTION,
} from "../../constants/variants";

import {
  DELETE_COMMENT_SUCCEEDED,
  OK,
} from "../../constants/messages";

import {
  EDIT,
  DELETE,
} from "../../constants/names";

const DropdownWrapper = styled.div`
  position: absolute;
  right: -130px;
  z-index: 100;
  border-radius: 5px;
`;

export default function CommentOptionDropdown({ commentId, snippetId, userId, updateCommentList, setIsEditable }) {
  const [idOpened, setIsOpened] = useState(true);

  const handleCommentOptionButton = async (buttonName) => {
    if (buttonName === EDIT) {
      setIsEditable(true);
      setIsOpened(false);
    }

    if (buttonName === DELETE) {
      const response = await deleteComment({ userId, commentId, snippetId });

      if (response.result === OK) {
        alert(DELETE_COMMENT_SUCCEEDED);

        updateCommentList(true);
      }

      setIsOpened(false);
    }
  };

  const commentOptionList = [EDIT, DELETE].map((text) => (
    <Button
      variant={COMMENT_OPTION}
      onClick={() => handleCommentOptionButton(text)}
      key={text}
    >
      {text}
    </Button >
  ));

  return (
    <DropdownWrapper>
      {idOpened && (
        <Dropdown variant={LIST} children={commentOptionList} />
      )}
    </DropdownWrapper>
  );
}
