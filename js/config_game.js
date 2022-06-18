// ### Declaração de variáveis ###
const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const gameOver = document.querySelector('.game-over');
const imgScoreUni = document.querySelector('#scoreUnidade');
const imgScoreDez = document.querySelector('#scoreDezena');
let fim = 0;
let podeContar = 0;
let pontoUni = 0;
let pontoDez = 0

let audioJump = new Audio('./../music/jump-super.wav');
let audioGameOver = new Audio('./../music/gameover.wav');
let fundo = new Audio('./../music/fundo.wav');
fundo.play();

//Sistema para reiniciar o game, basicamente um refresh na página
function restart() {
    document.location.reload(true);
}

//Sistema para atualizar o score de acordo com o condicional
function score() {
    if (pontoUni > 8) { // verifica se precisa zerar o score da unidade e contar o da dezena
        pontoUni = 0;
        imgScoreDez.style.opacity = 1; // deixa visível o score da dezena, pois ele começou a ser contado
        pontoDez += 1;
    } else {
        pontoUni += 1;
    }
    imgScoreUni.src = "./../img/score" + pontoUni + ".png";
    imgScoreDez.src = "./../img/score" + pontoDez + ".png";
    podeContar = 0;
}

// Função do pulo do mário (o mesmo comando que escuta o click para pular é usado para reiniciar)
const jump = () => {
    if (fim == 1) {
        restart(); // faz refresh se o jogo acabou e o jogador clicou em alguma tecla
    }
    else { // sistema de pulo atráves do controle de classe
        mario.classList.add('jump');
        audioJump.play();

        podeContar = 1;

        setTimeout(() => {
            mario.classList.remove('jump');
        }, 500)
    }
}

//Função que deixa o "Game Over" visível
function gameOverImg() {
    gameOver.style.display = 'block';
}

//Sistema para verificar a derrota
const loop = setInterval(() => {

    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) { // de acordo com a posição do mário e do pipe, o jogador perde
        //Retira as animações do pipe
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        //Impede o pulo e troca a imagem do mário
        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;
        mario.src = "./img/mario-lose.png";
        mario.style.width = '80px';
        mario.style.marginLeft = '50px'

        //Torna a imagem do "Game Over" visível, pausa a música e executa o áudio da derrota
        gameOverImg();
        fundo.pause();
        audioGameOver.play();

        fim = 1;

        clearInterval(loop);
    } else if (pipePosition <= 120 && marioPosition > 80 && podeContar === 1) { // Condicional para atualizar o score
        score();
    }

}, 10)

//Comando para escutar do click da tecla
document.addEventListener('keydown', jump);
