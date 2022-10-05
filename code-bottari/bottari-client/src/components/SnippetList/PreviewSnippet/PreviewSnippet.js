import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

import SnippetHeader from "./SnippetHeader";
import Editor from "../../CodeEditor/Editor";
import SnippetFooter from "./SnippetFooter";

import getDate from "../../../utils/getDate";

const SnippetBox = styled.div`
  width: 700px;
  height: 380px;
  margin: 20px 0px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.4);
`;

export default function PreviewSnippet({ data, snippetId, profileImage, nickname }) {
  const { _id, poster, language: defaultLanguage, createdAt, likerList, commentList, code, hashtagList } = data;
  const { _id: posterId, imageUrl, nickname: posterNickname, followerList } = poster;

  const [language, setLanguage] = useState(defaultLanguage);

  const editorOptions = {
    theme: "monokai",
    fontSize: 14,
    readOnly: true,
    code,
    tab: 2,
  };

  const dateFormat = getDate(createdAt);

  const userId = localStorage.getItem("userId");

  const isLiked = likerList.includes(userId);

  return (
    <SnippetBox>
      <SnippetHeader
        posterId={posterId}
        profileUrl={profileImage || imageUrl}
        nickname={posterNickname || nickname}
        follower={followerList}
        language={language}
        code={code}
        hashtags={hashtagList}
      />
      <Link to={`/snippets/${_id}`}>
        <Editor
          editorOptions={editorOptions}
          width="700px"
          height="230px"
          type="preview"
          code={code}
          language={language}
          onLanguageSelect={setLanguage}
        />
      </Link>
      <SnippetFooter
        createdAt={dateFormat}
        likeCount={likerList.length}
        commentCount={commentList.length}
        isLiked={isLiked}
        snippetId={snippetId}
      />
    </SnippetBox>
  );
}

PreviewSnippet.propTypes = {
  data: PropTypes.object.isRequired,
  snippetId: PropTypes.string.isRequired,
  profileImage: PropTypes.string,
  nickname: PropTypes.string,
};
