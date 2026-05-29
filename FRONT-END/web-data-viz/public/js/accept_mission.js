function carregarMissoes() {
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = `<p class='carregando'> Carregando Missões. . . </p>`;

    fetch("/missoes/missoes")
        .then(function (resposta) { return resposta.json(); })
        .then(function (resposta) {
            if (resposta.length == 0) {
                resultado.innerHTML = `<p class='aviso'>NENHUMA MISSÃO CADASTRADA.</p>`;
                return;
            }

            let html = "<div class='grid_resultado'>";

            for (let i = 0; i < resposta.length; i++) {
                let missao = resposta[i];
                let data = missao.dt_missao ? new Date(missao.dt_missao).toLocaleDateString("pt-BR") : "—";

                if (missao.status_Missao == 'Concluída') {
                    html += `
                        <div class="card_missao">
                            <div class="card_header">
                                <span class="card_dificuldade ${missao.grau_dificuldade.toLowerCase() }">${missao.grau_dificuldade}</span>
                                <span class="card_status">${missao.status_Missao}</span>
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
                                <span class="card_dificuldade ${missao.grau_dificuldade.toLowerCase()}">${missao.grau_dificuldade}</span>
                                <span class="card_status">${missao.status_Missao}</span>
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
        .catch(function (erro) {
            console.error(`Erro ao carregar missões: ${erro.message}`);
            resultado.innerHTML = `<p class='aviso erro'>ERRO AO CARREGAR MISSÕES.</p>`;
        });
}

carregarMissoes();

function aceitarMissao(idMissao) {
    console.log("Aceitar:", idMissao);

    const idCacador = localStorage.getItem("idCacador");

    fetch("/missoes/vincular", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idCacador: idCacador, idMissao: idMissao })
    })
        .then(function (resposta) {
            if (!resposta.ok) {
                console.log("Erro ao aceitar missão");
            }
            return resposta.json();
        })
        .then(function (resposta) {
            alert("Missão aceita com sucesso!");
        })
        .catch(function (erro) {
            console.error(`Erro ao aceitar missão: ${erro.message}`);
            alert("Erro ao aceitar a missão.");
        });
}

function negarMissao(idMissao) {
    console.log("Negar:", idMissao);
}