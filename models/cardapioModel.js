import pool from "../config/db.js";

export const getAllCardapios = async () => {
  const [rows] = await pool.query("SELECT * FROM cardapio ORDER BY data DESC");
  return rows;
};

export const createCardapio = async ({ nome, descricao, calorias, data_cardapio }) => {
  const [result] = await pool.query(
    "INSERT INTO cardapio (nome, descricao, calorias, data) VALUES (?, ?, ?, ?)",
    [nome, descricao, calorias, data_cardapio]
  );
  return result.insertId;
};

export const getCardapioById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM cardapio WHERE id = ?", [id]);
  return rows[0];
};

export const updateCardapio = async (id, { nome, descricao, calorias, data_cardapio }) => {
  await pool.query(
    "UPDATE cardapio SET nome=?, descricao=?, calorias=?, data=? WHERE id=?",
    [nome, descricao, calorias, data_cardapio, id]
  );
};

export const deleteCardapio = async (id) => {
  await pool.query("DELETE FROM cardapio WHERE id = ?", [id]);
};
