import React, { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';

import createCharacterByType from '../../pixi/Character';
import Button from '../../pixi/Button';
import { characterTypes } from '../../constants/canvas';
import { CharacterCanvas as S } from './styles';

export default function CharacterCanvas({ selectedCharacter }) {
  const canvasRef = useRef();
  const characters = [...characterTypes];
  let characterIndex = characters.findIndex(character => character.type === selectedCharacter.current);

  useEffect(() => {
    setup();

    return () => {
      canvasRef.current = null;
    }
  }, []);

  function setup() {
    const app = new PIXI.Application({
      width: 200,
      height: 120,
      antialias: true,
      transparent: true,
    });

    canvasRef.current.appendChild(app.view);

    characters.forEach(character => {
      character.sprite = createCharacterByType(character.type);
    });

    const leftButton = new Button('leftButton', 30, 45);
    const rightButton = new Button('rightButton', 155, 45);

    app.stage.addChild(
      characters[characterIndex].sprite,
      leftButton.sprite,
      rightButton.sprite
    );

    leftButton.sprite.on('click', () => {
      app.stage.removeChild(characters[characterIndex].sprite);
      characterIndex = characterIndex - 1 < 0 ? 9 : characterIndex - 1;
      selectedCharacter.current = characters[characterIndex].type;
      app.stage.addChild(characters[characterIndex].sprite);
    });
    rightButton.sprite.on('click', () => {
      app.stage.removeChild(characters[characterIndex].sprite);
      characterIndex = characterIndex + 1 > 9 ? 0 : characterIndex + 1;
      selectedCharacter.current = characters[characterIndex].type;
      app.stage.addChild(characters[characterIndex].sprite);
    });
  }

  return (
    <S.CanvasContainer ref={canvasRef}>
    </S.CanvasContainer>
  );
}
