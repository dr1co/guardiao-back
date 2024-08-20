import joi from 'joi'

export const registerChildSchema = joi.object({
  name: joi.string().required(),
  dob: joi.date().required() // mudar idade para data de nasc
});