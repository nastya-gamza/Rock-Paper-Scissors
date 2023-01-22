const choices = document.querySelectorAll('[data-player-choice]');
const player = document.querySelector('.player');
const computerChoice = document.querySelector('[data-computer-choice]');
const resultMessage = document.querySelector('.result-message');
const restartBtn = document.querySelector('.restart');

let emj = ['🗿', '📃', '✂️'];

player.addEventListener('click', handler);
restartBtn.addEventListener('click', restartGame);


function handler(e) {
    if(!e.target.dataset.playerChoice) return;
    
    choices.forEach(choice => {
        e.target.classList.add('selected');
        if(e.target !== choice)  choice.classList.add('hidden');
    });

    insertEmj();
}

function randomEmj() {
    let random = Math.floor(Math.random() * emj.length);
    return emj[random];
}

function insertEmj() {
    let counter = 0;
    let interval = setInterval(() => {
        computerChoice.textContent = emj[counter];
        counter++;
        if (counter === 3) counter = 0;
    }, 200);

    setTimeout(() => {
        clearInterval(interval);
        computerChoice.textContent = randomEmj();
        player.removeEventListener('click', handler);
        showResults();
    }, 1000);
}

function showResults() {
    resultMessage.classList.remove('hidden');
    restartBtn.classList.remove('hidden');

    let playerSelected = player.querySelector('.selected').textContent;
    let computerSelected = computerChoice.textContent;

    if (playerSelected === computerSelected) {
        resultMessage.textContent = 'Draw! Try again.';
    } else if (playerSelected === '✂️' && computerSelected === '📃' || playerSelected === '🗿' && computerSelected === '✂️' || playerSelected === '📃' && computerSelected === '🗿') {
        resultMessage.textContent = 'You won!';
    } else {
        resultMessage.textContent = 'You lost! Try again.';
    }
}

function restartGame() {
    choices.forEach(choice => {
        choice.classList.remove('hidden');
        choice.classList.remove('selected');
    });
    
    resultMessage.classList.add('hidden');
    restartBtn.classList.add('hidden');
    player.addEventListener('click', handler);
}







