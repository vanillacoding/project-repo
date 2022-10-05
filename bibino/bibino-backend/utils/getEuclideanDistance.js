/**
 * generate recommendation score
 * @param {Number} xBase - x coordinate of base object
 * @param {Number} yBase - y coordinate of base object
 * @param {Number} zBase - z coordinate of base object
 * @param {Number} x - x coordinate of object
 * @param {Number} y - y coordinate of object
 * @param {Number} z - z coordinate of object
 * @returns {Number} return the distance of 2 points
 */
const getEuclideanDistance = (xBase, yBase, zBase, x, y, z) => {
  return Math.abs(
    Math.sqrt((xBase - x) ** 2 + (yBase - y) ** 2 + (zBase - z) ** 2)
  );
};

module.exports = getEuclideanDistance;
