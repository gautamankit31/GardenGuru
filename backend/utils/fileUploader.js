const cloudinary = require("cloudinary").v2;

const uploadFilesToCloudinary = async (file, folder, height, quality) => {
  try {
    const options = {
      folder,
      resource_type: "auto", 
      ...(height && { height }), 
      ...(quality && { quality })
    };

    const result = await cloudinary.uploader.upload(file.tempFilePath || file, options);
    
    return result;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    return { success: false, message: "Failed to upload file", error };
  }
};

module.exports = { uploadFilesToCloudinary };
