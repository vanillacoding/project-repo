const mongoose = require('mongoose');
const Note = require('../models/Note');

class NoteService {
  async createNote(user_id, branch_id, blocks) {
    try {
      return await Note.create({
        created_by: user_id,
        parent: mongoose.Types.ObjectId(branch_id),
        blocks
      });
    } catch (err) {
      throw err;
    }
  }

  async getNoteByMongooseId(id) {
    try {
      return await Note.findById(id);
    } catch (err) {
      throw err;
    }
  }

  async getNoteByMongooseIdAndUpdate(id, note) {
    try {
      return await Note.findByIdAndUpdate(
        id,
        note,
        { new: true }
      );
    } catch (err) {
      throw err;
    }
  }

  async deleteNote(id) {
    try {
      await Note.findByIdAndDelete(id);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = NoteService;
