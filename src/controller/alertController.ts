import alertModel from "../model/alertModel";
import { Request, Response, NextFunction } from 'express';

export async function validateAlertRegistration(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const alert = req.body; // alerta será registrado com id de child passado no corpo da req (resolver no front-end)

    alertModel.registerNewAlert(alert);
    res.status(201).send({ message: "Alerta criado!"});
  } catch(err) {
    res.status(500).send(err);
  }
};