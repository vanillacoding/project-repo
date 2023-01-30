export default function generatetimeformat(stringDate) {
  const targetDateTime = new Date(stringDate).getTime();
  const koreaTimezoneOffset = 3600000 * 9;

  const currentDate = new window.Date(targetDateTime * 1 + koreaTimezoneOffset)
    .toISOString()
    .slice(0, 16);

  const date = new window.Date(currentDate);
  const allTime = date.toString().slice(16, 21);
  let hour = Number(allTime.slice(0, 2));
  let time;

  if (hour >= 0 && hour < 12) {
    time = `${allTime}am`;
  } else {
    hour = (hour - 12).toString();
    time = `${hour + allTime.slice(2)}pm`;
  }

  return time;
}
