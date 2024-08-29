import activityModel from "../model/activityModel";
import { Request, Response, NextFunction } from 'express';

export async function validadeActivityRegistration(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const activity = req.body;

    await activityModel.registerNewActivity(activity);
    res.status(201).send({ message: "Atividade cadastrada!" });
  } catch(err) {
    res.status(500).send(err);
  }
};