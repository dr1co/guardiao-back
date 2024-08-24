import express from "express";
import validateSchema from "../controller/schemaController";
import { registerAlertSchema } from "../schema/alertSchema";
import { validateAlertRegistration } from "../controller/alertController";

const AlertRouter = express.Router();

AlertRouter.post(
  "/alert/register",
  validateSchema(registerAlertSchema),
  validateAlertRegistration
);

export default AlertRouter;