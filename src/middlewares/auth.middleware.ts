import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { STATUSCODE } from '../utils/statuscode';

interface AuthPayload {
  userId: string;
  role: 'user' | 'admin';
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(STATUSCODE.UNAUTHORIZED).json({ message: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as AuthPayload;
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(STATUSCODE.UNAUTHORIZED).json({ message: 'Unauthorized: Invalid token' });
  }
};

export const authorizeRole = (roles: ('user' | 'admin')[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(STATUSCODE.FORBIDDEN).json({ message: 'Forbidden: Access denied' });
    }
    next();
  };
};
