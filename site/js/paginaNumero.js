const textos = [
    "(212) 969-XX52 from New York City is being spied on right now...",
    "(305) 954-XX62 had photos and videos accessed!",
    "(702) 963-XX93 is under surveillance now...",
    "(213) 979-XX90 from Los Angeles had photos and videos accessed!",
    "(312) 939-XX24 from Chicago had conversations exposed!",
    "(832) 956-XX16 from Houston had call history accessed!",
    "(602) 947-XX42 from Phoenix had conversations exposed!",
    "(786) 932-XX20 from Miami is being cloned right now...",
    "(617) 962-XX62 from Boston is having location tracked!",
    "(404) 970-XX93 from Atlanta had call history accessed!",
    "(323) 988-XX10 from Los Angeles had their account hacked!",
    "(702) 994-XX77 from Las Vegas had private images leaked!",
    "(215) 996-XX88 from Philadelphia is having conversations copied!",
    "(202) 991-XX99 from Washington, D.C. had their camera remotely activated!",
    "(408) 989-XX55 from San Jose has active remote access!",
    "(313) 997-XX40 from Detroit had all data extracted!",
    "(503) 992-XX30 from Portland is being monitored now...",
    "(206) 995-XX45 from Seattle has microphone activated!",
    "(312) 993-XX28 from Chicago had photos sent to third parties!",
    "(214) 997-XX01 from Dallas has remote access detected!"
];



const caixas = [
    document.getElementById("caixa1"),
    document.getElementById("caixa2"),
    document.getElementById("caixa3")
];

let caixaAtual = 0;

function atualizarCaixa() {
    const caixa = caixas[caixaAtual];

    // Esconde
    caixa.style.opacity = 0;

    setTimeout(() => {
        // Muda texto
        const textoAleatorio = textos[Math.floor(Math.random() * textos.length)];
        caixa.innerHTML = `
                <img class="me-2" src="/public/public/img/icone-check.png">
                <span>
                     ${textoAleatorio}
                </span>`;

        // Mostra novamente
        caixa.style.opacity = 1;
    }, 500); // tempo de desaparecimento

    // Alterna para a próxima caixa
    caixaAtual = (caixaAtual + 1) % caixas.length;

    // Chama de novo após um tempo
    setTimeout(atualizarCaixa, 2000);
}

atualizarCaixa();
function aceitar_cookies(){
    let cookies = document.getElementById('cookies');
    cookies.classList.add("d-none");
}

document.getElementById("telefone").addEventListener("input", function(e) {
    let valor = e.target.value.replace(/\D/g, ""); // remove tudo que não é número

    if (valor.length > 10) {
        valor = valor.slice(0, 10); // limita a 10 dígitos
    }

    let formatado = "";

    if (valor.length > 0) formatado += "(" + valor.substring(0, 3);
    if (valor.length >= 4) formatado += ") " + valor.substring(3, 6);
    if (valor.length >= 7) formatado += "-" + valor.substring(6, 10);

    e.target.value = formatado;
});