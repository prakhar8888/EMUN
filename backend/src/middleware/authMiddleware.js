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
            staffStatus: true,
            canManageEvents: true,
            canManageRegistrations: true,
            canManageCommittees: true,
            canManageFeedback: true,
            canManageContact: true,
            canCreateStaff: true,
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
      // STAFF STATUS CHECK
      // ======================================
      // A revoked or still-pending staff account cannot use any
      // protected route, even if their token is still technically
      // valid. This takes effect the moment an admin revokes them,
      // rather than waiting for their token to expire.
      const isStaffRole =
        user.role === "ADMIN" || user.role === "SECRETARIAT";

      if (isStaffRole && user.staffStatus !== "ACTIVE") {
        return res.status(403).json({
          success: false,
          message:
            user.staffStatus === "PENDING"
              ? "Your account is pending approval from an administrator."
              : "Your access has been revoked. Please contact an administrator.",
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

// ======================================
// PERMISSION AUTHORIZATION
// ======================================
// Checks a specific per-module permission flag on req.user.
// ADMIN role always passes regardless of the flag value - those
// flags only meaningfully restrict SECRETARIAT accounts. Must be
// used AFTER protect() and typically after authorizeRoles() too.
export const requirePermission =
  (permissionKey) => {

    return (
      req,
      res,
      next
    ) => {

      if (req.user.role === "ADMIN") {
        return next();
      }

      if (!req.user[permissionKey]) {
        return res.status(403).json({
          success: false,
          message:
            "You do not have permission to access this module.",
        });
      }

      next();
    };
  };
