import express from "express";

import validateSchema from "../controller/schemaController";
import { validateRegistration } from "../controller/childController";
import { registerChildSchema } from "../schema/childSchema"; // faz validação dos tipos
import { childInformation, childAlert, deleteChild, childActivity } from "../controller/childController";
import verifyToken from "../middleware/jwtMIddleware"

const ChildRouter = express.Router();

ChildRouter.post(
  "/child/register",
  //verifyToken,
  validateSchema(registerChildSchema),
  validateRegistration,
);

ChildRouter.get( // sem validação, pois requisição não possui body
  "/child/information",
  verifyToken,
  childInformation
);

ChildRouter.get(
  "/child/alert/:id",
  verifyToken,
  childAlert
)

ChildRouter.delete( // deleteChild retorna resultado baseado no id da rota
  "/child/delete/:id",
  verifyToken,
  deleteChild
)


ChildRouter.get(
  "child/activity/:id", // childActivity retorna resultado baseado no id da rota
  verifyToken,
  childActivity
)



export default ChildRouter;