var setKeyState = function( keyStates, event ) {
  if( event.keyCode === 68 ) {
    keyStates.right = true;
  }
  if( event.keyCode === 65 ) {
    keyStates.left = true;
  }
  if( event.keyCode === 87 ) {
    keyStates.up = true;
  }
  if( event.keyCode === 83 ) {
    keyStates.down = true;
  }
  if( event.keyCode === 82 ) {
    keyStates.startGame = true;
  }
  if( event.keyCode === 32 ) {
    keyStates.spacebar = true;
  }
  if( event.keyCode === 191 ) {
    keyStates.refill = true;
  }
  return keyStates;
}

var resetKeyState = function( keyStates, event ) {
  if( event.keyCode === 68 ) {
    keyStates.right = false;
  }
  if( event.keyCode === 65 ) {
    keyStates.left = false;
  }
  if( event.keyCode === 87 ) {
    keyStates.up = false;
  }
  if( event.keyCode === 83 ) {
    keyStates.down = false;
  }
  if( event.keyCode === 82 ) {
    keyStates.startGame = false;
  }
  if( event.keyCode === 32 ) {
    keyStates.spacebar = false;
  }
  if( event.keyCode === 191 ) {
    keyStates.refill = false;
  }
  return keyStates;
}

export { setKeyState, resetKeyState };
