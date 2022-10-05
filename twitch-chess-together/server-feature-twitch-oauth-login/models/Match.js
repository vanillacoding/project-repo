const mongoose = require('mongoose');

const schemaOption = {
  timestamps: true,
};

const matchSchema = new mongoose.Schema(
  {
    gameId: { type: String, required: true, unique: true, index: true },
    status: { type: String, required: true, default: 'initialized' },
    winner: { type: String, default: null },
    firstTurn: { type: Number, required: true },
    players: [
      {
        id: String,
        displayName: String,
        login: String,
        profileImageUrl: String,
        email: String,
      },
    ],
  },
  schemaOption
);

module.exports = mongoose.model('Match', matchSchema);
