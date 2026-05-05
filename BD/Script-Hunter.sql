CREATE DATABASE HunterXHunter;
use HunterXHunter;

CREATE TABLE Cacador (
    idCacador INT PRIMARY KEY,
    Codigo_caçador CHAR(12) NOT NULL UNIQUE,
    nome_Cacador VARCHAR(100) UNIQUE NOT NULL,
    Tipo_Nen VARCHAR(50) NOT NULL,
    Status_cacador VARCHAR(45) NOT NULL,
    cidade_natal VARCHAR(100),
    dt_Nasc DATE
);
ALTER TABLE Cacador 
ADD CONSTRAINT chk_Tipo_Nen 
CHECK (Tipo_Nen IN ('INTENSIFICADOR', 'ESPECIALISTA', 'CONJURADOR', 'MANIPULADOR', 'EMISSOR', 'TRANSFORMADOR'));

CREATE TABLE Missao (
    idMissao INT PRIMARY KEY,
    nome_missao VARCHAR(100) NOT NULL,
    Descricao_missao VARCHAR(250),
    fk_cacador INT,
    status_Missao VARCHAR(45) NOT NULL,
    dt_missao DATE NOT NULL,
    CONSTRAINT fk_missao_cacador 
        FOREIGN KEY (fk_cacador) 
        REFERENCES Cacador(idCacador)
);
CREATE TABLE Cacador_Missao (
    fk_cacador INT NOT NULL,
    fk_missao  INT NOT NULL,
    PRIMARY KEY (fk_cacador, fk_missao),
    FOREIGN KEY (fk_cacador) REFERENCES Cacador(idCacador),
    FOREIGN KEY (fk_missao)  REFERENCES Missao(idMissao)
);
ALTER TABLE Missao 
ADD CONSTRAINT chk_status_missao 
CHECK (status_Missao IN ('Pendente', 'Em Andamento', 'Concluída', 'Cancelada'));
INSERT INTO Cacador (idCacador, Codigo_caçador, nome_Cacador, Tipo_Nen, Status_cacador, cidade_natal, dt_Nasc) VALUES 
(1, 'XH-2024-0405', 'Gon Freecss', 'INTENSIFICADOR', 'Ativo', 'Ilha da Baleia', '2011-05-05'),
(2, 'XH-2024-0099', 'Killua Zoldyck', 'TRANSFORMADOR', 'Ativo', 'Montanha Kukuroo', '2011-07-07'),
(3, 'XH-2024-0404', 'Kurapika Kurta', 'CONJURADOR', 'Ativo', 'Província de Lukso', '1998-04-04'),
(4, 'XH-2024-0403', 'Leorio Paradinight', 'EMISSOR', 'Ativo', 'Desconhecida', '1995-03-03'),
(5, 'XH-0000-0001', 'Isaac Netero', 'INTENSIFICADOR', 'Ativo', 'Desconhecida', '1890-01-01');
INSERT INTO Missao (idMissao, nome_missao, Descricao_missao, fk_cacador, status_Missao, dt_missao) VALUES 
(1, 'Exploração Greed Island', 'Entrar no jogo e encontrar pistas sobre Ging Freecss.', 1, 'Concluída', '2026-01-10'),
(2, 'Escolta de Nostrade', 'Proteger a filha da família Nostrade durante o leilão de Yorknew.', 3, 'Concluída', '2026-02-15'),
(3, 'Extermínio de Formigas Quimera', 'Eliminar a ameaça das formigas no NGL.', 5, 'Concluída', '2026-03-20'),
(4, 'Treinamento de Nen', 'Aprimorar técnicas básicas e avançadas de combate.', 2, 'Em Andamento', '2026-04-01'),
(5, 'Exame de Medicina', 'Estudar para se tornar um médico licenciado.', 4, 'Pendente', '2026-05-01');

INSERT INTO Cacador_Missao (fk_cacador, fk_missao) VALUES
(1, 1),
(3, 2),
(5, 3),
(2, 4),
(4, 5);




select * from cacador;

ALTER TABLE Missao DROP FOREIGN KEY fk_missao_cacador;
ALTER TABLE Missao DROP COLUMN fk_cacador;

-- Dashboard 1: Análise de Tipo de NEN
SELECT 
    Tipo_Nen, 
    COUNT(*) AS Total_Cacadores
FROM Cacador
GROUP BY Tipo_Nen
ORDER BY Total_Cacadores ASC;

-- Dashboard 2: Status e Segurança
-- 1. Visão Geral do Status dos Caçadores
SELECT 
    Status_cacador, 
    COUNT(*) AS Quantidade
FROM Cacador
GROUP BY Status_cacador;

-- 2. Quantidade de Caçadores enviados por Missão
SELECT 
    m.nome_missao, 
    COUNT(cm.fk_cacador) AS Total_Participantes,
    m.status_Missao
FROM Missao m
LEFT JOIN Cacador_Missao cm ON m.idMissao = cm.fk_missao
GROUP BY m.idMissao, m.nome_missao, m.status_Missao;

-- Dashboard 3: Volume de Missões por Período
SELECT 
    DATE_FORMAT(dt_missao, '%Y-%m') AS Mes_Ano,
    COUNT(*) AS Total_Missoes,
    status_Missao
FROM Missao
GROUP BY Mes_Ano, status_Missao
ORDER BY Mes_Ano DESC;

-- Taxa de Sucesso Geral
SELECT 
    (SUM(CASE WHEN status_Missao = 'Concluída' THEN 1 ELSE 0 END) / COUNT(*)) * 100 AS Percentual_Sucesso
FROM Missao;

-- Ranking de caçadores por volume de missões
SELECT 
    c.nome_Cacador, 
    COUNT(cm.fk_missao) AS Total_Participacoes
FROM Cacador c
JOIN Cacador_Missao cm ON c.idCacador = cm.fk_cacador
GROUP BY c.idCacador, c.nome_Cacador
ORDER BY Total_Participacoes DESC;

-- Caçadores atualmente em campo (missões em andamento)
SELECT 
    COUNT(DISTINCT fk_cacador) AS Cacadores_Em_Campo
FROM Cacador_Missao cm
JOIN Missao m ON cm.fk_missao = m.idMissao
WHERE m.status_Missao = 'Em Andamento';