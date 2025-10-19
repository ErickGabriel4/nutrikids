import Joi from "joi";

export const cardapioSchema = Joi.object({
  nome: Joi.string().min(3).max(100).required(),
  descricao: Joi.string().max(255).required(),
  calorias: Joi.number().integer().positive().required(),
  data_cardapio: Joi.date().required()
});
