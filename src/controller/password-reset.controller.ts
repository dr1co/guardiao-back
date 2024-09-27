import { Request, Response, NextFunction } from "express";
import userModel from "../model/userModel";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const nodemailer = require("nodemailer");

dotenv.config();

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
});

const secretKey = process.env.JWT_SECRET;

export async function validateForgotPassword(req: Request, res: Response, next: NextFunction) {
  const userEmail = req.body.email;

  try {
    const result = await userModel.findUserByEmail(userEmail);

    if (result.rowCount === 0) {
      return res.status(404).send({ message: "Usuário não encontrado!" });
    }

    if (!secretKey) {
      return res.status(500).send({ message: "Chave de segurança não configurada" });
    }

    const user = result.rows[0];
    const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h'});

    const mailOptions = {
      from: 'contato.suporte.guardiao@gmail.com',
      to: userEmail,
      subject: 'Redefinição de senha | Guardião',
      text: `Clique neste link para redefinir a sua senha: ${process.env.FRONTEND_URL}/recuperacao/criar?token=${token}. Esse link expira em 1 hora. Após esse tempo, solicite o reenvio do e-mail de recuperação de senha pelo aplicativo.`
    };

    transporter.sendMail(mailOptions, (err: any, info: any) => {
      if (err) {
        console.log(err);
        return res.status(500).send({ message: "Erro ao enviar e-mail." });
      }
      res.status(200).send({ message: 'E-mail de recuperação de senha enviado com sucesso!' });
    });
  } catch(err) {
    res.status(500).send(err);
  }
}

export async function resetPasswordSchema(req: Request, res: Response) {
  const token = req.query.token;
  const newPassword = req.body.newPassword; // no data (front-end) deve ter mesmo nome

  if (!token) {
    return res.status(401).send( { message: "Token não existe." } );
  }

  if (!secretKey) {
    return res.status(500).send( { message: "Chave de segurança não configurada." } )
  }

  try {
    const decodedToken = jwt.verify(token as string, secretKey) as {id: number};
    const userId = decodedToken.id;

    if (!userId) {
      return res.status(400).send({ message: "Token inválido ou expirado!"});
    }

    const user = await userModel.findUserById(userId);

    if (!user) {
      return res.status(404).send({ message: 'Usuário não encontrado. '});
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await userModel.updateUserPassword(userId, hashedPassword);

    res.status(200).send({ message: 'Senha redefinida com sucesso! '});
  } catch (err) {
    res.status(500).send(err);
  }
}