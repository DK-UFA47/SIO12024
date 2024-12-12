class MangaQuiz {
    constructor() {
        this.score = 0;
        this.currentQuestion = 0;
        this.gamesPlayed = 0;
        this.playerName = '';
        this.difficulty = '';
        this.questions = {
            easy: [
                {
                    image: "./images/naruto.jpg",
                    answers: ['Naruto', 'sasuke', 'sakura'],
                    correct: 0
                },
                {
                    image: "./images/luffy.jpg",
                    answers: ['Zoro', 'Luffy', 'Sanji'],
                    correct: 1
                },
                {
                    image: "./images/all_might.jpg",
                    answers: ['Deku', 'All Might', 'Bakugo'],
                    correct: 1
                },
                {
                    image: "./images/ichigo.jpg",
                    answers: ['Ichigo', 'Rukia', 'Aizen'],
                    correct: 0
                },
                {
                    image: "./images/saitama.jpg",
                    answers: ['Genos', 'Saitama', 'King'],
                    correct: 1
                }
            ],
            medium: [
                {
                    image: "./images/Light.jpg",
                    answers: ['L', 'Light', 'Near'],
                    correct: 1
                },
                {
                    image: "./images/tanjiro.jpg",
                    answers: ['Tanjiro', 'Zenitsu', 'Inosuke'],
                    correct: 0
                },
                {
                    image: "./images/levi.jpg",
                    answers: ['Erwin', 'Eren', 'Levi'],
                    correct: 2
                },
                {
                    image: "./images/makoto.jpg",
                    answers: ['Makoto Itou', 'Sekai Saionji', 'Kotonoha Katsura'],
                    correct: 0
                },
                {
                    image: "./images/ken_kaneki.jpg",
                    answers: ['Hide', 'Kaneki', 'Touka'],
                    correct: 1
                }
            ],
            hard: [
                {
                    image: "./images/gintoki.jpg",
                    answers: ['Gintoki', 'Hijikata', 'Katsura'],
                    correct: 0
                },
                {
                    image: "./images/griffith.jpg",
                    answers: ['Guts', 'Griffith', 'Casca'],
                    correct: 1
                },
                {
                    image: "./images/meruem.jpg",
                    answers: ['Meruem', 'Netero', 'Pitou'],
                    correct: 0
                },
                {
                    image: "./images/thorfinn.jpg",
                    answers: ['Askeladd', 'Canute', 'Thorfinn'],
                    correct: 2
                },
                {
                    image: "./images/spike.jpg",
                    answers: ['Spike', 'Jet', 'Vicious'],
                    correct: 0
                }
            ]
        };
        
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        document.getElementById('playerForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.startGame();
        });

        document.getElementById('playAgain').addEventListener('click', () => {
            this.startGame();
        });

        document.getElementById('backToHome').addEventListener('click', () => {
            this.showWelcome();
        });
    }

    startGame() {
        this.playerName = document.getElementById('playerName').value;
        this.difficulty = document.getElementById('difficulty').value;
        this.score = 0;
        this.currentQuestion = 0;
        
        document.getElementById('currentPlayer').textContent = this.playerName;
        document.getElementById('currentDifficulty').textContent = this.difficulty;
        
        this.updateScore();
        this.showGameArea();
        this.loadQuestion();
        this.gamesPlayed++;
    }

    showWelcome() {
        document.getElementById('welcome').classList.remove('d-none');
        document.getElementById('gameArea').classList.add('d-none');
        document.getElementById('results').classList.add('d-none');
    }

    showGameArea() {
        document.getElementById('welcome').classList.add('d-none');
        document.getElementById('gameArea').classList.remove('d-none');
        document.getElementById('results').classList.add('d-none');
    }

    showResults() {
        document.getElementById('finalPlayer').textContent = this.playerName;
        document.getElementById('finalDifficulty').textContent = this.difficulty;
        document.getElementById('finalScore').textContent = this.score;
        document.getElementById('gamesPlayed').textContent = this.gamesPlayed;
        
        document.getElementById('welcome').classList.add('d-none');
        document.getElementById('gameArea').classList.add('d-none');
        document.getElementById('results').classList.remove('d-none');
    }

    loadQuestion() {
        if (this.currentQuestion >= 5) {
            this.showResults();
            return;
        }

        const currentQuestions = this.questions[this.difficulty];
        const question = currentQuestions[this.currentQuestion];
        
        document.getElementById('characterImage').src = question.image;
        
        const answersDiv = document.getElementById('answers');
        answersDiv.innerHTML = '';
        
        question.answers.forEach((answer, index) => {
            const button = document.createElement('button');
            button.className = 'btn btn-answer';
            button.textContent = answer;
            button.addEventListener('click', () => this.checkAnswer(index));
            answersDiv.appendChild(button);
        });

        const progress = (this.currentQuestion / 5) * 100;
        document.querySelector('.progress-bar').style.width = `${progress}%`;
    }

    checkAnswer(answerIndex) {
        const currentQuestions = this.questions[this.difficulty];
        const question = currentQuestions[this.currentQuestion];
        
        if (answerIndex === question.correct) {
            this.score += 2;
        } else {
            this.score = Math.max(0, this.score - 1);
        }
        
        this.updateScore();
        this.currentQuestion++;
        this.loadQuestion();
    }

    updateScore() {
        document.getElementById('score').textContent = this.score;
    }
}

// Initialisation du jeu
document.addEventListener('DOMContentLoaded', () => {
    new MangaQuiz();
});