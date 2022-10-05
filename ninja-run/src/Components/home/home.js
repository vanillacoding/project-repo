import html from "./home.html";
import "./home.css";
import "./leaf.css";

import backgroundImage from "../../../assets/images/Game/ForestBG.png";
import backgroundMusic from "../../../assets/sounds/MTFuji.mp3";
import store from "../../store/store";
import recordDiv from "./record/record";
import { moveToRoute } from "../../router";

function execute() {
  const $home = document.getElementById("home");

  const $nameInput = document.getElementById("name__input");
  const $gameStartButton = document.getElementById("game__start");

  const $rankingButton = document.getElementById("ranking__button");

  const $bgm = document.getElementById("bgm");
  const $bgmOn = document.getElementById("bgm__on");
  const $bgmOff = document.getElementById("bgm__off");

  const $scoreModal = document.getElementById("score__modal");
  const $scoreBoard = document.getElementById("score__board");

  $home.style.backgroundImage = `url(${backgroundImage})`;

  $nameInput.addEventListener("keyup", handleKeyupEvent);

  $gameStartButton.style.display = "none";
  $gameStartButton.addEventListener("click", () => moveToRoute("data", "/play"));

  $rankingButton.addEventListener("click", handleRankingButtonClick);

  $bgm.setAttribute("src", backgroundMusic);
  $bgm.setAttribute("loop", true);

  $bgmOn.style.display = "none";

  $bgmOn.addEventListener("click", () => {
    $bgmOff.style.display = "flex";
    $bgmOn.style.display = "none";
    $bgm.play();
  });

  $bgmOff.addEventListener("click", () => {
    $bgmOn.style.display = "flex";
    $bgmOff.style.display = "none";
    $bgm.pause();
  });

  $scoreModal.style.display = "none";
  $scoreModal.addEventListener("click", handleScoreBoardClick);

  function handleKeyupEvent(e) {
    const inputName = e.target.value;
    store.player = inputName;

    if (inputName === "") {
      $gameStartButton.style.display = "none";
    } else {
      $gameStartButton.style.display = "flex";
    }
  }

  async function handleRankingButtonClick() {
    const scoreBoardDisplay = $scoreModal.style.display;

    if (scoreBoardDisplay === "none") {
      $scoreModal.style.display = "flex";

      const allRecords = await recordDiv();
      $scoreBoard.innerHTML = allRecords;
    }
  }

  function handleScoreBoardClick() {
    const scoreBoardDisplay = $scoreModal.style.display;

    if (scoreBoardDisplay === "flex") {
      $scoreModal.style.display = "none";
    }
  }
}

export default {
  html,
  execute,
};
