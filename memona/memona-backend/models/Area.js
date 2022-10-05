const mongoose = require("mongoose");
const { Schema } = mongoose;

const { polygonSchema } = require("./GeoJsonSubSchemas");

const areaSchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
  location: {
    type: polygonSchema,
    required: true,
  },
});

areaSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Areas", areaSchema);
