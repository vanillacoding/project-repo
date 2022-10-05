/**
 * handle all the error in this handler
 * @param {error} error - error from previous middlewares
 * @param {incomingMessage} request - request from client
 * @param {serverresponse} response - response from server
 * @returns {undefined} does not have any return value
 */
const handleGlobalError = (err, req, res) => {
  res.status(err.statusCode || 500);
  res.json({ error: err.message });
};

module.exports = handleGlobalError;
