import * as THREE from 'three';

var createDirectLight = function() {
  var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.9 );
  directionalLight.position.set( 100, 200, 100 );
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 5120;
  directionalLight.shadow.mapSize.height = 5120;
  directionalLight.shadow.camera.bottom = -200;
  directionalLight.shadow.camera.left = -200;
  directionalLight.shadow.camera.top = 80;
  directionalLight.shadow.camera.right = 80;

  return directionalLight;
};

export default createDirectLight;
