var missaoModel = require("../models/missaoModel");

function listarPorMissao(req, res) {
    var idCacador = req.params.idCacador;

    missaoModel.listarPorMissao(idCacador)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhuma missão encontrada!");
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao listar missões! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function publicar(req, res) {
    var nome = req.body.nome;
    var descricao = req.body.descricao || "";
    var status = req.body.status;
    var grauDificuldade = req.body.grauDificuldade;
    var data = req.body.data;

    if (!nome || !status || !grauDificuldade || !data) {
        return res.status(400).send("Campos obrigatórios não preenchidos!");
    }

    missaoModel.publicar(nome, descricao, status, grauDificuldade, data)
        .then(function (resultado) {
                res.status(201).json(resultado);
            })
            .catch(function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao publicar a missão! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
}

function vincular(req, res) {
    const idCacador = req.body.idCacador;
    const idMissao = req.body.idMissao;
    missaoModel.vincular(idCacador, idMissao)
        .then(function (resultado) {
                res.json(resultado);
            })
            .catch(function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao vincular a missão! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
}

function missoes(req, res){
    missaoModel.missoes()
    .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao listar as missões! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function totalMissoes(req,res){
    missaoModel.totalMissoes()
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao contar as missões! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function grauDificuldade(req,res){
    missaoModel.grauDificuldade()
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao buscar grau de dificuldade! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function status(req, res){
    missaoModel.status()
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao buscar status! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
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