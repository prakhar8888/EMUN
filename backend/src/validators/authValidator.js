import Joi from "joi";


// ======================================
// SIGNUP VALIDATION
// ======================================

export const signupSchema =
  Joi.object({

    fullName:
      Joi.string()
        .min(3)
        .max(80)
        .required()
        .messages({

          "string.empty":
            "Full name is required",

          "string.min":
            "Full name must be at least 3 characters",
        }),


    email:
      Joi.string()
        .email()
        .required()
        .messages({

          "string.email":
            "Please enter a valid email",

          "string.empty":
            "Email is required",
        }),


    password:
      Joi.string()
        .min(6)
        .required()
        .messages({

          "string.min":
            "Password must be at least 6 characters",

          "string.empty":
            "Password is required",
        }),


    university:
      Joi.string()
        .allow("")
        .optional(),


    country:
      Joi.string()
        .allow("")
        .optional(),
  });


// ======================================
// LOGIN VALIDATION
// ======================================

export const loginSchema =
  Joi.object({

    email:
      Joi.string()
        .email()
        .required()
        .messages({

          "string.email":
            "Please enter a valid email",

          "string.empty":
            "Email is required",
        }),


    password:
      Joi.string()
        .required()
        .messages({

          "string.empty":
            "Password is required",
        }),
  });
