const talkToGemini =require('../controllers/Gemini');
const express=require('express');
const router=express.Router();

const {auth}=require('../middlewares/auth');

router.post('/talktogemini',auth,talkToGemini);

module.exports=router;