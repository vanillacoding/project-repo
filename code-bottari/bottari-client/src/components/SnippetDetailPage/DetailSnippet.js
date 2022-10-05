import { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import HashtagList from "../Snippet/HashtagList/HashtagList";
import UserProfile from "../Snippet/UserProfile/UserProfile";
import SnippetTool from "../Snippet/SnippetTool/SnippetTool";
import SnippetInfo from "../Snippet/SnippetInfo/SnippetInfo";
import CodeEditor from "../CodeEditor/CodeEditor";

import getDate from "../../utils/getDate";

const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  justify-items: center;
  width: 1100px;
  height: 60px;
`;

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1100px;
  height: 60px;
`;

const Date = styled.div`
  width: 100px;
  height: 20px;
  padding-left: 15px;
  font-weight: bold;
`;

export default function DetailSnippet({ snippet }) {
  const { hashtagList, creator, poster, language: defaultLanguage, likerList, commentList, createdAt, _id: snippetId, code: defaultCode } = snippet;

  const { _id: posterId, nickname, imageUrl, followerList } = poster;

  const [language, setLanguage] = useState(defaultLanguage);
  const [code, setCode] = useState(defaultCode);

  const userId = localStorage.getItem("userId");

  const isLiked = likerList.includes(userId);
  const isFollowed = followerList.includes(userId);

  const dateFormat = getDate(createdAt);

  return (
    <>
      <HashtagList
        type="detail"
        hashtags={hashtagList} />
      <CodeEditor width="1100px" height="400px" language={language} code={code} onEdit={setCode} onLanguageSelect={setLanguage} />
      <InfoWrapper>
        <UserProfile
          posterId={posterId}
          profileUrl={imageUrl}
          nickname={nickname}
          follower={followerList}
          isFollowed={isFollowed}
        />
        <SnippetInfo
          language={language}
          likeCount={likerList.length}
          commentCount={commentList.length}
          isLiked={isLiked}
          snippetId={snippetId}
        />
      </InfoWrapper>
      <Footer>
        <Date>{dateFormat}</Date>
        <SnippetTool
          creator={creator._id}
          language={language}
          code={code}
          snippetId={snippetId}
          hashtagList={hashtagList}
        />
      </Footer>
    </>
  );
}

DetailSnippet.propTypes = {
  snippet: PropTypes.shape({
    hashtagList: PropTypes.array.isRequired,
    creator: PropTypes.object.isRequired,
    poster: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired,
    likerList: PropTypes.array,
    commentList: PropTypes.array,
    createdAt: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    defaultCode: PropTypes.string,
  }),
};
