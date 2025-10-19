import pool from "../config/db.js";

export const getAllCardapios = async () => {
  const [rows] = await pool.query("SELECT * FROM cardapio ORDER BY data DESC");
  return rows;
};

export const createCardapio = async (data) => {
  const { nome, descricao, calorias, data_cardapio } = data;
  const [result] = await pool.query(
    "INSERT INTO cardapio (nome, descricao, calorias, data) VALUES (?, ?, ?, ?)",
    [nome, descricao, calorias, data_cardapio]
  );
  return result.insertId;
};
