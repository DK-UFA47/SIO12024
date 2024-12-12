/**
 * Base de données des personnages
 * Chaque personnage a un nom et une URL d'image
 */
const characters = [
    { 
        name: "sasuke", 
        image: "https://cdn.myanimelist.net/images/characters/9/131317.jpg" 
    },
    { 
        name: "luffy", 
        image: "https://cdn.myanimelist.net/images/characters/9/310307.jpg" 
    },
    { 
        name: "goku", 
        image: "https://cdn.myanimelist.net/images/characters/15/434273.jpg" 
    },
    { 
        name: "eren", 
        image: "https://cdn.myanimelist.net/images/characters/10/216895.jpg" 
    },
    { 
        name: "tanjiro", 
        image: "https://cdn.myanimelist.net/images/characters/15/384599.jpg" 
    }
];


let currentScore = 0;
let currentRound = 1;
let currentCharacterIndex = 0;


function initGame() {
 
    currentCharacterIndex = Math.floor(Math.random() * characters.length);
    
  
    document.getElementById('character-image').src = characters[currentCharacterIndex].image;
    document.getElementById('score').textContent = currentScore;
    document.getElementById('round').textContent = currentRound;
    document.getElementById('guess-input').value = '';
    

    const messageElement = document.getElementById('message');
    messageElement.textContent = '';
    messageElement.className = 'alert';
}


function checkGuess() {
    const guess = document.getElementById('guess-input').value.toLowerCase().trim();
    const correctAnswer = characters[currentCharacterIndex].name;
    const messageElement = document.getElementById('message');


    if (guess === correctAnswer) {
        currentScore += 2;
        messageElement.textContent = 'Correct ! +2 points';
        messageElement.className = 'alert alert-success';
    } else {
        currentScore = Math.max(0, currentScore - 1); 
        messageElement.textContent = `Incorrect ! -1 point. La bonne réponse était ${correctAnswer}`;
        messageElement.className = 'alert alert-danger';
    }

 
    currentRound++;
    document.getElementById('score').textContent = currentScore;

    if (currentRound <= 5) {
        setTimeout(() => {
            document.getElementById('round').textContent = currentRound;
            initGame();
        }, 2000);
    } else {
        setTimeout(() => {
            alert(`Jeu terminé ! Score final : ${currentScore}`);
            resetGame();
        }, 2000);
    }
}


function resetGame() {
    currentScore = 0;
    currentRound = 1;
    initGame();
}

// touche Entrée
document.getElementById('guess-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        checkGuess();
    }
});

window.addEventListener('load', initGame);