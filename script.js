// Variable selector for the all the cards and forEach method to loop through all the cards

let cards = document.querySelectorAll(".card");

cards.forEach((card) => card.addEventListener("click", flipCard));

// Variables for card choices

let firstChoice = null;
let secondChoice = null;
let numFlipped = 0;

// Selectors and variables for the menu

let cardsMatched = document.querySelector("#matched");
let matched = 0;

let livesLeft = document.querySelector("#lives");
let lives = 7;

// Variables for gameOver and winGame menu

let gameOverMenu = document.querySelector("#gameOver");

let winGameMenu = document.querySelector("#winGame");

// Audio controls

const sounds = {
  flip: new Audio("audio/cardflip.mp3"),
  incorrect: new Audio("audio/incorrect.mp3"),
  correct: new Audio("audio/correct.mp3"),
  lose: new Audio("audio/dead.mp3"),
  win: new Audio("audio/questcompleted.mp3"),
  background: new Audio("audio/LullabyOfWoe.mp3"),
};

sounds.background.volume = 0.3;
sounds.flip.volume = 0.3;
sounds.incorrect.volume = 0.2;
sounds.correct.volume = 0.2;
sounds.lose.volume = 0.3;
sounds.win.volume = 0.3;

// Shuffle function that shuffles all the cards in a random order at the start of the game

function shuffle() {
  cards.forEach((card) => {
    let mixAndMatch = Math.floor(Math.random() * 16);
    card.style.order = mixAndMatch;
  });
}

shuffle();

playMusic();

function flipCard(event) {
  if (numFlipped < 2) {
    let card = event.target;
    if (card.dataset.matched === "true") {
      return;
    }
    if (firstChoice === null) {
      firstChoice = card;
      firstChoice.classList.add("flipped");
      sounds.flip.currentTime = 0;
      sounds.flip.play();
      firstChoice.src = `./images/${this.dataset.name}.jpg`;
      numFlipped++;
      // Remove click event listener from the firstChoice element.
      firstChoice.removeEventListener("click", flipCard);
      // Conditional below prevents the firstChoice card from being the secondChoice card as well
    } else if (secondChoice === null && card !== firstChoice) {
      secondChoice = card;
      secondChoice.classList.add("flipped");
      sounds.flip.currentTime = 0;
      sounds.flip.play();
      secondChoice.src = `./images/${this.dataset.name}.jpg`;
      numFlipped++;
      checkForMatch();
    }
  }
}

function checkForMatch() {
  if (firstChoice.dataset.name === secondChoice.dataset.name) {
    setTimeout(function () {
      firstChoice.dataset.matched = "true";
      secondChoice.dataset.matched = "true";
      matchedCounter();
      sounds.correct.currentTime = 0;
      sounds.correct.play();
      firstChoice = null;
      secondChoice = null;
      numFlipped = 0;
    }, 500);
  } else {
    setTimeout(function () {
      firstChoice.classList.remove("flipped");
      secondChoice.classList.remove("flipped");
      firstChoice.src = "./images/back.jpg";
      secondChoice.src = "./images/back.jpg";
      numFlipped = 0;
      firstChoice = null;
      secondChoice = null;
      livesCounter();
      sounds.incorrect.currentTime = 0;
      sounds.incorrect.play();
    }, 1000);
  }
}

// Increment function for matched pairs

function matchedCounter() {
  matched++;
  cardsMatched.innerHTML = matched;
  matched >= 8 ? (cardsMatched.style.color = "green") : "";
  if (matched == 8 && matched == cards.length / 2) {
    cards.forEach((card) => card.removeEventListener("click", flipCard));
    setWinState();
    sounds.win.play();
  }
}

// Decrement function for lives remaining

function livesCounter() {
  lives--;
  livesLeft.innerHTML = lives;
  lives <= 0 ? (livesLeft.style.color = "red") : "";
  if (lives <= 0) {
    cards.forEach((card) => card.removeEventListener("click", flipCard));
    setLoseState();
    sounds.lose.play();
  }
}

// Win and lose menu functions

function setWinState() {
  sounds.background.pause();
  setTimeout(function () {
    winGameMenu.classList.add("show");
  }, 500);
}

function setLoseState() {
  sounds.background.pause();
  setTimeout(function () {
    gameOverMenu.classList.add("show");
  }, 500);
}

// Function for background music

function playMusic() {
  let backgroundMusic = sounds.background.play();
  backgroundMusic.play();
}
