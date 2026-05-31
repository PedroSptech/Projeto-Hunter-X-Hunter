function configurarSidebar() {
                    //transforma o json devolta em objeto
    const cacador = JSON.parse(localStorage.getItem("cacador"));

    if (!cacador){
        return;
    } 

    let ehZodiaco = false
    if(cacador.zodiaco == "SIM"){
        ehZodiaco = true
    }else{
        ehZodiaco = false
    }

    if (!ehZodiaco) {
        const itemDashboard   = document.getElementById("item-dashboard");
        const itemCriarMissao = document.getElementById("item-criar-missao");

        itemDashboard.parentElement.removeChild(itemDashboard);
        itemCriarMissao.parentElement.removeChild(itemCriarMissao);
    }
}

configurarSidebar();