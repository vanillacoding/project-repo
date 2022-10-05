import React, { useEffect } from "react";
import { connect } from "react-redux";
import TeamAside from "./TeamAside";
import { socket } from "../../socket";
import { updateActiveUsers } from "../../actions";

function TeamAsideContainer({
  teamPic,
  teamName,
  participants,
  updateActiveUsers,
}) {
  useEffect(() => {
    socket.on("join team", (activeUserIds) => {
      updateActiveUsers(activeUserIds);
    });

    socket.on("leave team", (activeUserIds) => {
      updateActiveUsers(activeUserIds);
    });
  }, [updateActiveUsers]);

  return (
    <TeamAside
      teamPic={teamPic}
      teamName={teamName}
      participants={participants}
    />
  );
}
const mapStateToProps = (state) => ({
  participants: state.team.allpartIds.map((id) => {
    const isConnected = state.team.connectedUser.indexOf(id) >= 0;
    const part = Object.assign(state.team.partById[id], { isConnected });

    return part;
  }),
});
const mapDispatchToProps = (dispatch) => ({
  updateActiveUsers: (ids) => dispatch(updateActiveUsers(ids)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamAsideContainer);
