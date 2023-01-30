const { Schema, model } = require("mongoose");

const ERROR = require("../constants/error");

const projectSchema = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      maxLength: [50, ERROR.MORE_THAN_MAXLENGTH],
      required: true,
    },
    htmlFile: {
      type: String,
      default: "",
    },
    cssFile: {
      type: String,
      default: "",
    },
    jsFile: {
      type: String,
      default: "",
    },
    deployLink: {
      type: String,
      default: "",
    },
    deployedAt: {
      type: Date,
      default: undefined,
    },
  },
  { timestamps: true },
);

const Project = model("Project", projectSchema);

module.exports = Project;
