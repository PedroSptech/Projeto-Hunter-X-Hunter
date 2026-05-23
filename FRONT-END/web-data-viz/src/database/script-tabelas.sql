CREATE DATABASE HunterXHunter;
USE HunterXHunter;

CREATE TABLE Cacador (
    idCacador       INT PRIMARY KEY AUTO_INCREMENT,
    Codigo_caçador  CHAR(12)     NOT NULL UNIQUE,
    nome_Cacador    VARCHAR(100) NOT NULL UNIQUE,
    Tipo_Nen        VARCHAR(50)  NOT NULL,
    Status_cacador  VARCHAR(45)  NOT NULL,
    cidade_natal    VARCHAR(100),
    dt_Nasc         DATE,
    Tipo_cacador    VARCHAR(45)  NOT NULL,
    Ranking_cacador CHAR(10)     NOT NULL,
    Zodiaco         CHAR(3)      NOT NULL,
    foto            VARCHAR(500) DEFAULT NULL
);

ALTER TABLE Cacador ADD CONSTRAINT chk_Tipo_Nen
CHECK (Tipo_Nen IN ('INTENSIFICADOR','ESPECIALISTA','CONJURADOR','MANIPULADOR','EMISSOR','TRANSFORMADOR'));

ALTER TABLE Cacador ADD CONSTRAINT chk_zodiaco
CHECK (Zodiaco IN ('SIM','NÃO'));

ALTER TABLE Cacador ADD CONSTRAINT chk_Ranking_cacador
CHECK (Ranking_cacador IN ('Licenciado','Single','Double','Triple'));

ALTER TABLE Cacador ADD CONSTRAINT chk_Tipo_cacador
CHECK (Tipo_cacador IN ('Lista Negra','Gourmet','Arqueólogo/Ruínas','Talentos','Contrato','Músicas'));

CREATE TABLE Missao (
    idMissao         INT PRIMARY KEY AUTO_INCREMENT,
    nome_missao      VARCHAR(100) NOT NULL,
    Descricao_missao VARCHAR(250),
    status_Missao    VARCHAR(45)  NOT NULL,
    dt_missao        DATE         NOT NULL,
    grau_dificuldade CHAR(2)      NOT NULL
);

ALTER TABLE Missao ADD CONSTRAINT chk_status_missao
CHECK (status_Missao IN ('Pendente','Em Andamento','Concluída','Cancelada'));

ALTER TABLE Missao ADD CONSTRAINT chk_grau_dificuldade_missao
CHECK (grau_dificuldade IN ('C','B','A','S','S+'));

CREATE TABLE Cacador_Missao (
    fk_cacador INT NOT NULL,
    fk_missao  INT NOT NULL,
    PRIMARY KEY (fk_cacador, fk_missao),
    CONSTRAINT fk_missao_cacador FOREIGN KEY (fk_cacador) REFERENCES Cacador(idCacador),
    CONSTRAINT Cacador_Missao_ibfk_2 FOREIGN KEY (fk_missao) REFERENCES Missao(idMissao)
);

INSERT INTO Cacador (Codigo_caçador, nome_Cacador, Tipo_Nen, Status_cacador, cidade_natal, dt_Nasc, Tipo_cacador, Ranking_cacador, Zodiaco) VALUES
('XH-2024-0405', 'Gon Freecss',        'INTENSIFICADOR', 'Ativo', 'Ilha da Baleia',     '2011-05-05', 'Lista Negra', 'Single',     'NÃO'),
('XH-2024-0099', 'Killua Zoldyck',     'TRANSFORMADOR',  'Ativo', 'Montanha Kukuroo',   '2011-07-07', 'Lista Negra', 'Single',     'NÃO'),
('XH-2024-0404', 'Kurapika Kurta',     'CONJURADOR',     'Ativo', 'Província de Lukso', '1998-04-04', 'Lista Negra', 'Single',     'NÃO'),
('XH-2024-0403', 'Leorio Paradinight', 'EMISSOR',        'Ativo', 'Desconhecida',        '1995-03-03', 'Gourmet',    'Licenciado', 'NÃO'),
('XH-0000-0001', 'Isaac Netero',       'INTENSIFICADOR', 'Ativo', 'Desconhecida',        '1890-01-01', 'Lista Negra','Triple',     'SIM');

INSERT INTO Missao (nome_missao, Descricao_missao, status_Missao, dt_missao, grau_dificuldade) VALUES
('Exploração Greed Island',        'Entrar no jogo e encontrar pistas sobre Ging.',  'Concluída',    '2026-01-10', 'A'),
('Escolta de Nostrade',            'Proteger a filha da família Nostrade no leilão.','Concluída',    '2026-02-15', 'B'),
('Extermínio de Formigas Quimera', 'Eliminar a ameaça das formigas no NGL.',         'Concluída',    '2026-03-20', 'S'),
('Treinamento de Nen',             'Aprimorar técnicas de combate.',                 'Em Andamento', '2026-04-01', 'C'),
('Exame de Medicina',              'Estudar para se tornar médico licenciado.',      'Pendente',     '2026-05-01', 'C');

INSERT INTO Cacador_Missao (fk_cacador, fk_missao) VALUES
(1, 1),(3, 2),(5, 3),(2, 4),(4, 5);

/*
Missões por grau de dificuldade:

SELECT grau_dificuldade, COUNT(*) AS quantidade
FROM Missao
GROUP BY grau_dificuldade
ORDER BY CASE grau_dificuldade
    WHEN 'C'  THEN 1
    WHEN 'B'  THEN 2
    WHEN 'A'  THEN 3
    WHEN 'S'  THEN 4
    WHEN 'S+' THEN 5
END;

Status das missões:

SELECT status_Missao, COUNT(*) AS quantidade
FROM Missao
GROUP BY status_Missao;
*/