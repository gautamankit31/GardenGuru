const cloudinary = require('cloudinary').v2;

const uploadFilesToCloudinary = async(file, folder, height, quality) => {
    
    const options = {
        folder,
    }

    if(height) {
        options.height = height;
    }
    
    if(quality) {
        options.quality = quality;
    }

    options.resource_type = "auto";

    try {
        const uploadResponse = await cloudinary.uploader.upload(file.tempFilePath, options);
        console.log("Cloudinary upload response:", uploadResponse);
        return uploadResponse;
    } catch (err) {
        console.error("Cloudinary upload error:", err);
        throw new Error('Image upload failed');
    }
    
}

module.exports = { uploadFilesToCloudinary };