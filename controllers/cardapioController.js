import { 
  getAllCardapios, 
  createCardapio,
  getCardapioById,
  updateCardapio,
  deleteCardapio
} from "../models/cardapioModel.js";

import { cardapioSchema } from "../validators/cardapioValidator.js";

// LISTAR
export const listarCardapios = async (req, res) => {
  const cardapios = await getAllCardapios();
  res.render("cardapio", { cardapios, editar: false });
};

// CRIAR
export const cadastrarCardapio = async (req, res) => {
  try {
    const { error, value } = cardapioSchema.validate(req.body);

    if (error) {
      return res.render("cardapio", {
        error: error.details[0].message,
        cardapios: await getAllCardapios(),
        editar: false
      });
    }

    await createCardapio(value);
    res.redirect("/cardapio");
  } catch (err) {
    res.status(500).send("Erro ao cadastrar cardápio: " + err.message);
  }
};

// CARREGAR CARDÁPIO PARA EDIÇÃO
export const carregarCardapioEdicao = async (req, res) => {
  const id = req.params.id;

  const cardapio = await getCardapioById(id);
  const cardapios = await getAllCardapios();

  res.render("cardapio", {
    editar: true,
    cardapio,
    cardapios
  });
};

// ATUALIZAR
export const atualizarCardapio = async (req, res) => {
  try {
    const { error, value } = cardapioSchema.validate(req.body);
    const id = req.params.id;

    if (error) {
      return res.render("cardapio", {
        error: error.details[0].message,
        cardapio: await getCardapioById(id),
        cardapios: await getAllCardapios(),
        editar: true
      });
    }

    await updateCardapio(id, value);
    res.redirect("/cardapio");
  } catch (err) {
    res.status(500).send("Erro ao atualizar cardápio: " + err.message);
  }
};

// EXCLUIR
export const excluirCardapio = async (req, res) => {
  const id = req.params.id;
  await deleteCardapio(id);
  res.redirect("/cardapio");
};
