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

    fetch("/cacadores/buscar/" + nome)
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
            for (let i = 0; i < cacadores.length; i++) {
                let c = cacadores[i];

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
            }
            html += "</div>";
            divResultado.innerHTML = html;
        })
        .catch(function (erro) {
            divResultado.innerHTML = "<p class='aviso erro'>Erro ao buscar hunters. Tente novamente.</p>";
            console.log(erro);
        });
}