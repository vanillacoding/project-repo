import styled from "styled-components";
import CommentInput from "./CommentInput";
import CommentList from "./CommentList";

const Wrapper = styled.div`
  width: 1100px;
  margin: 15px auto;
`;

export default function CommentBox({ snippet, updateCommentList }) {
  const { _id } = snippet;

  const userId = localStorage.getItem("userId");

  return (
    <Wrapper>
      <CommentInput snippetId={_id} userId={userId} updateCommentList={updateCommentList} />
      <CommentList snippet={snippet} userId={userId} updateCommentList={updateCommentList} />
    </Wrapper>
  );
}
