import express from "express";

import validateSchema from "../controller/schemaController";
import { validateRegistration } from "../controller/childController";
import { registerChildSchema } from "../schema/childSchema";

const ChildRouter = express.Router();

ChildRouter.post(
  "/child/register",
  validateSchema(registerChildSchema),
  validateRegistration,
);

ChildRouter.get( // sem validação, pois requisição não possui body
  "/child/information/:id"
)



export default ChildRouter;