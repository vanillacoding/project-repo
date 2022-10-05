import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import UserToolbar from "./UserToolbar/UserToolbar";
import UserInfo from "./UserInfo/UserInfo";

const UserListContainer = styled.div`
  width: 18%;
  height: 80%;
  margin: 1em;
  background-color: #ffffff;
  border: 2px solid #C9D3DD;
  border-radius: 10px;
  text-align: center;
  overflow-y: scroll;

  .userlist-title {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90%;
    height: 10%;
    line-height: 10%;
    margin: 0.5em;
    margin-left: 0.6em;
    border-bottom: 2px solid #C9D3DD;
    font-size: 1.5rem;
    font-weight: bold;
  }

  .userlist-participants {
    width: 100%;
    height: 76.5%;
  }
`;

function UserList({
  currentUser,
  userList,
  alertMessages,
  setAlertMessages,
  socket,
  roomId,
  isVideoStopped,
  videoToggle
}) {
  return (
    <UserListContainer>
      <article className="userlist-title">
        Users
      </article>
      <article className="userlist-participants">
        {
          userList.map((participant) =>
            <UserInfo
              key={participant.email}
              participant={participant}
            />
          )
        }
      </article>
      <UserToolbar
        roomId={roomId}
        user={currentUser}
        alertMessages={alertMessages}
        setAlertMessages={setAlertMessages}
        socket={socket}
        isVideoStopped={isVideoStopped}
        videoToggle={videoToggle}
      />
    </UserListContainer>
  );
}

UserList.propTypes = {
  currentUser: PropTypes.shape({
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }),
  userList: PropTypes.array.isRequired,
  alertMessages: PropTypes.array.isRequired,
  setAlertMessages: PropTypes.func.isRequired,
  socket: PropTypes.object.isRequired,
  roomId: PropTypes.string.isRequired,
  isVideoStopped: PropTypes.bool.isRequired,
  videoToggle: PropTypes.func.isRequired
};

export default React.memo(UserList);
