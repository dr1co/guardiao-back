// CREATE TABLE "user" (
//   "email" VARCHAR(60) NOT NULL UNIQUE,
//   "password" VARCHAR(255) NOT NULL,
//   "confirmPassword"
// ); 

import joi from 'joi';

export const registerUserSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
  confirmPassword: joi.string().required().valid(joi.ref("password")),
});
