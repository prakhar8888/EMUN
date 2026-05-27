import fs from "fs";
import cloudinary from "../config/cloudinary.js";

// ======================================
// UPLOAD PDF TO CLOUDINARY
// ======================================
export const uploadPdfToCloudinary = async (
  filePath
) => {
  try {
    const result =
      await cloudinary.uploader.upload(
        filePath,
        {
          resource_type: "raw",
          folder:
            "mun/chambers/background-guides",
        }
      );

    // Delete temporary local file safely
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    return result.secure_url;
  } catch (error) {
    console.error(
      "PDF Upload Error:",
      error
    );

    throw new Error(
      "Failed to upload PDF to Cloudinary"
    );
  }
};
