var database = require("../database/config")

function listarPorMissao(idCacador) {
    console.log("ACESSEI O MISSAO MODEL \n function listarPorMissao()");
    var instrucaoSql = `
        SELECT 
            m.idMissao, 
            m.nome_missao, 
            m.Descricao_missao, 
            m.status_Missao,
            m.grau_dificuldade,
        DATE_FORMAT(m.dt_missao, '%d/%m/%Y') AS data,
            c.nome_Cacador,
            c.Tipo_Nen
        FROM Missao m
        JOIN Cacador_Missao cm ON m.idMissao = cm.fk_missao
        JOIN Cacador c ON cm.fk_cacador = c.idCacador
        WHERE cm.fk_cacador = ${idCacador};`
    return database.executar(instrucaoSql);
}

function publicar(nome, descricao, status, grauDificuldade, dtMissao) {
    console.log("ACESSEI O MISSAO MODEL \n function publicar()");
    var instrucaoSql = `
        INSERT INTO Missao (nome_missao, Descricao_missao, status_Missao, dt_missao, grau_dificuldade) 
        VALUES ('${nome}', '${descricao}', '${status}', '${dtMissao}', '${grauDificuldade}');
    `;
    return database.executar(instrucaoSql);
}

function vincular(idCacador, idMissao) {
    console.log("ACESSEI O MISSAO MODEL \n function vincular()");
    let instrucao = `
        INSERT INTO Cacador_Missao (fk_cacador, fk_missao) 
        VALUES (${idCacador}, ${idMissao});
    `;
    return database.executar(instrucao);
}

function missoes(){
    console.log("ACESSEI O MISSAO MODEL \n function missoes()");
    let instrucao = `
    SELECT m.idMissao, m.nome_missao, m.Descricao_missao, m.status_Missao, m.dt_missao, grau_dificuldade FROM Missao AS m;
    `
    return database.executar(instrucao);
}

function totalMissoes(){
    console.log("ACESSEI O MISSAO MODEL \n function totalMissoes()");
    let instrucao = `
    SELECT COUNT(*) AS quantidade 
    FROM Missao;
    `
    return database.executar(instrucao);
}

function grauDificuldade(){
    console.log("ACESSEI O MISSAO MODEL \n function grauDificuldade()");
    let instrucao = `
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
    `
    return database.executar(instrucao);
}

function status(){
    console.log("ACESSEI O MISSAO MODEL \n function status()");
    let instrucao = `
        SELECT status_Missao, COUNT(*) AS quantidade
        FROM Missao
        GROUP BY status_Missao;
    `
    return database.executar(instrucao);
}

module.exports = {
    listarPorMissao,
    publicar,
    vincular,
    missoes,
    totalMissoes,
    grauDificuldade,
    status
}