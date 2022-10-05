import bathtub from "../assets/bathroom/bathtub.png";
import closet from "../assets/bathroom/closet.png";
import mirror from "../assets/bathroom/mirror.png";
import sink from "../assets/bathroom/sink.png";
import sinkWater from "../assets/bathroom/sink_water.png";
import toilet from "../assets/bathroom/toilet.png";
import towel from "../assets/bathroom/towel.png";

const BATHROOM_ITEMS = [
  {
    name: "bathtub",
    src: bathtub,
    x: 0,
    y: 350,
    width: 180,
    height: 198,
    puzzle: "puzzle18"
  },
  {
    name: "towel",
    src: towel,
    x: 70,
    y: 180,
    width: 169,
    height: 135,
    puzzle: "puzzle19"
  },
  {
    name: "sink",
    src: sink,
    srcAfter: sinkWater,
    x: 240,
    y: 230,
    width: 268,
    height: 313,
    text: "저녁도 먹었으니 양치를 해야한다. 하지만 편지의 주인공을 찾는 게 먼저다."
  },
  {
    name: "mirror",
    src: mirror,
    x: 310,
    y: 70,
    width: 151,
    height: 149,
    puzzle: "puzzle17"
  },
  {
    name: "closet",
    src: closet,
    x: 580,
    y: 50,
    width: 162,
    height: 194,
    puzzle: "puzzle20",
    password: "password4"
  },
  {
    name: "toilet",
    src: toilet,
    x: 600,
    y: 290,
    width: 117,
    height: 264,
    text: "변기는 더러워지지 않도록 자주 청소해줘야 한다."
  }
];

export default BATHROOM_ITEMS;
