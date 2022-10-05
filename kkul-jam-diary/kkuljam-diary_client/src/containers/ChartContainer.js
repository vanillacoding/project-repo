import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Chart from '../components/Chart/Chart';
import { fetchGetSleep } from '../lib/api/sleep';

moment.locale('ko', {
  weekdaysShort: ['일', '월', '화', '수', '목', '금', '토']
});

const ChartContainer = props => {
  const { user, history } = props;
  const [weeklyPatternList, setWeeklyPatternList] = useState([]);
  const today = moment();
  const sevenDaysAgo = moment().subtract(7, 'd');
  const term = `< ${moment(sevenDaysAgo).format('YYYY.MM.DD')} ~ ${moment(today).format('YYYY.MM.DD')} >`;

  useEffect(() => {
    if (user.email) {
      fetchGetSleep(user._id, sevenDaysAgo, today, true, sleepList => {
        setWeeklyPatternList(sleepList.map(sleep => {
          const { createdAt,
            sleepDuration,
            deepSleepSeconds,
            lightSleepSeconds,
            deepSleepPercentage
          } = sleep;
          const sleepDurationList = sleepDuration.split(':');
          const list = {
            createdAt,
            day: moment(createdAt).format('ddd'),
            durationHours: `${sleepDurationList[0]}시간`,
            durationMinutes: `${sleepDurationList[1]}분`,
            deep: deepSleepSeconds / 100000,
            light: lightSleepSeconds / 100000,
            deepSleepPercentage
          };

          return list;
        }));
      });
    }
  }, [user._id, user.email]);

  return (
    <Chart
      user={user}
      weeklyPatternList={weeklyPatternList}
      term={term}
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

export default connect(mapStateToProps)(ChartContainer);
