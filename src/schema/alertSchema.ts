import joi from 'joi';

export const registerAlertSchema = joi.object({
  childId: joi.number().required(),
  type: joi.string().required(),
  message: joi.string().required(),
  // Verificar se é imagem posteriormente:
  content: joi.binary().required().max(1024 * 1024 * 5), // 5MB
  createdAt: joi.date().timestamp()
});