import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || "defaultSecret";

interface JwtPayload {
  username: string;
}

export function authenticateToken(req: Request, res: Response, next: NextFunction): Response | void {
const authHeader = req.header('Authorization');
const token = authHeader && authHeader.split(' ')[1];

if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token.' });
    if (typeof user !== 'string' && user !== undefined) {
      req.user = user as JwtPayload;
    }
    return next();
  });
}