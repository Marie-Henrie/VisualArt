const imageCount = 8; // Number of images you have
const cardImages = [];

// Generate the cardImages array based on the number of images
for (let i = 1; i <= imageCount; i++) {
    cardImages.push(`image${i}.jpg`);
}

let cards, firstCard, secondCard;
let lockBoard = false;
let matchedPairs = 0;

const gameContainer = document.querySelector('.game-container');
const resetButton = document.getElementById('reset-button');

function createCard(image) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.image = `pics/${image}`;
    card.addEventListener('click', flipCard);
    return card;
}

function setupGame() {
    gameContainer.innerHTML = ''; // Clear the game container
    cards = [...cardImages, ...cardImages]; // Duplicate images for pairs
    cards = cards.sort(() => Math.random() - 0.5); // Shuffle cards

    matchedPairs = 0; // Reset matched pairs
    [firstCard, secondCard] = [null, null];
    lockBoard = false;

    cards.forEach(image => {
        const card = createCard(image);
        gameContainer.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.style.backgroundImage = `url(${this.dataset.image})`;
    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkMatch();
}

function checkMatch() {
    if (firstCard.dataset.image === secondCard.dataset.image) {
        disableCards();
        matchedPairs++;
        if (matchedPairs === cardImages.length) {
            setTimeout(() => alert('You win!'), 500);
        }
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.style.backgroundImage = '';
        secondCard.style.backgroundImage = '';
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

resetButton.addEventListener('click', setupGame);

setupGame(); // Initial game setup
