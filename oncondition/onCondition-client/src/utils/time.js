function getKoreanTimeString(date) {
  const lengthOfSecond = 3;

  return new Date(date).toLocaleString("ko-KR", { timeZone: "asia/Seoul" }).slice(0, -lengthOfSecond);
}

function getKoreanDateString(date) {
  return new Date(date).toLocaleDateString("ko-KR", { timeZone: "asia/Seoul" });
}

function getISOTime(today) {
  today.setUTCHours(
    0, 0, 0, 0,
  );

  const pastMidnightInMS = today;
  const pastMidnight = new Date(pastMidnightInMS);

  return { pastMidnight };
}

export { getKoreanTimeString, getKoreanDateString, getISOTime };
