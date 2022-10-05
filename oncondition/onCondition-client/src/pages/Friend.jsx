import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import styled from "styled-components";

import { getFriends, updateFriendRequest } from "../api/friend";
import FriendCard from "../components/FriendCard";
import PendingFriendCard from "../components/PendingFriendCard";
import AddFriendCard from "../components/AddFriendCard";

const FriendWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, auto));
  gap: ${({ theme }) => theme.gaps.medium};
  justify-content: center;
  padding: 10px;

  @media screen and (max-width: 400px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

function Friend() {
  const { creatorId } = useParams();
  const [friends, setFriends] = useState([]);
  const [sentRequests, setSentRequest] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);

  const history = useHistory();

  async function loadFriends() {
    const data = await getFriends(creatorId);

    if (!data) {
      return;
    }

    const { friends, receivedRequests, sentRequests } = data;

    setFriends(friends);
    setSentRequest(sentRequests);
    setReceivedRequests(receivedRequests);
  }

  useEffect(() => {
    loadFriends();
  }, [creatorId]);

  const handleAccept = async function (friendId) {
    const result = await updateFriendRequest(creatorId, friendId, true);

    if (result) {
      loadFriends();
    }
  };

  const handleDeny = async function (friendId) {
    const result = await updateFriendRequest(creatorId, friendId, false);

    if (result) {
      loadFriends();
    }
  };

  const handleFriendClick = function (friendId) {
    history.push(`/${creatorId}/friend/${friendId}`);
  };

  const pendingCardsReceiving = receivedRequests.map(({
    _id,
    profileUrl,
    name,
  }) => (
    <PendingFriendCard
      key={_id}
      id={_id}
      profileUrl={profileUrl}
      onAcceptButtonClick={handleAccept}
      onDenyButtonClick={handleDeny}
      name={name}
    />
  ));

  const profileCards = friends.map(({
    _id,
    profileUrl,
    name,
    scores,
    lastAccessDate,
  }) => (
    <FriendCard
      key={_id}
      id={_id}
      profileUrl={profileUrl}
      name={name}
      lastAccessDate={lastAccessDate}
      scores={scores}
      onClick={handleFriendClick}
    />
  ));

  const pendingCardsSending = sentRequests.map(({
    _id,
    profileUrl,
    name,
  }) => (
    <PendingFriendCard
      key={_id}
      id={_id}
      profileUrl={profileUrl}
      name={name}
      isSent
    />
  ));

  const handleAddFriend = function () {
    history.push(`/${creatorId}/friend/new`);
  };

  return (
    <div>
      <h1>친구</h1>
      <FriendWrapper>
        <AddFriendCard onClick={handleAddFriend}/>
        {pendingCardsReceiving}
        {profileCards}
        {pendingCardsSending}
      </FriendWrapper>
    </div>
  );
}

export default Friend;
