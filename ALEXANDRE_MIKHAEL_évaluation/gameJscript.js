const images = [
    { name: "Naruto", src: "/images/naruto.jpeg" },
    { name: "Luffy", src: "/images/luffy.jpeg" },
    { name: "Ichigo", src: "/images/ichigo.jpeg" },
    { name: "Goku", src: "/images/goku.jpeg" },
    { name: "Jonathan", src: "/images/jonathan.jpeg" },
    { name: "Tusk", src: "/images/tusk.jpeg" },
    { name: "Alucard", src: "/images/alucard.jpeg" },
    { name: "Cid", src: "/images/cid.jpeg" }
  ];
  
  let score = 0;
let currentIndex = 0;
let selectedImages = [];

document.getElementById("startGame").addEventListener("click", () => {
  score = 0;
  currentIndex = 0;
  updateScore();
  selectedImages = getRandomImages(images, 5);
  displayNextImage();
});

function getRandomImages(array, count) {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function displayNextImage() {
  if (currentIndex >= selectedImages.length) {
    alert("Jeu terminé ! Votre score final est : " + score);
    return;
  }

  const image = selectedImages[currentIndex];
  const container = document.getElementById("imageContainer");
  const questionContainer = document.getElementById("questionContainer");

  container.innerHTML = "";
  questionContainer.innerHTML = "";

  const img = document.createElement("img");
  img.src = image.src;
  img.alt = image.name;
  container.appendChild(img);

  const questionDiv = document.createElement("div");
  const label = document.createElement("label");
  label.textContent = `Quel est le nom de ce personnage ?`;

  const input = document.createElement("input");
  input.type = "text";

  const button = document.createElement("button");
  button.textContent = "Valider";
  button.addEventListener("click", () => {
    if (input.value.toLowerCase() === image.name.toLowerCase()) {
      score += 2;
      alert("Bonne réponse !");
    } else {
      score -= 1;
      alert(`Mauvaise réponse. La bonne réponse était : ${image.name}`);
    }
    updateScore();
    currentIndex++;
    displayNextImage();
  });

  questionDiv.appendChild(label);
  questionDiv.appendChild(input);
  questionDiv.appendChild(button);
  questionContainer.appendChild(questionDiv);
}

function updateScore() {
  document.getElementById("score").textContent = `Score : ${score}`;
}
