const Comment = require('../models/Comment');
const Post = require('../models/Post');

//add comment 
exports.addComment = async (req, res) => {
    try {
        const { postId, comment } = req.body;
        const userId = req.user.id;

        const newComment = new Comment({
            post: postId,
            author: userId,
            content: comment,
        });

        const savedComment = await newComment.save();

        await Post.findByIdAndUpdate(postId, {
            $push: { comments: savedComment._id },
        });

        res.status(201).json({
            success: true,
            message: "Comment added successfully",
            comment: savedComment,});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete comment
exports.deleteComment = async (req, res) => {
    try {
        const { commentId } = req.body;
        const userId = req.user.id;

        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        if (comment.author.toString() !== userId) {
            return res.status(403).json({ error: "Unauthorized" });
        }

        await Comment.findByIdAndDelete(commentId);

        await Post.findByIdAndUpdate(comment.post, {
            $pull: { comments: commentId },
        });

        res.status(200).json({
            success:true,
             message: "Comment deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Like comment
exports.likeComment = async (req, res) => {
    try {
        const { commentId } = req.body;
        const userId = req.user.id;

        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        if (comment.likes.includes(userId)) {
            return res.status(400).json({ error: "Already liked" });
        }

        comment.likes.push(userId);
        await comment.save();

        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};