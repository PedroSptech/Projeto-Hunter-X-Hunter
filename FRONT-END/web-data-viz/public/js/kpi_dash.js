function contarHunters() {
    fetch("/cacadores/contarHunters")
        .then(function (resposta) {
            return resposta.json();
        })
        .then(function (resposta) {
            document.getElementById("resultado_cacadores").textContent = resposta[0].quantidade;
        })
        .catch(function (erro) {
            console.error(`Erro ao contar hunters: ${erro.message}`);
        });
}

contarHunters();

function cacadoresAtivos() {
    fetch('/cacadores/status', { cache: 'no-store' })
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(function (resposta) {
                    document.getElementById("resultado_ativos").textContent = resposta[0].quantidade;
                });
            } else {
                console.error('Erro na API, kpi_dash.js');
            }
        })
        .catch(function (erro) {
            console.error(`Erro ao buscar caçadores ativos: ${erro.message}`);
        });
}

cacadoresAtivos();

function totalMissoes() {
    fetch("/missoes/totalMissoes", { cache: 'no-store' })
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(function (resposta) {
                    document.getElementById("resultado_missoes").textContent = resposta[0].quantidade;
                });
            } else {
                console.error('Erro na API, kpi_dash.js');
            }
        })
        .catch(function (erro) {
            console.error(`Erro ao buscar total de missões: ${erro.message}`);
        });
}

totalMissoes();