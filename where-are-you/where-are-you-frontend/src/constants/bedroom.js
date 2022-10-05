import bed from "../assets/bedroom/bed.png";
import desk from "../assets/bedroom/desk.png";
import detailLamp from "../assets/bedroom/detail01.png";
import drawer from "../assets/bedroom/drawer.png";
import homework from "../assets/bedroom/homework.png";
import lampOff from "../assets/bedroom/lamp_off.png";
import poster from "../assets/bedroom/poster.png";
import puzzle from "../assets/bedroom/puzzle.png";
import table from "../assets/bedroom/table.png";

const BEDROOM_ITEMS = [
  {
    name: "poster",
    src: poster,
    x: 30,
    y: 30,
    width: 324,
    height: 210,
    puzzle: "puzzle11",
    overlayItems: ["bed"]
  },
  {
    name: "bed",
    src: bed,
    x: 160,
    y: 170,
    width: 448,
    height: 400,
    puzzle: "puzzle9",
    overlayItems: ["desk"]
  },
  {
    name: "desk",
    src: desk,
    x: 570,
    y: 260,
    width: 231,
    height: 264,
    text: "침대 옆에 책상이 있으면 앞에 앉을 일이 거의 없다. 반성해야지...",
    overlayItems: ["drawer", "lamp", "homework"]
  },
  {
    name: "drawer",
    src: drawer,
    x: 628,
    y: 363,
    width: 117,
    height: 158,
    password: "password2",
    puzzle: "puzzle12"
  },
  {
    name: "lamp",
    src: lampOff,
    x: 610,
    y: 143,
    width: 140,
    height: 157,
    detailImage: detailLamp,
    text: "낡은 스탠드. 눈이 부셔서 잘 쓰진 않는다.",
    overlayItems: ["homework"]
  },
  {
    name: "homework",
    src: homework,
    x: 650,
    y: 250,
    width: 125,
    height: 85,
    puzzle: "puzzle8"
  },
  {
    name: "table",
    src: table,
    x: 30,
    y: 280,
    width: 154,
    height: 213,
    text: "보기에는 작아보이지만 튼튼한 협탁이다.",
    overlayItems: ["puzzle"]
  },
  {
    name: "puzzle",
    src: puzzle,
    x: 30,
    y: 250,
    width: 157,
    height: 64,
    puzzle: "puzzle10"
  }
];

export default BEDROOM_ITEMS;
