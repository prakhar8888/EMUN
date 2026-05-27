import express from "express";

import { getFoundationData } from "../controllers/foundationController.js";

const router = express.Router();

router.get("/", getFoundationData);

export default router;
