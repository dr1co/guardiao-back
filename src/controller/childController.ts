import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

import childModel from "../model/childModel";
import deleteChildById from "../model/childModel";

dotenv.config(); // configurando variáveis de ambiente

// pegando body do registro
export async function validateRegistration(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const body = res.locals.body;


// tenta achar a criança pelo atributo
// se achar, manda mensagem de cadastro já feito
// se não achar, registra nova criança
  try {
    const searchChild = await childModel.findChildByName(body.name);

    if (searchChild.rowCount !== 0) {
      return res.status(401).send({ message: "Criança já cadastrada!"});
    }

    await childModel.registerNewChild({
      name: body.name,
      dob: body.dob
    });
    res.status(201).send({ message: "Criança cadastrada com sucesso!"}); // (201 - Created)
  } catch (err) { // mensagem quando há erro de conexão (500 - Internal Server Error)
    return res.status(500).send(err);
  }
}

export async function childInformation(
  req: Request,
  res: Response,
  next: NextFunction // passa para próxima função da rota
) {
  try {
    const user = res.locals.user;
    const child = await childModel.findChildByUserId(user);
    res.status(200).send(child);
  } catch (err) {
    return res.status(500).send(err);
  }
}

export async function childAlert(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const child = Number(req.params.id); // pega parâmetro da rota
    const alert = await childModel.findAlertByChildId(child);
    res.status(200).send(alert);
  } catch(err) {
    return res.status(500).send(err);
  }
}

export async function deleteChild(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const child = Number(req.params.id);
    await childModel.deleteChildById(child);
    res.status(200).send({ message: "Criança deletada com sucesso!" });
  } catch(err) {
    return res.status(500).send(err);
  }
  
}