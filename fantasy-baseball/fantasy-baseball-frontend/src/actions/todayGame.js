import {
  fetchPlayerRankings,
  fetchSchedule,
  fetchUserRankings,
} from "../api/game";
import {
  FETCH_TODAY_GAME_SCHEDULE,
  FETCH_USER_RANKINGS,
  FETCH_PLAYER_RANKINGS,
  CATCH_API_ERROR,
} from "../constants/actionTypes";
import { refinePlayerRankings } from "../utils";

const ERROR_MESSAGE = {
  commonError: "데이터 로드에 실패하였습니다.",
};

export const getSchedule = (date) => async (dispatch) => {
  try {
    const response = await fetchSchedule(date);
    let schedule;

    if (response.ok) {
      const { data } = await response.json();
      schedule = data;
    } else if (response.status === 404) {
      schedule = { result: "none" };
    } else {
      schedule = { result: "failure" };
    }

    dispatch({ type: FETCH_TODAY_GAME_SCHEDULE, schedule });
  } catch (err) {
    const error = ERROR_MESSAGE.commonError;
    dispatch({ type: CATCH_API_ERROR, error });
  }
};

export const getUserRankings = (date) => async (dispatch) => {
  try {
    const response = await fetchUserRankings(date);
    let userRankings;

    if (response.ok) {
      const { data } = await response.json();
      userRankings = data
        .map((ranking) => {
          const { name, imageUrl } = ranking.user;
          return {
            name,
            earnedMoney: ranking.earnedMoney,
            imageUrl,
            rank: ranking.rank,
          };
        })
        .slice(0, 5);
    } else if (response.status === 404) {
      userRankings = { result: "none" };
    } else {
      userRankings = { result: "failure" };
    }

    dispatch({ type: FETCH_USER_RANKINGS, userRankings });
  } catch (err) {
    const error = ERROR_MESSAGE.commonError;
    dispatch({ type: CATCH_API_ERROR, error });
  }
};

export const getPlayerRankings = (date) => async (dispatch) => {
  try {
    const response = await fetchPlayerRankings(date);
    let pitcherRankings;
    let hitterRankings;

    if (response.ok) {
      const { data } = await response.json();
      pitcherRankings = refinePlayerRankings(data.pitchers).slice(0, 5);
      hitterRankings = refinePlayerRankings(data.hitters).slice(0, 5);

      dispatch({
        type: FETCH_PLAYER_RANKINGS,
        pitcherRankings,
        hitterRankings,
      });
    } else if (response.status === 404) {
      pitcherRankings = { result: "none" };
      hitterRankings = { result: "none" };
    } else {
      pitcherRankings = { result: "failure" };
      hitterRankings = { result: "failure" };
    }

    dispatch({
      type: FETCH_PLAYER_RANKINGS,
      pitcherRankings,
      hitterRankings,
    });
  } catch (err) {
    const error = ERROR_MESSAGE.commonError;
    dispatch({ type: CATCH_API_ERROR, error });
  }
};
