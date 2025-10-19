import express from "express";
import { listarCardapios, cadastrarCardapio } from "../controllers/cardapioController.js";
const router = express.Router();

router.get("/", listarCardapios);
router.post("/novo", cadastrarCardapio);

export default router;
