async function CancelaButton() {
    const botao = document.querySelector("button");
    let count = 3;

    while (count >= 0) {
        botao.innerText = `AGUARDE... ${count}`;
        botao.disabled = true; 
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        count--;
    }

    botao.innerText = "ENTRAR";
    botao.disabled = false;
    alert("Bem-vindo à Associação Hunter!");
}