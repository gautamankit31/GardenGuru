const mongoose = require("mongoose");

const communitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  members: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }],
  posts: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    }],
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports=mongoose.model("Community",communitySchema);
