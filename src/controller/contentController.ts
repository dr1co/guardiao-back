import { Request, Response, NextFunction} from 'express';
import contentModel from '../model/contentModel';
import childModel from '../model/childModel';

export async function validateContentRegistration(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const body = res.locals.body;
  try {
    const searchContent = await contentModel.findContentByTitle(body.title);

    if (searchContent.rowCount !== 0) {
      return res.status(401).send({message: "Conteúdo já cadastrado!"});
    }

    await contentModel.registerNewContent({
      title: body.title,
      cover_url: body.cover_url,
      content_url: body.content_url,
      type: body.type,
      content_time: body.content_time
    });
    res.status(201).send( { message: "Conteúdo cadastrado com sucesso! "} );
  } catch(err) {
    res.status(500).send(err);
  }
};

export async function deleteContent(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);
    await contentModel.deleteContentById(id);
    res.status(200).send({message: "Conteúdo deletado com sucesso!"});
  } catch(err) {
    res.status(500).send(err);
  }
}

export async function getContentInformation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);
    const content = await contentModel.getContentById(id);
    res.status(200).send(content);
  } catch (err) {
    res.status(500).send(err);
  }

}