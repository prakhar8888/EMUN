const errorMiddleware = (err, req, res, next) => {
  console.error(err);

  const statusCode =
    res.statusCode && res.statusCode !== 200
      ? res.statusCode
      : err.statusCode || 500;

  const response = {
    success: false,
    message:
      err.message || "Internal Server Error",
  };

  // Show stack trace only in development
  if (process.env.NODE_ENV === "development") {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};

export default errorMiddleware;
