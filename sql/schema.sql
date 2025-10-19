--  Criação do banco de dados
CREATE DATABASE IF NOT EXISTS nutrikids;
 

USE nutrikids;

--  Tabela de usuários (nutricionistas, cozinheiras, etc.)
CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  senha VARCHAR(255) NOT NULL,
  tipo ENUM('nutricionista', 'cozinheira', 'admin') DEFAULT 'nutricionista',
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO usuarios (nome, email, senha, tipo) VALUES
('Admin NutriKids', 'admin@nutrikids.com', 'admin123', 'admin');

--  Tabela de alunos (substitui criancas)
CREATE TABLE alunos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  data_nascimento DATE NOT NULL,
  turma VARCHAR(50),
  responsavel VARCHAR(100),
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--  Tabela de restrições alimentares
CREATE TABLE restricoes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  descricao VARCHAR(255) NOT NULL,
  tipo ENUM('alergia', 'intolerancia', 'preferencia') NOT NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO restricoes (descricao, tipo) VALUES
('Alergia à lactose', 'alergia'),
('Alergia ao amendoim', 'alergia'),
('Preferência vegetariana', 'preferencia');

--  Tabela de relação aluno x restrição
CREATE TABLE aluno_restricao (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_aluno INT NOT NULL,
  id_restricao INT NOT NULL,
  FOREIGN KEY (id_aluno) REFERENCES alunos(id) ON DELETE CASCADE,
  FOREIGN KEY (id_restricao) REFERENCES restricoes(id) ON DELETE CASCADE
);

--  Tabela de cardápios
CREATE TABLE cardapio (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  descricao VARCHAR(255),
  calorias INT,
  data DATE NOT NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO cardapio (nome, descricao, calorias, data) VALUES
('Café da Manhã Infantil', 'Leite, pão integral e frutas', 320, '2025-10-20'),
('Almoço Saudável', 'Arroz, feijão, frango e salada', 550, '2025-10-20');

--  Tabela de refeições
CREATE TABLE refeicoes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  descricao VARCHAR(255),
  tipo ENUM('café_da_manha', 'almoço', 'lanche', 'jantar') NOT NULL,
  calorias INT,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO refeicoes (nome, descricao, tipo, calorias) VALUES
('Leite e frutas', 'Copo de leite integral com maçã fatiada', 'café_da_manha', 220),
('Arroz e feijão com frango', 'Prato principal do almoço', 'almoço', 480),
('Bolo integral e suco', 'Lanche da tarde', 'lanche', 260);

--  Relação entre cardápio e refeições
CREATE TABLE cardapio_refeicao (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_cardapio INT NOT NULL,
  id_refeicao INT NOT NULL,
  FOREIGN KEY (id_cardapio) REFERENCES cardapio(id) ON DELETE CASCADE,
  FOREIGN KEY (id_refeicao) REFERENCES refeicoes(id) ON DELETE CASCADE
);

INSERT INTO cardapio_refeicao (id_cardapio, id_refeicao) VALUES
(1, 1),
(2, 2);


CREATE OR REPLACE VIEW vw_cardapio_completo AS
SELECT 
  c.id AS id_cardapio,
  c.nome AS nome_cardapio,
  c.data,
  r.nome AS refeicao,
  r.tipo AS tipo_refeicao,
  r.calorias AS calorias_refeicao
FROM cardapio c
JOIN cardapio_refeicao cr ON c.id = cr.id_cardapio
JOIN refeicoes r ON r.id = cr.id_refeicao
ORDER BY c.data DESC;

