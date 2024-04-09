import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

interface AuthRequest extends Request {
  auth?: {
    userId: string;
  };
}

export default (req: AuthRequest, res: Response, next: NextFunction): void => {
  try {
    const token: string = req.headers.authorization?.split(" ")[1] || "";
    const decodedToken: any = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId: string = decodedToken.userId;
    req.auth = { userId };
    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};
