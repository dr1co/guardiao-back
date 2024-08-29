import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

export default function validateSchema(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const request = req;
    const { body } = request;

    const valid = schema.validate(body);

    if (valid.error) {
      return res.status(422).send(valid.error.details);
    }

    res.locals.body = body;
    next();
  };
}

