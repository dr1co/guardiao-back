import { Request, Response, NextFunction } from "express";
import { hash } from "bcrypt";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import userModel from "../model/userModel";
import tokenController from "./tokenController";
import deleteUser from "../model/userModel";
import { createCheckSchema } from "express-validator/lib/middlewares/schema";

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

    await userModel.registerNewUser({
      email: body.email,
      password: hashedPassword
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

    res.status(200).send({ token });
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function validateDeleteUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = Number(res.locals.user.id); // pega id do token

  try {
    await userModel.deleteUser(user);
    res.status(200).send({ message: "Conta de usuário deletada! " });
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function userInformation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = Number(req.params.id); // pegar pelo id do token futuramente

  if (isNaN(userId) || userId <= 0) {
    return res.status(400).send({ message: "ID inválido!" });
  }

  try {
    const user = await userModel.findUserById(userId);
    if (!user) {
      return res.status(404).send({ message: "Usuário não encontrado!" });
    }
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function validateForgotPassword(
  req: Request,
  res: Response, 
  next: NextFunction
) {
  const userEmail = req.params.email;

  try {
    const user = await userModel.findUserByEmail(userEmail);

    if (!user) {
      return res.status(404).send( {message: "Usuário não encontrado!"} )
    }
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err);
  }
  
}