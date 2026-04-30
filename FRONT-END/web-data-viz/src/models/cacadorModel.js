var database = require("../database/config")

function autenticar(codigo) {
    console.log("ACESSEI O CACADOR MODEL \n function autenticar(): ", codigo);
    var instrucaoSql = `
        SELECT idCacador, nome_Cacador, Codigo_caçador, Tipo_Nen 
        FROM Cacador WHERE Codigo_caçador = '${codigo}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrar(nome, tipoNen, codigo) {
    console.log("ACESSEI O CACADOR MODEL \n function cadastrar():", nome, tipoNen, codigo);
    
    var instrucaoSql = `
        INSERT INTO Cacador (nome_Cacador, Tipo_Nen, Codigo_caçador, Status_cacador) 
        VALUES ('${nome}', '${tipoNen}', '${codigo}', 'Ativo');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar
};