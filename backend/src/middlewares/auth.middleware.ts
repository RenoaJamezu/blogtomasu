import {
  Request,
  Response,
  NextFunction
} from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  userId?: string;
}

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const token = req.cookies["accessToken"];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    };

    const secret = process.env["JWT_SECRET_KEY"] as string;
    if (!secret) {
      return res.status(500).json({ message: "JWT secret missing" });
    };

    const payload = jwt.verify(token, secret) as { userId: string };
    req.userId = payload.userId;

    return next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default requireAuth;