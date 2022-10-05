import React from "react";
import PropTypes from "prop-types";

import TempFriendModel from "./models/TempFriendModel";
import useSocketFriends from "../hooks/useSocketFriends";

function Friends({ isSocketReady }) {
  const entrancePosition = [2 * 40, 24, 0 * 40];
  const friends = useSocketFriends({ isSocketReady, entrancePosition });

  return (
    <>
      {friends.map(({ user: u, position, direction: d }) => (
        <TempFriendModel key={u.id} name={u.name} position={position} direction={d} />
      ))}
    </>
  );
}

Friends.propTypes = {
  isSocketReady: PropTypes.bool,
};

export default Friends;
