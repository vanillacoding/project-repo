const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;
const { NotFoundError } = require('../../lib/errors');

function validateObjectId(req, _, next) {
  for (const id of Object.values(req.params)) {
    if (!ObjectId.isValid(id)) {
      return next(new NotFoundError());
    }
  }

  return next();
}

module.exports = validateObjectId;
