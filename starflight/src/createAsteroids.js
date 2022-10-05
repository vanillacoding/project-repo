import * as THREE from 'three';
import { OBJLoader } from './libs/OBJLoader';


var createAsteroids = function() {
  var asteroids = new THREE.Object3D();

  for( var i = 0; i < 400; i++ ) {
    var loader = new OBJLoader()
    var type = Math.floor( Math.random() * 10 % 3 );
    loader.load('models/asteroid' + type + '.obj',
      function( asteroid ) {
        var texture = new THREE.TextureLoader().load( 'models/asteroidTexture.jpg' );
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set( 2, 2 );

        asteroid.traverse( function ( child ) {
            if ( child instanceof THREE.Mesh ) {
                child.material = new THREE.MeshLambertMaterial( { side: THREE.DoubleSide });
                child.material.map = texture;
            }
        } );
        asteroid.scale.set(
          ( Math.random() * 10 / 3 + 1 ) * 21.2,
          ( Math.random() * 10 / 3 + 1 ) * 21.2,
          ( Math.random() * 10 / 3 + 1 ) * 21.2
        );
        asteroid.position.set(
          Math.random() * 1000 - 500,
          Math.random() * 1000 - 500,
          -4000 / Math.random()
        );
        asteroid.velocity = Math.random() + 10;
        asteroid.rotate = new THREE.Vector3(
          Math.random() * 0.02,
          Math.random() * 0.02,
          Math.random() * 0.02
        );
        asteroid.xyMove = new THREE.Vector2(
          ( Math.random() - 0.5 ) * 3,
          ( Math.random() - 0.5 ) * 3
        );
        asteroids.add( asteroid );
      }
    );
  }
  return asteroids;
}

export default createAsteroids;
