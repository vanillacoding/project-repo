export default function generatedateformat(stringDate) {
  const targetDateTime = new Date(stringDate).getTime();
  const koreaTimezoneOffset = 3600000 * 9;

  const currentDate = new window.Date(targetDateTime * 1 + koreaTimezoneOffset)
    .toISOString()
    .slice(0, 16);

  const date = new window.Date(currentDate).toISOString().slice(0, 10);

  return date;
}
