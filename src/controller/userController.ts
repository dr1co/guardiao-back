import { Request, Response, NextFunction } from "express";
import { hash } from "bcrypt";
import dotenv from "dotenv";

import userModel from "../model/userModel";

dotenv.config();
const bcryptSync = Number(process.env.BCRYPT) | 8;

export async function validateRegistration(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const body = res.locals.body;

  try {
    const searchUser = await userModel.findUserByEmail(body.email);

    if (searchUser.rowCount !== 0) {
      return res.status(401).send({ message: "E-mail já cadastrado!" });
    }

    const hashedPassword = await hash(body.password, bcryptSync);

    console.log(hashedPassword);
    await userModel.registerNewUser({
      email: body.email,
      password: hashedPassword,
      name: "temp",
    });

    res.status(201).send({ message: "Usuário criado com sucesso!" });
  } catch (err) {
    return res.status(500).send(err);
  }
}
