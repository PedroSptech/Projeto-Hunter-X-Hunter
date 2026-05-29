function configurarSidebar() {
                    //transforma o json devolta em objeto
    const cacador = JSON.parse(localStorage.getItem("cacador"));

    if (!cacador) return;

    let ehZodiaco = cacador.zodiaco == "SIM";

    if (!ehZodiaco) {
        const itemDashboard   = document.getElementById("item-dashboard");
        const itemCriarMissao = document.getElementById("item-criar-missao");

        if (itemDashboard)   itemDashboard.parentElement.removeChild(itemDashboard);
        if (itemCriarMissao) itemCriarMissao.parentElement.removeChild(itemCriarMissao);
    }
}

configurarSidebar();