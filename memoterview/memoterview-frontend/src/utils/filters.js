export const FILTER_TYPES = {
  EVALUATION: "평가",
  INTERVIEWEE: "지원자",
  QUESTION_SCORE: "응답점수",
  QUESTION_NUM: "질문개수",
  INTERVIEW_DURATION: "면접시간",
  INTERVIEW_DATE: "면접일자",
};

export const totalResultHeadFixedFilters = [FILTER_TYPES.EVALUATION, FILTER_TYPES.INTERVIEWEE];
const totalResultMidFilters = [FILTER_TYPES.QUESTION_SCORE, FILTER_TYPES.QUESTION_NUM];
const totalResultTailFilters = [FILTER_TYPES.INTERVIEW_DURATION, FILTER_TYPES.INTERVIEW_DATE];

function transFilterOptions(filters, defaultChecked) {
  return filters.map((filter) => ({
    filter,
    checked: defaultChecked,
  }));
}

export function getDefaultTotalResultFilters(customFilters) {
  const midFilterOptions = transFilterOptions(totalResultMidFilters, true);
  const customFilterOptions = transFilterOptions(customFilters, false);
  const tailFilterOptions = transFilterOptions(totalResultTailFilters, false);
  return [...midFilterOptions, ...customFilterOptions, ...tailFilterOptions];
}

export function getFiltersFromFilterOptions(filterOptions) {
  const checkedFilters = filterOptions.filter((filterOption) => filterOption.checked).map((filterOption) => filterOption.filter);

  return [...totalResultHeadFixedFilters, ...checkedFilters];
}
