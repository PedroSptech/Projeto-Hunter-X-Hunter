var database = require("../database/config")

function autenticar(codigo) {
    console.log("ACESSEI O CACADOR MODEL \n function autenticar(): ", codigo);
    var instrucaoSql = `
        SELECT * 
        FROM Cacador WHERE Codigo_caçador = '${codigo}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrar(nome, tipoNen, codigo, natal, dt_nasc, tipoCacador, rankig, Zodiaco) {
    console.log("ACESSEI O CACADOR MODEL \n function cadastrar():", nome, tipoNen, codigo, natal, dt_nasc, tipoCacador, rankig, Zodiaco);
    var instrucaoSql = `
        INSERT INTO Cacador (nome_Cacador, Tipo_Nen, Codigo_caçador, cidade_natal, dt_Nasc, Tipo_cacador, Ranking_cacador, Zodiaco, Status_cacador)
        VALUES ('${nome}', '${tipoNen}', '${codigo}', '${natal}', '${dt_nasc}', '${tipoCacador}', '${rankig}', '${Zodiaco}', 'Ativo');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarPerfil(idCacador) {
    var instrucaoSql = `
        SELECT Codigo_caçador, nome_Cacador, Tipo_Nen, cidade_natal, dt_Nasc, foto
        FROM Cacador
        WHERE idCacador = ${idCacador};
    `;
    return database.executar(instrucaoSql);
}

function enviarFoto(foto, idCacador) {
    var instrucaoSql = `
        UPDATE Cacador SET foto = '${foto}' WHERE idCacador = ${idCacador};
    `;
    return database.executar(instrucaoSql);
}

function receberFoto(idCacador) {
    var instrucaoSql = `
        SELECT foto FROM Cacador WHERE idCacador = ${idCacador};
    `;
    return database.executar(instrucaoSql);
}

function buscarPorNome(nome) {
    var instrucaoSql = `
        SELECT idCacador, nome_Cacador, Tipo_Nen, cidade_natal, Ranking_cacador, Tipo_cacador, Zodiaco
        FROM Cacador
        WHERE nome_Cacador LIKE '%${nome}%';
    `;
    return database.executar(instrucaoSql);
}

function contarPorTipoNen() {
    var instrucaoSql = `
        SELECT Tipo_Nen, COUNT(*) AS quantidade
        FROM Cacador
        GROUP BY Tipo_Nen;
    `;
    return database.executar(instrucaoSql);
}

function contarPorStatus() {
    var instrucaoSql = `
        SELECT Status_cacador AS status, COUNT(*) AS quantidade
        FROM Cacador
        GROUP BY Status_cacador;
    `;
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar,
    buscarPerfil,
    enviarFoto,
    receberFoto,
    buscarPorNome,
    contarPorTipoNen,
    contarPorStatus
};