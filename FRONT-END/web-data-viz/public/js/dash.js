const COR_NEN = {
    "INTENSIFICADOR": "#008202",
    "EMISSOR":        "#E7BC07",
    "TRANSFORMADOR":  "#BA02C2",
    "MANIPULADOR":    "#C0C0C0",
    "CONJURADOR":     "#DB001C",
    "ESPECIALISTA":   "#0072BC"
};

const COR_MISSAO = {
    "C": "#4fff2c",
    "B":"#b8df0d",
    "A":"#d6c90d",
    "S":"#db3b0a",
    "S+":"#DB001C",
}

function tipoNen(){
fetch('/cacadores/nen/tipos', { cache: 'no-store' })
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(resposta) {
                plotarGraficoNen(resposta);
            });
        } else {
            console.log('Erro na API, dash.js');
        }
    })
    .catch(function(error) {
        console.log(error);
    });
}

tipoNen();

function tipoMissoes(){
    fetch('/missoes/dificuldade', { cache: 'no-store' })
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(resposta) {
                plotarGraficoMissoes(resposta);
            });
        } else {
            console.log('Erro na API, dash.js');
        }
    })
    .catch(function(error) {
        console.log(error);
    });
}

tipoMissoes();

function plotarGraficoMissoes(resposta){
    var labels = [];
    var quantidades = [];
    var cores = [];
    var bordas = [];

    for (var i = 0; i < resposta.length; i++) {
        var registro = resposta[i];
        labels.push(registro.grau_dificuldade);
        quantidades.push(registro.quantidade);
        cores.push(COR_MISSAO[registro.grau_dificuldade]);
        bordas.push(COR_MISSAO[registro.grau_dificuldade]);
    }
    new Chart(document.getElementById('missoesChart'), {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'MISSÕES: GRAU DE DIFICULDADE',
                data: quantidades,
                backgroundColor: cores,
                borderColor: bordas,
                borderWidth: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { stepSize: 1 }
                }
            }   
        }
    });
}

function plotarGraficoNen(resposta) {
    var labels = [];
    var quantidades = [];
    var cores = [];
    var bordas = [];

    for (var i = 0; i < resposta.length; i++) {
        var registro = resposta[i];
        labels.push(registro.Tipo_Nen);
        quantidades.push(registro.quantidade);

        if (registro.quantidade <= 5 && registro.Tipo_Nen != 'CONJURADOR') {
            cores.push(COR_NEN[registro.Tipo_Nen]);
            bordas.push('red');
        }else if(registro.quantidade <= 5 && registro.Tipo_Nen == 'CONJURADOR'){
            bordas.push('red');
        } else {
            cores.push(COR_NEN[registro.Tipo_Nen]);
            bordas.push(COR_NEN[registro.Tipo_Nen]);
        }
    }

    new Chart(document.getElementById('myChart'), {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Caçadores por Tipo de Nen',
                data: quantidades,
                backgroundColor: cores,
                borderColor: bordas,
                borderWidth: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    // de quanto em quanto a coluna y do grafico vai contar
                    ticks: { stepSize: 1 }
                }
            }   
        }
    });
}

