import hedgehog_idle from "../../../images/littleForest/characters/hedgehog/idle.png";
import hedgehog_walking from "../../../images/littleForest/characters/hedgehog/walking.png";
import hedgehog_hurt from "../../../images/littleForest/characters/hedgehog/hurt.png";
import turtle_idle from "../../../images/littleForest/characters/turtle/idle.png";
import turtle_walking from "../../../images/littleForest/characters/turtle/walking.png";
import turtle_hurt from "../../../images/littleForest/characters/turtle/hurt.png";
import sanil_idle from "../../../images/littleForest/characters/snail/idle.png";
import sanil_walking from "../../../images/littleForest/characters/snail/walking.png";
import sanil_hurt from "../../../images/littleForest/characters/snail/hurt.png";

const characterImages = [
  {
    idle: {
      img: hedgehog_idle,
      frame: 24,
    },
    walking: {
      img: hedgehog_walking,
      frame: 18,
    },
    hurt: {
      img: hedgehog_hurt,
      frame: 12,
    },
  },
  {
    idle: {
      img: turtle_idle,
      frame: 36,
    },
    walking: {
      img: turtle_walking,
      frame: 24,
    },
    hurt: {
      img: turtle_hurt,
      frame: 12,
    },
  },
  {
    idle: {
      img: sanil_idle,
      frame: 18,
    },
    walking: {
      img: sanil_walking,
      frame: 18,
    },
    hurt: {
      img: sanil_hurt,
      frame: 12,
    },
  },
];

export default characterImages;
