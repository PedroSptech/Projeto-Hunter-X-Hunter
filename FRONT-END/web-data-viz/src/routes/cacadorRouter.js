var express = require("express");
var router = express.Router();
var cacadorController = require("../controllers/cacadorController");

router.post("/cadastrar", function (req, res) {
    cacadorController.cadastrar(req, res);
});

router.post("/autenticar", function (req, res) {
    cacadorController.autenticar(req, res);
});

router.get("/perfil/:id", cacadorController.buscarPerfil);

router.post("/foto/:id", cacadorController.enviarFoto);

router.get("/foto/:id", cacadorController.receberFoto);

router.get("/buscar", cacadorController.buscarPorNome);

router.get("/nen/tipos", cacadorController.contarPorTipoNen);

module.exports = router;
