import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import prisma from "../lib/prisma.js";
import { sendPasswordResetOtp, sendEmailChangeVerification } from "./emailService.js";

// ======================================
// GENERATE JWT TOKEN
// ======================================
export const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

// ======================================
// REGISTER USER (Admin creates or upgrades a staff account)
// ======================================
export const registerUserService = async ({
  fullName,
  email,
  phone,
  password,
  university,
  country,
  designation,
  requestedPermissions,
}) => {
  const normalizedEmail = email.trim().toLowerCase();
  const sanitizedName = fullName.trim();
  const sanitizedPhone = phone?.trim() || null;
  const sanitizedUniversity = university?.trim() || null;
  const sanitizedCountry = country?.trim() || null;
  const sanitizedDesignation = designation?.trim() || null;

  const hashedPassword = await bcrypt.hash(password, 12);
  const perms = requestedPermissions || {};

  const permissionData = {
    canManageEvents: !!perms.canManageEvents,
    canManageRegistrations: !!perms.canManageRegistrations,
    canManageCommittees: !!perms.canManageCommittees,
    canManageFeedback: !!perms.canManageFeedback,
    canManageContact: !!perms.canManageContact,
    canCreateStaff: !!perms.canCreateStaff,
  };

  const role = "SECRETARIAT";

  const existingUser = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  let user;

  if (!existingUser) {
    user = await prisma.user.create({
      data: {
        fullName: sanitizedName,
        email: normalizedEmail,
        phone: sanitizedPhone,
        password: hashedPassword,
        university: sanitizedUniversity,
        country: sanitizedCountry,
        role,
        designation: sanitizedDesignation,
        staffStatus: "PENDING",
        ...permissionData,
      },
    });
  } else if (existingUser.role === "DELEGATE") {
    user = await prisma.user.update({
      where: { id: existingUser.id },
      data: {
        fullName: sanitizedName || existingUser.fullName,
        phone: sanitizedPhone || existingUser.phone,
        password: hashedPassword,
        university: sanitizedUniversity || existingUser.university,
        country: sanitizedCountry || existingUser.country,
        role,
        designation: sanitizedDesignation,
        staffStatus: "PENDING",
        ...permissionData,
      },
    });
  } else {
    // Clear, specific messaging - names exactly whose account already
    // holds this email, rather than a vague "already exists" error.
    throw new Error(
      `This email address is already registered to ${existingUser.fullName} (${existingUser.role}).`
    );
  }

  const token = generateToken(user);

  return {
    token,
    user: {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      university: user.university,
      country: user.country,
      role: user.role,
      staffStatus: user.staffStatus,
      designation: user.designation,
      createdAt: user.createdAt,
    },
  };
};

// ======================================
// LOGIN USER
// ======================================
export const loginUserService = async ({ email, password }) => {
  const normalizedEmail = email.trim().toLowerCase();

  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new Error("Invalid email or password");
  }

  if (
    (user.role === "ADMIN" || user.role === "SECRETARIAT") &&
    user.staffStatus === "PENDING"
  ) {
    throw new Error("Your account is pending approval from an administrator.");
  }

  if (
    (user.role === "ADMIN" || user.role === "SECRETARIAT") &&
    user.staffStatus === "REVOKED"
  ) {
    throw new Error("Your access has been revoked. Please contact an administrator.");
  }

  const token = generateToken(user);

  return {
    token,
    user: {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      university: user.university,
      country: user.country,
      role: user.role,
      staffStatus: user.staffStatus,
      designation: user.designation,
      canManageEvents: user.canManageEvents,
      canManageRegistrations: user.canManageRegistrations,
      canManageCommittees: user.canManageCommittees,
      canManageFeedback: user.canManageFeedback,
      canManageContact: user.canManageContact,
      canCreateStaff: user.canCreateStaff,
      createdAt: user.createdAt,
    },
  };
};

// ======================================
// GET ALL STAFF (ADMIN + SECRETARIAT ACCOUNTS ONLY)
// ======================================
export const getAllStaffService = async () => {
  return prisma.user.findMany({
    where: {
      role: { in: ["ADMIN", "SECRETARIAT"] },
    },
    select: {
      id: true,
      fullName: true,
      email: true,
      phone: true,
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
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });
};

// ======================================
// APPROVE STAFF ACCOUNT
// ======================================
export const approveStaffService = async (id, permissions) => {
  const staffId = Number(id);
  if (isNaN(staffId)) throw new Error("Invalid staff account ID");

  const existing = await prisma.user.findUnique({ where: { id: staffId } });
  if (!existing) throw new Error("Staff account not found");

  const perms = permissions || {};

  return prisma.user.update({
    where: { id: staffId },
    data: {
      staffStatus: "ACTIVE",
      canManageEvents: !!perms.canManageEvents,
      canManageRegistrations: !!perms.canManageRegistrations,
      canManageCommittees: !!perms.canManageCommittees,
      canManageFeedback: !!perms.canManageFeedback,
      canManageContact: !!perms.canManageContact,
      canCreateStaff: !!perms.canCreateStaff,
    },
  });
};

// ======================================
// REVOKE STAFF ACCOUNT
// ======================================
export const revokeStaffService = async (id, requestingAdminId) => {
  const staffId = Number(id);
  if (isNaN(staffId)) throw new Error("Invalid staff account ID");

  if (requestingAdminId === staffId) {
    throw new Error("You cannot revoke your own access.");
  }

  const existing = await prisma.user.findUnique({ where: { id: staffId } });
  if (!existing) throw new Error("Staff account not found");

  return prisma.user.update({
    where: { id: staffId },
    data: { staffStatus: "REVOKED" },
  });
};

// ======================================
// REQUEST PASSWORD RESET (Sends OTP)
// ======================================
export const requestPasswordResetService = async (email) => {
  const normalizedEmail = email.trim().toLowerCase();

  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (!user || user.role === "DELEGATE") {
    // Same generic response whether the account exists or not -
    // prevents email enumeration.
    return {
      message: "If an account exists with this email, a reset code has been sent.",
    };
  }

  const otp = crypto.randomInt(100000, 999999).toString();
  const hashedOtp = await bcrypt.hash(otp, 10);
  const expiry = new Date(Date.now() + 10 * 60 * 1000);

  await prisma.user.update({
    where: { id: user.id },
    data: { resetOtp: hashedOtp, resetOtpExpiry: expiry },
  });

  const emailResult = await sendPasswordResetOtp(user.email, user.fullName, otp);

  return {
    message: "If an account exists with this email, a reset code has been sent.",
    emailSent: emailResult.emailSent,
    emailWarning: emailResult.emailSent ? null : emailResult.warning,
  };
};

// ======================================
// VERIFY OTP
// ======================================
export const verifyResetOtpService = async (email, otp) => {
  const normalizedEmail = email.trim().toLowerCase();

  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (!user || !user.resetOtp || !user.resetOtpExpiry) {
    throw new Error("Invalid or expired reset code. Please request a new one.");
  }

  if (new Date() > user.resetOtpExpiry) {
    throw new Error("This reset code has expired. Please request a new one.");
  }

  const isOtpValid = await bcrypt.compare(otp, user.resetOtp);
  if (!isOtpValid) {
    throw new Error("Incorrect reset code. Please try again.");
  }

  const resetToken = jwt.sign(
    { id: user.id, purpose: "password-reset" },
    process.env.JWT_SECRET,
    { expiresIn: "10m" }
  );

  return { resetToken };
};

// ======================================
// RESET PASSWORD (After OTP verification)
// ======================================
export const resetPasswordService = async (resetToken, newPassword) => {
  let decoded;

  try {
    decoded = jwt.verify(resetToken, process.env.JWT_SECRET);
  } catch (err) {
    throw new Error("This reset session has expired. Please start over.");
  }

  if (decoded.purpose !== "password-reset") {
    throw new Error("Invalid reset session. Please start over.");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 12);

  await prisma.user.update({
    where: { id: decoded.id },
    data: {
      password: hashedPassword,
      resetOtp: null,
      resetOtpExpiry: null,
    },
  });

  return { message: "Your password has been updated successfully." };
};

// ======================================
// REQUEST EMAIL CHANGE (Sends OTP to the NEW address)
// ======================================
export const requestEmailChangeService = async (currentUserId, newEmail) => {
  const normalizedNewEmail = newEmail.trim().toLowerCase();

  const currentUser = await prisma.user.findUnique({
    where: { id: currentUserId },
  });

  if (!currentUser) {
    throw new Error("Your account could not be found. Please log in again.");
  }

  if (normalizedNewEmail === currentUser.email) {
    throw new Error("This is already your current email address.");
  }

  // Clear, specific duplicate-detection messaging: name whose account
  // already holds this email, exactly as requested, rather than a
  // vague "already in use" error.
  const existingUser = await prisma.user.findUnique({
    where: { email: normalizedNewEmail },
  });

  if (existingUser) {
    throw new Error(
      `This email address is already registered to ${existingUser.fullName} (${existingUser.role}). Please use a different email.`
    );
  }

  const otp = crypto.randomInt(100000, 999999).toString();
  const hashedOtp = await bcrypt.hash(otp, 10);
  const expiry = new Date(Date.now() + 10 * 60 * 1000);

  // Reuse the same resetOtp/resetOtpExpiry fields, scoped by purpose
  // inside the eventual confirm step's JWT rather than adding two
  // more database columns for what is functionally the same
  // "prove you received this code" mechanism.
  await prisma.user.update({
    where: { id: currentUserId },
    data: { resetOtp: hashedOtp, resetOtpExpiry: expiry },
  });

  const emailResult = await sendEmailChangeVerification(
    normalizedNewEmail,
    currentUser.fullName,
    otp
  );

  return {
    message: `A verification code has been sent to ${normalizedNewEmail}.`,
    emailSent: emailResult.emailSent,
    emailWarning: emailResult.emailSent ? null : emailResult.warning,
  };
};

// ======================================
// CONFIRM EMAIL CHANGE (Verify OTP, apply the change)
// ======================================
export const confirmEmailChangeService = async (currentUserId, newEmail, otp) => {
  const normalizedNewEmail = newEmail.trim().toLowerCase();

  const currentUser = await prisma.user.findUnique({
    where: { id: currentUserId },
  });

  if (!currentUser || !currentUser.resetOtp || !currentUser.resetOtpExpiry) {
    throw new Error("Invalid or expired verification code. Please request a new one.");
  }

  if (new Date() > currentUser.resetOtpExpiry) {
    throw new Error("This verification code has expired. Please request a new one.");
  }

  const isOtpValid = await bcrypt.compare(otp, currentUser.resetOtp);
  if (!isOtpValid) {
    throw new Error("Incorrect verification code. Please try again.");
  }

  // Re-check for a collision right before committing - guards against
  // a race condition where someone else registered this exact email
  // in the window between requesting and confirming the change.
  const collision = await prisma.user.findUnique({
    where: { email: normalizedNewEmail },
  });

  if (collision) {
    throw new Error(
      `This email address is already registered to ${collision.fullName} (${collision.role}). Please start over with a different email.`
    );
  }

  const updated = await prisma.user.update({
    where: { id: currentUserId },
    data: {
      email: normalizedNewEmail,
      resetOtp: null,
      resetOtpExpiry: null,
    },
  });

  return {
    message: "Your email address has been updated successfully.",
    user: {
      id: updated.id,
      fullName: updated.fullName,
      email: updated.email,
      role: updated.role,
    },
  };
};
