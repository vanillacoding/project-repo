import AREAS from "../constants/areas";

/**
 * function to check specific area
 * @param {number} x - x axis index of 3D
 * @param {number} z - z axis index of 3D
 * @returns object having status of the area and methods
 */
function checkArea(x, z) {
  const area = AREAS[z][x];

  area.position = [x, z];
  area.toggle = toggle;

  function toggle() {
    this.isOccupied = !this.isOccupied;

    return this;
  }

  return area;
}

export default checkArea;
