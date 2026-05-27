import Joi from "joi";

export const feedbackSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .required(),

  email: Joi.string()
    .trim()
    .email()
    .required(),

  message: Joi.string()
    .trim()
    .min(10)
    .max(1000)
    .required(),
});
