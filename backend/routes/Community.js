const express=require('express');
const router=express.Router();

const {auth,isAdmin,isUser}=require('../middlewares/auth');
const {
    createCommunity,
    joinCommunity,
    leaveCommunity,
    deleteCommunity,
    updateCommunity,
    getCommunity,
    getAllCommunities,
    getMembers,
    getPosts,
}=require('../controllers/Community');

router.post('/createCommunity',auth,createCommunity);
router.post('/joinCommunity',auth,joinCommunity);
router.delete('/leaveCommunity',auth,leaveCommunity);
router.delete('/deleteCommunity',auth,deleteCommunity);
router.put('/updateCommunity',auth,updateCommunity);
router.get('/getCommunity',auth,getCommunity);
router.get('/getAllCommunities',auth,getAllCommunities);
router.get('/getMembers',auth,getMembers);
router.get('/getPosts',auth,getPosts);

module.exports=router;
