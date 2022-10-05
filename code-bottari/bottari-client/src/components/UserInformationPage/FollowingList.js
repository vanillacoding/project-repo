import { useEffect, useState } from "react";
import styled from "styled-components";

import Button from "../common/Button";

import { FOLLOWING_NOBODY } from "../../constants/messages";

import { getFollowingList } from "../../api/service";

const Title = styled.div`
  margin: 30px;
  color: #4b4b4b;
  font-size: 30px;
  font-weight: bold;
  text-align: center;
`;

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 300px;
`;

const FollowingUser = styled(Button)`
  width: 300px;
  height: 60px;
  margin: 0 0 10px 60px;
  color: var(--caret-color);
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;

  :hover {
    background-color: var(--caret-color);
    color: white;
  }
`;

const Message = styled.div`
  width: 430px;
  height: 60px;
  color: var(--caret-color);
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
`;

export default function FollowingList() {
  const [followingUsers, setFollowingUsers] = useState(null);

  const hasNoFollowing = followingUsers && followingUsers.length === 0;

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    async function fetchData () {

      const response = await getFollowingList(userId);

      setFollowingUsers(response.followingList);
    }

    fetchData();
  }, [userId]);

  const handleOnClick = (user) => {
    window.location.replace(`/users/${user._id}`);
  };

  return (
    <>
      <Title>구독 목록</Title>
      <ListWrapper>
        {hasNoFollowing && <Message>{FOLLOWING_NOBODY}</Message>}
        {followingUsers && followingUsers.map((user) => (
          <FollowingUser key={user._id} variant="notification" onClick={() => handleOnClick(user)}>{user.nickname}</FollowingUser>
        ))}
      </ListWrapper>
    </>
  );
}
