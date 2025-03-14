const mongoose = require("mongoose");

const PlantSchema = new mongoose.Schema({
  id:{type:Number},
  name: { type: String, required: true },
  image: { type: String },
  wateringFrequency: { type: Number, default: 7 },
  soilChangeFrequency: { type: Number, default: 180 },
});

module.exports = mongoose.model("Plant", PlantSchema);
