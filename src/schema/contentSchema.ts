// importante para validar os dados inseridos pelo adm e não quebrar o BD

import joi from 'joi';

export const registerContentSchema = joi.object({
  title: joi.string().required(),
  cover_url: joi.string().uri(), // Valida se é URL
  content_url: joi.string().uri().required(), // Valida se é URL
  type: joi.string().required(),
  content_time: joi.string().pattern(/^\d{2}:\d{2}:\d{2}$/) // Valida formato de tempo com um pattern de regex
});