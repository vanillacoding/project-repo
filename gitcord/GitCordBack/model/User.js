const mongoose = require("mongoose");

const User = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true,
    validate: {
      validator: function(v) {
        return v.match(/\w+@\w+.\w+/g);
      },
      message: props => `${props.value} is not a valid Email!`
    }
  },
  password: {
    type: String
  },
  name: {
    type: String,
    require: true
  },
  documents: {
    type: [{
      type: mongoose.Types.ObjectId,
      ref: "Document"
    }],
    default: []
  },
  refreshAuth: {
    type: String,
    default: ""
  }
});

module.exports = mongoose.model("User", User);
