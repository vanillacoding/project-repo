function oneToTwoDigits(number) {
  return number.toString().length < 2 ? `0${number}` : `${number}`;
}

function dividedTimeToOne(dividedTimeString, seperator) {
  const timeCol = dividedTimeString.split(seperator);
  const one = 60 * Number(timeCol[0]) + Number(timeCol[1]);
  return one;
}

function secondsConverter(number, unit) {
  let d, h, m, s;

  if (isNaN(number)) {
    throw new TypeError('Value sent to seconds-converter must be a number.');
  }

  if (unit === 'sec' || unit === 'seconds') {
    s = number;
  } else if (unit === 'ms' || unit === 'milliseconds' || !unit) {
    s = Math.floor(number / 1000);
  } else {
    throw new TypeError("Unit must be /'sec'/ or /'ms'/");
  }

  m = Math.floor(s / 60);
  s = s % 60;
  h = Math.floor(m / 60);
  m = m % 60;
  d = Math.floor(h / 24);
  h = h % 24;

  return { days: d, hours: h, minutes: m, seconds: s };
}

export { dividedTimeToOne, oneToTwoDigits, secondsConverter };
