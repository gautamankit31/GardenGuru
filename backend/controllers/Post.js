const Post = require("../models/Post");
const User = require("../models/User");
const Community = require("../models/Community");
const Comment = require("../models/Comment");
const {uploadFilesToCloudinary}=require("../utils/fileUploader");


//create post
const createPost = async (req, res) => {
    try {
        //fetch data
        const  userId  = req.user.id;
        const {description,communityId} = req.body;
        const image = req.files?.image || null;

        //validate
        if (!description) {
            return res.status(400).json({ message: "Please fill all fields" });
        }
        //check id user is a member of community
        const community = await Community
            .findById(communityId)
            .populate("members");
            console.log(userId,description,communityId,community.creator.toString());
        const isMember = community.members.some(member => member._id == userId);
        if (!isMember && userId != community.creator.toString()) {
            return res.status(401).json({ message: "You are not a member of this community" });
        }
        //upload image
        let imageLink="";
        if(image){
            console.log("upload image");
            const uploadDetails = await uploadFilesToCloudinary(image, process.env.FOLDER_NAME);
            console.log("upload success")
            imageLink = uploadDetails.secure_url;
        }
        console.log("image uploaded",imageLink);
        //create post
        const post = await Post.create({
          community: communityId,
          author: userId,
          content: description,
          media: imageLink,
        });

        console.log("Post created", post._id);
        //update community's posts
        community.posts.push(post._id);
        await community.save();

        console.log("Community updated with new post", community.posts);
        //send response
        res.status(200).json({
            success: true,
            message: "Post created successfully",
            post
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//delete post
const deletePost = async (req, res) => {
    try {
        //fetch data
        const userId = req.user.id;
        const { postId } = req.body;
        //validate
        if (!postId) {
            return res.status(400).json({ message: "Please fill all fields" });
        }
        //delete post
        await Post.findByIdAndDelete(postId);
        //send response
        res.status(200).json({ message: "Post deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//like post
const likePost = async (req, res) => {
    try {
        //fetch data
        const userId  = req.user.id;
        const { postId } = req.body;
        //validate
        if (!postId) {
            return res.status(400).json({ message: "Please fill all fields" });
        }
        //get post
        const post = await Post.findById(postId);
        //check if user already liked the post
        const isLiked = post.likes.some(like => like == userId);
        if (isLiked) {
            return res.status(400).json({ message: "You already liked this post" });
        }
        //like post
        post.likes.push(userId);
        await post.save();
        //send response
        res.status(200).json({ message: "Post liked successfully", post });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { createPost, deletePost, likePost };