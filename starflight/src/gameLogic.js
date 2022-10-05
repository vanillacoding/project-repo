import * as THREE from 'three';
import { OBJLoader } from './libs/OBJLoader';
import documents from './documents';
import createDirectLight from './createDirectLight';
import createPlayer from './createPlayer';
import createAsteroids from './createAsteroids';
import createBlast from './createBlast';
import { createStarGeo, createStarMaterial } from './createStars';
import updateStars from './updateStars';
import updateAsteroids from './updateAsteroids';
import updateBlast from './updateBlast';
import adjustMusic from './adjustMusic';
import checkCollision from './checkCollision';
import { setKeyState, resetKeyState } from './setKeyStates';

var gameLogic = function() {
  var container, camera, scene, renderer, hemiLight, doc;
  var gameState = 'gameOver', gameStartDelay = 150;
  var gameScore = 0, shield = 100, hitFlashCounter = 0;
  var starGeo, asteroids, playerGroup, shipLoaded = false;
  var blasts = [], blasterDelay = 15;
  var gameScore = 0, scoreTimer = 0, shieldPoint = 30, shieldRechargeCounter, shieldMax = 35;
  var xMaxSpeed = 1.8, yMaxSpeed = 1.4, xSpeed = 0, ySpeed = 0;
  var xSpeedDecrease = 0.06, xSpeedIncrease = 0.1, ySpeedDecrease = 0.04, ySpeedIncrease = 0.08;
  var particleGeometry, particleCount = 100, explosionPower = 1.06, particles, explosionSound;
  var clock = new THREE.Clock();
  var keyStates = {
    right: false,
    left: false,
    up: false,
    down: false,
    startGame: false,
    spacebar: false,
    refill: false
  }
  var music = {
    turnOn: false,
    volume: 0,
    bgm: null
  }

  init();

  function init() {
    container = document.getElementById( 'root' );
    document.body.appendChild( container );

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x000000 );
    scene.fog = new THREE.FogExp2( 0x000000, 0.0004 );
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 4000 );
    playerGroup = createPlayer( shipLoad );
    starGeo = createStarGeo();
    asteroids = createAsteroids();
    addExplosion();

    scene.add( new THREE.HemisphereLight( 0xffffff, 0x444444, 0.8 ) );
    scene.add( createDirectLight() );
    scene.add( new THREE.Points( starGeo, createStarMaterial() ));
    scene.add( asteroids );

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMap.enabled = true;

    container.appendChild( renderer.domElement );
    window.addEventListener( 'resize', onWindowResize, false );
    window.addEventListener( 'keydown', setPressedKey );
    window.addEventListener( 'keyup', resetPressedKey );
    doc = documents();

    // create an AudioListener and add it to the camera
    var listener = new THREE.AudioListener();
    camera.add( listener );

    music.bgm = new THREE.Audio( listener );
    var audioLoader = new THREE.AudioLoader();
    audioLoader.load( 'bensound-evolution.mp3', function( buffer ) {
    	music.bgm.setBuffer( buffer );
    	music.bgm.setLoop( true );
    	music.bgm.setVolume( 0 );
    } );
    explosionSound = new THREE.Audio( listener );
    audioLoader.load( 'explosion.wav', function( buffer ) {
      explosionSound.setBuffer( buffer );
      explosionSound.setLoop( false );
      explosionSound.setVolume( 0.4 );
    } );

    window.onload = animate();
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
  }

  function animate() {
    updateStars( starGeo );
    updateAsteroids( asteroids );
    updateHitFlash( 'update' );
    music = adjustMusic( music, 'adjustVolume' );

    if( shipLoaded ) {
      if( gameState === 'gameOver' ) {
        doExplosionLogic();

        if( keyStates.startGame ) {
          doc.title.style.opacity = 0;
          doc.gameOver.style.opacity = 0;
          doc.shield.style.opacity = 1;
          doc.score.style.opacity = 1;
          doc.scoreValue.innerHTML = 0;
          gameScore = 0;
          shieldPoint = 30;
          shieldRechargeCounter = 0;
          updateShieldUI();
          playerGroup.position.set( 0, 0, -25 );
          music = adjustMusic( music, 'turnOn' );
          scene.add( playerGroup );
          gameState = 'ready';
        }
      }

      if( gameState === 'ready' ) {
        doExplosionLogic();
        gameStartDelay--;
        if( gameStartDelay <= 0 ) {
          gameStartDelay = 150;
          gameState = 'playing';
        }
      }

      if( gameState === 'playing' ) {
        if( shieldPoint <= shieldMax ) {
          shieldRechargeCounter++;
          if( shieldRechargeCounter >= 120 ) {
            shieldRechargeCounter = 0;
            shieldPoint++;
            updateShieldUI();
          }
        }
        if( keyStates.refill ) {
          shieldRechargeCounter = 0;
          shieldPoint = shieldMax;
          var shieldHTML = '';
          for( var i = 0; i < shieldPoint; i++ ) {
            shieldHTML += '|';
          }
          doc.shield.innerHTML = shieldHTML;
        }

        var explodePosition = checkCollision( playerGroup, asteroids );
        if( explodePosition ) {
          updateHitFlash( 'hit' );
          explode( explodePosition );
          if( explosionSound.isPlaying ){
            explosionSound.stop();
          }
          explosionSound.play();

          shieldPoint -= 10;
          if( shieldPoint >= 0 ) {
            updateShieldUI();
          } else {
            scene.remove( playerGroup );
            doc.gameOver.style.opacity = 1;
            doc.shield.innerHTML = '';
            music = adjustMusic( music, 'turnOff' );
            gameState = 'gameOver';
          }
        }
        doExplosionLogic();
      }

      if( gameState === 'ready' || gameState === 'playing') {
        if( keyStates.left && keyStates.right ) {
          if( xSpeed < 0 ) {
            xSpeed += xSpeedDecrease;
            if ( xSpeed > 0 ) {
              xSpeed = 0;
            }
          } else if( xSpeed > 0 ) {
            xSpeed -= xSpeedDecrease;
            if ( xSpeed < 0 ) {
              xSpeed = 0;
            }
          }
        } else {
          if( keyStates.left && playerGroup.position.x > -120 ) {
            if( xSpeed > -xMaxSpeed ) {
              xSpeed -= xSpeedIncrease;
            }
          } else if( xSpeed < 0 ) {
            xSpeed += xSpeedDecrease;
            if ( xSpeed > 0 ) {
              xSpeed = 0;
            }
          }
          if( keyStates.right && playerGroup.position.x < 120 ) {
            if( xSpeed < xMaxSpeed ) {
              xSpeed += xSpeedIncrease;
            }
          } else if( xSpeed > 0 ) {
            xSpeed -= xSpeedDecrease;
            if ( xSpeed < 0 ) {
              xSpeed = 0;
            }
          }
        }

        if( keyStates.up && keyStates.down ) {
          if( ySpeed > 0 ) {
            ySpeed -= ySpeedDecrease;
            if ( ySpeed < 0 ) {
              ySpeed = 0;
            }
          } else if( ySpeed < 0 ) {
            ySpeed += ySpeedDecrease;
            if ( ySpeed > 0 ) {
              ySpeed = 0;
            }
          }
        } else {
          if( keyStates.up && playerGroup.position.y < 40 ) {
            if( ySpeed < yMaxSpeed ) {
              ySpeed += ySpeedIncrease;
            }
          } else if( ySpeed > 0 ) {
            ySpeed -= ySpeedDecrease;
            if ( ySpeed < 0 ) {
              ySpeed = 0;
            }
          }
          if( keyStates.down && playerGroup.position.y > -40 ) {
            if( ySpeed > -yMaxSpeed ) {
              ySpeed -= ySpeedIncrease;
            }
          } else if( ySpeed < 0 ) {
            ySpeed += ySpeedDecrease;
            if ( ySpeed > 0 ) {
              ySpeed = 0;
            }
          }
        }
        if( keyStates.spacebar && blasterDelay === 20 ) {
          blasts.push( createBlast( playerGroup.position, xSpeed, ySpeed ) );
          scene.add( blasts[ blasts.length - 1 ] );
          blasterDelay = 0;
        }
        playerGroup.position.x += xSpeed;
        playerGroup.position.y += ySpeed;
        playerGroup.rotation.x = ySpeed / 20 * Math.PI;
        playerGroup.rotation.y = -xSpeed / 20 * Math.PI;
        playerGroup.rotation.z = -xSpeed / 10 * Math.PI;
        camera.rotation.x = playerGroup.position.y / 1400 * Math.PI;
        camera.rotation.y = -playerGroup.position.x / 1400 * Math.PI;
        camera.position.x = playerGroup.position.x / 1.15;
        camera.position.y = playerGroup.position.y / 1.15;

        scoreTimer++;
        if( scoreTimer >= 20 ) {
          scoreTimer = 0;
          gameScore++;
          doc.scoreValue.innerHTML = gameScore;
        }
      }

      if( blasterDelay < 20 ) {
        blasterDelay++;
      }
      if( blasts.length > 0 ) {
        for( var i = 0; i < blasts.length; i++ ) {
          updateBlast( blasts[i] );
          if( blasts[i].position.z < -2000 ) {
            blasts.splice( blasts.indexOf( blasts[i] ), 1 );
          }
        }
      }
    }

    renderer.render( scene, camera );
    requestAnimationFrame( animate );
  }

  function addExplosion() {
  	particleGeometry = new THREE.Geometry();
  	for ( var i = 0; i < particleCount; i ++ ) {
  		var vertex = new THREE.Vector3();
  		particleGeometry.vertices.push( vertex );
  	}
    var sprite = new THREE.TextureLoader().load( 'models/explosion.png' );
    var pMaterial = new THREE.ParticleBasicMaterial( {
      color: 0xffffff,
      size: Math.random() * 0.8 + 0.4,
      map: sprite,
      transparent: true
    } );
  	particles = new THREE.Points( particleGeometry, pMaterial );
  	scene.add( particles );
  	particles.visible = false;
  }

  function doExplosionLogic() {
  	if( !particles.visible ) {
      return;
    }
  	for( var i = 0; i < particleCount; i ++ ) {
  		particleGeometry.vertices[i].multiplyScalar( explosionPower );
  	}
  	if( explosionPower > 1.03 ) {
  		explosionPower -= 0.001;
  	} else {
  		particles.visible = false;
  	}
  	particleGeometry.verticesNeedUpdate = true;
  }
  function explode( explodePosition ) {
    particles.position.x = explodePosition.x;
  	particles.position.y = explodePosition.y;
  	particles.position.z = explodePosition.z;

  	for ( var i = 0; i < particleCount; i ++ ) {
  		var vertex = new THREE.Vector3();
  		vertex.x = Math.random() * 0.4 - 0.2;
  		vertex.y = Math.random() * 0.4 - 0.2;
  		vertex.z = Math.random() * 0.4 - 0.2;
  		particleGeometry.vertices[i] = vertex;
  	}
  	explosionPower = Math.random() / 4 + 1.085;
  	particles.visible = true;
  }

  function setPressedKey( event ) {
    keyStates = setKeyState( keyStates, event );
  }

  function resetPressedKey( event ) {
    keyStates = resetKeyState( keyStates, event );
  }

  function updateHitFlash( flag ) {
    if( flag === 'hit' ) {
      hitFlashCounter = 30;
      doc.hitFlash.style.opacity = 1;
    }
    if( flag === 'update' ) {
      if( hitFlashCounter <= 0 ) {
        doc.hitFlash.style.opacity = 0;
      }
      if( hitFlashCounter > 0 ) {
        hitFlashCounter--;
        doc.hitFlash.style.opacity = doc.hitFlash.style.opacity / hitFlashCounter;
      }
    }
  }

  function updateShieldUI() {
    var shieldHTML = '';
    for( var i = 0; i < shieldPoint; i++ ) {
      shieldHTML += '|';
    }
    doc.shield.innerHTML = shieldHTML;
  }

  function shipLoad( flag ) {
    if( flag === 'loaded' ) {
      shipLoaded = true;
      doc.title.style.opacity = 1;
    }
  }
};

export default gameLogic;
