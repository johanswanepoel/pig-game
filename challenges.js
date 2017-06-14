/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

NEW RULES:

- Lose entire score if rolled #6 twice in a row. next player
- Add input field to set score
- Add additional dice. If one of them is 1 player loses turn

*/

var scores, roundScore, activePlayer, gamePlaying;
var diceDOM1 = document.querySelector('.dice1');
var diceDOM2 = document.querySelector('.dice2');

init();

document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        // 1. Random number for dice
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        // 2. Display results
        diceDOM1.style.display = 'block';
        diceDOM2.style.display = 'block';

        diceDOM1.src = 'dice-' + dice1 + '.png';
        diceDOM2.src = 'dice-' + dice2 + '.png';

        // 3. Update the round score IF the rolled number was not double 6 AND NOT a 1
        if (dice1 === 6 && dice2 === 6) {
            // player looses score
            scores[activePlayer] = 0;
            document.getElementById('score-' + activePlayer).textContent = '0';
            // Next player
            nextPlayer();
        } else if (dice1 !== 1 && dice2 !== 1) {
            // Add score
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            // Next player
            nextPlayer();
        }
        // lastDice = dice;
    }

});

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        // 1. Add current score to global score
        scores[activePlayer] += roundScore;

        // 2. Update UI and get winning score from user input    
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
        var winningScore = document.getElementById('winning-score').value;

        // 3. check who wins game 
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            diceDOM1.style.display = 'none';
            diceDOM2.style.display = 'none';
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
    diceDOM1.style.display = 'none';
    diceDOM2.style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    diceDOM1.style.display = 'none';
    diceDOM2.style.display = 'none';

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';

    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

}


