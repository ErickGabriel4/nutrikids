import pool from "../config/db.js";

// retorna usuário com a senha (hash) por email
export const getUsuarioByEmail = async (email) => {
  const [rows] = await pool.query("SELECT * FROM usuarios WHERE email = ?", [email]);
  return rows[0];
};

// cria usuário (com hash já gerado)
export const createUsuario = async ({ nome, email, senhaHash, tipo = 'nutricionista' }) => {
  const [result] = await pool.query(
    "INSERT INTO usuarios (nome, email, senha, tipo) VALUES (?, ?, ?, ?)",
    [nome, email, senhaHash, tipo]
  );
  return result.insertId;
};
