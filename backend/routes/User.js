const express=require('express');
const router=express.Router();

const {
    login,
    signup,
    sendOTP,
    changePassword,
}=require('../controllers/Auth');

const {
    resetPasswordToken,
    resetPassword,
}=require('../controllers/ResetPassword');

const {auth}=require('../middlewares/auth');

//route for login signup auth

router.post('/login',login);

router.post('/signup',signup);

router.post('/sendotp',sendOTP);

router.put('/changepassword',auth,changePassword);

//for reset password

router.post('/reset-password-token',resetPasswordToken);

router.post('/reset-password',resetPassword);

module.exports=router;