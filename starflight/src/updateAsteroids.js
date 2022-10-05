var updateAsteroids = function( asteroids, hit ) {
  var updateAsteroid = function( asteroid, initiate ) {
    if( asteroid.position.z > 200 || initiate ) {
      asteroid.scale.set(
        ( Math.random() * 10 / 3 + 1 ) * 21.2,
        ( Math.random() * 10 / 3 + 1 ) * 21.2,
        ( Math.random() * 10 / 3 + 1 ) * 21.2
      );
      asteroid.position.set(
        Math.random() * 1000 - 500,
        Math.random() * 1000 - 500,
        -4000
      );
      asteroid.velocity = Math.random() + 10;
    } else {
      asteroid.position.x += asteroid.xyMove.x;
      asteroid.position.y += asteroid.xyMove.y;
      asteroid.position.z += asteroid.velocity;
      asteroid.rotation.x += asteroid.rotate.x;
      asteroid.rotation.y += asteroid.rotate.y;
      asteroid.rotation.z += asteroid.rotate.z;
      asteroid.rotation.x = checkOverRotated( asteroid.rotation.x );
      asteroid.rotation.y = checkOverRotated( asteroid.rotation.y );
      asteroid.rotation.z = checkOverRotated( asteroid.rotation.z );

    }
  }

  if( hit ) {
    updateAsteroid( asteroids, true );
  } else {
    asteroids.children.forEach( function( asteroid ) {
      updateAsteroid( asteroid, false );
    } );
  }

};

function checkOverRotated( rotated ) {
  if( rotated >= 2 * Math.PI ) {
    rotated -= 2 * Math.PI;
  }
  return rotated;
}

export default updateAsteroids;
