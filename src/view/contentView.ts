import express from 'express';
import { registerContentSchema } from '../schema/contentSchema';
import validateSchema from '../controller/schemaController';
import { validateContentRegistration, deleteContent, getContentInformation } from '../controller/contentController';

const ContentRouter = express.Router();

ContentRouter.post(
  "/content/register",
  validateSchema(registerContentSchema),
  validateContentRegistration
);

ContentRouter.delete(
  "/content/delete/:id",
  deleteContent
)

ContentRouter.get(
  "/content/get/:id",
  getContentInformation
)

export default ContentRouter;