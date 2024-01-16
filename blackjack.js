const newGame = document.getElementById("start");
const hitButton = document.getElementById("hit");
const stayButton = document.getElementById("stay");
function updateButton(newGameVisible, hitbuttonVisible, stayButtonVisible) {
  newGame.style.display = newGameVisible ? "block" : "none";
  hitButton.style.display = hitbuttonVisible ? "block" : "none";
  stayButton.style.display = stayButtonVisible ? "block" : "none";
}
let dealerArray = [];
let playerArray = [];
//This is Deck

//Test
const suits = ["S", "H", "D", "C"];
const numbers = [
  "A",
  "K",
  "Q",
  "J",
  "10",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
];
const deck = [];
for (let i = 0; i < numbers.length; i++) {
  for (let j = 0; j < suits.length; j++) {
    deck.push(numbers[i] + suits[j]);
  }
}

// Function to get card value
function getCardValue(card) {
  switch (card) {
    case "AS":
    case "AH":
    case "AD":
    case "AC":
      return "Ace";
    case "9S":
    case "9H":
    case "9D":
    case "9C":
      return 9;
    case "8S":
    case "8H":
    case "8D":
    case "8C":
      return 8;
    case "7S":
    case "7H":
    case "7D":
    case "7C":
      return 7;
    case "6S":
    case "6H":
    case "6D":
    case "6C":
      return 6;
    case "5S":
    case "5H":
    case "5D":
    case "5C":
      return 5;
    case "4S":
    case "4H":
    case "4D":
    case "4C":
      return 4;
    case "3S":
    case "3H":
    case "3D":
    case "3C":
      return 3;
    case "2S":
    case "2H":
    case "2D":
    case "2C":
      return 2;
    default:
      return 10;
  }
}

// Function to calculate score
function getScore(cards) {
  let score = 0;
  let numberOfAce = 0;
  let hasAce = false;

  for (let card of cards) {
    const cardValue = getCardValue(card);

    if (cardValue === "Ace") {
      hasAce = true;
      numberOfAce++;
      score += 11; // Assuming 11 for Ace, you may need logic to handle 1 or 11 based on the total score.
    } else {
      score += cardValue;
    }
  }

  // If the hand has an Ace and the score is over 21, adjust for the Ace
  // if (hasAce && score > 21) {
  //   score -= 10; // Subtract 10 to treat the Ace as 1 instead of 11
  // }
  // if (numberOfAce > 1) {
  //   score -= 10;
  // }
  while (numberOfAce > 0 && score > 21) {
    score -= 10;
    numberOfAce--;
  }

  return score;
}

function resetArrays() {
  dealerArray = [];
  playerArray = [];
  clearGameUI();
}
function updateScore() {
  dealerScore = getScore(dealerArray);
  playerScore = getScore(playerArray);
  document.getElementById("dealer_header").textContent = "Score " + dealerScore;
  document.getElementById("player_header").textContent = "Score " + playerScore;
}
function clearGameUI() {
  // Clear player cards
  for (let i = 1; i <= 5; i++) {
    const playerCardElement = document.getElementById(`pcard${i}`);
    playerCardElement.src = "img/back.png";
  }

  // Clear dealer cards
  for (let i = 1; i <= 5; i++) {
    const dealerCardElement = document.getElementById(`dcard${i}`);
    dealerCardElement.src = "img/back.png";
  }
  //clear winner
  document.getElementById("check_winner").textContent = "";

  // Clear scores
  // You can add code here to clear the displayed scores if needed.
}
function startGame() {
  resetArrays();
  updateButton(false, true, true);
  // console.log(dealerArray.length);
  // newGame.style.display = "none";
  // hitButton.style.display = "block";
  // stayButton.style.display = "block";
  // Initialize the deck and other code..

  let dealerCard = deck[Math.floor(Math.random() * deck.length)];
  let playerCard1 = deck[Math.floor(Math.random() * deck.length)];
  let playerCard2 = deck[Math.floor(Math.random() * deck.length)];
  const playerCard1Element = document.getElementById("pcard1");
  const playerCard2Element = document.getElementById("pcard2");
  playerCard1Element.src = `img/${playerCard1}.png`;
  playerCard2Element.src = `img/${playerCard2}.png`;
  const dealerCard1Element = document.getElementById("dcard1");
  dealerCard1Element.src = `img/${dealerCard}.png`;
  // Example: Calculate scores for the dealer and player hands
  // dealerArray.push("AS"); //test for black jack
  // playerArray.push("AS", "AS"); //test for black jack

  dealerArray.push(dealerCard);
  playerArray.push(playerCard1, playerCard2);
  updateScore();
  if (getScore(playerArray) === 21) {
    if (getScore(dealerArray) >= 10) {
      dealerArray.push(deck[Math.floor(Math.random() * deck.length)]);
      updateScore();
      for (let i = 0; i < dealerArray.length; i++) {
        const dealerCardElement = document.getElementById(`dcard${i + 1}`);
        dealerCardElement.src = `img/${dealerArray[i]}.png`;
      }
      if (getScore(dealerArray) === 21) {
        document.getElementById("check_winner").textContent = "Draw";
        // newGame.style.display = "block";
        // hitButton.style.display = "none";
        // stayButton.style.display = "none";
        updateButton(true, false, false);
      } else {
        document.getElementById("check_winner").textContent = "Player Win";
        // newGame.style.display = "block";
        // hitButton.style.display = "none";
        // stayButton.style.display = "none";
        updateButton(true, false, false);
      }
    }
  }
  // console.log(getScore(dealerArray));

  // console.log(`Dealer's Card: ${dealerCard}, Score: ${dealerScore}`);
  // console.log(
  //   `Player's Card: ${playerCard1} ${playerCard2}, Score: ${playerScore}`
  // );
}
newGame.addEventListener("click", startGame);
hitButton.addEventListener("click", () => {
  const randomCard = deck[Math.floor(Math.random() * deck.length)];
  playerArray.push(randomCard);
  const updatedPlayerScore = getScore(playerArray);
  // console.log("Player Array" + playerArray);
  updateScore();
  function endPlayerTurn() {
    hitButton.style.display = "none";
    stayButton.style.display = "none";
    let dealerScore = getScore(dealerArray);

    while (dealerScore < 17) {
      let randomCard = deck[Math.floor(Math.random() * deck.length)];
      dealerArray.push(randomCard);
      dealerScore = getScore(dealerArray);
      if (updatedPlayerScore > dealerScore) {
        updateScore();
        // newGame.style.display = "block";
        // hitButton.style.display = "none";
        // stayButton.style.display = "none";
        updateButton(true, false, false);
        // console.log("Player Win");
        document.getElementById("check_winner").textContent = "Player Win";
      } else if (updatedPlayerScore == dealerScore) {
        updateScore();
        // newGame.style.display = "block";
        // hitButton.style.display = "none";
        // stayButton.style.display = "none";
        updateButton(true, false, false);
        document.getElementById("check_winner").textContent = "Draw";
      } else if (dealerArray.length >= 5 && dealerScore <= 21) {
        document.getElementById("check_winner").textContent =
          "Dealer Win with five Card Charlie";
        updateButton(true, false, false);
      }
    }
    for (let i = 0; i < dealerArray.length; i++) {
      const dealerCardElement = document.getElementById(`dcard${i + 1}`);
      dealerCardElement.src = `img/${dealerArray[i]}.png`;
    }
  }

  // console.log(playerArray);
  // Calculate the player's score after adding a card
  if (updatedPlayerScore > 21) {
    newGame.style.display = "block";
    hitButton.style.display = "none";
    stayButton.style.display = "none";
    // console.log("Dealer Win");
    document.getElementById("check_winner").textContent = "Dealer Win";
  }
  // console.log("player" + updatedPlayerScore);
  // console.log("dealer" + dealerScore);
  else if (updatedPlayerScore == 21) {
    endPlayerTurn();
  } else if (playerArray.length >= 5 && updatedPlayerScore <= 21) {
    document.getElementById("check_winner").textContent =
      "Player Win with five Card Charlie";
    updateButton(true, false, false);
  }
  for (let i = 0; i < playerArray.length; i++) {
    const playerCardElement = document.getElementById(`pcard${i + 1}`);
    playerCardElement.src = `img/${playerArray[i]}.png`; // Replace playerArray with your card array
  }
  // console.log(
  //   `Player's New Card: ${randomCard}, Updated Score: ${updatedPlayerScore} Dealer Card${playerArray}`
  // );
});

stayButton.addEventListener("click", () => {
  const playerScore = getScore(playerArray);
  let dealerScore = getScore(dealerArray);

  while (dealerScore < 17) {
    let randomCard = deck[Math.floor(Math.random() * deck.length)];
    dealerArray.push(randomCard);
    dealerScore = getScore(dealerArray);
  }
  // console.log("Testing array of playerarry" + playerArray);
  // console.log("Testing array of dealerarry" + dealerArray);

  if (dealerScore > 21 || dealerScore < playerScore) {
    document.getElementById("check_winner").textContent = "Player Win";
    // console.log("Player Win");
    updateScore();
    updateButton(true, false, false);
    // newGame.style.display = "block";
    // hitButton.style.display = "none";
    // stayButton.style.display = "none";
    // makeItReady();
  } else if (dealerArray.length >= 5 && dealerScore <= 21) {
    // console.log("Dealer Win with Five Card Charlie");
    document.getElementById("check_winner").textContent =
      "Dealer Win with Five Card Charlie";
    updateScore();
    // newGame.style.display = "block";
    // hitButton.style.display = "none";
    // stayButton.style.display = "none";
    updateButton(true, false, false);
    // makeItReady();
  } else if (playerArray.length >= 5) {
    // console.log("Player Win with five Card Charlie");

    document.getElementById("check_winner").textContent =
      "Player Win With Five Card Charlie";
    updateScore();
    // newGame.style.display = "block";
    // hitButton.style.display = "none";
    // stayButton.style.display = "none";
    updateButton(true, false, false);
    // makeItReady();
  } else if (dealerScore === playerScore) {
    // console.log("Draw");
    document.getElementById("check_winner").textContent = "Draw";

    updateScore();
    // newGame.style.display = "block";
    // hitButton.style.display = "none";
    // stayButton.style.display = "none";
    updateButton(true, false, false);
    // makeItReady();
  } else {
    document.getElementById("check_winner").textContent = "Dealer Win";
    // console.log("Dealer Win");
    updateScore();
    // newGame.style.display = "block";
    // hitButton.style.display = "none";
    // stayButton.style.display = "none";
    // makeItReady();
    updateButton(true, false, false);
  }
  // console.log(dealerArray);
  for (let i = 0; i < dealerArray.length; i++) {
    const dealerCardElement = document.getElementById(`dcard${i + 1}`);
    dealerCardElement.src = `img/${dealerArray[i]}.png`;
  }
});
