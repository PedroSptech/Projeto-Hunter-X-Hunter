const textarea = document.getElementById("descricao");
const contador = document.getElementById("contador");

// atualiza em tempo real quantos caracteres foram digitados
if (textarea && contador) {
    textarea.addEventListener("input", function () {
        contador.textContent = this.value.length;
    });
}


function limparFormulario() {
    document.getElementById("nome_missao").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("status_missao").value = "";
    document.getElementById("grau_dificuldade").value = "";
    document.getElementById("dt_missao").value = "";
    contador.textContent = "0";
}

function cadastrarMissao() {
    var nome = document.getElementById("nome_missao").value.trim();
    var descricao = document.getElementById("descricao").value.trim();
    var status = document.getElementById("status_missao").value;
    var grau = document.getElementById("grau_dificuldade").value;
    var data = document.getElementById("dt_missao").value;

    if (!nome || !status || !grau || !data) {
        alert("Preencha todos os campos obrigatórios.", "erro");
        return;
    }

    var btn = document.querySelector(".btn_cadastrar");
    btn.textContent = "CADASTRANDO...";
    btn.disabled = true;

    fetch("/missoes/publicar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            nome: nome,
            descricao: descricao,
            status: status,
            grauDificuldade: grau,
            data: data
        })
    })
        .then(function (resposta) {
            if (!resposta.ok){
                console.log("Erro ao cadastrar");
            }
            return resposta.json();
        })
        .then(function () {
            alert("Missão cadastrada com sucesso!", "sucesso");
            limparFormulario();
        })
        .catch(function (erro) {
            alert("Erro ao cadastrar a missão. Tente novamente.", "erro");
            console.log(erro);
        })
        .finally(function () {
            btn.textContent = "CADASTRAR MISSÃO";
            btn.disabled = false;
        });
}