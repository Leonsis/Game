// Primeiro é nescessario encontra a altura e alrgura da pagina.
var altura = 0; // Variavel para function ajustaTamanhoPalcoJogo().
var largura = 0; // Variavel para function ajustaTamanhoPalcoJogo().
var vidas = 1; // Variavel para function posicaoRamdomicaMosca().
var tempo = 50; // Variavel que vai ficar dentro da variavel cronometro.
var nivel = window.location.search; // Variavel para recuperar o nivel do jogo.
nivel = nivel.replace('?', '');// Está sendo atribuido o novo valor para a variavel nivel, onde não possui a ?.
var criaMoscaTempo = 1500; // Variavel para o tempo que aparece o mosquito.
var mosca // Variavel na qual foi colocada uma tag html que foi criada pelo comando .createElement('img').

var contador = 0; // Variavel para cintar quantas moscas foram mortas.

if(nivel === 'normal') {
    criaMoscaTempo = 1500;
} else if(nivel === 'dificil') {
    criaMoscaTempo = 1000;
} else if(nivel === 'sDificio') {
    criaMoscaTempo = 750;
}

function ajustaTamanhoPalcoJogo() {
    altura = window.innerHeight;
    largura = window.innerWidth;
}
ajustaTamanhoPalcoJogo();

var cronometro = setInterval(function() {
    tempo -= 1;
    if(tempo < 0) {
        clearInterval(cronometro);
        clearInterval(criaMosca)
        window.location.href = 'vitoria.html';
    } else {
        document.getElementById('cronometro').innerHTML = tempo;
    }
    
}, 1000);

// Segundo fazer com que a imagem apareça em destinos aleatorioas na pagina web.
function posicaoRamdomicaMosca() {
    //Remover a mosca anterior (Caso exista)
    if(document.getElementById('mosca')) {
        document.getElementById('mosca').remove();
        if(vidas > 3) {
            window.location.href = 'fim_do_jogo.html';
        } else {
            document.getElementById('v' + vidas).src = 'src/imagens/coracao_vazio.png';
            vidas++;
        }
    }

    // Criando as posições randomicamente
    var posicaoX = Math.floor(Math.random() * largura - 90);
    var posicaoY = Math.floor(Math.random() * altura - 140);
    
    /*
        Aqui está sendo feira uma estrutura de condição
        Que se posisaoX for menor que 0 a posicaoX vai receber 0 se não vai receber posicoaX
    */
    posicaoX = posicaoX < 0 ? 0 : posicaoX;
    posicaoY = posicaoY < 0 ? 0 : posicaoY;

    //Criar o elemento  html
    mosca = document.createElement('img');
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
    }
    document.getElementById('contador').innerHTML = contador;
}

// Está function vai servir para criar tamanhos aleatorios para a imagem.
function tamanhoAleatorio() {
    var classe = Math.floor(Math.random() * 3);
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
    var classe = Math.floor(Math.random() * 2);
    switch(classe) {
        case 0:
            return 'ladoA'
        case 1:
            return 'ladoB'
    }
}
