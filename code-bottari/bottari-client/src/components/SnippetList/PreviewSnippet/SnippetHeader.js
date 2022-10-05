import { useState } from "react";
import styled from "styled-components";

import PropTypes from "prop-types";

import Button from "../../common/Button";

import UserProfile from "../../Snippet/UserProfile/UserProfile";
import HashtagList from "../../Snippet/HashtagList/HashtagList";
import Tooltip from "../../Tooltip/Tooltip";

import { TOOL } from "../../../constants/variants";

const HeaderBox = styled.div`
  width: 700px;
  height: 95px;
  padding-bottom: 5px;
`;

const CreatorBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 700px;
  height: 35px;
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

export default function SnippetHeader({ posterId, profileUrl, nickname, follower, language, code, hashtags }) {
  const [onTooltip, setOnTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState(null);

  const userId = localStorage.getItem("userId");
  const isFollowed = follower.includes(userId);

  const isLogin = userId !== null;

  const handleClick = async ({ clientX, clientY }) => {
    const OFFSET = 15;
    const DELAY = 1000;

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
  };

  return (
    <HeaderBox>
      <CreatorBox>
        <UserProfile
          posterId={posterId}
          profileUrl={profileUrl}
          nickname={nickname}
          follower={follower}
          isFollowed={isFollowed}
          isLogin={isLogin}
        />
        <Button variant={TOOL} onClick={handleClick}>복사</Button>
        {onTooltip && (
          <Tooltip tooltipPosition={tooltipPosition} content="copied!" />
        )}
      </CreatorBox>
      <TitleBox>
        <HashtagList
          type="preview"
          hashtags={hashtags}
        />
        <Language>{language}</Language>
      </TitleBox>
    </HeaderBox>
  );
}

SnippetHeader.propTypes = {
  posterId: PropTypes.string.isRequired,
  profileUrl: PropTypes.string.isRequired,
  nickname: PropTypes.string.isRequired,
  follower: PropTypes.array.isRequired,
  language: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  hashtags: PropTypes.array.isRequired,
};
