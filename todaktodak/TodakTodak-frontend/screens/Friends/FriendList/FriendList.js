import React, { useCallback } from "react";
import { FlatList } from "react-native";

import FriendCard from "../FriendCard/FriendCard";
import EmptyView from "../../../components/EmptyView/EmptyView";

import { NOT_EXIST_FRIEND } from "../../../constants/friendStatus";

const FriendList = ({ friendList }) => {
  const renderFriends = useCallback(({ item }) => (
    <FriendCard friend={item} />
  ), [friendList]);

  return (
    <>
      {(!friendList || friendList.length < 1)
        ? <EmptyView
          text={NOT_EXIST_FRIEND}
        />
        : <FlatList
          data={friendList}
          renderItem={renderFriends}
          keyExtractor={(item) => item._id}
        />
      }
    </>
  );
};

export default React.memo(FriendList);
