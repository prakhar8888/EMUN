import express from "express";

import {
  createChamber,
  getAllChambers,
  getSingleChamber,
  updateChamber,
  deleteChamber,
} from "../controllers/chambersController.js";

import {
  protect,
  authorizeRoles,
  requirePermission,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// ======================================
// PUBLIC ROUTES
// ======================================

// GET ALL CHAMBERS
router.get("/", getAllChambers);

// GET SINGLE CHAMBER
router.get("/:slug", getSingleChamber);

// ======================================
// ADMIN ROUTES
// ======================================

// CREATE CHAMBER
router.post(
  "/",
  protect,
  authorizeRoles("ADMIN", "SECRETARIAT"),
  requirePermission("canManageCommittees"),
  createChamber
);

// UPDATE CHAMBER
router.put(
  "/:id",
  protect,
  authorizeRoles("ADMIN", "SECRETARIAT"),
  requirePermission("canManageCommittees"),
  updateChamber
);

// DELETE CHAMBER
router.delete(
  "/:id",
  protect,
  authorizeRoles("ADMIN"),
  deleteChamber
);

export default router;
