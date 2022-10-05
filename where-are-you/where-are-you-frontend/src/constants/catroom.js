import bookshelf from "../assets/catroom/bookshelf.png";
import carpet from "../assets/catroom/carpet.png";
import catTower from "../assets/catroom/cat_tower.png";
import detailWindow from "../assets/catroom/detail01.png";
import photo from "../assets/catroom/photo.png";
import rat from "../assets/catroom/rat.png";
import window from "../assets/catroom/window.png";

const CATROOM_ITEMS = [
  {
    name: "window",
    src: window,
    x: 80,
    y: 30,
    width: 212,
    height: 143,
    detailImage: detailWindow,
    text: "날씨가 좋아서 그런지 산책하는 강아지들이 보인다.",
    overlayItems: ["catTower"]
  },
  {
    name: "catTower",
    src: catTower,
    x: 30,
    y: 150,
    width: 284,
    height: 386,
    puzzle: "puzzle14"
  },
  {
    name: "bookshelf",
    src: bookshelf,
    x: 330,
    y: 30,
    width: 442,
    height: 424,
    password: "password3",
    puzzle: "puzzle16",
    overlayItems: ["carpet", "photo"]
  },
  {
    name: "photo",
    src: photo,
    x: 390,
    y: 100,
    width: 96,
    height: 96,
    puzzle: "puzzle15"
  },
  {
    name: "carpet",
    src: carpet,
    x: 320,
    y: 420,
    width: 311,
    height: 96,
    text: "생선이 그려진 카펫이다. 비록 뼈만 남아있지만...",
    overlayItems: ["rat"]
  },
  {
    name: "rat",
    src: rat,
    x: 530,
    y: 500,
    width: 135,
    height: 48,
    puzzle: "puzzle13"
  }
];

export default CATROOM_ITEMS;
