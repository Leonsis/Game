// Declaração de variaveis
let altura = 0; 
let largura = 0;
let vidas = 1; 
let tempo = 0; 
let nivel = window.location.search;
nivel = nivel.replace('?', '');
let criaMoscaTempo = 1500; 
let contador = 0; 
const mosca = document.createElement('img');

if(nivel === 'normal') {// Estrutura de descisão para identificar o tepo de cada nivel.
    criaMoscaTempo = 1200;
} else if(nivel === 'dificil') {
    criaMoscaTempo = 1000;
} else if(nivel === 'sDificio') {
    criaMoscaTempo = 800;
}

function ajustaTamanhoPalcoJogo() {
    altura = window.innerHeight;
    largura = window.innerWidth;
}
ajustaTamanhoPalcoJogo();

let cronometro = setInterval(function() {
    tempo += 1;
    document.getElementById('cronometro').innerHTML = tempo;
}, 1000);

function posicaoRamdomicaMosca() {// Segundo fazer com que a imagem apareça em destinos aleatorioas na pagina web.
    if(document.getElementById('mosca')) {// Remover a mosca anterior (Caso exista)
        document.getElementById('mosca').remove();
        if(vidas > 3) {
            window.location.href = 'fim_do_jogo.html';
        } else {
            document.getElementById('v' + vidas).src = 'src/imagens/coracao_vazio.png';
            vidas++;
        }
    }

    // Criando as posições randomicamente
    let posicaoX = Math.floor(Math.random() * largura - 90);
    let posicaoY = Math.floor(Math.random() * altura - 140);
    
    /*
        Aqui está sendo feira uma estrutura de condição
        Que se posisaoX for menor que 0 a posicaoX vai receber 0 se não vai receber posicoaX
    */
    posicaoX = posicaoX < 0 ? 0 : posicaoX;
    posicaoY = posicaoY < 0 ? 0 : posicaoY;

    //Incuineto parametros para a tag que foi cirada a variavel.
    mosca.src = 'src/imagens/mosca.png';
    mosca.className = tamanhoAleatorio() + ' ' + ladoAleatorio();
    mosca.style.left = posicaoX + 'px';
    mosca.style.top = posicaoY + 'px';
    mosca.style.position = 'absolute';
    document.body.appendChild(mosca);
    mosca.id = 'mosca';
    mosca.onclick = function() {
        this.remove();
        contador += 1;
        localStorage.setItem('contador', contador);// Com o localStorage é possivel guardar valores.
    }
    document.getElementById('contador').innerHTML = contador;
}

function saidaContador() {
    contador = localStorage.getItem('contador');// Aqui nos estamos recuperando o valor que foi guardado.
    if(contador === null) {
        contador = 0;
    } else {
        contador = parseInt(contador);
    }
    console.log(contador);
    document.getElementById('contadorRank').innerHTML = contador;
}

function tamanhoAleatorio() {// Está function vai servir para criar tamanhos aleatorios para a imagem.
    let classe = Math.floor(Math.random() * 3);
    switch(classe) {
        case 0:
            return 'mosca1'
        case 1:
            return 'mosca2'
        case 2:
            return 'mosca3'
    }
}

function ladoAleatorio() {
    let classe = Math.floor(Math.random() * 2);
    switch(classe) {
        case 0:
            return 'ladoA'
        case 1:
            return 'ladoB'
    }
}
