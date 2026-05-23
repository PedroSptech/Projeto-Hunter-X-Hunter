function contarHunters(){
    fetch("/cacadores/contarHunters",)
        .then(function (dado){
            return dado.json()
        }).then(function (dado){
            document.getElementById("resultado_cacadores").textContent = dado[0].quantidade;
        })
        .catch(function (erro){
            console.log(erro)
        })
}
contarHunters()

function cacadoresAtivos(){
    fetch('/cacadores/status', { cache: 'no-store' })
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(resposta) {
                document.getElementById("resultado_ativos").textContent = resposta[0].quantidade;
            });
        } else {
            console.log('Erro na API, kpi_dash.js');
        }
    })
    .catch(function(error) {
        console.log(error);
    });
}

cacadoresAtivos()

function totalMissoes(){
    fetch("/missoes/totalMissoes", { cache: 'no-store' })
        .then(function (resposta){
            if (resposta.ok) {
            resposta.json().then(function(resposta) {
                document.getElementById("resultado_missoes").textContent = resposta[0].quantidade;
            });
        } else {
            console.log('Erro na API, kpi_dash.js');
        }
    })
}

totalMissoes()