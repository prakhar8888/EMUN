import express from "express";
import { getConnectData } from "../controllers/connectController.js";

const router = express.Router();

router.get("/", getConnectData);

export default router;
