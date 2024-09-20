
// faz validação
import joi from 'joi';

export const registerUserSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

export const loginUserSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});
