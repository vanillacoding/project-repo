/**
 * chain query and lean method with options
 * @param {Query} query - query to chain lean method
 * @param {options} options - options for lean method
 * @returns {Query} return query chaining lean method with options
 */
const leanQueryByOptions = (
  query,
  options = {
    virtuals: [
      "averageRating",
      "averageBody",
      "averageAroma",
      "averageSparkling",
    ],
  }
) => {
  return query.lean(options);
};

module.exports = leanQueryByOptions;
