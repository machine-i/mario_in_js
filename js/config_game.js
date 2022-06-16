const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const gameOver = document.querySelector('.game-over');
let fim = 0;

let audioJump = new Audio('./../music/jump-super.wav');
let audioGameOver = new Audio('./../music/gameover.wav');
let fundo = new Audio('./../music/fundo.wav');
fundo.play();

function restart() {
    document.location.reload(true);
}

const jump = () => {
    if (fim == 1) {
        restart();
    }
    else {
        mario.classList.add('jump');
        audioJump.play();

        setTimeout(() => {
            mario.classList.remove('jump');
        }, 500)
    }
}

function gameOverImg() {
    gameOver.style.display = 'block';
}

const loop = setInterval(() => {

    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = "./img/mario-lose.png";
        mario.style.width = '80px';
        mario.style.marginLeft = '50px'

        gameOverImg();
        fundo.pause();
        audioGameOver.play();

        fim = 1;

        clearInterval(loop);
    }

}, 10)

document.addEventListener('keydown', jump);
