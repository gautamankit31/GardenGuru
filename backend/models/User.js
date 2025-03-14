const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  accountType: {
    type: String,
    required: true,
    enum: ["Admin", "User"],
  },
  additionalDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
    required: true,
  },
  location: {
    pincode: { type: Number },
    city: { type: String, trim: true },
    country: { type: String },
    coordinates: { lat: Number, lon: Number },
  },
  garden: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Garden",
    required: true,
  },
  createdCommunities: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Community" },
  ],
  joinedCommunities: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Community" },
  ],
  token: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
  image: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
