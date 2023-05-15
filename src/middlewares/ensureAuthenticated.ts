import { verify } from "jsonwebtoken";
import AppError from "../utils/appError";
import { authConfig } from "../config/auth";
import { Request, Response, NextFunction } from "express";

type JwtPayload = {
  sub: string;
};

export default function EnsureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new AppError("JWT not found", 401);
  }
  const [, token] = authHeader.split(" ");
  try {
    const { sub } = verify(token, authConfig.jwt.secret) as JwtPayload;
    request.user = Number(sub);
    return next();
  } catch {
    throw new AppError("JWT Token Invalid", 401);
  }
}
