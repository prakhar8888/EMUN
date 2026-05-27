import express from "express";

import {
  createRegistration,
  getMyRegistrations,
} from "../controllers/registrationController.js";

import {
  protect,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// ======================================
// CREATE REGISTRATION
// ======================================

router.post(
  "/",
  protect,
  createRegistration
);

// ======================================
// GET MY REGISTRATIONS
// ======================================

router.get(
  "/my",
  protect,
  getMyRegistrations
);

export default router;
