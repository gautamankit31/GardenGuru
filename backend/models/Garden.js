const mongoose = require("mongoose");

const gardenSchema = new mongoose.Schema({
  // user: { 
  //   type: mongoose.Schema.Types.ObjectId, 
  //   ref: "User", 
  //   required: true 
  // },
  name: { type: String, required: true },
  plants: [{
    plant: { type: mongoose.Schema.Types.ObjectId, ref: "Plant"}, 
    nickname: { type: String },
    addedAt: { type: Date, default: Date.now }
  }],
  // reminders: [{
  //   type: { type: String, enum: ["watering", "soilChange"] },
  //   plant: { type: mongoose.Schema.Types.ObjectId, ref: "Plant" },
  //   lastAction: { type: Date },
  //   nextAction: { type: Date }
  // }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Garden", gardenSchema);
