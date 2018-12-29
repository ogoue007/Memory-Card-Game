const cards = document.querySelectorAll('.memory-card');

// When the user click the card we need to know if it's the first or second cards
let hasFlippedCArd = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if(lockBoard) return;
  if(this === firstCard) return;
  this.classList.toggle('flip');

  if(!hasFlippedCArd) {
    //first click
    hasFlippedCArd = true;
    firstCard = this;
    return;
  }
  // Secon click
    hasFlippedCArd = false;
    secondCard = this;

    checkForMatch();
}

function checkForMatch() {
    //Do this math
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  //If it is a match!!!
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    //If it is not a match set time delay
    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');

      lockBoard =false;

      resetBoard();

  }, 600);
}

function resetBoard() {
  [hasFlippedCArd, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

//Shuffle the deck of cards
  (function shuffle() {
    cards.forEach(card => {
      let randomPos = Math.floor(Math.random() * 12);
      card.style.order = randomPos;
    });
})();


cards.forEach(card => card.addEventListener('click', flipCard));
