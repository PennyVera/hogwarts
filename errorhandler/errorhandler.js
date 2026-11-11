export default (err, req, res, next) => {
  console.error(err.message);

  const statusCode = err.statusCode || 500;
  let error = "Internal server error";
  if (statusCode === 404) {
    error = "not found";
  } else if (statusCode === 400) {
    error = "bad request";
  }
  res.status(statusCode).json({
    message: err.message,
    error: error,
    status: statusCode,
  });
};
