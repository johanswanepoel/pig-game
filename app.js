var rules = "The game has 2 players, playing in rounds. \nIn each turn, a player rolls a dice as many times as he whishes. \nEach result gets added to the active player's ROUND score. \nIf the active player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn. \nThe player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. \nAfter that, it's the next player's turn. \nThe first player to reach 100 points on GLOBAL score wins the game";

alert(rules);

var scores, roundScore, activePlayer, gamePlaying;
var diceDOM = document.querySelector('.dice');
init();

document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        // random number
        var dice = Math.floor(Math.random() * 6) + 1;
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        if (dice !== 1) {
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer()
        }
    }

});

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        // 1. Add current score to glaobal score
        scores[activePlayer] += roundScore;
        // 2. update UI
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
        // 3. check who wins game 
        if (scores[activePlayer] >= 100) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            diceDOM.style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }

});

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    // document.querySelector('.player-0-panel').classList.remove('active'); // possible alternatives
    // document.querySelector('.player-1-panel').classList.add('active');
    diceDOM.style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    diceDOM.style.display = 'none';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    diceDOM.style.display = 'none';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

}