import dotenv from "dotenv";

dotenv.config();

const requiredEnvVariables = [
  "PORT",
  "DATABASE_URL",
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
];

requiredEnvVariables.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
});

const env = {
  PORT: process.env.PORT || 5000,
  DATABASE_URL: process.env.DATABASE_URL,

  CLOUDINARY: {
    CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    API_KEY: process.env.CLOUDINARY_API_KEY,
    API_SECRET: process.env.CLOUDINARY_API_SECRET,
  },

  NODE_ENV: process.env.NODE_ENV || "development",
};

export default env;
