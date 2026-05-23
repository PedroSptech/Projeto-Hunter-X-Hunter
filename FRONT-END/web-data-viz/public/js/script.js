var idCacador = localStorage.getItem("idCacador"); // <- pega o dado salvo no local storage 

function carregarPerfil() {
    if (!idCacador) {
        alert("Você não está logado. Faça login primeiro.");
        window.location.href = "../index.html";
        return;
    }

    fetch("/cacadores/perfil/" + idCacador)
        .then(function (response) { return response.json(); })
        .then(function (dados) {
            document.getElementById("codigo").textContent = dados.codigo;
            document.getElementById("nome").textContent = dados.nome;
            document.getElementById("nen").textContent = dados.nen;
            document.getElementById("cidade").textContent = dados.cidadeNatal;

            var data = new Date(dados.dtNasc);
            document.getElementById("dtNasc").textContent = data.toLocaleDateString("pt-BR");

            if (dados.foto && dados.foto != "") {
                document.getElementById("foto-perfil").src = dados.foto;
                document.getElementById("foto-perfil").style.display = "block";
                document.getElementById("upload-container").style.display = "none";
            } else {
                document.getElementById("foto-perfil").style.display = "none";
                document.getElementById("upload-container").style.display = "flex";
            }
        })
        .catch(function (erro) { console.log("Erro ao carregar perfil:", erro); });
}

function enviarFoto() {
    var url = document.getElementById("url-foto").value;
    if (url == "") { 
        alert("Cole um link de imagem primeiro!"); 
        return; 
    }

    fetch("/cacadores/foto/" + idCacador, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fotoServer: url })
    })
        .then(function (resposta) { return resposta.json(); })
        .then(function () {
            alert("Foto salva!");
            document.getElementById("foto-perfil").src = url;
            document.getElementById("foto-perfil").style.display = "block";
            document.getElementById("upload-container").style.display = "none";
        })
        .catch(function (erro) { console.log("Erro ao salvar foto:", erro); });
}
