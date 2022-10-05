import React, { useEffect } from "react";
import { connect } from "react-redux";
import Threads from "./Threads";
import { updateCurrentPage } from "../../actions";
import moment from "moment";

function ThreadsContainer({ userId, threads, updateCurrentPage }) {
  useEffect(() => {
    updateCurrentPage("threads");
  }, [updateCurrentPage]);

  return <Threads userId={userId} threads={threads} />;
}

const mapStateToProps = (state) => {
  const threads = state.team.allThreadIds.map(
    (id) => state.team.threadById[id]
  );
  const allThreadDate = threads.reduce((acc, thread) => {
    const date = moment(thread.createdAt).format("YYYY-MM-DD");
    if (acc.indexOf(date) === -1) {
      acc.unshift(date);
    }
    return acc;
  }, []);
  const threadsByDate = threads.reduce((acc, thread) => {
    const date = moment(thread.createdAt).format("YYYY-MM-DD");
    if (acc[date]) {
      acc[date].unshift(thread);
    } else {
      acc[date] = [thread];
    }
    return acc;
  }, {});

  return {
    userId: state.user.id,
    threads: allThreadDate.map((date) => ({
      date,
      items: threadsByDate[date],
    })),
  };
};
const mapDispatchToProps = (dispatch) => ({
  updateCurrentPage: (page) => dispatch(updateCurrentPage(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ThreadsContainer);
