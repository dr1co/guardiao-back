import express from "express";

import validateSchema from "../controller/schemaController";
import { validateRegistration } from "../controller/userController";
import { validateLogin } from "../controller/userController";
import { registerUserSchema } from "../schema/userSchema";
import { loginUserSchema } from "../schema/userSchema";
import verifyToken from "../middleware/jwtMIddleware";
import { validateDeleteUser } from "../controller/userController";

const UserRouter = express.Router();

UserRouter.post(
  "/user/register",
  validateSchema(registerUserSchema),
  async (req, res, next) => {
    try {
      const user = await validateRegistration(req.body, res, next);
    } catch (error) {
      next(error);
    } 
  }
);


// lógica de login
UserRouter.post(
  "/user/login", 
  validateSchema(loginUserSchema),
  validateLogin,
);

// UserRouter.get("/users/:id"); // 1- validar se existe o ID (controller) / 2- enviar para o banco (model) / 3- banco envia os dados, e enviar os dados para final da requisição (controller)


UserRouter.delete( // usa id do token
  "/user/delete",
  verifyToken,
  validateDeleteUser

)
export default UserRouter;
