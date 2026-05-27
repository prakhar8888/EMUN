import express from "express";

import {
  createChamber,
  getAllChambers,
  getSingleChamber,
  updateChamber,
  deleteChamber,
} from "../controllers/chambersController.js";

const router = express.Router();

// ======================================
// CREATE CHAMBER
// ======================================
router.post("/", createChamber);

// ======================================
// GET ALL CHAMBERS
// ======================================
router.get("/", getAllChambers);

// ======================================
// GET SINGLE CHAMBER
// ======================================
router.get("/:slug", getSingleChamber);

// ======================================
// UPDATE CHAMBER
// ======================================
router.put("/:id", updateChamber);

// ======================================
// DELETE CHAMBER
// ======================================
router.delete("/:id", deleteChamber);

export default router;
