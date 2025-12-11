import express from "express";
import { 
  listarCardapios,
  cadastrarCardapio,
  carregarCardapioEdicao,
  atualizarCardapio,
  excluirCardapio
} from "../controllers/cardapioController.js";

const router = express.Router();

// READ
router.get("/", listarCardapios);

// CREATE
router.post("/novo", cadastrarCardapio);

// UPDATE – carregar view
router.get("/editar/:id", carregarCardapioEdicao);

// UPDATE – salvar alterações
router.post("/editar/:id", atualizarCardapio);

// DELETE
router.post("/excluir/:id", excluirCardapio);

export default router;
