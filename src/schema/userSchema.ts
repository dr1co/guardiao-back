
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

export const forgotPasswordSchema = joi.object({
  email: joi.string().email().required(),
});

export const resetPasswordSchema = joi.object({
  password: joi.string().required()
});