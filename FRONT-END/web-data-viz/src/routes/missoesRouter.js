var express = require("express");
var router = express.Router();
var missaoController = require("../controllers/missaoController");

router.get("/listar/:idCacador", function (req, res) {
    missaoController.listarPorMissao(req, res);
});

router.post("/publicar", function (req, res) {
    missaoController.publicar(req, res);
});

router.post("/vincular", function (req, res) {
    missaoController.vincular(req, res);
});

router.get("/missoes", function (req, res) {
    missaoController.missoes(req, res);
});

router.get("/totalMissoes", function (req, res) {
    missaoController.totalMissoes(req, res);
});

router.get("/dificuldade", function (req, res) {
    missaoController.grauDificuldade(req, res);
});

router.get("/status", function (req, res) {
    missaoController.status(req, res);
});

module.exports = router;