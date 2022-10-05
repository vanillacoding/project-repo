import * as types from '../constants/actionTypes';

const listInitState = {
  isLoading: true,
  isError: false,
  user: {
    name: null,
    profileUrl: null
  },
  projectList: [],
  listCreateFailMessage: null,
  currentPageNo: 0,
  totalProjectsLength: 0
};

const listReducer = (state = listInitState, action) => {
  switch (action.type) {
    case (types.GET_PROJECT_LIST_SUCCESS):
      return {
        ...state,
        isLoading: false,
        isError: false,
        user: { ...action.userInfo },
        projectList: action.projectList.slice(),
        listCreateFailMessage: null,
        totalProjectsLength: action.totalProjectsLength,
        currentPageNo: action.page
      };
    case (types.GET_PROJECT_LIST_FAILURE):
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    case (types.POST_NEW_PROJECT_FAILURE):
      return {
        ...state,
        listCreateFailMessage: action.message
      };
    default:
      return state;
  }
};

export default listReducer;
