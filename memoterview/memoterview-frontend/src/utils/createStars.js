
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { STARS } from "../constants/interviewee";

export function createStars(score) {
  const stars = [];
  let totalStarNums = STARS.TOTAL_STARS_NUMS;
  let fullStarNums = score;

  while (totalStarNums > 0) {
    if (fullStarNums > 0) {
      stars.push(<FontAwesomeIcon key={Date.now() * Math.random()} icon={faStar} color={"#39425c"}/>);
      fullStarNums--;
      totalStarNums--;
      continue;
    }

    stars.push(<FontAwesomeIcon key={Date.now() * Math.random()} icon={emptyStar}/>);
    totalStarNums--;
  }

  return stars;
}
