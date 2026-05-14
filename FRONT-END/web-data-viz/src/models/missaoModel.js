var database = require("../database/config")

function listarPorCacador(idCacador) {
    console.log("ACESSEI O MISSAO MODEL \n function listarPorCacador()");
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

module.exports = {
    listarPorCacador,
    publicar,
    vincular,
    missoes
}