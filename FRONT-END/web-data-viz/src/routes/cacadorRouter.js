var express = require("express");
var router = express.Router();
var cacadorController = require("../controllers/cacadorController");

router.post("/cadastrar", function (req, res) {
    cacadorController.cadastrar(req, res);
});

router.post("/autenticar", function (req, res) {
    cacadorController.autenticar(req, res);
});

router.get("/perfil/:id", function (req, res) {
    cacadorController.buscarPerfil(req, res);
});

router.post("/foto/:id", function (req, res) {
    cacadorController.enviarFoto(req, res);
});

router.get("/foto/:id", function (req, res) {
    cacadorController.receberFoto(req, res);
});

router.get("/buscar/:nome", function (req, res) {
    cacadorController.buscarPorNome(req, res);
});

router.get("/nen/tipos", function (req, res) {
    cacadorController.contarPorTipoNen(req, res);
});

router.get("/status", function (req, res) {
    cacadorController.contarPorStatus(req, res);
});

router.get("/contarHunters", function (req, res) {
    cacadorController.contarHunters(req, res);
});

module.exports = router;