const COR_NEN = {
    "INTENSIFICADOR": "#008202",
    "EMISSOR":        "#E7BC07",
    "TRANSFORMADOR":  "#BA02C2",
    "MANIPULADOR":    "#C0C0C0",
    "CONJURADOR":     "#DB001C",
    "ESPECIALISTA":   "#0072BC"
};

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