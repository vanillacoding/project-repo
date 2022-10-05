import { createStars } from "../../../utils/createStars";
import { changeDateFormat, formatTimeForTimer } from "../../../utils/date";
import { FILTER_TYPES } from "../../../utils/filters";

function getAverages(scroes) {
  return scroes
    ? scroes.reduce(
      (acc, score) =>
        typeof score === "object" ? acc + score.score : acc + score,
      0
    ) / scroes.length
    : 0;
}

function getTimeFormat(time) {
  const { hour, minute, second } = formatTimeForTimer(time, false);
  const hourFormat = hour > 0 ? `${hour}시간` : "";
  const minuteFormat = minute > 0 ? `${minute}분` : "";
  const secondFormat = second > 0 ? `${second}초` : "";

  return `${hourFormat} ${minuteFormat} ${secondFormat}`;
}

export function mappedFilterValue({ interviewee, columnItem }) {
  switch (columnItem) {
    case FILTER_TYPES.EVALUATION:
      return createStars(Math.round(interviewee.commentAvgScore));
    case FILTER_TYPES.INTERVIEWEE:
      return interviewee.name;
    case FILTER_TYPES.QUESTION_SCORE:
      return Math.round(interviewee.questionAvgScore);
    case FILTER_TYPES.QUESTION_NUM:
      return interviewee.questionsNum;
    case FILTER_TYPES.INTERVIEW_DURATION:
      if (!interviewee.interviewDuration) {
        return "";
      }
      return getTimeFormat(interviewee.interviewDuration);
    case FILTER_TYPES.INTERVIEW_DATE:
      return changeDateFormat(interviewee.interviewDate, "yyyy-MM-dd HH");
    default:
      return interviewee.filterAvgScores
        ? Math.round(interviewee.filterAvgScores[columnItem]) || 0
        : 0;
  }
}
