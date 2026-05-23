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

            for (var i = 0; i < dados.length; i++) {
                var missao = dados[i];
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
            }

            html += "</div>";
            resultado.innerHTML = html;
        })
        .catch(function () {
            resultado.innerHTML = `<p class='aviso erro'>ERRO AO CARREGAR MISSÕES.</p>`;
        });
}

carregarMissoes();

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
