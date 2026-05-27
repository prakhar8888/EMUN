const apiResponse = ({
  success = true,
  statusCode = 200,
  message = "",
  data = null,
  errors = null,
}) => {
  return {
    success,
    statusCode,
    message,

    ...(data !== null && { data }),

    ...(errors !== null && { errors }),
  };
};

export default apiResponse;
