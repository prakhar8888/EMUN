import Joi from "joi";

export const eventSchema = Joi.object({
  title: Joi.string()
    .trim()
    .min(3)
    .max(200)
    .required(),

  slug: Joi.string()
    .trim()
    .lowercase()
    .required(),

  description: Joi.string()
    .trim()
    .min(10)
    .required(),

  location: Joi.string()
    .trim()
    .min(2)
    .max(200)
    .required(),

  date: Joi.date()
    .required(),

  imageUrl: Joi.string()
    .trim()
    .uri()
    .optional(),

  isPublished: Joi.boolean()
    .optional(),
});
