import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { requestBody, requestGoogleFitApi } from '../lib/api/googleFit';
import setDailySleep from '../lib/helper';
import { fetchPostSleep, fetchGetSleep } from '../lib/api/sleep';
import { fetchUpdateUserInfo } from '../lib/api/user';
import * as actions from '../actions/index';
import Home from '../components/Home/Home';

const HomeContainer = props => {
  const { user, latelySleep, getLatelySleep, history } = props;

  const getGoogleFitData = async cb => {
    const lastUpdate = user.sleepLastUpdatedAt;

    requestBody.startTimeMillis = lastUpdate ? new Date(lastUpdate).setHours(18, 0, 0, 0)
      : new Date().setHours(-(24 * 14) + 18, 0, 0, 0);
    requestBody.endTimeMillis = new Date().setHours(18, 0, 0, 0);
    const sleepResponse = await requestGoogleFitApi(requestBody);
    cb(sleepResponse);
  };

  const postSleeps = async (userId, sleepResponse, cb) => {
    if (!sleepResponse) return cb();
    if (!sleepResponse.data.bucket.length) return cb();

    const sleepList = sleepResponse.data.bucket[0].dataset[0].point;
    if (!sleepList.length) return cb();

    const dailySleepList = setDailySleep(sleepList);
    const response = await fetchPostSleep(userId, dailySleepList);
    if (response === 'ok') {
      fetchUpdateUserInfo(userId, { sleepLastUpdatedAt: new Date() });
    }

    cb();
  };

  const getTodaySleep = async userId => {
    const today = new Date();
    actions.receiveSleepPending();
    fetchGetSleep(userId, today, today, false, sleep => {
      getLatelySleep(sleep[0]);
    });
  };

  useEffect(() => {
    if (user.email) {
      getGoogleFitData(sleepResponse => {
        postSleeps(user._id, sleepResponse, () => {
          getTodaySleep(user._id);
        });
      });
    }
  }, [user.email]);

  return (
    <Home
      user={user}
      latelySleep={latelySleep}
      history={history} 
    />
  );
};

const mapStateToProps = state => {
  const { user, latelySleep } = state;
  return {
    user,
    latelySleep: latelySleep.sleeps
  };
};

const mapDispatchToProps = dispatch => ({
  getLatelySleep(sleep) {
    dispatch(actions.receiveSleepSuccess(sleep));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
