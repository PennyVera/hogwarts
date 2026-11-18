import * as z from "zod";

export default function errorhandler(err, req, res, next) {
  console.error(err.message);

  const statusCode = err instanceof z.ZodError ? 400 : err.statusCode || 500;

  let error = "Internal server error";
  if (statusCode === 404) {
    error = "not found";
  } else if (statusCode === 400) {
    error = "bad request";
  }

  res.status(statusCode).json({
    message: err.message,
    error,
    status: statusCode,
  });
}
