import express from "express";

import validateSchema from "../controller/schemaController";
import { validateRegistration } from "../controller/childController";
import { registerChildSchema } from "../schema/childSchema";
import { childInformation, childAlert, deleteChild } from "../controller/childController";
import verifyToken from "../middleware/jwtMIddleware"

const ChildRouter = express.Router();

ChildRouter.post(
  "/child/register",
  verifyToken,
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

ChildRouter.delete(
  "/child/delete/:id",
  verifyToken,
  deleteChild
)

export default ChildRouter;