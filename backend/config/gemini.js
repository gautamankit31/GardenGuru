const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

function encodeImage(imagePath) {
    const imageBuffer = fs.readFileSync(imagePath);
    return imageBuffer.toString("base64");
}

async function generateResponse(prompt, imagePath = null) {
    try {
        let inputData = [{ type: "text", text: prompt }];

        if (imagePath) {
            const imageBase64 = encodeImage(imagePath);
            inputData.push({ type: "image", data: imageBase64 });
        }

        const result = await model.generateContent(inputData);

        return result.response.text();
    } catch (error) {
        console.error("Error generating response:", error);
        throw new Error("Failed to process query.");
    }
}

module.exports = generateResponse;

// const {
//     GoogleGenerativeAI,
//     HarmCategory,
//     HarmBlockThreshold,
//   } = require("@google/generative-ai");
//   const { GoogleAIFileManager } = require("@google/generative-ai/server");
  
//   const apiKey = process.env.GEMINI_API_KEY;
//   const genAI = new GoogleGenerativeAI(apiKey);
//   const fileManager = new GoogleAIFileManager(apiKey);
  
//   /**
//    * Uploads the given file to Gemini.
//    *
//    * See https://ai.google.dev/gemini-api/docs/prompting_with_media
//    */
//   async function uploadToGemini(path, mimeType) {
//     const uploadResult = await fileManager.uploadFile(path, {
//       mimeType,
//       displayName: path,
//     });
//     const file = uploadResult.file;
//     console.log(`Uploaded file ${file.displayName} as: ${file.name}`);
//     return file;
//   }
  
//   const model = genAI.getGenerativeModel({
//     model: "gemini-2.0-flash",
//   });
  
//   const generationConfig = {
//     temperature: 2,
//     topP: 0.95,
//     topK: 40,
//     maxOutputTokens: 8192,
//     responseMimeType: "text/plain",
//   };
  
//   async function run() {
//     // TODO Make these files available on the local file system
//     // You may need to update the file paths
//     const files = [
//       await uploadToGemini("image_plant_care1.jpeg", "image/jpeg"),
//     ];
  
//     const chatSession = model.startChat({
//       generationConfig,
//       history: [
//         {
//           role: "user",
//           parts: [
//             {
//               fileData: {
//                 mimeType: files[0].mimeType,
//                 fileUri: files[0].uri,
//               },
//             },
//             {text: "Do you know what plant this is? How do I best take care of it? "},
//           ],
//         },
//         {
//           role: "model",
//           parts: [
//             {text: "Based on the distinctively veined and brightly colored foliage, the plant prominently featured in the image is likely a **Persian Shield (Strobilanthes dyerianus)**.\n\nHere's a quick guide on how to take care of it:\n\n**Light:**  They love bright indirect light.  Direct sunlight can scorch the leaves. Insufficient light leads to fading colors.\n**Watering:**  Keep the soil consistently moist, but not soggy.  Allow the top inch of soil to dry out before watering again. These are water lovers, but avoid root rot.\n**Humidity:** They need humid environments. Mist the plant regularly, set it on a pebble tray with water, or use a humidifier nearby.\n**Temperature:** Persian Shield prefers warm temperatures (65-80°F/18-27°C).\n**Soil:** Use well-draining soil.  A typical potting mix amended with perlite or orchid bark works well.\n**Fertilizer:** Feed every 2-4 weeks during the growing season (spring/summer) with a balanced liquid fertilizer diluted to half strength.\n\nThese are fast growers and tend to get leggy over time. Regular pruning keeps it looking bushy and promotes denser growth. Take stem cuttings of 4–6 inches long for a new plant by putting it into water. Once new roots sprout (2–3 cm/ ~1 inch), pot up with soil and treat like the parent plant.\n\nIf you are experiencing any problem please be as detailed as you can so I can better understand what is going on."},
//           ],
//         },
//       ],
//     });
  
//     const result = await chatSession.sendMessage("how to integrate the same functionality you provided like plantcare how to do it\n");
//     console.log(result.response.text());
//   }
  
//   run();