import { useState } from "react";
import styled from "styled-components";

import Button from "../common/Button";
import CommentOptionDropdown from "./CommentOptionDropdown";

import { ICON } from "../../constants/variants";

const CommentOptionWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

export default function CommentOptionButton({ commentId, snippetId, userId, updateCommentList, setIsEditable }) {
  const [isClicked, setIsClicked] = useState(false);

  const UserMenuIcon = <img alt="댓글란 더보기 아이콘" src="/images/more.png" width="40" height="40" />;

  const handleDropDown = () => setIsClicked(!isClicked);

  return (
    <CommentOptionWrapper>
      <Button variant={ICON} onClick={handleDropDown} children={UserMenuIcon} />
      {isClicked && (
        <CommentOptionDropdown
          commentId={commentId}
          userId={userId}
          snippetId={snippetId}
          updateCommentList={updateCommentList}
          setIsEditable={setIsEditable}
        />
      )}
    </CommentOptionWrapper>
  );
}
