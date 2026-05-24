var express = require("express");
var router = express.Router();
var missaoController = require("../controllers/missaoController");

router.get("/listar/:idCacador", function (req, res) {
    missaoController.listarPorCacador(req, res);
});

router.post("/publicar", function (req, res) {
    missaoController.publicar(req, res);
});

router.post("/vincular", function(req, res) {
    missaoController.vincular(req, res);
});

router.get("/missoes", function(req, res){
    missaoController.missoes(req, res);
}) 

router.get("/totalMissoes", missaoController.totalMissoes);

router.get("/dificuldade", missaoController.grauDificuldade);

router.get("/status", missaoController.status);

module.exports = router;