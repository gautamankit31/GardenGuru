const mongoose = require("mongoose");

const gardenSchema = new mongoose.Schema({
  name: { type: String, required: true },
  plants: [{
    plant: { type: mongoose.Schema.Types.ObjectId, ref: "Plant"}, 
    nickname: { type: String },
    addedAt: { type: Date, default: Date.now },
    lastWatered: {
      type: Date,
      default: Date.now,
    },
    lastSoilChanged: {
      type: Date,
      default: Date.now,
    },
  }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Garden", gardenSchema);
