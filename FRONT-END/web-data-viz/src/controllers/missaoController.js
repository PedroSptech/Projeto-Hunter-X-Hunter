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
        }).catch(function (erro) {
            console.log("ERRO COMPLETO:", erro); 
            res.status(500).json(erro.sqlMessage || erro.message || erro);
        });
}

function vincular(req, res) {
    const idCacador = req.body.idCacador;
    const idMissao = req.body.idMissao;
    missaoModel.vincular(idCacador, idMissao)
        .then(resultado => res.json(resultado))
        .catch(erro => res.status(500).json(erro.sqlMessage));
}

function missoes(req, res){
    missaoModel.missoes()
    .then(function(resultado) {
        res.status(200).json(resultado);
    }).catch(function (erro){
        console.log("Erro Missão:", erro); 
            res.status(500).json(erro.sqlMessage || erro.message || erro)
    })
}

function totalMissoes(req,res){
    missaoModel.totalMissoes()
        .then(function (resultado){
            res.status(200).json(resultado)
        }).catch(function (erro){
            console.log("Erro Missão:", erro); 
            res.status(500).json(erro.sqlMessage || erro.message || erro)
        })
}

module.exports = {
    listarPorMissao,
    publicar,
    vincular,
    missoes,
    totalMissoes
}