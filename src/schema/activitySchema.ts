import joi from 'joi';

export const registerActivitySchema = joi.object(
 {
  childId: joi.number().required,
  type: joi.string().required(),
  message: joi.string().required(),
  content: joi.binary().required().max(1024 * 1024 * 5), // 5MB
  startOfActivity: joi.date().required(),
  endOfActivity: joi.date().required()
 });