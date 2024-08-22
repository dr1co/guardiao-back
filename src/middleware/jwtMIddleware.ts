import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import userModel from "../model/userModel";
import findUserById from "../model/userModel"

const secretKey = process.env.JWT_SECRET;

if (!secretKey) {
  throw new Error('JWT_SECRET environment variable is not set');
}

// chamar nas próximas rotas 
const verifyToken =  async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized '});
  }

  try {
    const decoded = jwt.verify(token, secretKey) as {id: number};
    res.locals.user = decoded;
    const verify = await userModel.findUserById(decoded.id);
    if (!verify.rows[0]) {
      return res.status(404).send({ error: "User not found"});
    }
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token '});
  }
}

export default verifyToken;