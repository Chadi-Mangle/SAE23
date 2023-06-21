const words = ['voiture', 'banane', 'chien', 'ordinateur', 'football', 'pizza', 'soleil', 'guitare', 'chocolat', 'papillon', 'avion', 'piano', 'montagne', 'lune', 'plage', 'lion', 'jardin', 'tortue', 'bouteille', 'chapeau', 'cheval', 'maison', 'coccinelle', 'gateau', 'souris', 'fleur', 'livre', 'nuage', 'dauphin', 'bicyclette', 'chaussure', 'pont', 'stylo', 'montre', 'radio', 'miel', 'parapluie', 'marteau', 'ballon', 'chaise', 'carte', 'pomme', 'bateau', 'papier', 'puzzle', 'canard', 'robot', 'plume', 'crayon', 'gant', 'singe', 'tigre', 'vache', 'lapin', 'dragon', 'poisson', 'dragon', 'porte', 'table', 'moto', 'stade', 'oiseau', 'maillot', 'globe', 'ciseaux', 'arc', 'miroir', 'carton', 'moustache', 'couronne', 'casque', 'nuage', 'crabe', 'crocodile', 'renard', 'bagage', 'chaussette', 'rocher', 'planete', 'sapin', 'loup', 'microphone', 'bonbon', 'brosse', 'globe', 'flamme', 'roue', 'parfum'];
// const words = ["aab"]

const listsourceImg = ["./assets/pendu_0.jpg","./assets/pendu_1.jpg", "./assets/pendu_2.jpg", "./assets/pendu_3.jpg", "./assets/pendu_4.jpg", "./assets/pendu_5.jpg"] 
const maxAttempts = listsourceImg.length -1;
console.log(maxAttempts)
var img = document.querySelector("img")
img.src = listsourceImg[0]  

var currentWord = '';
var displayWord = '';
var attempts = 0;

function selectRandomWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    currentWord = words[randomIndex].toLowerCase();
}

// Initialise l'affichage du mot à deviner
function initWordDisplay() {    
    document.getElementById("new-word").classList.add("cacher")
    document.getElementById('message').textContent = ""
    displayWord = currentWord[0].toUpperCase() + '_'.repeat(currentWord.length - 1);

    for (let i = 1; i < currentWord.length; i++) {
        if (currentWord[i] === currentWord[0]) {
            displayWord = displayWord.substr(0, i) + currentWord[0] + displayWord.substr(i + 1);
        }
    }
    document.getElementById('word-display').textContent = displayWord;
}

function endGame(isWin) {
    if (isWin) {
        document.getElementById('message').textContent = 'Félicitations ! Vous avez deviné le mot !';
    } else {
        document.getElementById('message').textContent = `Dommage... Le mot était "${currentWord}". Vous avez perdu.`;
        img.src = listsourceImg[attempts]; // Définir la dernière image lorsque vous perdez
    }
    // attempts = 0;
    document.querySelector('input').disabled = true
    document.getElementById("new-word").classList.remove("cacher");
}

function checkLetter() {
    const guess = document.querySelector('input').value.toLowerCase();
    document.querySelector('input').value = '';

    if (guess.length !== 1 || !guess.match(/[a-z]/i)) {
        document.getElementById('message').textContent = 'Veuillez entrer une seule lettre.';
        return;
    }

    let foundLetter = false;

    for (let i = 0; i < currentWord.length; i++) {
        if (currentWord[i] === guess) {
            document.getElementById('message').textContent = `La lettre "${guess}" est bien dans le mot.`
            displayWord = displayWord.substr(0, i) + guess + displayWord.substr(i + 1);
            foundLetter = true;
        }
    }

    if (foundLetter) {
        document.getElementById('word-display').textContent = displayWord;

        if (displayWord.toLowerCase() == currentWord.toLowerCase()) {
            endGame(true);
        }
    } else {
        attempts++;
        document.getElementById('message').textContent = `La lettre "${guess}" n'est pas dans le mot. Tentatives restantes : ${maxAttempts - attempts}.`;
        
        if (attempts >= maxAttempts) {
            endGame(false);
        }
        img.src = listsourceImg[attempts]
    }
}

var guess = document.querySelector('input')
guess.addEventListener("keypress", function(event){
    if (event.key === "Enter"){
        checkLetter()
    }});


function new_word(){
    attempts = 0;
    img.src = listsourceImg[0]  
    document.querySelector('input').disabled = false
    selectRandomWord()
    initWordDisplay()
}

new_word()
