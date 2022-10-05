import Fireball from "../Fireball";
import globalStore from "../../../../globalStore";

export default class TurretFireball extends Fireball {
  constructor(option) {
    super(option);

    const {
      turretFireball,
      turretFireballExplosion1,
      turretFireballExplosion2,
    } = globalStore.getItem("resources");

    this.fireballTextures = Object.values(
      turretFireball.textures
    );
    this.fireballExplosionTextures = [
      ...Object.values(turretFireballExplosion1.textures),
      ...Object.values(turretFireballExplosion2.textures),
    ];

    this.createSprite();
    this.createExplosionSprite();
  }
}
