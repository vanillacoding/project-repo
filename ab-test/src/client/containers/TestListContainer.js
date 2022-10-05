import { connect } from 'react-redux';
import axios from 'axios';
import { withRouter } from 'react-router';

import TestList from '../components/TestList';
import {
  addNewTestPage,
  deleteTestPage,
  displayModal,
  fetchScreenshotUrl,
  loadingScreenshot,
} from '../actions/index';

const mapStateToProps = (state) => {
  const { testList, projects, currentProject, isTestListLoading } = state;
  const filteredList = testList.filter(test => test.projectId === currentProject);

  return {
    projects,
    testList: filteredList,
    currentProject,
    isLoading: isTestListLoading
  };
};

const mapDispatchToProps = dispatch => ({
  onPlusBtnClick: async (projectId, testName) => {
    let newTest;

    try {
      newTest = await axios.post(`/api/projects/${projectId}/testlist/${testName}`);
    } catch (err) {
      if (err.message === 'Request failed with status code 500') {
        err.message = 'Oops. Could you please try it agian.';
      }

      return dispatch(displayModal(err.message));
    }

    dispatch(addNewTestPage(newTest.data));
  },
  onDeleteBtnClick: async (id) => {
    let deletedTest;

    try {
      deletedTest = await axios.delete(`/api/projects/testlist/${id}`);
    } catch (err) {
      return;
    }

    dispatch(deleteTestPage(deletedTest.data));
  },
  displayScreenshot: async (uniqId) => {
    let screenshot;

    dispatch(loadingScreenshot());

    try {
      screenshot = await axios.get(`/api/test-page/${uniqId}/screen-shot`);
    } catch (err) {
      return;
    }

    dispatch(fetchScreenshotUrl(screenshot.data));
  },
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(TestList));
