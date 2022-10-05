import { INTERVIEW_STATE } from "../../constants/recordState";

export function getBorderColor(vibilityRecordStateType) {
  return INTERVIEW_STATE[vibilityRecordStateType].color.normalColor;
}
