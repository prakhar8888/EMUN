import express from "express";

import {
  getAllEvents,
  getSingleEvent,
} from "../controllers/eventsController.js";

const router = express.Router();

router.get("/", getAllEvents);

router.get("/:slug", getSingleEvent);

export default router;
