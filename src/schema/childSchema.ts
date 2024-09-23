import joi from 'joi'

export const registerChildSchema = joi.object({
  name: joi.string().required(),
  dob: joi.string().required().pattern(/^\d{4}\/\d{2}\/\d{2}$/) // mudar idade para data de nasc
});

