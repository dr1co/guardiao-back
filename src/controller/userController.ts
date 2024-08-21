import { Request, Response, NextFunction } from "express";
import { hash } from "bcrypt";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

import userModel from "../model/userModel";
import tokenController from "./tokenController";

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
      name: "temp", // nome é alterado depois
    });

    res.status(201).send({ message: "Usuário criado com sucesso!" });
  } catch (err) {
    return res.status(500).send(err);
  }
}

export async function validateLogin(req: Request, res: Response, next: NextFunction) {
  const user = req.body;

  try {
    const result = await userModel.findUserByEmail(user.email);
    if (result.rowCount === 0) {
      return res.status(404).send({ message: "Usuário não encontrado!" });
    }

    // Verifica se senha está correta
    const isMatch = await bcrypt.compare(user.password, result.rows[0].password);
    if (!isMatch) {
      return res.status(401).send({ message: "Senha incorreta!" });
    }

    const token = tokenController.generateToken(user);

    res.status(200).send({token});
  } catch (err) {
    res.status(500).send(err);
  }
}