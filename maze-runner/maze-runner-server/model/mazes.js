const mongoose = require('mongoose');

const MazeSchema = new mongoose.Schema(
  {
    algorithms: {
      type: [String],
      required: 'Maze algorithms should be provided.',
    },
    block: {
      type: [[Number]],
      required: 'Maze block should be provided.',
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Maze', MazeSchema);
