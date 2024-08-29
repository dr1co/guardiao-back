import express from 'express';
import validateSchema from '../controller/schemaController';
import { registerActivitySchema } from '../schema/activitySchema';
import { validadeActivityRegistration} from "../controller/activityController"

const ActivityRouter = express.Router();

ActivityRouter.post(
  "/activity/register",
  validateSchema(registerActivitySchema),
  validadeActivityRegistration
)

export default ActivityRouter;