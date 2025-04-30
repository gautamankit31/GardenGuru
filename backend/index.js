const express=require('express');
const userRoutes=require('./routes/User');
const gardenRoutes=require('./routes/Garden');
const postRoutes=require('./routes/Post');
const profileRoutes=require('./routes/Profile');
const communityRoutes=require('./routes/Community');
const geminiRoutes=require('./routes/Gemini');
const {dbConnect}=require('./config/database');
const {cloudinaryConnect}=require('./config/cloudinary');
// require('./utils/remainderScheduler');
//gemini v dekh lena

const cors=require('cors');
const cookieParser=require('cookie-parser');
const fileUpload=require('express-fileupload');

require('dotenv').config();

const app=express();
app.use(cookieParser());
app.use(express.json());

app.use(cors({
    origin: '*',
    credentials: true,
}));

app.use(fileUpload({
    tempFileDir: '/tmp/',
    useTempFiles: true,
}));

app.use('/api/v1/auth',userRoutes);
app.use('/api/v1/profile',profileRoutes);
app.use('/api/v1/garden',gardenRoutes);
app.use('/api/v1/post',postRoutes);
app.use('/api/v1/community',communityRoutes);
app.use('/api/v1/gemini',geminiRoutes);

app.get('/',(req,res)=>{
    return res.status(200).json({message:"Welcome to GardenGuru API"});
});

const PORT=process.env.PORT || 5000;

app.listen(PORT,(err)=>{
    if(err){
        console.log(err.message);
    }
    else{
        console.log(`Server started at port ${PORT}`);
    }
})

dbConnect();
cloudinaryConnect();