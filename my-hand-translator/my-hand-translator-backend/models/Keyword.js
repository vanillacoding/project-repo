const mongoose = require("mongoose");

const keywordSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minLength: 1,
    maxLength: 100,
  },
  glossaries: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Glossary",
      required: true,
    },
  ],
});

const Keyword = mongoose.model("Keyword", keywordSchema);

module.exports = Keyword;
