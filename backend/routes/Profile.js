const express=require('express');
const router=express.Router();
const {auth,isAdmin,isUser}=require('../middlewares/auth');

const {
    updateProfile,
    deleteAccount,
    updateDisplayPicture
}=require('../controllers/Profile');

router.delete('/deleteProfile',auth,deleteAccount);
router.put('/updateProfile',auth,updateProfile);
router.put('/updateDisplayPicture',auth,updateDisplayPicture);

module.exports=router;