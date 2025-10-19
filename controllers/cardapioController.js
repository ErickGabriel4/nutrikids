import { getAllCardapios, createCardapio } from "../models/cardapioModel.js";
import { cardapioSchema } from "../validators/cardapioValidator.js";

export const listarCardapios = async (req, res) => {
  const cardapios = await getAllCardapios();
  res.render("cardapio", { cardapios });
};

export const cadastrarCardapio = async (req, res) => {
  try {
    const { error, value } = cardapioSchema.validate(req.body);
    if (error) {
      return res.status(400).render("cardapio", {
        error: error.details[0].message,
        cardapios: await getAllCardapios()
      });
    }

    await createCardapio(value);
    res.redirect("/cardapio");
  } catch (err) {
    res.status(500).send("Erro ao cadastrar cardápio: " + err.message);
  }
};
