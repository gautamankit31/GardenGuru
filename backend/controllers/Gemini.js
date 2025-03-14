// const {generateResponse} =require('../config/gemini');
// const {uploadFilesToCloudinary}=require('../utils/fileUploader')

// const talkToGemini=async(req,res)=>{
//     try{
//         const {data}=req.body;
//         const {image}=req.files;
//         const prompt="hello how are you";

//         const uploadDetails = await uploadFilesToCloudinary(
//             image,
//             process.env.FOLDER_NAME
//         );
        

//         const resp= await generateResponse(uploadDetails.secure_url);
//         if(!resp){
//             return res.status(500).json({
//                 message:"error while generating res",
//                 success:false
//             })
//         }

//         return res.status(200).json({
//             message:"got the response",
//             success:true,
//             resp
//         })

//     }
//     catch(error){
//         console.log(error.message);
//         return res.status(500).json({
//             message:"internal server error",
//             success:false
//         })
//     }
// }

// module.exports=talkToGemini;
const { generateResponse } = require("../config/gemini");
const { uploadFilesToCloudinary } = require("../utils/fileUploader");

const talkToGemini = async (req, res) => {
    try {
        const { image } = req.files;
        const prompt = "hello how are you";

        // Upload image to Cloudinary
        const uploadDetails = await uploadFilesToCloudinary(image, process.env.FOLDER_NAME);
        if (!uploadDetails || !uploadDetails.secure_url) {
            return res.status(500).json({
                message: "Failed to upload image",
                success: false
            });
        }

        // Generate response using uploaded image URL
        const resp = await generateResponse(uploadDetails.secure_url);

        if (!resp) {
            return res.status(500).json({
                message: "Error while generating response",
                success: false
            });
        }

        return res.status(200).json({
            message: "Got the response",
            success: true,
            resp
        });

    } catch (error) {
        console.log("Error:", error.message);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

module.exports = talkToGemini;
