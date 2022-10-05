import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import Loading from '../components/Loading/Loading';
import Write from '../components/Write/Write';
import fetchPostDiary from '../lib/api/diary';
import { fetchUpdateSleepInfo, fetchGetSleepById } from '../lib/api/sleep';

const WriteContainer = props => {
  const { history, location, user, latelySleep } = props;
  const { sleepId } = queryString.parse(location.search);
  const userId = user._id;

  const [sleep, setSleep] = useState({});

  const getSleepById = async () => {
    const currentSleep = await fetchGetSleepById(userId, sleepId);
    return setSleep(currentSleep);
  };

  useEffect(() => {
    if (userId && sleepId) {
      getSleepById();
    } else {
      setSleep(latelySleep);
    }
  }, [userId]);

  const saveDiary = async content => {
    const diary = await fetchPostDiary(userId, content);
    const { date, _id } = diary;
    const reqBody = {};

    reqBody[date] = _id;

    await fetchUpdateSleepInfo(userId, sleep._id, { diary: _id });
    alert('저장되었습니다.');

    const link = `/detail?sleepId=${sleep._id}`;
    history.push(link);
  };

  return (
    <>
      {!Object.keys(sleep).length && <Loading />}
      {Object.keys(sleep).length && (
        <Write
          sleep={sleep}
          saveDiary={saveDiary}
          history={history}
        />
      )}
    </>
  );
};

const mapStateToProps = state => {
  const { user, latelySleep } = state;
  return {
    user,
    latelySleep: latelySleep.sleeps
  };
};

export default connect(mapStateToProps)(WriteContainer);
