import * as PIXI from 'pixi.js';

import videoChatSpaces from './VideoChatSpace';
import { socketApi } from '../utils/socket';

const loader = PIXI.Loader.shared;

export function imageLoader() {
  loader
    .add('park', '../images/maps/park.png')
    .add('miami', '../images/maps/miami.png')
    .add('beachUmbrellaPurple', '../images/videoChatSpaces/beachUmbrella-purple.png')
    .add('beachUmbrellaRed', '../images/videoChatSpaces/beachUmbrella-red.png')
    .add('sunbedsPurple', '../images/videoChatSpaces/sunbeds-purple.png')
    .add('sunbedsRed', '../images/videoChatSpaces/sunbeds-red.png')
    .add('blanket', '../images/videoChatSpaces/blanket.png')
    .add('blanketLarge', '../images/videoChatSpaces/blanket-large.png')
    .add('bald', '../images/characters/bald.png')
    .add('braided', '../images/characters/braided.png')
    .add('business', '../images/characters/business.png')
    .add('casual', '../images/characters/casual.png')
    .add('dress', '../images/characters/dress.png')
    .add('graduation', '../images/characters/graduation.png')
    .add('grandfather', '../images/characters/grandfather.png')
    .add('grandmother', '../images/characters/grandmother.png')
    .add('staff', '../images/characters/staff.png')
    .add('yangachi', '../images/characters/yangachi.png')
    .add('leftButton', '../images/leftButton.svg')
    .add('rightButton', '../images/rightButton.svg')
    .load();
}

export function contain(sprite, container) {
  if (sprite.x < container.x) {
    sprite.x = container.x;
  }

  if (sprite.y < container.y) {
    sprite.y = container.y;
  }

  if (sprite.x + sprite.width > container.width) {
    sprite.x = container.width - sprite.width;
  }

  if (sprite.y + sprite.height > container.height) {
    sprite.y = container.height - sprite.height;
  }
}

export function collisionDetection(player, object, isNonblocking) {
  let hit = true;

  const playerHalfWidth = player.sprite.width / 2;
  const playerHalfHeight = player.sprite.height / 2;
  const objectHalfWidth = object.width / 2;
  const objectHalfHeight = object.height / 2;

  const playerCenterX = player.sprite.x + playerHalfWidth;
  const playerCenterY = player.sprite.y + playerHalfHeight;
  const objectCenterX = object.x + objectHalfWidth;
  const objectCenterY = object.y + objectHalfHeight;

  const vx = playerCenterX - objectCenterX;
  const vy = playerCenterY - objectCenterY;

  const combinedHalfWidths = playerHalfWidth + objectHalfWidth;
  const combinedHalfHeights = playerHalfHeight + objectHalfHeight;

  if (Math.abs(vx) < combinedHalfWidths) {
    if (Math.abs(vy) < combinedHalfHeights) {
      if (player.down.isDown || player.up.isDown) {
        if (!isNonblocking) {
          player.sprite.y -= player.sprite.vy;
          player.sprite.vy = 0
        }
      }
      if (player.left.isDown || player.right.isDown) {
        if (!isNonblocking) {
          player.sprite.x -= player.sprite.vx;
          player.sprite.vx = 0
        }
      }
    } else {
      hit = false;
    }
  } else {
    hit = false;
  }

  return hit;
}

export function updateOnlineUserCoordinates(targetUser, coordinates) {
  targetUser.sprite.play();

  if (coordinates.vx > 0 && targetUser.sprite.isStanding) {
    targetUser.sprite.textures = targetUser.playerSheet.walkEast;
    targetUser.sprite.isStanding = false;
    targetUser.sprite.direction = 'east';
  } else if (coordinates.vx < 0 && targetUser.sprite.isStanding) {
    targetUser.sprite.textures = targetUser.playerSheet.walkWest;
    targetUser.sprite.isStanding = false;
    targetUser.sprite.direction = 'west';
  } else if (coordinates.vy > 0 && targetUser.sprite.isStanding) {
    targetUser.sprite.textures = targetUser.playerSheet.walkSouth;
    targetUser.sprite.isStanding = false;
    targetUser.sprite.direction = 'south';
  } else if (coordinates.vy < 0 && targetUser.sprite.isStanding) {
    targetUser.sprite.textures = targetUser.playerSheet.walkNorth;
    targetUser.sprite.isStanding = false;
    targetUser.sprite.direction = 'north';
  } else if (coordinates.vy === 0 && coordinates.vx === 0) {
    targetUser.sprite.isStanding = true;

    switch (targetUser.sprite.direction) {
      case 'west': {
        targetUser.sprite.textures = targetUser.playerSheet.standWest;
        break;
      }
      case 'north': {
        targetUser.sprite.textures = targetUser.playerSheet.standNorth;
        break;
      }
      case 'east': {
        targetUser.sprite.textures = targetUser.playerSheet.standEast;
        break;
      }
      case 'south': {
        targetUser.sprite.textures = targetUser.playerSheet.standSouth;
        break;
      }
      default: { }
    }
  }
}

export function isUserInVideoChatSpace(player, space) {
  return !player.isVideoChatParticipant && collisionDetection(player, space, true);
}

export function isUserLeaveVideoChatSpace(joinedChatSpace, player) {
  return joinedChatSpace && player.isVideoChatParticipant && !collisionDetection(player, joinedChatSpace, true);
}

export function handleKeyDown(event, player, container, previewContainer, data) {
  switch (event.code) {
    case 'Digit1': {
      if (data.isPreviewExist === false) {
        const previewSpace = new videoChatSpaces('beachUmbrellaPurple', player.newVideoChatSpaceLocationX, player.newVideoChatSpaceLocationY, null, true);

        previewContainer.addChild(previewSpace.sprite);
        data.currentPreview = previewSpace.sprite;
        data.isPreviewExist = true;
        data.selectedType = 'beachUmbrellaPurple';
      }
      break;
    }
    case 'Digit2': {
      if (data.isPreviewExist === false) {
        const previewSpace = new videoChatSpaces('beachUmbrellaRed', player.newVideoChatSpaceLocationX, player.newVideoChatSpaceLocationY, null, true);

        previewContainer.addChild(previewSpace.sprite);
        data.currentPreview = previewSpace.sprite;
        data.isPreviewExist = true;
        data.selectedType = 'beachUmbrellaRed';
      }
      break;
    }
    case 'Digit3': {
      if (data.isPreviewExist === false) {
        const previewSpace = new videoChatSpaces('sunbedsPurple', player.newVideoChatSpaceLocationX, player.newVideoChatSpaceLocationY, null, true);

        previewContainer.addChild(previewSpace.sprite);
        data.currentPreview = previewSpace.sprite;
        data.isPreviewExist = true;
        data.selectedType = 'sunbedsPurple';
      }
      break;
    }
    case 'Digit4': {
      if (data.isPreviewExist === false) {
        const previewSpace = new videoChatSpaces('sunbedsRed', player.newVideoChatSpaceLocationX, player.newVideoChatSpaceLocationY, null, true);

        previewContainer.addChild(previewSpace.sprite);
        data.currentPreview = previewSpace.sprite;
        data.isPreviewExist = true;
        data.selectedType = 'sunbedsRed';
      }
      break;
    }
    case 'Minus': {
      if (data.isPreviewExist === false) {
        const previewSpace = new videoChatSpaces('blanket', player.newVideoChatSpaceLocationX, player.newVideoChatSpaceLocationY, null, true);

        previewContainer.addChild(previewSpace.sprite);
        data.currentPreview = previewSpace.sprite;
        data.isPreviewExist = true;
        data.selectedType = 'blanket';
      }
      break;
    }
    case 'Equal': {
      if (data.isPreviewExist === false) {
        const previewSpace = new videoChatSpaces('blanketLarge', player.newVideoChatSpaceLocationX, player.newVideoChatSpaceLocationY, null, true);

        previewContainer.addChild(previewSpace.sprite);
        data.currentPreview = previewSpace.sprite;
        data.isPreviewExist = true;
        data.selectedType = 'blanketLarge';
      }
      break;
    }
    case 'Escape': {
      if (data.isPreviewExist) {
        previewContainer.removeChild(data.currentPreview);
        data.currentPreview = null;
        data.isPreviewExist = false;
      }
      break;
    }
    case 'Space': {
      if (data.isPreviewExist) {
        previewContainer.removeChild(data.currentPreview);
        data.currentPreview = null;
        data.isPreviewExist = false;

        const newSpace = new videoChatSpaces(data.selectedType, player.newVideoChatSpaceLocationX, player.newVideoChatSpaceLocationY);
        container.addChild(newSpace.sprite);

        socketApi.setVideoChatSpace({
          type: newSpace.sprite.type,
          x: newSpace.sprite.x,
          y: newSpace.sprite.y,
          spaceId: newSpace.sprite.spaceId,
        });
      }
      break;
    }
    default: { }
  }
}
