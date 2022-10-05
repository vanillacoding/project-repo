import * as THREE from 'three';
import updateAsteroids from './updateAsteroids';

var checkCollision = function( playerGroup, asteroids ) {
  var collidableMeshList = [];
  var originPoint = playerGroup.position.clone();

  asteroids.children.forEach( function( asteroid ) {
    if( asteroid.position.z > -300 ) {
      if( asteroid.position.distanceTo(playerGroup.position) < 150 ) {
        collidableMeshList.push(asteroid.children[0]);
      }
    }
  } );

  var initializedAsteroids = [];
  if( collidableMeshList.length > 0 ) {
    for( var i = 0; i < 3; i++ ) {
      var collisionVertices = playerGroup.children[i].geometry.vertices;

      for( var vertexIndex = 0; vertexIndex < collisionVertices.length; vertexIndex++ ) {
        var localVertex = collisionVertices[vertexIndex].clone();
        var globalVertex = localVertex.applyMatrix4( playerGroup.children[i].matrix );
        var directionVector = globalVertex.sub( playerGroup.children[i].position );

        var ray = new THREE.Raycaster( originPoint, directionVector.clone().normalize() );
        var collisionResults = ray.intersectObjects( collidableMeshList );
        if( collisionResults.length > 0 ) {
          for( var j = 0; j < collisionResults.length; j++) {

            if( collisionResults[j].distance < directionVector.length()
              && initializedAsteroids.indexOf( collisionResults[j].object.uuid ) === -1 ) {
              updateAsteroids( collisionResults[j].object.parent, 'Hit' );
              initializedAsteroids.push( collisionResults[j].object.uuid );
              return collisionResults[j].point;
            }
          }
        }
      }
    }
  }
};

export default checkCollision;
