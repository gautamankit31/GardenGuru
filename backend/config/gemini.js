// const { GoogleGenerativeAI } = require("@google/generative-ai");

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
// const axios = require('axios');

// async function fileToGenerativePart(imageUrl, mimeType) {
//     try {
//         const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
//         const base64Image = Buffer.from(response.data).toString("base64");

//         return {
//             inlineData: { 
//                 data: base64Image,
//                 mimeType
//             }
//         };
//     } catch (error) {
//         console.error("Error fetching image from Cloudinary:", error);
//         throw new Error("Failed to fetch image");
//     }
// }

// const generateResponse = async (imageUrl) => {
//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

//     const prompt = "This plant has some disease share what is this and how can we cure it";

//     const imageParts = [
//         await fileToGenerativePart(imageUrl, "image/jpeg"),
//     ];

//     try {
//         const response = await model.generateContent([prompt, ...imageParts]);
//         return response.response.text(); 
//     } catch (error) {
//         console.error("Error generating response:", error.message);
//         return null;
//     }
// };

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
const axios = require('axios');

async function fileToGenerativePart(imageUrl, mimeType) {
  //  console.log(imageUrl,mimeType)
    try {
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const base64Image = Buffer.from(response.data).toString("base64");

        return {
            inlineData: { 
                data: base64Image,
                mimeType
            }
        };
    } catch (error) {
        console.error("Error fetching image from Cloudinary:", error);
        throw new Error("Failed to fetch image");
    }
}

const generateResponse = async (imageUrl,promp) => {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const prompt = promp;

    try {
        let response;

        if (imageUrl) {
            const imageParts = [
                await fileToGenerativePart(imageUrl, "image/jpeg"),
            ];
            console.log(imageParts)
            response = await model.generateContent([prompt, ...imageParts]);
        } else {
            response = await model.generateContent(prompt);
          //  console.log(response.response.text())
        }

        return response.response.text();
    } catch (error) {
        console.error("Error generating response:", error.message);
        return null;
    }
};


module.exports = { generateResponse };
