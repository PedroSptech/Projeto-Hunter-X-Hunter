async function entrar() {
    const botao = document.querySelector("button");
    const codigoVar = document.getElementById("codigo_login_input").value;

    if (codigoVar == "") {
        alert("Insira seu código!");
        return;
    }

    await efeitoContagem(botao, "ENTRAR");

    fetch("/cacadores/autenticar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ codigoServer: codigoVar })
    })
        .then(resposta => {
            if (resposta.ok) {
                return resposta.json();
            } else {
                alert("Código inválido!");
            }
        })
        .then(dados => {
            if (dados) {                        //Tranforma os dados em String o localStorage não entende um objeto json
                localStorage.setItem("cacador", JSON.stringify(dados));
                localStorage.setItem("idCacador", dados.id);
                alert("Bem-vindo à Associação!");
                window.location = "../pages/profile.html";
            }
        });
}

async function efeitoContagem(botao, textoFinal) {
    let count = 3;
    botao.disabled = true;

    while (count >= 0) {
        botao.innerText = `AGUARDE... ${count}`;
        await new Promise(resolve => setTimeout(resolve, 1000));
        count--;
    }

    botao.innerText = textoFinal;
    botao.disabled = false;
}

async function cadastrar() {
    const botao = document.querySelector("button");
    const nomeVar = document.getElementById("nome_input").value;
    const nenVar = document.getElementById("nen_input").value;
    const codigoVar = document.getElementById("codigo_input").value;
    const natalVar = document.getElementById("natal_input").value;
    const dataVar = document.getElementById("date_input").value;
    const tipoCacadorVar = document.getElementById("Tipo_cacador_input").value;
    const rankigVar = document.getElementById("rankig_input").value;
    const zodiacoVar = document.getElementById("zodiaco_input").value;

    if (nomeVar == "" || nenVar == "" || codigoVar == "") {
        alert("Por favor, preencha todos os campos para o registro na Associação Hunter.");
        return;
    }

    await efeitoContagem(botao, "CADASTRAR");

    console.log("Enviando dados do caçador para o servidor...");

    fetch("/cacadores/cadastrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            nomeServer: nomeVar,
            tipoNenServer: nenVar,
            codigoServer: codigoVar,
            natalServer: natalVar,
            dataServer: dataVar,
            tipoCacadorServer: tipoCacadorVar,
            rankigServer: rankigVar,
            zodiacoServer: zodiacoVar
        })
    }).then(function (resposta) {
        console.log("Resposta do servidor: ", resposta);
        if (resposta.ok) {
            alert("Registro concluído com sucesso! Redirecionando para o login...");
            setTimeout(() => { window.location = "login.html"; }, 1000);
        } else {
            throw ("Houve um erro ao tentar realizar o cadastro!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
        alert("Erro no cadastro. Verifique se o código já existe ou se o servidor está rodando.");
    });

    return false;
}

function teclaEnter(event) {
    // a tecla de enter é um evento e quando clica no botão chama o pesquisar()
    if (event.key === "Enter") pesquisar();
}

function pesquisar() {
    var nome = document.getElementById("pesquisa").value.trim();
    var divResultado = document.getElementById("resultado");

    if (nome === "") {
        divResultado.innerHTML = "<p class='aviso'>Digite um nome para pesquisar.</p>";
        return;
    }

    divResultado.innerHTML = "<p class='carregando'>Pesquisando...</p>";

    fetch("/cacadores/buscar?nome=" + (nome))
        .then(function (resposta) {
            if (!resposta.ok){
                console.log("Erro na requisição")
            };
            return resposta.json();
        })
        .then(function (cacadores) {
            if (cacadores.length === 0) {
                divResultado.innerHTML = "<p class='aviso'>Nenhum hunter encontrado com esse nome.</p>";
                return;
            }

            var html = "<div class='grid_resultado'>";
            cacadores.forEach(function (c) {
                html += `
                            <div class="card_cacador">
                                <div class="card_header">
                                    <span class="card_ranking">#${c.Ranking_cacador || "?"}</span>
                                    <span class="card_nen ${(c.Tipo_Nen || "").toLowerCase()}">${c.Tipo_Nen || "—"}</span>
                                </div>
                                <h2 class="card_nome">${c.nome_Cacador}</h2>
                                <div class="card_info">
                                    <span>Cidade Natal: ${c.cidade_natal || "Desconhecida"}</span>
                                    <span>Tipo de Caçador: ${c.Tipo_cacador || "—"}</span>
                                    <span>Zodiaco: ${c.Zodiaco || "—"}</span>
                                </div>
                            </div>
                        `;
            });
            html += "</div>";
            divResultado.innerHTML = html;
        })
        .catch(function (erro) {
            divResultado.innerHTML = "<p class='aviso erro'>Erro ao buscar hunters. Tente novamente.</p>";
            console.log(erro);
        });
}
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
        mostrarAlerta("Preencha todos os campos obrigatórios.", "erro");
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
            mostrarAlerta("Missão cadastrada com sucesso!", "sucesso");
            limparFormulario();
        })
        .catch(function (erro) {
            mostrarAlerta("Erro ao cadastrar a missão. Tente novamente.", "erro");
            console.log(erro);
        })
        .finally(function () {
            btn.textContent = "CADASTRAR MISSÃO";
            btn.disabled = false;
        });
}

var idCacador = localStorage.getItem("idCacador"); // <- pega o dado salvo no local storage 

function carregarPerfil() {
    if (!idCacador) {
        alert("Você não está logado. Faça login primeiro.");
        window.location.href = "../index.html";
        return;
    }

    fetch("/cacadores/perfil/" + idCacador)
        .then(function (response) { return response.json(); })
        .then(function (dados) {
            document.getElementById("codigo").textContent = dados.codigo;
            document.getElementById("nome").textContent = dados.nome;
            document.getElementById("nen").textContent = dados.nen;
            document.getElementById("cidade").textContent = dados.cidadeNatal;

            var data = new Date(dados.dtNasc);
            document.getElementById("dtNasc").textContent = data.toLocaleDateString("pt-BR");

            if (dados.foto && dados.foto != "") {
                document.getElementById("foto-perfil").src = dados.foto;
                document.getElementById("foto-perfil").style.display = "block";
                document.getElementById("upload-container").style.display = "none";
            } else {
                document.getElementById("foto-perfil").style.display = "none";
                document.getElementById("upload-container").style.display = "flex";
            }
        })
        .catch(function (erro) { console.log("Erro ao carregar perfil:", erro); });
}

function enviarFoto() {
    var url = document.getElementById("url-foto").value;
    if (url == "") { 
        alert("Cole um link de imagem primeiro!"); 
        return; 
    }

    fetch("/cacadores/foto/" + idCacador, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fotoServer: url })
    })
        .then(function (resposta) { return resposta.json(); })
        .then(function () {
            alert("Foto salva!");
            document.getElementById("foto-perfil").src = url;
            document.getElementById("foto-perfil").style.display = "block";
            document.getElementById("upload-container").style.display = "none";
        })
        .catch(function (erro) { console.log("Erro ao salvar foto:", erro); });
}

function carregarMissoes() {
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = `<p class='carregando'> Carregando Missões. . . </p>`;

    fetch("/missoes/missoes")
        .then(function (res) { return res.json(); })
        .then(function (dados) {
            if (dados.length === 0) {
                resultado.innerHTML = `<p class='aviso'>NENHUMA MISSÃO CADASTRADA.</p>`;
                return;
            }

            var html = "<div class='grid_resultado'>";

            dados.forEach(function (missao) {
                var data = missao.dt_missao ? new Date(missao.dt_missao).toLocaleDateString("pt-BR") : "—";

                if (missao.status_Missao == 'Concluída') {
                    html += `
                        <div class="card_missao">
                            <div class="card_header">
                                <span class="card_dificuldade ${missao.grau_dificuldade ? missao.grau_dificuldade.toLowerCase() : ''}">${missao.grau_dificuldade || "—"}</span>
                                <span class="card_status">${missao.status_Missao || "—"}</span>
                            </div>
                            <p class="card_nome">${missao.nome_missao}</p>
                            <p class="card_descricao">${missao.Descricao_missao || "Sem descrição."}</p>
                            <p class="card_data">${data}</p>
                            <div class="card_acoes"></div>
                        </div>
                    `;
                } else {
                    html += `
                        <div class="card_missao">
                            <div class="card_header">
                                <span class="card_dificuldade ${missao.grau_dificuldade ? missao.grau_dificuldade.toLowerCase() : ''}">${missao.grau_dificuldade || "—"}</span>
                                <span class="card_status">${missao.status_Missao || "—"}</span>
                            </div>
                            <p class="card_nome">${missao.nome_missao}</p>
                            <p class="card_descricao">${missao.Descricao_missao || "Sem descrição."}</p>
                            <p class="card_data">${data}</p>
                            <div class="card_acoes">
                                <button class="btn_aceitar" onclick="aceitarMissao('${missao.idMissao}')">ACEITAR</button>
                                <button class="btn_negar" onclick="negarMissao('${missao.idMissao}')">NEGAR</button>
                            </div>
                        </div>
                    `;
                }
            });

            html += "</div>";
            resultado.innerHTML = html;
        })
        .catch(function () {
            resultado.innerHTML = `<p class='aviso erro'>ERRO AO CARREGAR MISSÕES.</p>`;
        });
}

//resolve o problema de iniciar em todo o arquivo html
window.onload = function () {
    if (document.getElementById("resultado") && !document.getElementById("pesquisa")) {
        carregarMissoes();
    }
    if (document.getElementById("codigo")) {
        carregarPerfil();
    }
};

function aceitarMissao(idMissao) {
    console.log("Aceitar:", idMissao);

    var idCacador = localStorage.getItem("idCacador")

    fetch("/missoes/vincular", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idCacador: idCacador, idMissao: idMissao })
    })
        .then(function (res) {
            if (!res.ok){
                    
                console.log("Erro ao aceitar missão");
            }
            return res.json();
        })
        .then(function () {
            alert("Missão aceita com sucesso!");
        })
        .catch(function (erro) {
            console.log("Erro:", erro);
            alert("Erro ao aceitar a missão.");
        });
}


function negarMissao(nome) {
    console.log("Negar:", nome);
}
