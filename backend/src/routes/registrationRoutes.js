import express from "express";

// Controller Imports
import {
  createRegistration,
  createPublicRegistration,
  getMyRegistrations,
  getAllRegistrations,
  updateRegistrationStatus,
} from "../controllers/registrationController.js";

// Middleware Imports
import {
  protect,
  authorizeRoles,
  requirePermission,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// ======================================
// 1. PUBLIC ROUTES
// ======================================
// Handles applications from the public-facing website without requiring prior login.
router.post(
  "/public",
  createPublicRegistration
);

// ======================================
// 2. PROTECTED DELEGATE ROUTES
// ======================================
// Legacy registration endpoint (requires user to be logged in)
router.post(
  "/",
  protect,
  createRegistration
);

// Fetches all registrations belonging to the currently logged-in user
router.get(
  "/my",
  protect,
  getMyRegistrations
);

// ======================================
// 3. ADMIN & SECRETARIAT ROUTES
// ======================================
// Fetches all registrations across the entire platform
router.get(
  "/",
  protect,
  authorizeRoles("ADMIN", "SECRETARIAT"),
  requirePermission("canManageRegistrations"),
  getAllRegistrations
);

// Updates the status of a specific registration (e.g., APPROVED or REJECTED)
router.patch(
  "/:id/status",
  protect,
  authorizeRoles("ADMIN", "SECRETARIAT"),
  requirePermission("canManageRegistrations"),
  updateRegistrationStatus
);

export default router;
