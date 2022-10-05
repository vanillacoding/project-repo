import { GAME_START_TIME, BETTING_END_TIME } from "../constants";
import { formatDate } from "./date";

const checkDay = (day) => {
  if (day === 6) {
    return "saturday";
  }

  if (day === 0) {
    return "sunday";
  }

  if (day === 1) {
    return "monday";
  }

  return "weekdays";
};

const checkBettingCondition = (date) => {
  const today = checkDay(date.getDay());
  const now = formatDate(date, "HH:mm:ss");

  if (today === "monday") {
    return "monday";
  }

  if (now > GAME_START_TIME[today] && now < BETTING_END_TIME[today]) {
    return "open";
  }

  if (now > BETTING_END_TIME[today]) {
    return "close";
  }

  if (now > "00:30:00" && now < "04:00:00") {
    return "calculating";
  }

  if (now > "04:00:00") {
    return "result";
  }

  return "close";
};

export const refinePlayerRankings = (playerRankings) => (
  playerRankings.map((player) => {
    const { name, team, score } = player;
    const imageUrl = player.playerInfo[0].playerPhotoUrl;
    return {
      name,
      team,
      score,
      imageUrl,
    };
  })
);

export const handleTabClick = (event, setTabList, setTabName) => {
  const currentTabName = event.currentTarget.getAttribute("data-tab");

  setTabList((prevTabList) => {
    const selectedIndex = prevTabList.findIndex((tab) => tab.name === currentTabName);
    const newTabList = prevTabList.map((tab, index) => {
      const currentTab = { ...tab };

      if (index === selectedIndex) {
        currentTab.isActive = true;
      } else {
        currentTab.isActive = false;
      }

      return currentTab;
    });

    return newTabList;
  });

  setTabName(currentTabName);
};

export default checkBettingCondition;
