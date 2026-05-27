import express from "express";

import { submitFeedback } from "../controllers/feedbackController.js";

import validate from "../middleware/validationMiddleware.js";

import { feedbackSchema } from "../validators/feedbackValidator.js";

const router = express.Router();

// Submit Feedback
router.post(
  "/",
  validate(feedbackSchema),
  submitFeedback
);

export default router;
