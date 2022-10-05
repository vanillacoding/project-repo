import carpet from "../assets/kitchen/carpet.png";
import carpetBug from "../assets/kitchen/carpet_bug.png";
import counter from "../assets/kitchen/counter.png";
import cupEmpty from "../assets/kitchen/cup_empty.png";
import cupFull from "../assets/kitchen/cup_full.png";
import cuttingBoard from "../assets/kitchen/cutting_board.png";
import fridge from "../assets/kitchen/fridge.png";
import milk from "../assets/kitchen/milk.png";
import sandwich from "../assets/kitchen/sandwich.png";
import sink from "../assets/kitchen/sink.png";
import table from "../assets/kitchen/table.png";
import windowClose from "../assets/kitchen/window_close.png";
import windowOpen from "../assets/kitchen/window_open.png";

const KITCHEN_ITEMS = [
  {
    name: "fridge",
    src: fridge,
    x: 40,
    y: 50,
    width: 184,
    height: 361,
    password: "password1",
    puzzle: "puzzle7"
  },
  {
    name: "window",
    src: windowClose,
    srcAfter: windowOpen,
    x: 500,
    y: 30,
    width: 237,
    height: 151,
    text: "커텐을 열었더니 거리를 지나다니는 사람들이 보인다."
  },
  {
    name: "sink",
    src: sink,
    x: 204,
    y: 124,
    width: 198,
    height: 289,
    puzzle: "puzzle6"
  },
  {
    name: "counter",
    src: counter,
    x: 402,
    y: 124,
    width: 280,
    height: 288,
    text: "부엌은 깨끗하게 청소해야 벌레가 생기지 않는다.",
    overlayItems: ["milk", "table", "sandwich", "cuttingBoard"]
  },
  {
    name: "cuttingBoard",
    src: cuttingBoard,
    x: 500,
    y: 190,
    width: 125,
    height: 38,
    puzzle: "puzzle5"
  },
  {
    name: "carpet",
    src: carpet,
    srcAfter: carpetBug,
    x: 10,
    y: 430,
    width: 350,
    height: 116,
    text: "소용돌이 모양 카펫이다. ...카펫 밑에 뭔가 있던 거 같은데. 기분 탓이겠지."
  },
  {
    name: "table",
    src: table,
    x: 375,
    y: 360,
    width: 418,
    height: 241,
    text: "파란색 냉장고와 노란색 식탁의 조합이라니. 누가 고른 색이더라?",
    overlayItems: ["milk", "sandwich", "cup"]
  },
  {
    name: "milk",
    src: milk,
    x: 620,
    y: 270,
    width: 67,
    height: 147,
    text: "샌드위치랑 같이 먹으면 더 맛있는 우유. 하지만 초코 우유가 더 맛있다."
  },
  {
    name: "sandwich",
    src: sandwich,
    x: 430,
    y: 350,
    width: 170,
    height: 90,
    puzzle: "puzzle4"
  },
  {
    name: "cup",
    src: cupFull,
    srcAfter: cupEmpty,
    x: 690,
    y: 380,
    width: 48,
    height: 63,
    text: "우유를 마셨다가 괜히 배가 아프진 않겠지?"
  }
];

export default KITCHEN_ITEMS;
