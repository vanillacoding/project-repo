import { connect } from 'react-redux';
import axios from 'axios';

import App from '../components/App';
import {
  fetchProjects,
  addNewProject,
  deleteProject,
  fetchTestList,
  setCurrentProjectID,
  displayModal,
  removeModal,
  displayTestListLoader,
  removeTestListLoader,
  initScreenshotState,
  removeCurrentProjectId,
} from '../actions/index';

const mapStateToProps = ({ projects, modal, screenshot, currentProject }) => ({
  projects,
  modal,
  screenCapture: screenshot,
  currentProject,
});

const mapDispatchToProps = dispatch => ({
  onProjectListMount: async () => {
    const projects = await axios.get('/api/projects');

    dispatch(fetchProjects(projects.data));
  },
  onPlusBtnClick: async (name, origin) => {
    let newProject;

    try {
      newProject = await axios.post(`/api/projects/${name}`, {
        origin,
      });
    } catch (err) {
      if (err.message === 'Request failed with status code 500') {
        err.message = 'Oops. Could you please try it agian.';
      }

      dispatch(displayModal(err.message));
    }

    if (!newProject) {
      return;
    }

    dispatch(addNewProject(newProject.data));
  },
  onDeleteBtnClick: async (projectId) => {
    let deletedProject;

    try {
      deletedProject = await axios.delete(`/api/projects/${projectId}`);
    } catch (err) {
      dispatch(displayModal(err.message));
    }

    dispatch(removeCurrentProjectId());
    dispatch(deleteProject(deletedProject.data._id));
  },
  onListClick: async (projectId) => {
    let testList;

    dispatch(setCurrentProjectID(projectId));
    dispatch(displayTestListLoader());

    try {
      testList = await axios.get(`/api/projects/${projectId}/testlist`);
    } catch (err) {
      return;
    }

    dispatch(fetchTestList(testList.data));
    dispatch(removeTestListLoader());
  },
  onConfirmClick: () => {
    dispatch(removeModal());
  },
  onScreenshotUnmount: () => {
    dispatch(initScreenshotState());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
