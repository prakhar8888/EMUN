import express from "express";
import {
  getConnectData,
  createContactMessage,
  getAllContactMessages,
  deleteContactMessage,
} from "../controllers/connectController.js";

import {
  protect,
  authorizeRoles,
  requirePermission,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// ======================================
// PUBLIC ROUTES
// ======================================
router.get("/", getConnectData);
router.post("/message", createContactMessage);

// ======================================
// ADMIN ROUTES
// ======================================
router.get(
  "/messages",
  protect,
  authorizeRoles("ADMIN", "SECRETARIAT"),
  requirePermission("canManageContact"),
  getAllContactMessages
);

router.delete(
  "/messages/:id",
  protect,
  authorizeRoles("ADMIN"),
  deleteContactMessage
);

export default router;
