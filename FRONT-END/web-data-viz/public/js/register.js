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
//Motivo do uso
async function cadastrar() {
    let botao = document.querySelector("button");
    let nomeVar = document.getElementById("nome_input").value;
    let nenVar = document.getElementById("nen_input").value;
    let codigoVar = document.getElementById("codigo_input").value;
    let natalVar = document.getElementById("natal_input").value;
    let dataVar = document.getElementById("date_input").value;
    let tipoCacadorVar = document.getElementById("Tipo_cacador_input").value;
    let rankigVar = document.getElementById("rankig_input").value;
    let zodiacoVar = document.getElementById("zodiaco_input").value;

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
}