import express from "express";

import cors from "cors";

import helmet from "helmet";

import dotenv from "dotenv";

import path from "path";

import cookieParser from "cookie-parser";

import rateLimit from "express-rate-limit";


// ======================================
// ROUTES
// ======================================

import aboutRoutes from "./routes/aboutRoutes.js";

import chambersRoutes from "./routes/chambersRoutes.js";

import connectRoutes from "./routes/connectRoutes.js";

import eventsRoutes from "./routes/eventsRoutes.js";

import feedbackRoutes from "./routes/feedbackRoutes.js";

import foundationRoutes from "./routes/foundationRoutes.js";

import authRoutes from "./routes/authRoutes.js";

import registrationRoutes from "./routes/registrationRoutes.js";


// ======================================
// MIDDLEWARE
// ======================================

import errorMiddleware from "./middleware/errorMiddleware.js";

import notFoundMiddleware from "./middleware/notFoundMiddleware.js";


// ======================================
// ENV CONFIG
// ======================================

dotenv.config();


// ======================================
// APP INIT
// ======================================

const app = express();

const PORT = process.env.PORT || 5000;

const API_PREFIX = "/api/v1";


// ======================================
// SECURITY CONFIG
// ======================================

app.disable("x-powered-by");


// ======================================
// RATE LIMITER
// ======================================

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,

  max: 10,

  message: {
    success: false,

    message:
      "Too many login attempts. Please try again later.",
  },

  standardHeaders: true,

  legacyHeaders: false,
});


// ======================================
// SECURITY MIDDLEWARE
// ======================================

app.use(
  cors({
    origin: true,

    credentials: true,
  })
);

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);


// ======================================
// COOKIE PARSER
// ======================================

app.use(cookieParser());


// ======================================
// BODY PARSING
// ======================================

app.use(
  express.json({
    limit: "10mb",
  })
);

app.use(
  express.urlencoded({
    extended: true,

    limit: "10mb",
  })
);


// ======================================
// STATIC FILES
// ======================================

app.use(
  "/uploads",

  express.static(path.resolve("uploads"))
);


// ======================================
// HEALTH CHECK
// ======================================

app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,

    message:
      "Enigma MUN API Running Successfully 🚀",
  });
});


// ======================================
// RATE LIMITED ROUTES
// ======================================

app.use(
  `${API_PREFIX}/auth`,
  authLimiter
);


// ======================================
// API ROUTES
// ======================================

app.use(
  `${API_PREFIX}/about`,
  aboutRoutes
);

app.use(
  `${API_PREFIX}/auth`,
  authRoutes
);

app.use(
  `${API_PREFIX}/chambers`,
  chambersRoutes
);

app.use(
  `${API_PREFIX}/connect`,
  connectRoutes
);

app.use(
  `${API_PREFIX}/events`,
  eventsRoutes
);

app.use(
  `${API_PREFIX}/feedback`,
  feedbackRoutes
);

app.use(
  `${API_PREFIX}/foundation`,
  foundationRoutes
);

app.use(
  `${API_PREFIX}/registrations`,
  registrationRoutes
);


// ======================================
// NOT FOUND MIDDLEWARE
// ======================================

app.use(notFoundMiddleware);


// ======================================
// GLOBAL ERROR MIDDLEWARE
// ======================================

app.use(errorMiddleware);


// ======================================
// SERVER START
// ======================================

app.listen(PORT, () => {
  console.log(`
========================================
🚀 Enigma MUN Backend Running
🌐 PORT: ${PORT}
🛡️ ENV: ${process.env.NODE_ENV}
========================================
`);
});
