const validateBody = (schema) => {

  return (
    req,
    res,
    next
  ) => {

    const { error } =
      schema.validate(
        req.body,
        {
          abortEarly: false,

          stripUnknown: true,
        }
      );

    // ======================================
    // VALIDATION FAILED
    // ======================================

    if (error) {

      return res.status(400).json({
        success: false,

        message:
          "Validation failed",

        errors:
          error.details.map(
            (detail) =>
              detail.message
          ),
      });
    }

    next();
  };
};

export default validateBody;
