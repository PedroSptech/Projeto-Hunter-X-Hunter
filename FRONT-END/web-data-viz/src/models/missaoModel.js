var database = require("../database/config")

function listarPorCacador(idCacador) {
    console.log("ACESSEI O MISSAO MODEL \n function listarPorCacador()");
    var instrucaoSql = `
        SELECT 
            m.idMissao, 
            m.nome_missao, 
            m.Descricao_missao, 
            m.status_Missao,
        DATE_FORMAT(m.dt_missao, '%d/%m/%Y') AS data,
            c.nome_Cacador,
            c.Tipo_Nen
        FROM Missao m
        JOIN Cacador_Missao cm ON m.idMissao = cm.fk_missao
        JOIN Cacador c ON cm.fk_cacador = c.idCacador
        WHERE cm.fk_cacador = ${idCacador};`
    return database.executar(instrucaoSql);
}

function publicar(nome, descricao, dtMissao, idCacador) {
    console.log("ACESSEI O MISSAO MODEL \n function publicar()");
    var instrucaoSql = `
        INSERT INTO Missao (nome_missao, Descricao_missao, status_Missao, dt_missao, fk_cacador) 
        VALUES ('${nome}', '${descricao}', 'Pendente', '${dtMissao}', ${idCacador});
    `;
    return database.executar(instrucaoSql);
}

function vincular(idCacador, idMissao) {
    let instrucao = `
        INSERT INTO Cacador_Missao (fk_cacador, fk_missao) 
        VALUES (${idCacador}, ${idMissao});
    `;
    return executar(instrucao);
}

module.exports = {
    listarPorCacador,
    publicar,
    vincular
}