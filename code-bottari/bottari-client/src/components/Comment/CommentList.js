import { useEffect, useState } from "react";
import styled from "styled-components";

import Comment from "./Comment";
import PaginationBar from "./PaginationBar";

const CommentListBox = styled.div`
  align-items: center;
  width: 1100px;
  margin-bottom: 200px;
  border: 2px solid #543FD3;
  border-radius: 8px;
`;

const Message = styled.div`
  align-items: center;
  width: 1100px;
  height: 100px;
  margin-bottom: 200px;
  border: 2px solid #543FD3;
  border-radius: 8px;
  font-size: 20px;
  text-align: center;
  line-height: 100px;
`;

export default function CommentList({ snippet, userId, updateCommentList }) {
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const commentsPerPage = 5;

  const { _id, commentList, poster } = snippet;

  useEffect(() => {
    setComments(commentList);
  }, [commentList]);

  const getCurrentComments = (list) => {
    const indexOfLast = currentPage * commentsPerPage;
    const indexOfFirst = indexOfLast - commentsPerPage;

    return list.slice(indexOfFirst, indexOfLast);
  };

  if (commentList.length === 0) {
    return <Message>{poster.nickname}님의 게시글에 첫 댓글을 남겨보세요!</Message>;
  }

  return (
    <CommentListBox>
      {getCurrentComments(comments).map((comment) => (
        <Comment
          key={comment._id}
          commentData={comment}
          snippetId={_id}
          userId={userId}
          updateCommentList={updateCommentList}
        />
      ))}
      <PaginationBar commentsPerPage={commentsPerPage} totalComments={comments.length} paginate={setCurrentPage}></PaginationBar>
    </CommentListBox>
  );
}
