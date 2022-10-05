import React, { useEffect } from "react";
import { connect } from "react-redux";
import Record from "./Record";
import { workOn, workOff } from "../../thunks";
import { updateCurrentPage } from "../../actions";

function RecordContainer({
  userId,
  teamId,
  teamName,
  teamLocation,
  isWorking,
  isWorkDone,
  isLoading,
  workOn,
  workOff,
  updateCurrentPage,
}) {
  useEffect(() => {
    updateCurrentPage("record");
  }, [updateCurrentPage]);
  return (
    <Record
      userId={userId}
      teamId={teamId}
      teamName={teamName}
      teamLocation={teamLocation}
      isWorking={isWorking}
      isWorkDone={isWorkDone}
      isLoading={isLoading}
      workOn={workOn}
      workOff={workOff}
    />
  );
}

const mapStateToProps = (state) => ({
  userId: state.user.id,
  teamId: state.team.id,
  teamName: state.team.displayName,
  teamLocation: state.team.location,
  isWorking: state.team.onWorkingUser.filter((id) => {
    return id === state.user.id;
  }).length,
  isWorkDone: state.team.offWorkingUser.filter((id) => {
    return id === state.user.id;
  }).length,
  isLoading: state.ui.record.isLoading,
});
const mapDispatchToProps = (dispatch) => ({
  workOn: (teamId, userId) => {
    dispatch(workOn(teamId, userId));
  },
  workOff: (teamId, userId) => {
    dispatch(workOff(teamId, userId));
  },
  updateCurrentPage: (page) => dispatch(updateCurrentPage(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecordContainer);
