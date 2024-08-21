import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET;

if (!secretKey) {
  throw new Error('JWT_SECRET environment variable is not set');
}

// chamar nas próximas rotas 
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: 'Unauthorizated '});
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    res.locals.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token '});
  }
}

export default verifyToken;