// Données du jeu
const data = [
    { image: "gumball.png", options: ["gumball A", "kevin B", "mr blue C"], answer: "gumball A" },
    { image: "Bonbonchouchou.png", options: ["onipay et lili D", "bonbon et chouchou E", "bouldegome et framboise F"], answer: "bonbon et chouchou E" },
    { image: "songoku.png", options: ["songoku G", "itachi H", "végéta I"], answer: "songoku G" },
    { image: "kokushibo.png", options: ["muzan J", "kokushibo K", "shadow L"], answer: "kokushibo K" },
    { image: "luffy.png", options: ["zoro M", "naruto N", "luffy O"], answer: "luffy O" },
];

class PersonGuessingGame {
    constructor(data) {
        this.data = data;
        this.currentIndex = 0;
        this.score = 0;
        this.gameImage = document.getElementById('game-image');
        this.optionsContainer = document.getElementById('options-container');
        this.scoreDisplay = document.getElementById('score-display');
        
        // Lier les méthodes pour garantir un contexte « this » correct
        this.loadQuestion = this.loadQuestion.bind(this);
        this.checkAnswer = this.checkAnswer.bind(this);
    }

    // Mélanger le tableau de manière aléatoire
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Charger une question
    loadQuestion() {
        // Vérifiez si nous avons atteint la fin du jeu
        if (this.currentIndex >= this.data.length) {
            this.endGame();
            return;
        }

        const currentData = this.data[this.currentIndex];
        
        // Définir la source de l'image
        this.gameImage.src = currentData.image;
        this.gameImage.alt = `Image de ${currentData.answer}`;
        
        // Effacer les options précédentes
        this.optionsContainer.innerHTML = '';
        
        // Options de mélange pour randomiser les positions des boutons
        const shuffledOptions = this.shuffleArray([...currentData.options]);
        
        // Créer des boutons d'option
        shuffledOptions.forEach(option => {
            const button = document.createElement('button');
            button.className = 'btn btn-outline-primary mb-2 w-100';
            button.textContent = option;
            button.addEventListener('click', () => this.checkAnswer(option));
            this.optionsContainer.appendChild(button);
        });
    }

    // Vérifier la réponse
    checkAnswer(selectedOption) {
        const currentData = this.data[this.currentIndex];
        
        if (selectedOption === currentData.answer) {
            this.score += 2;
            this.showFeedback(true);
        } else {
            this.score = Math.max(0, this.score - 1);  // Prévenir les scores négatifs
            this.showFeedback(false);
        }
        
        // Mettre à jour l'affichage du score
        this.scoreDisplay.textContent = `Score : ${this.score}`;
        
        // Passer à la question suivante
        this.currentIndex++;
        
        // Soit charger la question suivante, soit terminer la partie
        if (this.currentIndex < this.data.length) {
            // Petit délai pour afficher les commentaires avant la question suivante
            setTimeout(this.loadQuestion, 1000);
        } else {
            this.endGame();
        }
    }

    // Afficher un retour visuel pour les réponses correctes/incorrectes
    showFeedback(isCorrect) {
        const buttons = this.optionsContainer.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.disabled = true;
            if (isCorrect) {
                button.classList.add('btn-success');
            } else {
                button.classList.add('btn-danger');
            }
        });
    }

    // Méthode de fin de partie
    endGame() {
        this.optionsContainer.innerHTML = `
            <div class="text-center">
                <h2>Jeu terminé !</h2>
                <p>Votre score final : ${this.score} / ${this.data.length * 2}</p>
                <button id="restart-btn" class="btn btn-primary">Recommencer</button>
            </div>
        `;
        
        // Ajouter une fonctionnalité de redémarrage
        const restartBtn = this.optionsContainer.querySelector('#restart-btn');
        restartBtn.addEventListener('click', () => {
            this.resetGame();
        });
    }

    // Réinitialiser le jeu à l'état initial
    resetGame() {
        this.currentIndex = 0;
        this.score = 0;
        this.scoreDisplay.textContent = 'Score : 0';
        this.loadQuestion();
    }

    // Initialiser le jeu
    init() {
        this.loadQuestion();
    }
}

// Démarrez le jeu lorsque la page se charge
document.addEventListener('DOMContentLoaded', () => {
    const game = new PersonGuessingGame(data);
    game.init();
});
