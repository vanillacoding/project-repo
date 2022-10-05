import { connect } from 'react-redux';
import ProjectDetail from '../components/ProjectDetail';
import * as actions from '../actions/index';
import * as api from '../utils/api';

const mapStateToProps = state => {
  const {
    authReducer,
    detailReducer
  } = state;

  const { statistics } = detailReducer;

  let newErrorNameData;
  let newErrorTimeData;
  if (statistics && statistics.name) {
    newErrorNameData = Object.keys(statistics.name).map(errorName => ({
      title: errorName,
      count: statistics.name[errorName]
    }));

    newErrorTimeData = statistics.time.map((errorCount, index) => ({
      time: index,
      count: 0
    }));

    statistics.time.forEach((errorCount, index) => {
      let today = new Date();
      today.setUTCHours(index);
      let hour = today.getHours();

      newErrorTimeData[hour] = {
        time: hour,
        count: errorCount
      };
    });

    newErrorTimeData.unshift({ time: -1, count: 0 });
    newErrorTimeData.push({ time: 24, count: 0 });
  }

  return {
    jwtoken: authReducer.jwtoken,
    ...detailReducer,
    statistics: {
      name: newErrorNameData,
      time: newErrorTimeData
    }
  };
};

const mapDispatchToProps = dispatch => ({
  onProjectDetailLoad: async (token, projectToken, page = 0, sort = 'asc') => {
    try {
      dispatch(actions.getProjectDetailPending());
      const response = await api.getProjectDetailApi(token, projectToken, page, sort);

      if (response.result === 'unauthorized') {
        window.localStorage.removeItem('bugcideToken');
        return dispatch(actions.logoutUser());
      }

      if (response.result === 'Project not started') {
        return dispatch(actions.getProjectDetailSuccess(response, page, sort));
      }

      if (response.result !== 'ok') {
        return dispatch(actions.getProjectDetailFailure());
      }

      dispatch(actions.getProjectDetailSuccess(response, page, sort));
    } catch (err) {
      console.log(err);
      dispatch(actions.getProjectDetailFailure());
    }
  },
  onProjectDelete: async (token, projectToken) => {
    try {
      const response = await api.deleteProjectApi(token, projectToken);
      if (response.result === 'unauthorized') {
        window.localStorage.removeItem('bugcideToken');
        return dispatch(actions.logoutUser());
      }

      if (response.result !== 'ok') {
        alert('Failed to delete Project. Please try again later');
      }
      window.location.replace('/');
    } catch (err) {
      console.log(err);
      alert('Failed to delete Project. Please try again later');
    }
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetail);
