const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: {
        type: Array,
        required: true
    }
});

module.exports = mongoose.model('Category', categorySchema);
