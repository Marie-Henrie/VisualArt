// Player movement
const player = document.getElementById('player');
let playerX = 0;
let playerY = 0;

let pawsCollected = 0;
let totalAnimals = 2;  // Adjust this based on how many animals you have
let animalsFound = 0;

document.addEventListener('keydown', movePlayer);

function movePlayer(event) {
    const step = 10;
    
    switch (event.key) {
        case 'ArrowUp':
            playerY = Math.max(0, playerY - step);
            break;
        case 'ArrowDown':
            playerY = Math.min(550, playerY + step);
            break;
        case 'ArrowLeft':
            playerX = Math.max(0, playerX - step);
            break;
        case 'ArrowRight':
            playerX = Math.min(750, playerX + step);
            break;
    }
    
    player.style.top = playerY + 'px';
    player.style.left = playerX + 'px';
    
    checkCollision();
}

function checkCollision() {
    // Check for animals
    const animals = document.getElementsByClassName('hidden-animal');
    for (let animal of animals) {
        if (isColliding(player, animal)) {
            revealAnimal(animal);
        }
    }
    
    // Check for paws
    const paws = document.getElementsByClassName('hidden-paw');
    for (let paw of paws) {
        if (isColliding(player, paw)) {
            collectPaw(paw);
        }
    }
}

function isColliding(obj1, obj2) {
    const rect1 = obj1.getBoundingClientRect();
    const rect2 = obj2.getBoundingClientRect();
    
    return !(rect1.right < rect2.left || 
             rect1.left > rect2.right || 
             rect1.bottom < rect2.top || 
             rect1.top > rect2.bottom);
}

function revealAnimal(animal) {
    animal.style.display = 'block';
    showAnimalStory(animal.id);
    animalsFound++;

    if (animalsFound === totalAnimals) {
        showQuestion();
    }
}

function showAnimalStory(animalId) {
    const story = document.getElementById('animal-story');
    switch (animalId) {
        case 'animal1':
            story.textContent = "This is Animal 1's story!";
            break;
        case 'animal2':
            story.textContent = "This is Animal 2's story!";
            break;
        // Add more stories for each animal
    }
}

function collectPaw(paw) {
    paw.style.display = 'none';
    pawsCollected++;
    document.getElementById('paw-count').textContent = pawsCollected;
}

function showQuestion() {
    document.getElementById('question-container').classList.remove('hidden');
}

function checkAnswer(answer) {
    if (answer === 'correct') {
        nextLevel();
    } else {
        retryLevel();
    }
}

function nextLevel() {
    // Load the next level (change background, reset positions)
    console.log("Loading next level...");
}

function retryLevel() {
    console.log("Retrying the current level...");
    // Optionally reset player position
}
