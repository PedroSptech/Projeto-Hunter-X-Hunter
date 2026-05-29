async function entrar() {   // encontra qualquer elemento mas sempre o primeiro 
    const botao = document.querySelector("button");
                        //só encontra ID
    const codigoVar = document.getElementById("codigo_login_input").value;

    let codigo = []
    codigo.push(codigoVar.trim())

    if (codigo == "") {
        alert("Insira seu código!");
        return;
    }

    await efeitoContagem(botao, "ENTRAR");

    fetch("/cacadores/autenticar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ codigoServer: codigo })
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
                         // Sleep
        await new Promise(resolve => setTimeout(resolve, 1000));
        count--;
    }

    botao.innerText = textoFinal;
    botao.disabled = false;
}