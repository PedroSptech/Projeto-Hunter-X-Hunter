function configurarSidebar() {
    var cacador = JSON.parse(localStorage.getItem("cacador"));

    if (!cacador) return;

    var ehZodiaco = cacador.zodiaco === "SIM";

    if (!ehZodiaco) {
        var itemDashboard   = document.getElementById("item-dashboard");
        var itemCriarMissao = document.getElementById("item-criar-missao");

        if (itemDashboard)   itemDashboard.parentElement.removeChild(itemDashboard);
        if (itemCriarMissao) itemCriarMissao.parentElement.removeChild(itemCriarMissao);
    }
}

configurarSidebar();