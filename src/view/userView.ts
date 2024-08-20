import express from "express";
const jwt = require('jsonwebtoken');

import validateSchema from "../controller/schemaController";
import { validateRegistration } from "../controller/userController";
import { registerUserSchema } from "../schema/userSchema";

const UserRouter = express.Router();

UserRouter.post(
  "/user/register",
  validateSchema(registerUserSchema),
  validateRegistration
);

// gerando JWT
const payload = {
  user: {
    
  }
}

// UserRouter.get("/users/:id"); // 1- validar se existe o ID (controller) / 2- enviar para o banco (model) / 3- banco envia os dados, e enviar os dados para final da requisição (controller)

export default UserRouter;
