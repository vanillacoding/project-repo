import * as THREE from 'three';

export function getSphereList(logList, geometry) {
  return logList.map((log, index) => {
    const material = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(log.color),
      envMapIntensity: 0.4,
      clearcoat: 0.8,
      clearcoatRoughness: 0,
    });

    const sphere = new THREE.Mesh(geometry, material);
    const zPosition = log.position;

    sphere.position.y = index * 3;
    sphere.position.z = zPosition * 5;

    return sphere;
  });
}

export function getLineInfoList(logList) {
  return logList
    .map((log, index) =>
      log.parents.map((parent) => {
        const parentIndex = logList.findIndex(
          (targetLog) => targetLog.hash === parent,
        );

        const color =
          log.position > logList[parentIndex].position
            ? log.color
            : logList[parentIndex].color;

        return { start: parentIndex, to: index, color };
      }),
    )
    .flat();
}

function getVectors(startPoint, endPoint) {
  const points = [];

  points.push(startPoint);
  if (startPoint.z > endPoint.z) {
    points.push(
      new THREE.Vector3(startPoint.x, endPoint.y - 0.5, startPoint.z),
    );
  } else if (startPoint.z < endPoint.z) {
    points.push(
      new THREE.Vector3(startPoint.x, startPoint.y + 0.5, endPoint.z),
    );
  }
  points.push(endPoint);

  return points;
}

export function getLineList(lineInfoList, sphereList) {
  return lineInfoList.map((lineInfo) => {
    const startPoint = sphereList[lineInfo.start].position;
    const endPoint = sphereList[lineInfo.to].position;

    const points = getVectors(startPoint, endPoint);

    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
    const lineMaterial = new THREE.LineBasicMaterial({
      color: lineInfo.color,
    });

    return new THREE.Line(lineGeometry, lineMaterial);
  });
}

export const addText = (text, hash, fontSize, color) => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  context.font = `${fontSize}px Arial`;

  const textWidth = 4000;
  const textHeight = 100;

  canvas.width = textWidth;
  canvas.height = textHeight;

  context.font = `bold ${fontSize}px Arial`;
  context.textBaseline = 'middle';
  context.fillStyle = color;
  context.fillText(text, textWidth / 2, textHeight / 2);

  const texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;

  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    side: THREE.DoubleSide,
  });

  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(textWidth / 60, textHeight / 60, 10, 10),
    material,
  );
  mesh.rotation.y = 1.5;

  return mesh;
};

export function getCommitList(logList) {
  return logList.map((log, index) => {
    const text = addText(
      `${log.hash.slice(0, 7)}   ${log.message}`,
      log.hash,
      60,
      log.color,
    );

    const posY = index;

    text.position.set(0, posY * 3, -10);

    return text;
  });
}

export function SpotLight(color, xyz) {
  this.light = new THREE.SpotLight(color);
  this.light.position.set(...xyz);
  this.light.castShadow = true;

  this.light.shadow.mapSize.width = 1024;
  this.light.shadow.mapSize.height = 1024;

  this.light.shadow.camera.near = 500;
  this.light.shadow.camera.far = 4000;
  this.light.shadow.camera.fov = 30;
}

export default {
  getSphereList,
  getLineInfoList,
  getLineList,
  SpotLight,
};
