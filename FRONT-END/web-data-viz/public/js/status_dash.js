const COR_STATUS = {
    "Ativo":   "#1B3A8C",
    "Inativo": "#5BB8F5"
};

const COR_MISSAO_STATUS = {
    "Pendente":   "#ff2600",
    "Em Andamento": "#fae100",
    "Concluída":   "#006e32",
    "Cancelada": "#000000"
}
function cacadorStatus(){
fetch('/cacadores/status', { cache: 'no-store' })
    .then(function(resposta) {
        if (resposta.ok) {
            resposta.json().then(function(resposta) {
                plotarGraficoStatus(resposta);
            });
        } else {
            console.log('Erro na API, status.js');
        }
    })
    .catch(function(error) {
        console.log(error);
    });
}

cacadorStatus()

function missaoStatus(){
fetch('/missoes/status', { cache: 'no-store' })
    .then(function(resposta) {
        if (resposta.ok) {
            resposta.json().then(function(resposta) {
                plotarGraficoMissoesStatus(resposta);
            });
        } else {
            console.log('Erro na API, status.js');
        }
    })
    .catch(function(error) {
        console.log(error);
    });
}

missaoStatus()

function plotarGraficoMissoesStatus(resposta){
    let labels = [];
    let quantidades = [];
    let cores = [];

    for (let i = 0; i < resposta.length; i++) {
        let registro = resposta[i];
        labels.push(registro.status_Missao);
        quantidades.push(registro.quantidade);
        cores.push(COR_MISSAO_STATUS[registro.status_Missao]);
    }

    new Chart(document.getElementById('statusMissaoChart'), {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: quantidades,
                backgroundColor: cores,
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '45%',
            plugins: {
                legend: {
                    display: true,
                    position: 'right',
                    labels: {
                        color: '#1a1a2e',
                        font: { size: 13, weight: 'bold' }
                    }
                }
            }
        }
    });
}

function plotarGraficoStatus(resposta) {
    let labels = [];
    let quantidades = [];
    let cores = [];

    for (let i = 0; i < resposta.length; i++) {
        let registro = resposta[i];
        labels.push(registro.status);
        quantidades.push(registro.quantidade);
        cores.push(COR_STATUS[registro.status]);
    }

    new Chart(document.getElementById('statusChart'), {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: quantidades,
                backgroundColor: cores,
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            //desabilita a proporção do grafico, não precisa ser 400x400 pode ser 400x200
            maintainAspectRatio: false,
            cutout: '45%',
            plugins: {
                legend: {
                    display: true,
                    position: 'right',
                    labels: {
                        color: '#1a1a2e',
                        font: { size: 13, weight: 'bold' }
                    }
                }
            }
        }
    });
}