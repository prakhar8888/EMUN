import express from "express";
import {
  submitFeedback,
  getAllFeedbacks,
  updateFeedbackStatus,
  deleteFeedback
} from "../controllers/feedbackController.js";
import validate from "../middleware/validationMiddleware.js";
import { feedbackSchema } from "../validators/feedbackValidator.js";

import { protect, authorizeRoles, requirePermission } from "../middleware/authMiddleware.js";

const router = express.Router();

// ======================================
// PUBLIC ROUTES
// ======================================

// Submit new feedback (Public)
router.post(
  "/",
  validate(feedbackSchema),
  submitFeedback
);

// ======================================
// ADMIN / SECURE ROUTES
// ======================================

// Get all feedback logs (Admin + Secretariat with permission)
router.get(
  "/",
  protect,
  authorizeRoles("ADMIN", "SECRETARIAT"),
  requirePermission("canManageFeedback"),
  getAllFeedbacks
);

// Update feedback status (Admin + Secretariat with permission)
router.patch(
  "/:id",
  protect,
  authorizeRoles("ADMIN", "SECRETARIAT"),
  requirePermission("canManageFeedback"),
  updateFeedbackStatus
);

// Delete a feedback log (Admin Only - kept restricted, matching the
// pattern used for delete operations on other modules)
router.delete(
  "/:id",
  protect,
  authorizeRoles("ADMIN"),
  deleteFeedback
);

export default router;
