import { takeLatest, takeLeading } from "@redux-saga/core/effects";

import { createIntervieweeAPI, deleteIntervieweeAPI, getIntervieweeApi, getIntervieweesAPI, updateInterviewee, updateInterviewRoomState } from "../../api";
import { FILTER_TYPES } from "../../utils/filters";
import { handleAsyncRemoveStateActionsWithNormalize, handleAsyncUpdateStateActionsWithNormalize } from "../lib/reducerUtils";
import { createPromiseSaga } from "../lib/sagaUtils";

const BASE_PATH = "INTERVIWEE/";

// interviewee들 가져오기.. project로 populate
export const GET_INTERVIEWEES = BASE_PATH + "GET_INTERVIEWEES";
export const GET_INTERVIEWEES_SUCCESS = BASE_PATH + "GET_INTERVIEWEES_SUCCESS";
export const GET_INTERVIEWEES_ERROR = BASE_PATH + "GET_INTERVIEWEES_ERROR";

// interviewee들 가져오기.. project로 populate
export const GET_INTERVIEWEE = BASE_PATH + "GET_INTERVIEWEE";
export const GET_INTERVIEWEE_SUCCESS = BASE_PATH + "GET_INTERVIEWEE_SUCCESS";
export const GET_INTERVIEWEE_ERROR = BASE_PATH + "GET_INTERVIEWEE_ERROR";

// interviewee 추가 ->
export const ADD_NEW_INTERVIEWEE = BASE_PATH + "ADD_NEW_INTERVIEWEE";
export const ADD_NEW_INTERVIEWEE_SUCCESS = BASE_PATH + "ADD_NEW_INTERVIEWEE_SUCCESS";
export const ADD_NEW_INTERVIEWEE_ERROR = BASE_PATH + "ADD_NEW_INTERVIEWEE_ERROR";

// interviewee 추가 ->
export const UPDATE_ROOMSTATE_INTERVIEWEE = BASE_PATH + "UPDATE_ROOMSTATE_INTERVIEWEE";
export const UPDATE_ROOMSTATE_INTERVIEWEE_SUCCESS = BASE_PATH + "UPDATE_ROOMSTATE_INTERVIEWEE_SUCCESS";
export const UPDATE_ROOMSTATE_INTERVIEWEE_ERROR = BASE_PATH + "UPDATE_ROOMSTATE_INTERVIEWEE_ERROR";

// interview 끝내기 -> interviewee 정보 저장 + interviewed true
export const FINISH_INTERVIEW = BASE_PATH + "FINISH_INTERVIEW";
export const FINISH_INTERVIEW_SUCCESS = BASE_PATH + "FINISH_INTERVIEW_SUCCESS";
export const FINISH_INTERVIEW_ERROR = BASE_PATH + "FINISH_INTERVIEW_ERROR";

// interviewee 삭제 ->
export const DELETE_INTERVIEWEE = BASE_PATH + "DELETE_INTERVIEWEES";
export const DELETE_INTERVIEWEE_SUCCESS = BASE_PATH + "DELETE_INTERVIEWEES_SUCCESS";
export const DELETE_INTERVIEWEE_ERROR = BASE_PATH + "DELETE_INTERVIEWEES_ERROR";

export const getInterviewees = ({ projectId, token }) => ({
  type: GET_INTERVIEWEES,
  payload: { projectId, token },
  meta: projectId,
});

export const getInterviewee = ({ projectId, token, intervieweeId }) => ({
  type: GET_INTERVIEWEE,
  payload: { projectId, token, intervieweeId },
  meta: projectId,
});

export const addNewInterviewee = ({ token, intervieweeInfo, pdf, projectId }) => ({
  type: ADD_NEW_INTERVIEWEE,
  payload: { token, intervieweeInfo, pdf, projectId },
  meta: projectId,
});

export const finishInterview = ({
  token,
  interviewee,
  projectId,
  intervieweeId,
}) => ({
  type: FINISH_INTERVIEW,
  payload: { token, interviewee, projectId, intervieweeId },
  meta: interviewee,
});

export const deleteInterviewee = ({ token, projectId, intervieweeId }) => ({
  type: DELETE_INTERVIEWEE,
  payload: { token, projectId, intervieweeId },
  meta: intervieweeId,
});

export const updateIntervieweeRoomState = ({ token, projectId, intervieweeId, isRoomOpened }) => ({
  type: UPDATE_ROOMSTATE_INTERVIEWEE,
  payload: { token, projectId, intervieweeId, isRoomOpened },
  meta: intervieweeId,
});

export const getIntervieweesSaga = createPromiseSaga(GET_INTERVIEWEES, getIntervieweesAPI);
export const getIntervieweeSaga = createPromiseSaga(GET_INTERVIEWEE, getIntervieweeApi);
export const addNewIntervieweeSaga = createPromiseSaga(ADD_NEW_INTERVIEWEE, createIntervieweeAPI);
export const updateIntervieweeRoomStateSaga = createPromiseSaga(UPDATE_ROOMSTATE_INTERVIEWEE, updateInterviewRoomState);
export const finishInterviewSaga = createPromiseSaga(FINISH_INTERVIEW, updateInterviewee);
export const deleteIntervieweeSaga = createPromiseSaga(DELETE_INTERVIEWEE, deleteIntervieweeAPI);

export function* intervieweeSaga() {
  yield takeLeading(GET_INTERVIEWEE, getIntervieweeSaga);
  yield takeLeading(GET_INTERVIEWEES, getIntervieweesSaga);
  yield takeLatest(ADD_NEW_INTERVIEWEE, addNewIntervieweeSaga);
  yield takeLatest(FINISH_INTERVIEW, finishInterviewSaga);
  yield takeLatest(DELETE_INTERVIEWEE, deleteIntervieweeSaga);
  yield takeLatest(UPDATE_ROOMSTATE_INTERVIEWEE, updateIntervieweeRoomStateSaga);
}

const commentInitialState = {
  comment: "",
  score: 0,
  commenter: {}, // 수정함 "" -> {}, commentor -> commenter
};

const questionInitialState = {
  question: "",
  answer: "",
  score: 0,
  questioner: "",
};

const intervieweesInitialState = {
  id: "",
  name: "",
  email: "",
  interviewDate: "",
  resumePath: "",
  filterScore: [], // 백엔드 스키마 수정해야함 ---> ????
  isInterviewed: false,
  questioner: questionInitialState,
  questions: [],
  comments: commentInitialState,
  isRoomOpened: false,
};

const initialState = {
  loading: false,
  byId: {},
  allIds: [],
  error: null,
};

export default function interviewees(state = initialState, action) {
  switch (action.type) {
    case ADD_NEW_INTERVIEWEE:
    case ADD_NEW_INTERVIEWEE_SUCCESS:
    case ADD_NEW_INTERVIEWEE_ERROR:
      return handleAsyncUpdateStateActionsWithNormalize(ADD_NEW_INTERVIEWEE, true)(state, action);
    case GET_INTERVIEWEES:
    case GET_INTERVIEWEES_SUCCESS:
    case GET_INTERVIEWEES_ERROR:
      return handleAsyncUpdateStateActionsWithNormalize(GET_INTERVIEWEES, false)(state, action);
    case GET_INTERVIEWEE:
    case GET_INTERVIEWEE_SUCCESS:
    case GET_INTERVIEWEE_ERROR:
      return handleAsyncUpdateStateActionsWithNormalize(GET_INTERVIEWEE, true)(state, action);
    case UPDATE_ROOMSTATE_INTERVIEWEE:
    case UPDATE_ROOMSTATE_INTERVIEWEE_SUCCESS:
    case UPDATE_ROOMSTATE_INTERVIEWEE_ERROR:
      return handleAsyncUpdateStateActionsWithNormalize(UPDATE_ROOMSTATE_INTERVIEWEE, true)(state, action);
    case FINISH_INTERVIEW:
    case FINISH_INTERVIEW_SUCCESS:
    case FINISH_INTERVIEW_ERROR:
      return handleAsyncUpdateStateActionsWithNormalize(FINISH_INTERVIEW, true)(state, action);
    case DELETE_INTERVIEWEE:
    case DELETE_INTERVIEWEE_SUCCESS:
    case DELETE_INTERVIEWEE_ERROR:
      return handleAsyncRemoveStateActionsWithNormalize(DELETE_INTERVIEWEE, true)(state, action);
    default:
      return state;
  }
}

export function intervieweeIdsToByIdObjs(ids, intervieweeByIds) {
  return ids ? ids.map((intervieweeId) => intervieweeByIds[intervieweeId]) : [];
}

export function extractIntervieweesByInterviewed(interviewees) {
  const waitingInterviewees = [];
  const resultInterviewees = [];

  for (const interviewee of interviewees) {
    if (interviewee.isInterviewed) {
      resultInterviewees.push(interviewee);
      continue;
    }

    waitingInterviewees.push(interviewee);
  }

  return { waitingInterviewees, resultInterviewees };
}

export function sortInterviewees({ interviewees, filter, order }) {
  const sortedInterviewees = [...interviewees];

  if (order === -1) {
    return sortedInterviewees.reverse();
  }

  switch (filter) {
    case FILTER_TYPES.EVALUATION:
      sortByComparisonTarget(sortedInterviewees, (interviewee) => interviewee.commentAvgScore);
      break;
    case FILTER_TYPES.INTERVIEWEE:
      sortByComparisonTarget(sortedInterviewees, (interviewee) => interviewee.name);
      break;
    case FILTER_TYPES.QUESTION_SCORE:
      sortByComparisonTarget(sortedInterviewees, (interviewee) => interviewee.questionAvgScore);
      break;
    case FILTER_TYPES.QUESTION_NUM:
      sortByComparisonTarget(sortedInterviewees, (interviewee) => interviewee.questionsNum);
      break;
    case FILTER_TYPES.INTERVIEW_DURATION:
      sortByComparisonTarget(sortedInterviewees, (interviewee) => interviewee.interviewDuration);
      break;
    case FILTER_TYPES.INTERVIEW_DATE:
      sortByComparisonTarget(sortedInterviewees, (interviewee) => interviewee.interviewDate);
      break;
    default:
      sortByComparisonTarget(sortedInterviewees, (interviewee) =>
      {
        return interviewee.filterAvgScores
          ? interviewee.filterAvgScores[filter] || 0
          : 0;
      });
  }

  return sortedInterviewees;
}

function sortByComparisonTarget(array, getComparisonTarget) {
  return array.sort((a, b) => {
    const compareA = getComparisonTarget(a);
    const compareB = getComparisonTarget(b);

    if (compareA < compareB) {
      return -1;
    }
    if (compareA > compareB) {
      return 1;
    }

    return 0;
  });
}
