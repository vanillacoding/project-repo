import React, { useEffect } from "react";
import Team from "./Team";
import { connect } from "react-redux";
import { joinTeamAPI } from "../../api";
import { initializeTeam, updateThreads, updateIsAdmin } from "../../actions";
import { emitJoinTeam, emitLeaveTeam, socket } from "../../socket";

function TeamContainer({
  userId,
  displayName,
  currentPage,
  threads,
  participants,
  match,
  history,
  initializeTeam,
  updateThreads,
  thumbnail,
  isAdmin,
  updateIsAdmin,
}) {
  const { name } = match.params;

  useEffect(() => {
    socket.on("add thread", async () => {
      const response = await joinTeamAPI(name, userId);
      const {
        team: { threads },
      } = await response.json();

      updateThreads(threads);
    });

    return () => {
      socket.off("add thread");
    };
  }, [name, userId, updateThreads]);

  useEffect(() => {
    async function joinTeam() {
      const response = await joinTeamAPI(name, userId);
      const { result, team, isAdmin } = await response.json();

      if (result !== "ok") {
        return history.push("/");
      }

      initializeTeam(team);
      updateIsAdmin(isAdmin);
      emitJoinTeam(userId, name);
    }

    joinTeam();
    return emitLeaveTeam;
  }, [name, userId, history, initializeTeam, updateIsAdmin]);

  return (
    <Team
      name={name}
      displayName={displayName}
      currentPage={currentPage}
      participants={participants}
      threads={threads}
      thumbnail={thumbnail}
      isAdmin={isAdmin}
    />
  );
}

const mapStateToProps = (state) => ({
  userId: state.user.id,
  displayName: state.team.displayName,
  currentPage: state.ui.currentPage,
  participants: state.team.allpartIds.map((id) => state.team.partById[id]),
  thumbnail: state.team.thumbnail,
  isAdmin: state.ui.admin.isAdmin,
});
const mapDispatchToProps = (dispatch) => ({
  initializeTeam: (team) => dispatch(initializeTeam(team)),
  updateThreads: (threads) => dispatch(updateThreads(threads)),
  updateIsAdmin: (value) => dispatch(updateIsAdmin(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamContainer);
