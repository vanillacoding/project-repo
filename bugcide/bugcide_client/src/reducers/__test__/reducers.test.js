import * as actions from '../../actions/index';
import authReducer from '../authReducer';
import listReducer from '../listReducer';
import detailReducer from '../detailReducer';
import modalReducer from '../modalReducer';

describe('reducer', () => {
  describe('authReducer', () => {
    let initialState;

    beforeEach(() => {
      initialState = {
        isAuthenticated: false,
        jwtoken: null
      };
    });

    it('should return the initial state', () => {
      expect(authReducer(initialState, {})).toEqual(initialState);
    });

    it('should update jwtoken state after LOGIN_USER/LOGOUT_USER', () => {
      const mockJwtoken = 'fake-jwtoken';
      const loginResult = authReducer(initialState, actions.loginUser(mockJwtoken));
      expect(loginResult.jwtoken).toEqual(mockJwtoken);

      const logoutResult = authReducer(loginResult, actions.logoutUser());
      expect(logoutResult.jwtoken).toEqual(null);
    });
  });

  describe('listReducer', () => {
    let initialState;

    beforeEach(() => {
      initialState = {
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
    });

    it('should return the initial state', () => {
      expect(listReducer(initialState, {})).toEqual(initialState);
    });

    it('should update state after GET_PROJECT_LIST_SUCCESS', () => {
      const mockData = {
        projectList: ['1', '2', '3'],
        totalProjectsLength: 3
      };
      const getListResult = listReducer(initialState, actions.getProjectListSuccess(mockData, 0));

      expect(getListResult.projectList).toBeInstanceOf(Array);
      expect(getListResult.totalProjectsLength).toEqual(3);
      expect(getListResult.currentPageNo).toEqual(0);
      expect(getListResult.isLoading).toEqual(false);
    });

    it('should update state after GET_PROJECT_LIST_FAILURE', () => {
      const getListResult = listReducer(initialState, actions.getProjectListFailure());

      expect(getListResult.isLoading).toEqual(false);
      expect(getListResult.isError).toEqual(true);
      expect(getListResult.projectList).toEqual(initialState.projectList);
    });

    it('should update state after POST_NEW_PROJECT_FAILURE', () => {
      const mockMessage = 'failed';
      const postListResult = listReducer(initialState, actions.postNewProjectFailure(mockMessage));

      expect(postListResult.listCreateFailMessage).toEqual(mockMessage);
      expect(postListResult.isError).toEqual(false);
    });
  });

  describe('detailReducer', () => {
    let initialState;
    beforeEach(() => {
      initialState = {
        isLoading: false,
        isError: false,
        project: null,
        errorList: [],
        statistics: null,
        isDescSorting: false,
        currentPageNo: 0,
        totalErrorListLength: 0
      };
    });

    it('should return the initial state', () => {
      expect(detailReducer(initialState, {})).toEqual(initialState);
    });

    it('should update state after GET_PROJECT_DETAIL_PENDING', () => {
      let result = detailReducer(initialState, actions.getProjectDetailPending());

      expect(result.isLoading).toEqual(true);
    });

    it('should update state after GET_PROJECT_DETAIL_SUCCESS', () => {
      const mockData = {
        targetProject: {},
        errorList: ['1', '2', '3'],
        statistics: {name: {}, time: []},
        totalErrorListLength: 3
      };
      let result = detailReducer(initialState, actions.getProjectDetailSuccess(mockData, 1, 'asc'));

      expect(result.project).toEqual(mockData.targetProject);
      expect(result.errorList).toEqual(mockData.errorList);
      expect(result.statistics).toEqual(mockData.statistics);
      expect(result.isDescSorting).toEqual(false);
      expect(result.currentPageNo).toEqual(1);
      expect(result.totalErrorListLength).toEqual(mockData.totalErrorListLength);

      mockData.errorList = null;
      result = detailReducer(initialState, actions.getProjectDetailSuccess(mockData, 1, 'asc'));

      expect(result.errorList).toBeInstanceOf(Array);
      expect(result.errorList).toHaveLength(0);
    });

    it('should update state after GET_PROJECT_DETAIL_FAILURE', () => {
      let result = detailReducer(initialState, actions.getProjectDetailFailure());

      expect(result.isLoading).toEqual(false);
      expect(result.isError).toEqual(true);
    });
  });

  describe('modalReducer', () => {
    let initialState;
    beforeEach(() => {
      initialState = {
        isModalOpened: false
      };
    });

    it('should return the initial state', () => {
      expect(modalReducer(initialState, {})).toEqual(initialState);
    });

    it('should update state after OPEN_MODAL/CLOSE_MODAL', () => {
      const openResult = modalReducer(initialState, actions.openModal());
      expect(openResult.isModalOpened).toEqual(true);

      const closeResult = modalReducer(openResult, actions.closeModal());
      expect(closeResult.isModalOpened).toEqual(false);
    });
  });
});
