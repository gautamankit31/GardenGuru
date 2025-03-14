const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  community: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "Community",
    required: true,
  },
  author: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  media: {
    type: String,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
  comments: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", postSchema);
