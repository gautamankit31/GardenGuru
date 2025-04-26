const mongoose = require("mongoose");

const PlantSchema = new mongoose.Schema({
  id:{type:Number},
  name: { type: String, required: true },
  image: { type: String },
  wateringFrequency: { type: Number, default: 7 },
  soilChangeFrequency: { type: Number, default: 180 },
  lastWatered: {
    type: Date,
    default: Date.now,
  },
  lastSoilChanged: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Plant", PlantSchema);
