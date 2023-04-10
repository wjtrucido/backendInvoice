import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken'

export const requireToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token!, process.env.PRIVATE_KEY!) as JwtPayload;
    if (!decoded.uid) throw new Error("Invalid token");
    console.log(decoded);
    next();
  } catch (error: unknown) {
    return res.status(403).json({ error });
  }
};