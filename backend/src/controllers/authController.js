import {
  registerUserService,
  loginUserService,
  approveStaffService,
  revokeStaffService,
  getAllStaffService,
  requestPasswordResetService,
  verifyResetOtpService,
  resetPasswordService,
  requestEmailChangeService,
  confirmEmailChangeService,
} from "../services/authService.js";

import prisma from "../lib/prisma.js";

// ======================================
// SIGNUP - CREATE PENDING STAFF ACCOUNT
// ======================================
export const signup = async (req, res) => {
  try {
    const result = await registerUserService(req.body);

    return res.status(201).json({
      success: true,
      message: "Staff account request created and pending approval.",
      ...result,
    });
  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// LOGIN
// ======================================
export const login = async (req, res) => {
  try {
    const result = await loginUserService(req.body);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      ...result,
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// GET CURRENT USER
// ======================================
export const getCurrentUser = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        fullName: true,
        email: true,
        university: true,
        country: true,
        role: true,
        staffStatus: true,
        designation: true,
        canManageEvents: true,
        canManageRegistrations: true,
        canManageCommittees: true,
        canManageFeedback: true,
        canManageContact: true,
        canCreateStaff: true,
      },
    });

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Get Current User Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch user",
    });
  }
};

// ======================================
// GET ALL STAFF
// ======================================
export const getAllStaff = async (req, res) => {
  try {
    const staff = await getAllStaffService();

    return res.status(200).json({
      success: true,
      count: staff.length,
      data: staff,
    });
  } catch (error) {
    console.error("Get All Staff Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch staff accounts",
    });
  }
};

// ======================================
// APPROVE STAFF ACCOUNT
// ======================================
export const approveStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const { permissions } = req.body;

    const updated = await approveStaffService(id, permissions);

    return res.status(200).json({
      success: true,
      message: `${updated.fullName} has been approved with the selected permissions.`,
      data: updated,
    });
  } catch (error) {
    console.error("Approve Staff Error:", error);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// REVOKE STAFF ACCOUNT
// ======================================
export const revokeStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await revokeStaffService(id, req.user.id);

    return res.status(200).json({
      success: true,
      message: `${updated.fullName}'s access has been revoked.`,
      data: updated,
    });
  } catch (error) {
    console.error("Revoke Staff Error:", error);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// REQUEST PASSWORD RESET (Public - Step 1)
// ======================================
export const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    const result = await requestPasswordResetService(email);

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error("Request Password Reset Error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again.",
    });
  }
};

// ======================================
// VERIFY RESET OTP (Public - Step 2)
// ======================================
export const verifyResetOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const result = await verifyResetOtpService(email, otp);

    return res.status(200).json({
      success: true,
      message: "Code verified successfully.",
      ...result,
    });
  } catch (error) {
    console.error("Verify Reset OTP Error:", error);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// RESET PASSWORD (Public - Step 3)
// ======================================
export const resetPassword = async (req, res) => {
  try {
    const { resetToken, newPassword } = req.body;
    const result = await resetPasswordService(resetToken, newPassword);

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error("Reset Password Error:", error);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// REQUEST EMAIL CHANGE (Protected - Step 1)
// ======================================
export const requestEmailChange = async (req, res) => {
  try {
    const { newEmail } = req.body;
    const result = await requestEmailChangeService(req.user.id, newEmail);

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error("Request Email Change Error:", error);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// CONFIRM EMAIL CHANGE (Protected - Step 2)
// ======================================
export const confirmEmailChange = async (req, res) => {
  try {
    const { newEmail, otp } = req.body;
    const result = await confirmEmailChangeService(req.user.id, newEmail, otp);

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error("Confirm Email Change Error:", error);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
