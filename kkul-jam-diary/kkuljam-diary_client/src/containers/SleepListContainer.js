import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import SleepList from '../components/SleepList/SleepList';
import { fetchGetAllSleep } from '../lib/api/sleep';

const SleepListContainer = props => {
  const { user, history } = props;
  const [sleepList, setSleepList] = useState([]);

  async function onLoad() {
    const list = await fetchGetAllSleep(user._id);
    setSleepList(list);
  }

  useEffect(() => {
    if (user._id) {
      onLoad();
    }
  }, [user._id]);

  return (
    <SleepList
      sleepList={sleepList}
      history={history}
    />
  );
};

const mapStateToProps = state => {
  const { user } = state;
  return {
    user
  };
};

export default connect(mapStateToProps)(SleepListContainer);
