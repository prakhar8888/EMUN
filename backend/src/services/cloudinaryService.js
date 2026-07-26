import cloudinary from "../config/cloudinary.js";
import { CLOUDINARY_FOLDERS } from "../utils/constants.js";

// ======================================
// UPLOAD FILE TO CLOUDINARY
// ======================================
export const uploadToCloudinary = async (
  filePath,
  folder = CLOUDINARY_FOLDERS.GENERAL_UPLOADS
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
