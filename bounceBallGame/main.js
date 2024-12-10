/* Ce code crée une animation interactive où des cercles colorés se déplacent, 
changent de couleur lors des collisions, 
et peuvent être "mangés" par un cercle contrôlé par l'utilisateur.
 Le nombre de cercles restants est affiché à l'utilisateur.
 */

 /* Le code sélectionne un élément <canvas> dans le document HTML 
 et obtient son contexte de rendu 2D.
La largeur et la hauteur du canevas sont définies pour correspondre à la taille
 de la fenêtre du navigateur.
Une balise <p> est sélectionnée pour afficher le nombre de cercles.
*/ 

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

let p = document.querySelector('p');

let isPaused = false; // Variable pour suivre l'état de pause

// Sélectionnez le bouton et ajoutez un écouteur d'événements
const pauseButton = document.getElementById('pauseButton');
pauseButton.addEventListener('click', () => {
    isPaused = !isPaused; // Change l'état de pause
    pauseButton.innerHTML = isPaused ? 'Reprendre' : 'Pause'; // Change le texte du bouton
});

// function to generate random number

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const numBall = random(10, 30);
let compteur = 0;
p.innerHTML += compteur;

// function to generate random RGB color value

function randomRGB() {
    return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

/* La classe Shape définit les propriétés de base (position, vitesse, existence)
 et les méthodes pour dessiner (draw),
 mettre à jour (update) et détecter les collisions (collisionDetect).
*/
class Shape {
    x = 0;
    y = 0;
    velX = 0;
    velY = 0;
    exists = true;
    constructor(x, y, velX, velY, exists) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.exits = exists;
    }
    /*destroy(){
     this.destroy = function () {};
    }
    */
    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }

    update() {
        if ((this.x + this.size) >= width) {
            this.velX = -(Math.abs(this.velX));
        }

        if ((this.x - this.size) <= 0) {
            this.velX = Math.abs(this.velX);
        }

        if ((this.y + this.size) >= height) {
            this.velY = -(Math.abs(this.velY));
        }

        if ((this.y - this.size) <= 0) {
            this.velY = Math.abs(this.velY);
        }

        this.x += this.velX;
        this.y += this.velY;
    }

    collisionDetect() {
        for (const ball of balls) {
            if (!(this === ball)) {
                const dx = this.x - ball.x;
                const dy = this.y - ball.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.size + ball.size) {
                    ball.color = this.color = randomRGB();
                }
            }
        }
    }

}

/* La classe Ball hérite de Shape et ajoute des propriétés spécifiques 
comme la couleur et la taille.*/
class Ball extends Shape {

    constructor(x, y, velX, velY, exists, color, size) {
        super(x, y, velX, velY, exists);

        this.color = color;
        this.size = size;
    }
}

/* EvilCircle représente un cercle contrôlé par l'utilisateur. Il a des méthodes pour dessiner, 
vérifier les limites du canevas, configurer les contrôles au clavier et détecter les collisions.*/
class EvilCircle extends Shape {
    constructor(x, y, velX, velY, exists, color, size) {
        super(x, y, velX, velY, exists);

        this.velX = 20;
        this.velY = 20;
        this.color = "white";
        this.size = 10;
    }

    draw() {
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.strokeStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.stroke();
    }

    checkBounds() {
        if ((this.x + this.size) >= width) {
            this.x = -(Math.abs(this.size));
        }

        if ((this.x - this.size) <= 0) {
            this.x = Math.abs(this.size);
        }

        if ((this.y + this.size) >= height) {
            this.y = -(Math.abs(this.size));
        }

        if ((this.y - this.size) <= 0) {
            this.y = Math.abs(this.size);
        }

    }
    /* cette méthode permet de déplacer le cercle en utilisant les touches fléchées du clavier.*/
    setControls() {
        var _this = this;
        window.onkeydown = function (e) {
            if (e.keyCode === 37) {  // flèche <- 
                _this.x -= _this.velX;
            } else if (e.keyCode === 39) { //flèche droite
                _this.x += _this.velX;
            } else if (e.keyCode === 38) {// flèche haut
                _this.y -= _this.velY;
            } else if (e.keyCode === 40) { //flèche bas
                _this.y += _this.velY;
            }
        };
    }

    collisionDetect() {
        for (const ball of balls) {
            if (ball.exists == true) {
                const dx = this.x - ball.x;
                const dy = this.y - ball.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.size + ball.size) {

                    ball.exists = false;
                    delete this;
                    compteur--;
                    p.innerHTML = compteur;

                }
            }
        }
    }
}


const balls = [];
compteur.innerHTML += numBall;
while (balls.length < numBall) {
    const size = random(10, 20);
    const ball = new Ball(
        // ball position always drawn at least one ball width
        // away from the edge of the canvas, to avoid drawing errors
        random(0 + size, width - size),
        random(0 + size, height - size),
        random(-6, 6),
        random(-7, 7),
        true,
        randomRGB(),
        size
    );

    balls.push(ball);
    compteur++;
}

let size = random(-7, 7);
let viseur = new EvilCircle(random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    true,
    randomRGB(),
    size);

viseur.setControls();

/* La fonction loop est la boucle principale qui efface le canevas,
 dessine et met à jour chaque cercle, et gère les collisions.*/
function loop() {
    if (!isPaused) { // Ne met à jour que si le jeu n'est pas en pause
        ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
        ctx.fillRect(0, 0, width, height);
    /*  boucle génère des cercles avec des positions, 
    vitesses, couleurs et tailles aléatoires, et les ajoute au tableau.*/
        for (const ball of balls) {
            if (ball.exists) {
                ball.draw();
                ball.update();
                ball.collisionDetect();
            }
    }
        viseur.draw();
        viseur.checkBounds();
        viseur.collisionDetect();
    }

    /* permet de créer une animation fluide en appelant loop à chaque frame */
    requestAnimationFrame(loop);
}

loop();