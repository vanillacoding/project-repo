const {
  isValidText,
  isValidDate,
  isValidDuration,
} = require("../utils/validations");
const googleActivities = require("../../constants/googleActivities.json");

const { ONE_MINUTE_IN_MS } = require("../../constants/times");

const SLEEP = "Sleep";
const SLEEP_CODE = 72;

function parseSessionEntry({
  id: sessionId,
  activityType,
  startTimeMillis,
  endTimeMillis,
}) {
  const type = activityType === SLEEP_CODE
    ? SLEEP
    : googleActivities[activityType];

  if (!isValidText(type)) {
    return null;
  }

  const durationInMS = Number(endTimeMillis) - Number(startTimeMillis);
  const duration = Math.floor(durationInMS / ONE_MINUTE_IN_MS);

  if (!isValidDuration(duration)) {
    return null;
  }

  const date = new Date(Number(startTimeMillis));

  if (!isValidDate(date)) {
    return null;
  }

  return {
    sessionId, type, date, duration,
  };
}

function parseSession(session) {
  const sleeps = [];
  const activities = [];

  for (const entry of session) {
    const parsedEntry = parseSessionEntry(entry);

    if (!parsedEntry) {
      continue;
    }

    if (parsedEntry.type === SLEEP) {
      sleeps.push(parsedEntry);
    } else {
      activities.push(parsedEntry);
    }
  }

  return { sleeps, activities };
}

function parseSteps(steps) {
  const result = [];

  for (const step of steps) {
    const { startTimeMillis, dataset } = step;
    const date = new Date(Number(startTimeMillis));
    const { point } = dataset.pop();

    if (!isValidDate(date)) {
      continue;
    }

    if (!point.length) {
      result.push({ date, count: 0 });

      continue;
    }

    const dailyCount = point.pop();
    const { value } = dailyCount;
    const { intVal } = value.pop();

    result.push({ date, count: intVal });
  }

  return result;
}

module.exports = { parseSession, parseSteps };
