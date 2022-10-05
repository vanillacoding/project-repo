const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    author: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    date: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Comment', commentSchema);
