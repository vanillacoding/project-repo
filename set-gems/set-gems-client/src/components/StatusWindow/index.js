import React from "react";
import PropTypes from "prop-types";

function StatusWindow({ restCardCount, time }) {
  return (
    <div>
      <p>{`${time}초`}</p>
      <p>{`남은 카드 수: ${restCardCount}개`}</p>
    </div>
  );
}

StatusWindow.propTypes = {
  restCardCount: PropTypes.number.isRequired,
  time: PropTypes.number.isRequired,
};

export default StatusWindow;
