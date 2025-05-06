import { Request, Response, NextFunction } from "express";
import { STATUSCODE } from "../utils/statuscode";

export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode = STATUSCODE.INTERNAL_SERVER_ERROR) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  let statusCode = err.statusCode || STATUSCODE.INTERNAL_SERVER_ERROR;
  let message = err.message || "Internal Server Error";

  if (Array.isArray(err.errors) && err.errors[0]?.msg && err.errors[0]?.param) {
    statusCode = STATUSCODE.BAD_REQUEST;
    return res.status(statusCode).json({
      message: "Validation Error",
      errors: err.errors.map((e: any) => ({
        field: e.param,
        message: e.msg,
      })),
    });
  }

  if (err instanceof AppError) {
    return res.status(statusCode).json({ message });
  }

  console.error("Unexpected Error:", err);

  return res.status(statusCode).json({ message: "Something went wrong" });
};
