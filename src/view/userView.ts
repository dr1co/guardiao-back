import express from "express";

import validateSchema from "../controller/schemaController";
import { validateRegistration } from "../controller/userController";
import { validateLogin } from "../controller/userController";
import { forgotPasswordSchema, registerUserSchema } from "../schema/userSchema";
import { loginUserSchema } from "../schema/userSchema";
import verifyToken from "../middleware/jwtMIddleware";
import { validateDeleteUser } from "../controller/userController";
import { userInformation } from "../controller/userController";

const UserRouter = express.Router();

UserRouter.post(
  "/user/register",
  validateSchema(registerUserSchema),
  validateRegistration
);


// lógica de login
UserRouter.post(
  "/user/login", 
  validateSchema(loginUserSchema),
  validateLogin,
);

UserRouter.get(
  "/user/:id",
  // NÃO PRECISA VALIDAR O SCHEMA NO MÉTODO GET
  //verifyToken,
  userInformation
) // 1- validar se existe o ID (controller) / 2- enviar para o banco (model) / 3- banco envia os dados, e enviar os dados para final da requisição (controller)


UserRouter.delete( // usa id do token
  "/user/delete",
  verifyToken,
  validateDeleteUser
)

UserRouter.post(
  "/user/forgot-password",
  validateSchema(forgotPasswordSchema),
  //validateForgotPassword
  // lógica de recuperação de senha
  
)

export default UserRouter;
