import { getUsuarioByEmail } from "../models/usuarioModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1d";

export const renderLogin = (req, res) => {
  res.render("login");
};

export const login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    if (!email || !senha) {
      return res.status(400).json({ message: "Email e senha são obrigatórios" });
    }

    const usuario = await getUsuarioByEmail(email);
    if (!usuario) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    // Payload mínimo; não coloque dados sensíveis
    const payload = { id: usuario.id, nome: usuario.nome, tipo: usuario.tipo };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    return res.json({ token, user: payload });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erro no servidor" });
  }
};
 