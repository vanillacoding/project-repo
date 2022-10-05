import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';
import moment from 'moment';
import Detail from '../components/Detail/Detail';
import { fetchGetSleepById } from '../lib/api/sleep';

const DetailContainer = props => {
  const { location, user, history } = props;
  const { sleepId } = queryString.parse(location.search);

  const [sleepDetail, setSleepDetail] = useState({});
  const [cycleForDailyChart, setCycleForDailyChart] = useState({});

  const cycleForChart = sleepCycleList => {
    const cycles = [];
    const sleep = {};

    for (let i = 0; i < sleepCycleList.length; i++) {
      const startTime = sleepCycleList[i][0];
      const sleepType = sleepCycleList[i][2];

      sleep[sleepType + i] = startTime;
    }
    cycles.push(sleep);

    setCycleForDailyChart(cycles);
  };

  const sleepForDetail = sleep => {
    const { _id, createdAt, bedTime, wakeUpTime, sleepDuration, sleepCycle, diary } = sleep;

    const sleepDurationList = sleepDuration.split(':');
    const hours = `${sleepDurationList[0]}시간 ${sleepDurationList[1]}분`;
    const duration = `${moment(bedTime).format('LT')} ~ ${moment(wakeUpTime).format('LT')}`;

    const setTimeCycle = sleepCycle.map(cycle => {
      const start = moment(cycle[0]).format('HH:mm');
      const end = moment(cycle[1]).format('HH:mm');
      const type = cycle[2];
      return [type, start, end];
    });

    const sleepInfo = {
      date: moment(createdAt).format('YYYY.MM.DD'),
      hours,
      duration,
      sleepCycle: setTimeCycle,
      diary,
      _id
    };
    setSleepDetail(sleepInfo);
  };

  const onLoad = async () => {
    const sleepById = await fetchGetSleepById(user._id, sleepId);
    cycleForChart(sleepById.sleepCycle);
    sleepForDetail(sleepById);
  };

  useEffect(() => {
    if (user._id) {
      onLoad();
    }
  }, [user._id]);

  return (
    <Detail
      sleep={sleepDetail}
      cycleForDailyChart={cycleForDailyChart}
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

export default connect(mapStateToProps)(DetailContainer);
