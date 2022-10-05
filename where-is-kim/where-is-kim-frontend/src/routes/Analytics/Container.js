import React, { useEffect } from "react";
import { connect } from "react-redux";
import Analytics from "./Analytics";
import { updateCurrentPage } from "../../actions";
import moment from "moment";

function AnalyticsContainer({
  latingNumberPerEmployee,
  latePerDays,
  updateCurrentPage,
}) {
  useEffect(() => {
    updateCurrentPage("Analytics");
  }, [updateCurrentPage]);

  return (
    <Analytics
      latingNumberPerEmployee={latingNumberPerEmployee}
      latePerDays={latePerDays}
    />
  );
}

const mapStateToProps = (state) => {
  const lateRecords = state.team.allRecordIds.reduce((acc, id) => {
    const record = state.team.recordById[id];
    if (record.is_late) acc.push(record);
    return acc;
  }, []);
  const latePerDays = lateRecords.reduce(
    (acc, record) => {
      const index = moment(record.work_on).format("E") - 1;
      acc[index] += 1;
      return acc;
    },
    [0, 0, 0, 0, 0]
  );
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

  return { latingNumberPerEmployee, latePerDays };
};
const mapDispatchToProps = (dispatch) => ({
  updateCurrentPage: (page) => dispatch(updateCurrentPage(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AnalyticsContainer);
