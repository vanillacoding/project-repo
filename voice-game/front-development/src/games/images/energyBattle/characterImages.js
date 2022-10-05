import character1Cast from "../../../images/energyBattle/characters/energyBattle_character_1_cast.png";
import character1Idle from "../../../images/energyBattle/characters/energyBattle_character_1_idle.png";
import character1Lose from "../../../images/energyBattle/characters/energyBattle_character_1_lose.png";
import character2Cast from "../../../images/energyBattle/characters/energyBattle_character_2_cast.png";
import character2Idle from "../../../images/energyBattle/characters/energyBattle_character_2_idle.png";
import character2Lose from "../../../images/energyBattle/characters/energyBattle_character_2_lose.png";
import skillFire from "../../../images/energyBattle/characters/energyBattle_skill_fire.png";
import skillIce from "../../../images/energyBattle/characters/energyBattle_skill_ice.png";
import skillLight from "../../../images/energyBattle/characters/energyBattle_skill_light.png";
import pad1 from "../../../images/energyBattle/characters/energyBattle_pad_1.png";
import pad2 from "../../../images/energyBattle/characters/energyBattle_pad_2.png";
import win from "../../../images/energyBattle/characters/text_win.png";
import lose from "../../../images/energyBattle/characters/text_lose.png";

const characterImages = {
  myCharacter: {
    idle: character1Idle,
    cast: character1Cast,
    lose: character1Lose,
  },
  otherCharacter: {
    idle: character2Idle,
    cast: character2Cast,
    lose: character2Lose,
  },
  skillEffect: {
    fire: skillFire,
    ice: skillIce,
    light: skillLight,
  },
  pads: {
    pad1,
    pad2,
  },
  result: {
    win,
    lose,
  },
};

export default characterImages;
