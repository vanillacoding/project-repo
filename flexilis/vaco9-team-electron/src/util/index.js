export function sortAlarms(alarms) {
  return alarms.sort((a, b) => {
    const [a1, a2] = a.time.split(':').map(Number);
    const [b1, b2] = b.time.split(':').map(Number);

    return a1 - b1 || a2 - b2;
  });
}

export function formatTime(time) {
  let [hh, mm] = time.split(':');
  const period = Number(hh) < 12 ? '오전' : '오후';

  if (period === '오후') {
    hh = Number(hh) - 12;
  }

  return { period: period, hhmm: [hh, mm].join(':') };
}
