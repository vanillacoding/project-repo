import * as THREE from 'three';

var createBlast = function( playerPosition, xSpeed, ySpeed ) {
  var geometry = new THREE.BoxGeometry( 0.2, 5, 0.2 );
  var material = new THREE.MeshStandardMaterial( { color: 0x42ff00 } );
  var cube = new THREE.Mesh( geometry, material );
  cube.position.set( playerPosition.x, playerPosition.y, playerPosition.z );
  cube.rotation.x = ( ySpeed / 20 - 0.5 ) * Math.PI;
  cube.rotation.z = -xSpeed / 20 * Math.PI;
  cube.direction = new THREE.Vector2();
  cube.direction.x = xSpeed;
  cube.direction.y = ySpeed;
  return cube;
}

export default createBlast;
