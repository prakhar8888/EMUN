import express from "express";

import {
  signup,
  login,
  getCurrentUser,
} from "../controllers/authController.js";

import {
  protect,
} from "../middleware/authMiddleware.js";

import validateBody from "../middleware/validationMiddleware.js";

import {
  signupSchema,
  loginSchema,
} from "../validators/authValidator.js";

const router = express.Router();


// ======================================
// AUTH ROUTES
// ======================================


// ======================================
// SIGNUP
// ======================================

router.post(
  "/signup",

  validateBody(
    signupSchema
  ),

  signup
);


// ======================================
// LOGIN
// ======================================

router.post(
  "/login",

  validateBody(
    loginSchema
  ),

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


export default router;
