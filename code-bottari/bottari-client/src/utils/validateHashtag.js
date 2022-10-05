import { pascalCase } from "pascal-case";

import {
  DEMAND_INPUT,
  EXCESSIVE_HASHTAG_NUMBER,
  EXCESSIVE_HASHTAG_LENGTH,
  UNSUITABLE_CASE,
  OK,
} from "../constants/messages";

const MAX_NUMBER = 5;
const MAX_LENGTH = 16;

const validateHashtag = (hashtagList) => {
  if (hashtagList[0] === "") {
    return DEMAND_INPUT;
  }

  if (hashtagList.length > MAX_NUMBER) {
    return EXCESSIVE_HASHTAG_NUMBER;
  }

  const hasExeedingLength = hashtagList.some((hashtag) => hashtag.length > MAX_LENGTH);

  if (hasExeedingLength) {
    return EXCESSIVE_HASHTAG_LENGTH;
  }

  const hasNonePascalCase = hashtagList.some((hashtag) => hashtag !== `#${pascalCase(hashtag)}`);

  if (hasNonePascalCase) {
    return UNSUITABLE_CASE;
  }

  return OK;
};

export default validateHashtag;
