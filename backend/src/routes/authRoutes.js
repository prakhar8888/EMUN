import express from "express";

import {
  signup,
  login,
  getCurrentUser,
  getAllStaff,
  approveStaff,
  revokeStaff,
  requestPasswordReset,
  verifyResetOtp,
  resetPassword,
  requestEmailChange,
  confirmEmailChange,
} from "../controllers/authController.js";

import {
  protect,
  authorizeRoles,
  requirePermission,
} from "../middleware/authMiddleware.js";

import validateBody from "../middleware/validationMiddleware.js";

import {
  signupSchema,
  loginSchema,
  requestPasswordResetSchema,
  verifyResetOtpSchema,
  resetPasswordSchema,
  requestEmailChangeSchema,
  confirmEmailChangeSchema,
} from "../validators/authValidator.js";

const router = express.Router();

// ======================================
// SIGNUP - CREATE PENDING STAFF ACCOUNT
// ======================================
router.post(
  "/signup",
  protect,
  authorizeRoles("ADMIN", "SECRETARIAT"),
  requirePermission("canCreateStaff"),
  validateBody(signupSchema),
  signup
);

// ======================================
// LOGIN
// ======================================
router.post(
  "/login",
  validateBody(loginSchema),
  login
);

// ======================================
// GET CURRENT USER
// ======================================
router.get(
  "/me",
  protect,
  getCurrentUser
);

// ======================================
// STAFF MANAGEMENT
// ======================================
router.get(
  "/staff",
  protect,
  authorizeRoles("ADMIN", "SECRETARIAT"),
  requirePermission("canCreateStaff"),
  getAllStaff
);

router.patch(
  "/staff/:id/approve",
  protect,
  authorizeRoles("ADMIN"),
  approveStaff
);

router.patch(
  "/staff/:id/revoke",
  protect,
  authorizeRoles("ADMIN"),
  revokeStaff
);

// ======================================
// PASSWORD RESET (Public - no login required,
// since the whole point is recovering access)
// ======================================
router.post(
  "/password-reset/request",
  validateBody(requestPasswordResetSchema),
  requestPasswordReset
);

router.post(
  "/password-reset/verify",
  validateBody(verifyResetOtpSchema),
  verifyResetOtp
);

router.post(
  "/password-reset/confirm",
  validateBody(resetPasswordSchema),
  resetPassword
);

// ======================================
// EMAIL CHANGE (Protected - must already be
// logged in to change your own account's email)
// ======================================
router.post(
  "/email-change/request",
  protect,
  validateBody(requestEmailChangeSchema),
  requestEmailChange
);

router.post(
  "/email-change/confirm",
  protect,
  validateBody(confirmEmailChangeSchema),
  confirmEmailChange
);

export default router;
