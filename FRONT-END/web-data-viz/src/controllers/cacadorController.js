var cacadorModel = require("../models/cacadorModel");

function autenticar(req, res) {
    var codigo = req.body.codigoServer;

    if (codigo == undefined) {
        res.status(400).send("Seu código xHUNTERx está undefined!");
    } else {
        cacadorModel.autenticar(codigo)
            .then(function (resultadoAutenticar) {
                if (resultadoAutenticar.length == 1) {
                    res.json({
                        id:          resultadoAutenticar[0].idCacador,
                        nome:        resultadoAutenticar[0].nome_Cacador,
                        codigo:      resultadoAutenticar[0].Codigo_caçador,
                        tipoNen:     resultadoAutenticar[0].Tipo_Nen,
                        natal:       resultadoAutenticar[0].cidade_natal,
                        tipoCacador: resultadoAutenticar[0].Tipo_cacador,
                        data:        resultadoAutenticar[0].dt_Nasc,
                        ranking:     resultadoAutenticar[0].Ranking_cacador,
                        zodiaco:     resultadoAutenticar[0].Zodiaco
                    });
                } else if (resultadoAutenticar.length == 0) {
                    res.status(403).send("Código xHUNTERx inválido");
                } else {
                    res.status(403).send("Mais de um caçador com o mesmo código!");
                }
            }).catch(function (erro) {
                console.log("ERRO MYSQL:", erro);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function cadastrar(req, res) {
    var nome        = req.body.nomeServer;
    var tipoNen     = req.body.tipoNenServer;
    var codigo      = req.body.codigoServer;
    var natal       = req.body.natalServer;
    var data        = req.body.dataServer;
    var tipoCacador = req.body.tipoCacadorServer;
    var rankig      = req.body.rankigServer;
    var zodiaco     = req.body.zodiacoServer;

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (tipoNen == undefined) {
        res.status(400).send("Seu tipo de Nen está undefined!");
    } else if (codigo == undefined) {
        res.status(400).send("Seu código está undefined!");
    } else {
        cacadorModel.cadastrar(nome, tipoNen, codigo, natal, data, tipoCacador, rankig, zodiaco)
            .then(function (resultado) { res.json(resultado); })
            .catch(function (erro) { res.status(500).json(erro.sqlMessage); });
    }
}

function buscarPerfil(req, res) {
    var idCacador = req.params.id;

    cacadorModel.buscarPerfil(idCacador)
        .then(function (resultado) {
            if (resultado.length == 0) {
                res.status(404).send("Caçador não encontrado!");
            } else {
                var c = resultado[0];
                res.json({
                    codigo:      c.Codigo_caçador,
                    nome:        c.nome_Cacador,
                    nen:         c.Tipo_Nen,
                    cidadeNatal: c.cidade_natal,
                    dtNasc:      c.dt_Nasc,
                    foto:        c.foto
                });
            }
        })
        .catch(function (erro) { res.status(500).json(erro.sqlMessage); });
}

function enviarFoto(req, res) {
    var idCacador = req.params.id;
    var foto      = req.body.fotoServer;

    if (foto == undefined) {
        res.status(400).send("URL da foto está undefined!");
    } else {
        cacadorModel.enviarFoto(foto, idCacador)
            .then(function () { res.json({ mensagem: "Foto salva com sucesso!" }); })
            .catch(function (erro) { res.status(500).json(erro.sqlMessage); });
    }
}

function receberFoto(req, res) {
    var idCacador = req.params.id;

    cacadorModel.receberFoto(idCacador)
        .then(function (resultado) {
            if (resultado.length == 0) {
                res.status(404).send("Foto não encontrada!");
            } else {
                res.json({ foto: resultado[0].foto });
            }
        })
        .catch(function (erro) { res.status(500).json(erro.sqlMessage); });
}

function buscarPorNome(req, res) {
    var nome = req.query.nome;
 
    if (!nome || nome.trim() === "") {
        return res.status(400).send("Nome para pesquisa não informado!");
    }
 
    cacadorModel.buscarPorNome(nome.trim())
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log("ERRO MYSQL:", erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function contarPorTipoNen(req, res) {
    cacadorModel.contarPorTipoNen()
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log("ERRO MYSQL:", erro);
            res.status(500).json(erro.sqlMessage);
        });
}
 
module.exports = {
    autenticar,
    cadastrar,
    buscarPerfil,
    enviarFoto,
    receberFoto,
    buscarPorNome,
    contarPorTipoNen
};
