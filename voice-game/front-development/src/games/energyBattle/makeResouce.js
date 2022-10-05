import OtherAvatar from "./OtherAvatar";
import PlayerAvatar from "./PlayerAvatar";
import SkillEffect from "./SkillEffect";
import ResultImage from "./ResultImage";
import Pads from "./Pads";

const makeResource = (image, canvasWidth, canvasHeight) => {
  const playerAvatar = new PlayerAvatar(
    image.characters.myCharacter,
    canvasWidth,
    canvasHeight
  );
  const otherAvatar = new OtherAvatar(
    image.characters.otherCharacter,
    canvasWidth,
    canvasHeight
  );
  const pad = new Pads(image.characters.pads, canvasWidth, canvasHeight);
  const skill = new SkillEffect(
    image.characters.skillEffect,
    canvasWidth,
    canvasHeight
  );
  const resultImage = new ResultImage(
    image.characters.result,
    canvasWidth,
    canvasHeight
  );

  return { playerAvatar, otherAvatar, pad, skill, resultImage };
};

export default makeResource;
