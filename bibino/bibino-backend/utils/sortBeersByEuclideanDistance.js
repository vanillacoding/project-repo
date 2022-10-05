const getEuclideanDistance = require("./getEuclideanDistance");
/**
 * sort beers by euclidean distance
 * @param {Object} target - target object to get euclidean distance
 * @param {[Beer]} beers - beer array
 * @returns {[Beer]} return sorted beers by euclidean distance
 */
const sortBeersByEuclideanDistance = (target, beers) => {
  beers.forEach((beer) => {
    beer.distance = getEuclideanDistance(
      target.averageBody,
      target.averageAroma,
      target.averageSparkling,
      beer.averageBody,
      beer.averageAroma,
      beer.averageSparkling
    );
  });

  return beers.sort((a, b) => a.distance - b.distance);
};

module.exports = sortBeersByEuclideanDistance;
