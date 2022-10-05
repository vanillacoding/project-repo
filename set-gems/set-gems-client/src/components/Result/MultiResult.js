import React from "react";
import PropTypes from "prop-types";

import "./Result.css";

function MultiResult({ result }) {
  const resultElements = [...result].sort((a, b) => b.point - a.point)
    .map(({ nickname, point }, i) => (
      <p key={`${nickname}${i}`}>{`${nickname}: ${point}`}</p>
    ));

  return (
    <div className="result" >
      <h2>GAME RESULT</h2>
      <div>
        {resultElements}
      </div>
    </div>
  );
}

MultiResult.propTypes = {
  result: PropTypes.arrayOf(PropTypes.shape({
    nickname: PropTypes.string,
    point: PropTypes.number,
  })),
};

export default MultiResult;
