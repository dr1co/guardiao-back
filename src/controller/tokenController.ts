import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const secretKey = process.env.JWT_SECRET || "guardiao";

interface UserInterface {
  id: number,
  name: string,
  email: string,
}

const generateToken = (user: UserInterface) => {
  const newToken = jwt.sign(user, secretKey, { expiresIn: "1h"});

  return newToken;
}

const tokenController = { generateToken }

export default tokenController;