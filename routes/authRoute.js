import express from "express";
import { renderLogin, login } from "../controllers/authController.js";

const router = express.Router();

router.get("/", renderLogin);       // GET /auth  -> mostra login.ejs
router.post("/login", login);       // POST /auth/login -> autentica e retorna token

export default router;
