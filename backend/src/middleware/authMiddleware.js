import jwt from "jsonwebtoken";

import prisma from "../lib/prisma.js";


// ======================================
// PROTECT MIDDLEWARE
// ======================================
export const protect =
  async (req, res, next) => {

    try {

      let token;

      // ======================================
      // GET TOKEN FROM HEADER
      // ======================================
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith(
          "Bearer"
        )
      ) {
        token =
          req.headers.authorization.split(
            " "
          )[1];
      }

      // ======================================
      // TOKEN NOT FOUND
      // ======================================
      if (!token) {
        return res.status(401).json({
          success: false,
          message:
            "Not authorized. No token provided.",
        });
      }

      // ======================================
      // VERIFY TOKEN
      // ======================================
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      // ======================================
      // FIND USER
      // ======================================
      const user =
        await prisma.user.findUnique({
          where: {
            id: decoded.id,
          },

          select: {
            id: true,
            fullName: true,
            email: true,
            role: true,
          },
        });

      // ======================================
      // USER NOT FOUND
      // ======================================
      if (!user) {
        return res.status(401).json({
          success: false,
          message:
            "User no longer exists",
        });
      }

      // ======================================
      // ATTACH USER TO REQUEST
      // ======================================
      req.user = user;

      next();

    } catch (error) {

      console.error(
        "Auth Middleware Error:",
        error.message
      );

      // TOKEN EXPIRED
      if (
        error.name === "TokenExpiredError"
      ) {
        return res.status(401).json({
          success: false,
          message:
            "Token expired. Please login again.",
        });
      }

      // INVALID TOKEN
      return res.status(401).json({
        success: false,
        message:
          "Invalid token",
      });
    }
  };


// ======================================
// ROLE AUTHORIZATION
// ======================================
export const authorizeRoles =
  (...roles) => {

    return (
      req,
      res,
      next
    ) => {

      if (
        !roles.includes(
          req.user.role
        )
      ) {
        return res.status(403).json({
          success: false,
          message:
            "Access denied",
        });
      }

      next();
    };
  };
