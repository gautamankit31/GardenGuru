const OTP=require('../models/OTP');
const otpGenerator=require('otp-generator');
const bcrypt=require('bcrypt');
const User = require('../models/User');
const Profile=require('../models/Profile');
const Garden=require("../models/Garden")
const jwt=require('jsonwebtoken');
const {mailSender}=require('../utils/mailSender');
const {passwordUpdated}=require('../mail/templates/passwordUpdate');
require('dotenv').config();

const generateOTP=async()=>{
    const otp=otpGenerator.generate(6,{
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars: false
    });

    const existingOTP=await OTP.findOne({otp});

    if(existingOTP){
        return generateOTP();
    }

    return otp;
}

const sendOTP=async(req,res,next)=>{
    try{
        //fetch email
        const {email}=req.body;
        console.log(email);
        //validate
        const isUserPresent=await User.findOne({email:email});

        if(isUserPresent){
            return res.status(401).json({
                success:false,
                message:"User already registered"
            })
        }
        //generate otp
        const otp=await generateOTP();

        //create entry otp in db
        await OTP.create({email,otp});

        return res.status(200).json({
            success:true,
            message:"OTP sent successfully",
            otp
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while sending OTP"
        })
    }
}

const signup=async(req,res,next)=>{
    try{
        //fetch data
        const {firstName,lastName,email,password,confirmPassword,otp,accountType,pincode}=req.body;

        //validate
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp || !accountType || !pincode){
            return res.status(400).json({
                success:false,
                message:"Please fill all the details"
            })
        }

        if(password != confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password and Confirm Password are different",
            })
        }

        //check if user already exists
        const isUserPresent=await User.findOne({email:email});
        
        if(isUserPresent){
            return res.status(401).json({
                success:false,
                message:"User already registered"
            })
        }

        //verify otp
        const recentOtp=OTP.find({email: email}).sort({createdAt: -1}).limit(1);

        if(recentOtp.length == 0) {
            return res.status(404).json({
                success: false,
                message: "OTP Not Found"
            })
        }
        
        if(otp !== recentOtp[0].otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            })
        }

        //hash password

        const hashedPassword=await bcrypt.hash(password,10);
        //get profile ref
        const profileDetails=await Profile.create({
            gender:null,
            dateOfBirth: null,
            about: null,
            contactNumber: null,
        })
        //create garden
        const userGarden=await Garden.create({
            name:`${firstName} Garden`,
            plants:[],
            reminders:[]
        })
        //create user
        const user=await User.create({
            firstName,
            lastName,
            email,
            password:hashedPassword,
            accountType,
            additionalDetails:profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        })

        res.status(200).json({
            success: true,
            message: "User is registered successfully",
            user: user,
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while signing up"
        })
    }
}

const login=async(req,res)=>{
    try {
    //fetch data
    const { email, password } = req.body;

    //validate
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the details",
      });
    }
    //check user is registered or not
    const user=await User.findOne({email:email});

    if(!user){
        return res.status(401).json({
            success:false,
            message:"User not registered"
        });
    }

    //comparre password
    const isMatch=await bcrypt.compare(password,user.password);

    if(!isMatch){
        return res.status(401).json({
            success:false,
            message:"Invalid credentials"
        });
    }

    //generate token
    const payload = {
        email: user.email,
        id: user._id,
        accountType: user.accountType,
    }
    const token=jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn:"2h"
    });

    user.token=token;
    user.password=undefined;

    const options={
        expire: Date.now() + 3 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }

    res.cookie("token", token, options).status(200).json({
        success: true,
        message: "User logged in successfully",
        user: user,
        token:token
    })

    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Login failure, please try again",
      });
    }
}

const changePassword=async(req,res)=>{
    try{
        //get user data from req.user as it came from middleware auth added by login
        const userDetails=req.user;
        //fetch data
        const {oldPassword,newPassword,confirmPassword}=req.body;

        //validate
        if(!oldPassword || !newPassword || !confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Please fill all the details"
            })
        }

        if(newPassword != confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password and Confirm Password are different",
            })
        }

        //validate old pass
        const isPasswordMatch=await bcrypt.compare(oldPassword,userDetails.password);
        
        if(oldPassword === newPassword){
			return res.status(400).json({
				success: false,
				message: "New Password cannot be same as Old Password",
			});
		}

        if(!isPasswordMatch){
            return res.status(401).json({
                success:false,
                message:"Invalid old password"
            })
        }

        //hash and update password
        const encryptedPassword = await bcrypt.hash(newPassword, 10);
		const updatedUserDetails = await User.findByIdAndUpdate(
			req.user.id,
			{ password: encryptedPassword },
			{ new: true }
		);

        //send success email
        try {
			const emailResponse = await mailSender(
				updatedUserDetails.email,
				"GardenGuru- Password Updated",
				passwordUpdated(
					updatedUserDetails.email,
					`Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
				)
			);
			console.log("Email sent successfully:", emailResponse.response);
		} catch (error) {
			// If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
			console.error("Error occurred while sending email:", error);

			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
		}

		// Return success response
		return res.status(200).json({ 
            success: true, 
            message: "Password updated successfully" 
        });

    }catch(error){
		console.error("Error occurred while updating password:", error);
		return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
		});
    }
}

module.exports={sendOTP,signup,login,changePassword}