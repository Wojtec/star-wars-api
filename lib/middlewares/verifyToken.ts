import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config";

interface payloadInterface {
  _id: string;
  iat: number;
  exp: number;
}

export class TokenValidation {
  //Verify token
  public verifyToken = (req: Request, res: Response, next: NextFunction) => {
    try {
      const bearerHeader: string | undefined = req.headers.authorization;
      const token: string | undefined =
        bearerHeader && bearerHeader.split(" ")[1];

      if (!token) return res.status(401).send({ message: "Unauthorized" });

      const payload = jwt.verify(token, config.secret) as payloadInterface;
      req.userId = payload._id;
      next();
    } catch (err) {
      next(err);
    }
  };
}
