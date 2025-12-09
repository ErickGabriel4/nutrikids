import express from "express";
import { listarCardapios, cadastrarCardapio } from "../controllers/cardapioController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.get("/", listarCardapios);
router.post("/novo", authenticateToken, cadastrarCardapio); // somente usuários autenticados podem criar

export default router;
