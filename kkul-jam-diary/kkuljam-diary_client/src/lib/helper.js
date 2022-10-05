import moment from 'moment';

function getTimes(timeNanos) {
  return Number(timeNanos.slice(0, 13));
}

function getDiff(startTime, endTime) {
  return moment.duration(endTime.diff(startTime));
}

const setDailySleep = fullSleepList => {
  const firstSleep = getTimes(fullSleepList[0].startTimeNanos);
  const dailySleepList = [];
  let endDay = moment(firstSleep).hour() < 18 ? new Date(firstSleep).setHours(18, 0, 0, 0)
    : new Date(firstSleep).setHours(18 + 24, 0, 0, 0);

  function spliceCurrentDay() {
    const { length } = fullSleepList;
    let currentDaySleepList = [];

    for (let i = 0; i < fullSleepList.length; i++) {
      const startTime = getTimes(fullSleepList[i].startTimeNanos);
      if (startTime > endDay) {
        endDay = moment(startTime).hour() < 18 ? new Date(startTime).setHours(18, 0, 0, 0)
          : new Date(startTime).setHours(18 + 24, 0, 0, 0);
        currentDaySleepList = fullSleepList.splice(0, i);
        return makeDailySleep(currentDaySleepList);
      }
    }
    if (!currentDaySleepList.length) currentDaySleepList = fullSleepList.splice(0, length);
    return makeDailySleep(currentDaySleepList);
  }

  function makeDailySleep(sleepList) {
    const bedTime = getTimes(sleepList[0].startTimeNanos),
      wakeUpTime = getTimes(sleepList[sleepList.length - 1].endTimeNanos),
      totalDiff = getDiff(moment(bedTime), moment(wakeUpTime)),
      sleepDuration = `${totalDiff.hours()}:${totalDiff.minutes()}`;

    const sleepCycle = sleepList.map((sleep, index) => {
      const type = index % 2 ? 'deep' : 'light';
      return [getTimes(sleep.startTimeNanos), getTimes(sleep.endTimeNanos), type];
    });

    let lightSleepSeconds = 0;
    let deepSleepSeconds = 0;
    for (let i = 0; i < sleepCycle.length; i++) {
      const duration = sleepCycle[i][1] - sleepCycle[i][0];
      if (sleepCycle[i][2] === 'light') {
        lightSleepSeconds += duration;
      } else {
        deepSleepSeconds += duration;
      }
    }

    const deepSleepPercentage = parseInt((deepSleepSeconds / (wakeUpTime - bedTime) * 100), 10);

    dailySleepList.push({
      sleepDuration,
      bedTime: moment(bedTime).format(),
      wakeUpTime: moment(wakeUpTime).format(),
      sleepCycle,
      lightSleepSeconds,
      deepSleepSeconds,
      deepSleepPercentage
    });

    if (fullSleepList.length) {
      return spliceCurrentDay();
    }
    return dailySleepList;
  }

  return spliceCurrentDay();
};

export default setDailySleep;
