import React, { useEffect } from "react";
import { connect } from "react-redux";
import Dashboard from "./Dashboard";
import { updateCurrentPage } from "../../actions";
import moment from "moment";

function DashboardContainer({
  threads,
  allpartsCount,
  onWorkingUserCount,
  offWorkingUserCount,
  updateCurrentPage,
  latingNumberPerEmployee,
  mostLater,
}) {
  useEffect(() => {
    updateCurrentPage("Dashboard");
  }, [updateCurrentPage]);
  return (
    <Dashboard
      threads={threads}
      allpartsCount={allpartsCount}
      onWorkingUserCount={onWorkingUserCount}
      offWorkingUserCount={offWorkingUserCount}
      latingNumberPerEmployee={latingNumberPerEmployee}
      mostLater={mostLater}
    />
  );
}

const mapStateToProps = (state) => {
  const today = moment().format("YYYY-MM-DD");
  const threads = state.team.allThreadIds.reduce((acc, id) => {
    const thread = state.team.threadById[id];
    if (moment(thread.createdAt).format("YYYY-MM-DD") === today) {
      acc.unshift(thread);
    }
    return acc;
  }, []);

  const latingNumberStore = state.team.allRecordIds.reduce((acc, id) => {
    const record = state.team.recordById[id];
    const isLate = record.is_late;
    if (isLate) {
      if (acc[record.recorded_by]) {
        acc[record.recorded_by] += 1;
      } else {
        acc[record.recorded_by] = 1;
      }
    }
    return acc;
  }, {});

  const latingNumberPerEmployee = Object.keys(latingNumberStore).map((id) => ({
    name: state.team.partById[id].username,
    times: latingNumberStore[id],
  }));

  const recordsInWeek = state.team.allRecordIds
    .map((id) => state.team.recordById[id])
    .filter((record) => {
      const monday = moment().day(1);
      const { work_on: workOn } = record;
      return moment(workOn).isAfter(monday);
    });
  const userLatingStore = recordsInWeek.reduce((acc, record) => {
    const { is_late, recorded_by } = record;
    if (is_late) {
      if (acc[recorded_by]) {
        acc[recorded_by] += 1;
      } else {
        acc[recorded_by] = 1;
      }
    }
    return acc;
  }, {});
  const maxCount = Math.max.apply(null, Object.values(userLatingStore));
  const mostLatersId = Object.keys(userLatingStore).find(
    (id) => userLatingStore[id] === maxCount
  );
  const mostLater = state.team.partById[mostLatersId];
  return {
    threads,
    allpartsCount: state.team.allpartIds.length,
    onWorkingUserCount: state.team.onWorkingUser.length,
    offWorkingUserCount: state.team.offWorkingUser.length,
    latingNumberPerEmployee,
    mostLater: mostLater ? mostLater : {},
  };
};
const mapDispatchToProps = (dispatch) => ({
  updateCurrentPage: (page) => dispatch(updateCurrentPage(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
