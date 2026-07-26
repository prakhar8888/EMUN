import express from "express";

import {
  getAllEvents,
  getSingleEvent,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/eventsController.js";

import {
  protect,
  authorizeRoles,
  requirePermission,
} from "../middleware/authMiddleware.js";

import validateBody from "../middleware/validationMiddleware.js";

import {
  eventSchema,
} from "../validators/eventValidator.js";

const router = express.Router();

// ======================================
// PUBLIC ROUTES
// ======================================

// GET ALL EVENTS
router.get(
  "/",
  getAllEvents
);

// GET SINGLE EVENT
router.get(
  "/:slug",
  getSingleEvent
);

// ======================================
// ADMIN ROUTES
// ======================================

// CREATE EVENT
router.post(
  "/",

  protect,

  authorizeRoles(
    "ADMIN",
    "SECRETARIAT"
  ),

  requirePermission("canManageEvents"),

  validateBody(
    eventSchema
  ),

  createEvent
);

// UPDATE EVENT
router.put(
  "/:id",

  protect,

  authorizeRoles(
    "ADMIN",
    "SECRETARIAT"
  ),

  requirePermission("canManageEvents"),

  validateBody(
    eventSchema
  ),

  updateEvent
);

// DELETE EVENT
router.delete(
  "/:id",

  protect,

  authorizeRoles(
    "ADMIN"
  ),

  deleteEvent
);

export default router;
