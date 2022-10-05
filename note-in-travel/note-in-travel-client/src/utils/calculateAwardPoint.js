/**
 * function to calculate award point with number of favorites and messagages
 * @param {array} favorites - number of user bookmarking course
 * @param {array} messages - number of messages in the course
 * @returns award point
 */
function calculateAwardPoint(favorites = [], messages = []) {
  const favoritesPoint = favorites.length * 2 ?? 0;
  const messagesPoint = messages.length ?? 0;

  return favoritesPoint + messagesPoint;
}

export default calculateAwardPoint;
