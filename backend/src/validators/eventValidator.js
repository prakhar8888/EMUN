import Joi from "joi";

// ======================================
// EVENT VALIDATION SCHEMA
// ======================================

export const eventSchema =
  Joi.object({

    // ======================================
    // TITLE
    // ======================================

    title:
      Joi.string()
        .trim()
        .min(3)
        .max(200)
        .required()
        .messages({

          "string.empty":
            "Event title is required",

          "string.min":
            "Event title must be at least 3 characters",

          "string.max":
            "Event title cannot exceed 200 characters",
        }),


    // ======================================
    // SLUG
    // ======================================

    slug:
      Joi.string()
        .trim()
        .lowercase()
        .pattern(/^[a-z0-9-]+$/)
        .min(3)
        .max(200)
        .required()
        .messages({

          "string.empty":
            "Slug is required",

          "string.min":
            "Slug must be at least 3 characters",

          "string.pattern.base":
            "Slug can only contain lowercase letters, numbers and hyphens",
        }),


    // ======================================
    // DESCRIPTION
    // ======================================

    description:
      Joi.string()
        .trim()
        .min(10)
        .max(5000)
        .required()
        .messages({

          "string.empty":
            "Description is required",

          "string.min":
            "Description must be at least 10 characters",
        }),


    // ======================================
    // LOCATION
    // ======================================

    location:
      Joi.string()
        .trim()
        .min(2)
        .max(200)
        .required()
        .messages({

          "string.empty":
            "Location is required",

          "string.min":
            "Location must be at least 2 characters",
        }),


    // ======================================
    // EVENT HIGHLIGHT
    // ======================================

    highlight:
      Joi.string()
        .trim()
        .max(300)
        .allow("")
        .optional()
        .messages({

          "string.max":
            "Highlight cannot exceed 300 characters",
        }),


    // ======================================
    // START DATE
    // ======================================

    startDate:
      Joi.date()
        .required()
        .messages({

          "date.base":
            "Please provide a valid start date",

          "any.required":
            "Start date is required",
        }),


    // ======================================
    // END DATE
    // ======================================

    endDate:
      Joi.date()
        .greater(
          Joi.ref(
            "startDate"
          )
        )
        .required()
        .messages({

          "date.base":
            "Please provide a valid end date",

          "date.greater":
            "End date must be after start date",

          "any.required":
            "End date is required",
        }),


    // ======================================
    // BANNER URL
    // ======================================

    bannerUrl:
      Joi.string()
        .trim()
        .uri()
        .allow("")
        .optional()
        .messages({

          "string.uri":
            "Please provide a valid banner URL",
        }),


    // ======================================
    // PUBLISHED
    // ======================================

    isPublished:
      Joi.boolean()
        .optional(),

  })

    .options({

      abortEarly: false,

      stripUnknown: true,

    });
