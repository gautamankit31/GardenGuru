const mongoose = require('mongoose');
const User=require('../models/User');
const Profile=require('../models/Profile');
const Community=require('../models/Community');
const Garden=require('../models/Garden');

const {uploadFilesToCloudinary}=require('../utils/fileUploader')

const updateProfile=async(req,res,next)=>{
    try{
        const { dateOfBirth = "", about = "", contactNumber="",firstName,lastName,gender="" } = req.body;
        const id=req.user.id;

        //find profile
        const user=await User.findById(id);
        const profile=await Profile.findById(user.additionalDetails);

        //update profile
        user.firstName=firstName||user.firstName;
        user.lastName=lastName||user.lastName;
        profile.dateOfBirth=dateOfBirth||profile.dateOfBirth;
        profile.about=about||profile.about;
        profile.contactNumber=contactNumber||profile.contactNumber;
        profile.gender=gender||profile.gender;

        //save the profile
        await profile.save();
        await user.save();

        const userDetails = await User.findById(id).populate('additionalDetails');
        // return response
        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            userDetails,
        })
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Something went wrong while updating the profile"
        })
    }
}

const deleteAccount = async(req, res) => {
    try {
        const id = req.user.id;
        const userDetails = await User.findById(id);

        if(!userDetails) {
            res.status(400).json({
                success: false,
                message: "User not found"
            })
        }
        await Profile.findByIdAndDelete(userDetails.additionalDetails);
        await Community.deleteMany({ members: id });
        await Garden.deleteMany({ owner: id });

        await User.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "User cannot delete successully",
        });
    }
}

const updateDisplayPicture = async(req, res) => {
    try {
        const id = req.user.id;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        const { image } = req.files;
        console.log(image);
        if (!image) {
            return res.status(404).json({
                success: false,
                message: "Image not found",
            });
        }
        
        const uploadDetails = await uploadFilesToCloudinary(
            image,
            process.env.FOLDER_NAME
        );

       
        console.log(uploadDetails);

        const updatedImage = await User.findByIdAndUpdate({_id:id},{image:uploadDetails.secure_url},{ new: true });

        res.status(200).json({
            success: true,
            message: "Image updated successfully",
            data: updatedImage,
        });
		
	} catch (error) {
        console.log(error);
		return res.status(500).json({
            success: false,
            message: error.message,
        });
		
	}

}

module.exports = {
    updateProfile,
    deleteAccount,
    updateDisplayPicture
}