import Joi from "joi";

// ======================================
// COMMON VALIDATORS
// ======================================

const fullNameValidator =
  Joi.string()
    .trim()
    .min(3)
    .max(80)
    .required()
    .messages({
      "string.empty": "Full name is required",
      "string.min": "Full name must be at least 3 characters",
      "string.max": "Full name cannot exceed 80 characters",
      "any.required": "Full name is required",
    });

const emailValidator =
  Joi.string()
    .trim()
    .lowercase()
    .email({
      tlds: {
        allow: false,
      },
    })
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.email": "Please enter a valid email address",
      "any.required": "Email is required",
    });

const passwordValidator =
  Joi.string()
    .min(8)
    .max(128)
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/
    )
    .required()
    .messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 8 characters",
      "string.max": "Password is too long",
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      "any.required": "Password is required",
    });

const otpValidator =
  Joi.string()
    .trim()
    .length(6)
    .pattern(/^\d{6}$/)
    .required()
    .messages({
      "string.empty": "Reset code is required",
      "string.length": "Reset code must be exactly 6 digits",
      "string.pattern.base": "Reset code must contain only numbers",
      "any.required": "Reset code is required",
    });

const requestedPermissionsValidator =
  Joi.object({
    canManageEvents: Joi.boolean().optional(),
    canManageRegistrations: Joi.boolean().optional(),
    canManageCommittees: Joi.boolean().optional(),
    canManageFeedback: Joi.boolean().optional(),
    canManageContact: Joi.boolean().optional(),
    canCreateStaff: Joi.boolean().optional(),
  }).optional();

// ======================================
// SIGNUP VALIDATION (Admin-only staff creation)
// ======================================

export const signupSchema =
  Joi.object({

    fullName: fullNameValidator,
    email: emailValidator,
    password: passwordValidator,

    university:
      Joi.string()
        .trim()
        .max(120)
        .allow("")
        .optional()
        .messages({
          "string.max": "Institute name is too long",
        }),

    country:
      Joi.string()
        .trim()
        .max(80)
        .allow("")
        .optional()
        .messages({
          "string.max": "Country name is too long",
        }),

    phone:
      Joi.string()
        .trim()
        .max(20)
        .allow("")
        .optional(),

    designation:
      Joi.string()
        .trim()
        .max(100)
        .allow("")
        .optional()
        .messages({
          "string.max": "Designation is too long",
        }),

    // role is intentionally NOT accepted from the client at all.
    // Every account created through this endpoint is forced to
    // SECRETARIAT server-side, in registerUserService - there is
    // exactly one ADMIN account, and it can never be created or
    // escalated through this form, regardless of what any request
    // sends.

    requestedPermissions: requestedPermissionsValidator,

  })
    .options({
      abortEarly: false,
      stripUnknown: true,
    });

// ======================================
// LOGIN VALIDATION
// ======================================

export const loginSchema =
  Joi.object({
    email: emailValidator,

    password:
      Joi.string()
        .required()
        .messages({
          "string.empty": "Password is required",
          "any.required": "Password is required",
        }),
  })
    .options({
      abortEarly: false,
      stripUnknown: true,
    });

// ======================================
// REQUEST PASSWORD RESET (Step 1: send OTP)
// ======================================

export const requestPasswordResetSchema =
  Joi.object({
    email: emailValidator,
  })
    .options({
      abortEarly: false,
      stripUnknown: true,
    });

// ======================================
// VERIFY RESET OTP (Step 2)
// ======================================

export const verifyResetOtpSchema =
  Joi.object({
    email: emailValidator,
    otp: otpValidator,
  })
    .options({
      abortEarly: false,
      stripUnknown: true,
    });

// ======================================
// RESET PASSWORD (Step 3: set new password)
// ======================================

export const resetPasswordSchema =
  Joi.object({
    resetToken:
      Joi.string()
        .required()
        .messages({
          "string.empty": "Reset session is missing",
          "any.required": "Reset session is missing",
        }),

    newPassword: passwordValidator,
  })
    .options({
      abortEarly: false,
      stripUnknown: true,
    });

// ======================================
// REQUEST EMAIL CHANGE (Step 1: send OTP to new email)
// ======================================

export const requestEmailChangeSchema =
  Joi.object({
    newEmail: emailValidator,
  })
    .options({
      abortEarly: false,
      stripUnknown: true,
    });

// ======================================
// CONFIRM EMAIL CHANGE (Step 2: verify OTP, apply change)
// ======================================

export const confirmEmailChangeSchema =
  Joi.object({
    newEmail: emailValidator,
    otp: otpValidator,
  })
    .options({
      abortEarly: false,
      stripUnknown: true,
    });
