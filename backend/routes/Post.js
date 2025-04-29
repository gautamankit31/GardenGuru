const express=require('express');
const router=express.Router();

const {auth,isAdmin,isUser}=require('../middlewares/auth');


const {createPost,
    deletePost,
    likePost,
    unlikePost
} = require("../controllers/Post");

const {
   addComment,
   deleteComment,
   likeComment
}=require('../controllers/Comments');

router.post('/createPost',auth,createPost);
router.delete('/deletePost',auth,deletePost);
router.put('/likePost',auth,likePost);
router.put('/unlikePost',auth,unlikePost);

router.post('/addComment',auth,addComment);
router.delete('/deleteComment',auth,deleteComment);
router.put('/likeComment',auth,likeComment);

module.exports=router;
