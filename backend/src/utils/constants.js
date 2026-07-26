export const APP_NAME = "Enigma MUN";

export const MAX_FILE_SIZE =
  10 * 1024 * 1024; // 10MB

export const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "image/png",
  "image/jpeg",
  "image/jpg",
];

export const CLOUDINARY_FOLDERS = {
  CHAMBER_PDFS:
    "enigmamun/chambers/background-guides",

  EVENT_IMAGES:
    "enigmamun/events",

  GENERAL_UPLOADS:
    "enigmamun/general",
};

export const API_MESSAGES = {
  SERVER_ERROR:
    "Internal Server Error",

  VALIDATION_ERROR:
    "Validation failed",

  ROUTE_NOT_FOUND:
    "Route not found",

  PDF_UPLOAD_FAILED:
    "Failed to upload PDF to Cloudinary",

  FILE_UPLOAD_FAILED:
    "Failed to upload file to Cloudinary",
};

export const HTTP_STATUS = {
  OK: 200,

  CREATED: 201,

  BAD_REQUEST: 400,

  UNAUTHORIZED: 401,

  FORBIDDEN: 403,

  NOT_FOUND: 404,

  CONFLICT: 409,

  INTERNAL_SERVER_ERROR: 500,
};
