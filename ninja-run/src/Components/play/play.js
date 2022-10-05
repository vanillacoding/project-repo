import html from "./play.html";
import "./play.css";

import backgroundImage from "../../../assets/images/Game/ForestBG.png";
import store from "../../store/store";
import Game from "../../Game/index";
import { moveToRoute } from "../../router";
import { postRecord } from "../../api/recordApi";

function execute() {
  const $gameContainer = document.getElementById("game__container");
  const currentGame = Game();

  currentGame.player = store.player;
  currentGame.saveRecord = postRecord;
  currentGame.router = moveToRoute;

  const $gameContainerBefore = document.createElement("div");
  $gameContainerBefore.style.backgroundImage = `url(${backgroundImage})`;
  $gameContainer.insertBefore($gameContainerBefore, $gameContainer.firstElementChild);
}

export default {
  html,
  execute,
};
