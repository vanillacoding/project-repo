/**
 *
 * @param {array} array Target Arrary for pick random element
 * @returns picked random element
 */
const pickRandom = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

export default pickRandom;
