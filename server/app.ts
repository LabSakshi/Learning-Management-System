require("dotenv").config();
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
export const app = express();
import { ErrorMiddleWare } from "./middleware/error";
//body parser

app.use(express.json({ limit: "50mb" }));

//cookie parser

app.use(cookieParser());

//cors => cross origin resource sharing

app.use(
  cors({
    origin: process.env.ORIGIN || "http://localhost:3000", // fallback
    credentials: true, // optional if using cookies
  })
);

// testing api
app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true,
    message: "API is Working",
  });
});

//unknown rule
// Fallback for unknown routes
app.all(/.*/, (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Route '${req.originalUrl}' not found`) as any;
  error.statusCode = 404;
  next(error);
});
// Global error handler

app.use(ErrorMiddleWare);
