import { useEffect, useState } from "react";

import { roomSocket } from "../utils/socket";

// NOTE: 최초 mount부터 socket에 값이 있기 때문에, useEffect의 effect들이 모두 실행 됨.
function useSocketFriends({
  isSocketReady,
  entrancePosition,
}) {
  const [friends, setfriends] = useState([]);

  useEffect(() => {
    if (!isSocketReady) return;

    function addNewFriend(user) {
      setfriends((prev) => prev.concat({
        user,
        position: entrancePosition,
        direction: 0,
      }));
    }

    function updateFriendsMove({ user: u, position: p, direction: d }) {
      setfriends((prev) => prev.map((friend) => {
        if (friend.user.id !== u.id) {
          return friend;
        }

        return { user: u, position: p, direction: d };
      }));
    }

    function addExistingFriend(posInfo) {
      setfriends((prev) => prev.concat(posInfo));
    }

    function deleteFriend(user) {
      setfriends((prev) => prev.filter((friend) => friend.user.id !== user.id));
    }

    roomSocket.listenUserJoin(addNewFriend);
    roomSocket.listenUserMovement(updateFriendsMove);
    roomSocket.listenOldUserInfo(addExistingFriend);
    roomSocket.listenUserLeave(deleteFriend);
    return () => setfriends([]);
  }, [isSocketReady]);

  return friends;
}

export default useSocketFriends;
