import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useQueryClient } from "react-query";
import styled from "styled-components";

import NotificationBar from "./NotificationBar";
import FollowingBar from "./FollowingBar";
import UserTab from "./UserTab";
import SelectBox from "../AligningSelectBox/AligningSelectBox";
import UserSnippetList from "./UserSnippetList";
import Button from "../common/Button";
import FollowingList from "./FollowingList";

import {
  getUserData,
  getUserSnippetList,
} from "../../api/service";

import {
  LIKE_ICON,
  COMMENT_ICON,
  NEW_SNIPPET_ICON,
  FOLLOWER_ICON,
} from "../../constants/images";

import {
  ALL,
  MY,
  SAVED
} from "../../constants/filters";

import {
  FILTER,
  NOTIFICATION,
} from "../../constants/variants";

const Wrapper = styled.div`
  display: grid;
  position: relative;
  grid-template-columns: 430px 1fr;
  grid-template-rows: 100px 1fr;
  justify-items: center;
  margin-top: 20px;

  * {
    &:first-child {
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 1;
    grid-row-end: 3;
    }

    &:nth-child(2) {
      grid-column-start: 2;
      grid-column-end: 3;
      grid-row-start: 1;
      grid-row-end: 2;
    }

    &:nth-child(3) {
      grid-column-start: 2;
      grid-column-end: 3;
      grid-row-start: 2;
      grid-row-end: 3;
    }
  }
`;

const Side = styled.div`
  display: flex;
  position: absolute;
  height: 2000px;
`;

const ButtonWrapper = styled.div`
  position: relative;
`;

const StyledButton = styled(Button)`
  width: 400px;
  margin-left: 15px;
`;

const NotificationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Icon = styled.img`
  width: 30px;
  height: 30px;
`;

const Message = styled.div`
  display: inline-block;
  margin: 0px 0px 0px 5px;
`;

const Menu = styled.div`
  display: grid;
  grid-template-columns: 120px 20px 120px 20px 120px 2fr 1fr;
  grid-template-rows: 2fr 1fr;
  align-items: center;
  width: 700px;

  * {
    &:first-child {
      grid-column-start: 1;
      grid-column-end: 2;
      grid-row-start: 1;
      grid-row-end: 2;
    }

    &:nth-child(2) {
      grid-column-start: 3;
      grid-column-end: 4;
      grid-row-start: 1;
      grid-row-end: 2;
    }

    &:nth-child(3) {
      grid-column-start: 5;
      grid-column-end: 6;
      grid-row-start: 1;
      grid-row-end: 2;
    }

    &:nth-child(4) {
      grid-column-start: 7;
      grid-column-end: 8;
      grid-row-start: 1;
      grid-row-end: 2;
    }
  }
`;

const selectIcon = (type) => {
  const iconTypes = {
    like: LIKE_ICON,
    comment: COMMENT_ICON,
    snippet: NEW_SNIPPET_ICON,
    follower: FOLLOWER_ICON,
  };

  return iconTypes[type];
};

const selectAlternative = (type) => {
  const alternativeTypes = {
    like: "좋아요 아이콘",
    comment: "댓글 아이콘",
    snippet: "스니펫 아이콘",
    follower: "팔로우 아이콘",
  };

  return alternativeTypes[type];
};

const selectMessage = (type, user) => {
  const messageTypes = {
    like: `${user.nickname}님께서 회원님의 스니펫을 좋아합니다.`,
    comment: `${user.nickname}님께서 회원님의 스니펫에 댓글을 남겼습니다.`,
    snippet: `${user.nickname}님께서 새 스니펫을 업로드하셨습니다.`,
    follower: `${user.nickname}님께서 회원님을 팔로우하셨습니다.`,
  };

  return messageTypes[type];
};

export default function UserInformation() {
  const [user, setUser] = useState(null);
  const [snippets, setSnippets] = useState(null);
  const [filtered, setFiltered] = useState(null);
  const [profileImage, setProfileImage] = useState("");
  const [nickname, setNickname] = useState(user?.nickname);

  const { id } = useParams();

  const queryClient = useQueryClient();

  const notificationList = queryClient.getQueryData("notificationList")?.notificationList;

  const hasNotification = !!notificationList?.length;

  useEffect(() => {
    async function fetchData() {
      const userData = await getUserData(id);
      const snippetsData = await getUserSnippetList(id);

      setUser(userData.user);
      setSnippets(snippetsData.snippetList);
      setFiltered(snippetsData.snippetList);
    }

    fetchData();
  }, [id]);

  const changeProfileImage = (image) => {
    setProfileImage(image);
  };

  const changeNickname = (nickname) => {
    setNickname(nickname);
  };

  const handleFilterClick = (filter) => {
    let filteredSnippets;

    if (filter === ALL) {
      filteredSnippets = snippets.filter((snippet) => snippet.poster._id === id || snippet.creator._id === id);
    }

    if (filter === MY) {
      filteredSnippets = snippets.filter((snippet) => snippet.creator._id === id && snippet.poster._id === id);
    }

    if (filter === SAVED) {
      filteredSnippets = snippets.filter((snippet) => snippet.creator._id !== id && snippet.poster._id === id);
    }

    setFiltered(filteredSnippets);
  };

  return (
    <Wrapper>
      <Side>
        <NotificationBar width={430} height="100vh">
          {hasNotification
            ? notificationList.map(({ type, user, targetId: targetPath, _id: notificationId }) => (
              <ButtonWrapper key={notificationId}>
                <StyledButton
                  variant={NOTIFICATION}
                  children={
                    <NotificationWrapper>
                      <Icon src={selectIcon(type)} alt={selectAlternative(type)} />
                      <Message>
                        {selectMessage(type, user, targetPath)}
                      </Message>
                    </NotificationWrapper>
                  }
                />
              </ButtonWrapper>
            ))
            : <StyledButton variant={NOTIFICATION} children="알림이 없습니다." />
          }
        </NotificationBar>
        <FollowingBar width={430} height="100vh">
          <FollowingList />
        </FollowingBar>
        {user && (
          <UserTab
            user={user}
            changeUserImage={changeProfileImage}
            changeNickname={changeNickname}
            changedNickname={nickname}
          />
        )}
      </Side>
      <Menu>
        {[ALL, MY, SAVED].map((filter) => (
          <Button key={filter} variant={FILTER} onClick={() => handleFilterClick(filter)} children={filter} />
        ))}
        <SelectBox />
      </Menu>
      <UserSnippetList snippets={filtered} profileImage={profileImage} nickname={nickname} />
    </Wrapper>
  );
}
