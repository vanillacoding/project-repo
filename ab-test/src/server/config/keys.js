/* eslint-disable global-require */
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./prod');
} else if (process.env.NODE_ENV === 'test') {
  module.exports = require('../../../../keys/test');
} else {
  module.exports = require('../../../../keys/keys');
}
