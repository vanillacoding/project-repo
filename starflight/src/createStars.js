import * as THREE from 'three';

var createStarGeo = function() {
  var starGeo = new THREE.Geometry();

  for( var i = 0 ; i < 1000 ; i++ ) {
    var star = new THREE.Vector3(
      Math.random() * 1000 - 500,
      Math.random() * 1000 - 500,
      - Math.random() * 1000
    );
    star.velocity = 0;
    starGeo.vertices.push( star );
  }

  return starGeo;
};

var createStarMaterial = function() {
  var sprite = new THREE.TextureLoader().load( 'models/star.png' );
  return new THREE.PointsMaterial( {
    color: 0xaaaaaa,
    size: 2,
    map: sprite
  } );
};

export { createStarGeo, createStarMaterial };
