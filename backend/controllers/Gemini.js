// const { generateResponse } = require("../config/gemini");
const { uploadFilesToCloudinary } = require("../utils/fileUploader");

const { generateResponse } = require("../config/gemini");

// const talkToGemini = async (req, res) => {
//     try {
//         const { image } = req.files;
//         const prompt = "hello how are you";

//         // Upload image to Cloudinary
//         const uploadDetails = await uploadFilesToCloudinary(image, process.env.FOLDER_NAME);
//         if (!uploadDetails || !uploadDetails.secure_url) {
//             return res.status(500).json({
//                 message: "Failed to upload image",
//                 success: false
//             });
//         }

//         // Generate response using uploaded image URL
//         const resp = await generateResponse(uploadDetails.secure_url);

//         if (!resp) {
//             return res.status(500).json({
//                 message: "Error while generating response",
//                 success: false
//             });
//         }

//         return res.status(200).json({
//             message: "Got the response",
//             success: true,
//             resp
//         });

//     } catch (error) {
//         console.log("Error:", error.message);
//         return res.status(500).json({
//             message: "Internal server error",
//             success: false
//         });
//     }
// };

// module.exports = talkToGemini;
const talkToGemini = async (req, res) => {
    try {
       // console.log(req.body.message)
        const pr = req.body.message;
        const prompt=`The user will be providing a prompt and an maybe an image you have to help him with either learning about the plant care or help him learn to take care of the plant.if he ask for anything else other then plants reply with can't help with that. The prompt is ${pr}`;
        let imageUrl = null;

        // Check if image is provided
        if (req.files && req.files.image) {
            const { image } = req.files;

            // Upload image to Cloudinary
            const uploadDetails = await uploadFilesToCloudinary(image, process.env.FOLDER_NAME);
            if (!uploadDetails || !uploadDetails.secure_url) {
                return res.status(500).json({
                    message: "Failed to upload image",
                    success: false
                });
            }

            imageUrl = uploadDetails.secure_url;
        }

        // Generate Gemini response (image or text only)
        const resp = await generateResponse(imageUrl, prompt);

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
        console.error("Error:", error.message);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};


module.exports = talkToGemini;
