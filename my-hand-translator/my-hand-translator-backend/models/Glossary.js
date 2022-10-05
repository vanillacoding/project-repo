const mongoose = require("mongoose");

const glossarySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    keywords: [{ type: String, required: true, minLength: 1, maxLength: 100 }],
    wordPairs: {
      type: Map,
      of: { type: String, minLength: 1, maxLength: 1000 },
    },
  },
  { timestamps: true },
);

const Glossary = mongoose.model("Glossary", glossarySchema);

module.exports = Glossary;
