var adjustMusic = function( { turnOn, volume, bgm }, action ) {
  switch( action ) {
    case 'adjustVolume':
      if( !turnOn ) {
        if( volume > 0 ) {
          volume -= 0.001;
          bgm.setVolume( volume );
        }
        if( volume <= 0 && bgm.isPlaying ) {
          bgm.stop();
        }
      }
      break;
    case 'turnOn':
      if( !turnOn ) {
        turnOn = true;
        volume = 0.3;
        bgm.setVolume( volume );
        bgm.play();
      }
      break;
    case 'turnOff':
      if( turnOn ) {
        turnOn = false;
      }
      break;
    default:
      break;
  }

  return { turnOn, volume, bgm };
};

export default adjustMusic;
