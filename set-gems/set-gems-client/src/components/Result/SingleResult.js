import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Result.css";

import { postRanking } from "../../api/ranking";

function SingleResult({ time, rankerStandard, onSubmit }) {
  const isRanker = time < rankerStandard;
  const [error, setError] = useState("");
  let isSubmitted = false;

  const handleFormSubmit = async (ev) => {
    ev.preventDefault();

    if (isSubmitted) {
      return;
    }

    isSubmitted = true;
    const data = { time, name: ev.target.nickname.value };

    try {
      await postRanking(data);
    } catch(err) {
      setError("랭킹등록에 실패하였습니다");
    }

    onSubmit();
  };

  return (
    <div className="result">
      <h2>{`완료 시간: ${time}초`}</h2>
      {error && <p>{error}</p>}
      {isRanker && <form onSubmit={handleFormSubmit}>
        <div>
          <p>당신은 상위 20인에 들었습니다.</p>
          <p>랭킹에 기록을 등록할 수 있습니다!</p>
          <label htmlFor="nickname">
            닉네임
          </label>
          <input name="nickname" placeholder="anonymous" type="text" required/>
        </div>
        <button>SUBMIT</button>
      </form>}
    </div>
  );
}

SingleResult.propTypes = {
  time: PropTypes.number,
  rankerStandard: PropTypes.number,
  onSubmit: PropTypes.func,
};

export default SingleResult;
