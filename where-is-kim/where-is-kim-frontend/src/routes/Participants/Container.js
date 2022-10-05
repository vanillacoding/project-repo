import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Participants from "./Participants";
import { updateCurrentPage } from "../../actions";
import useInput from "../../hooks/useInput";
import { sendInvitingMail } from "../../thunks";
import { updateAdminsAPI } from "../../api";

function ParticipantsContainer({
  teamId,
  updateCurrentPage,
  sendInvitingMail,
  members,
}) {
  const email = useInput("");
  const initialState = members.reduce((acc, member) => {
    const { id, isAdmin } = member;
    acc[id] = isAdmin;
    return acc;
  }, {});
  const [memberAdminStore, setMemberAdminStore] = useState(initialState);

  function changeAdminValue(id, e) {
    const value = e.target.value === "admin";
    setMemberAdminStore({ ...memberAdminStore, [id]: value });
  }

  function onMailFormSubmit(e) {
    e.preventDefault();
    sendInvitingMail(teamId, email.value);
  }

  async function onPermissionSubmit(e) {
    e.preventDefault();
    const admins = Object.keys(memberAdminStore).filter(
      (key) => memberAdminStore[key]
    );

    updateAdminsAPI(teamId, admins);
  }
  useEffect(() => {
    updateCurrentPage("Participants");
  }, [updateCurrentPage]);

  return (
    <Participants
      email={email}
      members={members}
      onMailFormSubmit={onMailFormSubmit}
      onPermissionSubmit={onPermissionSubmit}
      memberAdminStore={memberAdminStore}
      onSelectChange={changeAdminValue}
    />
  );
}

const mapStateToProps = (state) => ({
  teamId: state.team.id,
  members: state.team.allpartIds.map((id) => state.team.partById[id]),
});
const mapDispatchToProps = (dispatch) => ({
  updateCurrentPage: (page) => dispatch(updateCurrentPage(page)),
  sendInvitingMail: (teamId, email) =>
    dispatch(sendInvitingMail(teamId, email)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ParticipantsContainer);
