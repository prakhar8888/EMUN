import cloudinary from "../config/cloudinary.js";

// ======================================
// UPLOAD FILE TO CLOUDINARY
// ======================================
export const uploadToCloudinary = async (
  filePath,
  folder = "munsphere"
) => {
  try {
    const result = await cloudinary.uploader.upload(
      filePath,
      {
        resource_type: "auto",
        folder,
      }
    );

    return result.secure_url;
  } catch (error) {
    console.error(
      "Cloudinary Upload Error:",
      error
    );

    throw new Error(
      "Failed to upload file to Cloudinary"
    );
  }
};
