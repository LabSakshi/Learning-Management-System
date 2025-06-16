import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/ErrorHandler";

export const ErrorMiddleWare = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // wrong mongodb id error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 404);
  }

  // Duplicate Key Error
  if (err.code === 1000) {
    const message = `Duplicate ${Object.keys(err.value)} entered`;
    err = new ErrorHandler(message, 400);
  }

  // wrong jwt error

  if (err.name === "JsonWebTokenError") {
    const message = `Json token is invalid, try again`;
    err = new ErrorHandler(message, 400);
  }

  // Jwt Expired Error
  if (err.name === "JsonExpiredError") {
    const message = `Json web token is expired, try again`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
