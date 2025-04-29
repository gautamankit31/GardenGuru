const Community = require("../models/Community");
const User = require("../models/User");
const Post=require("../models/Post");


//create community
const createCommunity = async (req, res) => {
    try{
        //fetch data
        const creator = req.user.id;
        const {name, description} = req.body;
        //validate
        if(!name || !creator){
            return res.status(400).json({message:"Please fill all fields"});
        }
        //check if community already exists
        const communityExists = await Community.findOne({name});
        if(communityExists){
            return res.status(400).json({message:"Community with this name already exists"});
        }
        //create community
        const community = await Community.create({name, description, creator});
        //update creator's createdCommunities
        const user = await User.findById(creator);
        user.createdCommunities.push(community._id);
        await user.save();
        //send response
        res.status(201).json({
            success:true,
            message:"Community created successfully",
             community});
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
}

//join community
const joinCommunity = async (req, res) => {
    try{
        //fetch data
        const userId=req.user.id;
        const {communityId} = req.body;
        //validate
        if(!communityId || !userId){
            return res.status(400).json({message:"Please fill all fields"});
        }
        //check if community exists
        const community = await Community.findById(communityId);
        if(!community){
            return res.status(404).json({message:"Community not found"});
        }
        //check if user exists
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        //check if user is already a member
        if(community.members.includes(userId)){
            return res.status(400).json({message:"User is already a member of this community"});
        }
        //join community
        community.members.push(userId);
        await community.save();
        //update user's joinedCommunities
        user.joinedCommunities.push(communityId);
        await user.save();
        //send response
        res.status(200).json({
            success:true,
            message:"User joined community successfully", community});
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
}

//leave community
const leaveCommunity = async (req, res) => {
    try{
        //fetch data
        const userId=req.user.id;
        const {communityId} = req.body;
        //validate
        if(!communityId || !userId){
            return res.status(400).json({message:"Please fill all fields"});
        }
        //check if community exists
        const community = await Community.findById(communityId);
        if(!community){
            return res.status(404).json({message:"Community not found"});
        }
        //check if user exists
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        //check if user is a member
        if(!community.members.includes(userId)){
            return res.status(400).json({message:"User is not a member of this community"});
        }
        //leave community
        community.members = community.members.filter(member => member != userId);
        await community.save();
        //update user's joinedCommunities
        user.joinedCommunities = user.joinedCommunities.filter(community => community != communityId);
        await user.save();
        //send response
        res.status(200).json({
            success:true,
            message:"User left community successfully"
            , community});
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
}

//delete community
const deleteCommunity = async (req, res)=>{
    try{
        //fetch data
        const userId=req.user.id;
        const {communityId,creatorID}=req.body;
        //validate
        if(!communityId){
            return res.status(400).json({message:"Please fill all fields"});
        }
        //check if community exists
        const community = await Community
        .findById(communityId)
        .populate("creator");
        if(!community){
            return res.status(404).json({message:"Community not found"});
        }
        //check if user is the creator
        if(creatorID != userId){
            return res.status(401).json({message:"You are not authorized to delete this community"});
        }
        //delete community
        await Community.findByIdAndDelete(communityId);
        //update creator's createdCommunities
        const user = await User.findById(userId);
        user.createdCommunities = user.createdCommunities.filter(community => community != communityId);
        await user.save();
        //send response
        res.status(200).json({
            success:true,
            message:"Community deleted successfully"});
    } catch(error){
        res.status(500).json({message:error.message});
    }
}

//update community
const updateCommunity = async (req, res)=>{
    try{
        //fetch data
        const userId=req.user.id;
        const {communityId, name, description} = req.body;
        //validate
        if(!communityId){
            return res.status(400).json({message:"Please fill all fields"});
        }
        //check if community exists
        const community = await Community
        .findById(communityId)
        .populate("creator");
        if(!community){
            return res.status(404).json({message:"Community not found"});
        }
        //check if user is the creator
        if(community.creator._id != userId){
            return res.status(401).json({message:"You are not authorized to update this community"});
        }
        //update community
        community.name = name || community.name;
        community.description = description || community.description;
        await community.save();
        //send response
        res.status(200).json({message:"Community updated successfully", community});
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
}

//get community
const getCommunity = async (req, res)=>{
    try{
        //fetch data
        const {communityId} = req.body;
        //validate
        if(!communityId){
            return res.status(400).json({message:"Please fill all fields"});
        }
        //check if community exists
        const community = await Community
        .findById(communityId)
        .populate("creator");
        if(!community){
            return res.status(404).json({message:"Community not found"});
        }
        //send response
        res.status(200).json({community});
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
}

//get all communities
const getAllCommunities = async (req, res)=>{
    try{
        //fetch data
        const communities = await Community.find();
        //send response
        res.status(200).json({
            success:true,
            message:"All communities fetched successfully",
            communities});
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
}

//get all members of community
const getMembers = async (req, res)=>{
    try{
        //fetch data
        const {communityId} = req.body;
        // console.log(communityId);
        //validate
        if(!communityId){
            return res.status(400).json({message:"Please fill all fields"});
        }
        //check if community exists
        const community = await Community
        .findById(communityId)
        .populate("members");
        if(!community){
            return res.status(404).json({message:"Community not found"});
        }
        //send response
        res.status(200).json({
            success:true,
            members:community.members});
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
}

//get all posts of community
const getPosts = async (req, res)=>{
    try{
        //fetch data
        const {communityId} = req.body;
        // console.log(communityId)
        //validate
        if(!communityId){
            return res.status(400).json({message:"Please fill all fields"});
        }
        //check if community exists
        const community = await Community.findById(communityId)
        .populate({
          path: "posts",
          populate: {
            path: "comments",
          },
        });
      
        if(!community){
            return res.status(404).json({
                message:"Community not found"});
        }
        //send response
        res.status(200).json({
            success:true,
            posts:community.posts});
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
}


module.exports = {
  createCommunity,
  joinCommunity,
  leaveCommunity,
  deleteCommunity,
  updateCommunity,
  getCommunity,
  getAllCommunities,
  getMembers,
  getPosts,
};

