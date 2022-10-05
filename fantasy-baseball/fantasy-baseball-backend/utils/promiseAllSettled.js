const filterRejectedPromises = async (promises) => {
  if (!Array.isArray(promises)) {
    throw new Error("promises is must be array");
  }

  const refineResolvedPromise = (value) => (
    { result: true, value }
  );
  const refineRejectedPromise = (value) => (
    { result: false, value }
  );

  const result = await Promise.all(
    promises.map((promise) => (
      promise
        .then(refineResolvedPromise)
        .catch(refineRejectedPromise)
    ))
  );

  return result;
};

module.exports = filterRejectedPromises;
