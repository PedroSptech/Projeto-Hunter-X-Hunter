var missaoModel = require("../models/missaoModel");

function listarPorCacador(req, res) {
    var idCacador = req.params.idCacador;

    missaoModel.listarPorCacador(idCacador)
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
    var descricao = req.body.descricao;
    var data = req.body.data;
    var idCacador = req.body.idCacador;

    if (nome == undefined) {
        res.status(400).send("O nome da missão está undefined!");
    } else {
        missaoModel.publicar(nome, descricao, data, idCacador)
            .then(function (resultado) {
                res.json(resultado);
            }).catch(function (erro) {
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function vincular(req, res) {
    let { idCacador, idMissao } = req.body;
    missaoModel.vincular(idCacador, idMissao)
        .then(resultado => res.json(resultado))
        .catch(erro => res.status(500).json(erro.sqlMessage));
}

module.exports = {
    listarPorCacador,
    publicar,
    vincular
}