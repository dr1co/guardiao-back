import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

import childModel from "../model/childModel";

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