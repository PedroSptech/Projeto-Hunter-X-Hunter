var express = require("express");
var router = express.Router();
var cacadorController = require("../controllers/cacadorController");

router.post("/cadastrar", function (req, res) {
    cacadorController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    cacadorController.autenticar(req, res);
});

module.exports = router;