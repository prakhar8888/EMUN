import {
  registerUserService,
  loginUserService
} from "../services/authService.js";

import prisma from "../lib/prisma.js";


// ======================================
// SIGNUP
// ======================================
export const signup = async (
  req,
  res
) => {
  try {

    const result =
      await registerUserService(
        req.body
      );

    return res.status(201).json({
      success: true,
      message:
        "Account created successfully",
      ...result
    });

  } catch (error) {

    console.error(
      "Signup Error:",
      error
    );

    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};


// ======================================
// LOGIN
// ======================================
export const login = async (
  req,
  res
) => {
  try {

    const result =
      await loginUserService(
        req.body
      );

    return res.status(200).json({
      success: true,
      message:
        "Login successful",
      ...result
    });

  } catch (error) {

    console.error(
      "Login Error:",
      error
    );

    return res.status(401).json({
      success: false,
      message: error.message
    });
  }
};


// ======================================
// GET CURRENT USER
// ======================================
export const getCurrentUser =
  async (req, res) => {

    try {

      const user =
        await prisma.user.findUnique({
          where: {
            id: req.user.id
          },

          select: {
            id: true,
            fullName: true,
            email: true,
            university: true,
            country: true,
            role: true
          }
        });

      return res.status(200).json({
        success: true,
        user
      });

    } catch (error) {

      console.error(
        "Get Current User Error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to fetch user"
      });
    }
  };
