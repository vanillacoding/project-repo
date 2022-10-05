import PropTypes from "prop-types";
import styled from "styled-components";

import Info from "./Info";

import {
  LIKE,
  COMMENT,
} from "../../../constants/types";

const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Language = styled.div`
  width: 120px;
  height: 23px;
  padding-top: 7px;
  margin: 0px 15px;
  border-radius: 20px;
  background-color: black;
  color: #FFFFFF;
  font-weight: bold;
  text-align: center;
`;

export default function SnippetInfo({ language, likeCount, commentCount, isLiked, snippetId }) {
  return (
    <InfoWrapper>
      <Info type={LIKE} count={likeCount} isLiked={isLiked} snippetId={snippetId} />
      <Info type={COMMENT} image="/images/comment.png" count={commentCount} />
      <Language>{language}</Language>
    </InfoWrapper>
  );
}

SnippetInfo.propTypes = {
  language: PropTypes.string.isRequired,
  likeCount: PropTypes.number.isRequired,
  commentCount: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
  snippetId: PropTypes.string.isRequired,
};
