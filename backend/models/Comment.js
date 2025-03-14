const commentSchema = new mongoose.Schema({
    post: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
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
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }],
    replies: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    }],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  
  module.exports = mongoose.model("Comment", commentSchema);
  