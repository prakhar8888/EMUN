import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure uploads directory exists
const uploadPath = "uploads/";

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// ======================================
// STORAGE CONFIGURATION
// ======================================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    const uniqueSuffix =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9);

    cb(
      null,
      `${uniqueSuffix}${path.extname(
        file.originalname
      )}`
    );
  },
});

// ======================================
// FILE FILTER
// ======================================
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(
      new Error("Only PDF files are allowed"),
      false
    );
  }
};

// ======================================
// UPLOAD MIDDLEWARE
// ======================================
const uploadMiddleware = multer({
  storage,

  fileFilter,

  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
});

export default uploadMiddleware;
