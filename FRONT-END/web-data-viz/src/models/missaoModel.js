var database = require("../database/config")

function listarPorCacador(idCacador) {
    console.log("ACESSEI O MISSAO MODEL \n function listarPorCacador()");
    var instrucaoSql = `
        SELECT
            m.nome_missao,
            m.Descricao_missao,
            m.status_Missao,
            DATE_FORMAT(m.dt_missao, '%d/%m/%Y') AS data,
            c.nome_Cacador,
        FROM Missao m
        JOIN Cacador c ON m.fk_cacador = c.idCacador
        WHERE m.fk_cacador = ${idCacador};
    `;
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

module.exports = {
    listarPorCacador,
    publicar
}