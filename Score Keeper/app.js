const topScoreSelect = document.querySelector('#option');
const reset = document.querySelector('#reset');
let topScore = 3, isGameover = false;

const player1 = {
    btn: document.querySelector('#p1Btn'),
    score: document.querySelector('#p1ScoreDisplay')
};

const player2 = {
    btn: document.querySelector('#p2Btn'),
    score: document.querySelector('#p2ScoreDisplay')
};

function inc(p1, p2) {
    if (!isGameover) {
        const s = parseInt(p1.score.innerText) + 1;
        p1.score.innerText = s;
        if (s === topScore) {
            p1.score.classList.add('winner');
            p2.score.classList.add('looser');
            player1.btn.disabled = true;
            player2.btn.disabled = true;
            isGameover = true;
        }
    }
}

player1.btn.addEventListener('click', () => { inc(player1, player2) });
player2.btn.addEventListener('click', () => { inc(player2, player1) });

reset.addEventListener('click', resetFun);

topScoreSelect.addEventListener('change', function () {
    topScore = parseInt(this.value);
    resetFun();
});

function resetFun() {
    player1.score.innerText = 0;
    player2.score.innerText = 0;
    player1.score.classList.remove('winner', 'looser');
    player2.score.classList.remove('winner', 'looser');
    player1.btn.disabled = false;
    player2.btn.disabled = false;
    isGameover = false;
}