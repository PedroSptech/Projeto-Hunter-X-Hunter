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
        INSERT INTO Cacador (nome_Cacador, Tipo_Nen, Codigo_caçador, cidade_natal, dt_nasc, Tipo_cacador, Ranking_cacador, Zodiaco, Status_cacador)
        VALUES ('${nome}', '${tipoNen}', '${codigo}', '${natal}', '${dt_nasc}', '${tipoCacador}', '${rankig}', '${Zodiaco}', 'Ativo');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
 
module.exports = {
    autenticar,
    cadastrar
};
 