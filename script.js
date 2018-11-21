/*
BlackJack!
By UcheSylvester
 */


// Card Variables

let suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades'],
	values = [
	'Ace', 'King', 'Queen', 'Jack',
	'Ten', 'Nine', 'Eight', 'Seven', 'Six',
	'Five', 'Four', 'Three', 'Two'
];

// DOM Variables

let textArea = document.getElementById('text-area'),
	hitButton = document.getElementById('hit-button'),
	stayButton = document.getElementById('stay-button'),
	newGame = document.getElementById('new-game');

// Game Variables

let gameStarted = false,
	gameOver = false,
	playerWon = false,
	playerCards = [],
	dealerCards = [],
	dealerScore = 0,
	playerScore = 0,
	tie,
	// blackJack,
	deck = [];


hitButton.style.display = 'none';
stayButton.style.display = 'none';
showStatus();

newGame.addEventListener('click', function() {
	gameStarted = true;
	playerWon = false;
	gameOver = false;

	deck = createDeck();
	shuffleDeck(deck);
	playerCards = [getNextCard(), getNextCard()];	
	dealerCards = [getNextCard(), getNextCard()];

	newGame.style.display = 'none';
	hitButton.style.display = 'inline';
	stayButton.style.display = 'inline';
	showStatus();

});

hitButton.addEventListener('click', function() {
	playerCards.push(getNextCard());
	// console.log(playerCards);
	checkForGameEnd();
	showStatus();
})

stayButton.addEventListener('click', function() {
	gameOver = true;
	checkForGameEnd();
	showStatus();

})


/*
creating our deck of cards
 */

function createDeck() {
	let deck = [];

	for(let suit of suits) {
		for(let value of values) {
			// deck.push(value + ' of ' + suit)
			let card = {
				suit: suit,
				value: value
			}
			deck.push(card);
		}
	}
	return deck;
}

// Suffling the deck of cards

function shuffleDeck(deck) {
	for(let i = 0; i < deck.length; i++) {
		let swapIdx = Math.trunc(Math.random() * deck.length);
		let tmpDeck = deck[swapIdx];
		deck[swapIdx] = deck[i];
		deck[i] = tmpDeck;
	}
};

function getCardString(card) {
	let cardString = card.value + ' of ' + card.suit;
	return cardString;
}


/*
getting next card to be selected by the player
 */

function getNextCard() {
	let nextCard = deck.shift();
	return nextCard;
};

function showStatus() {
	if(!gameStarted) {
		textArea.innerText = 'Welcome To BlackJack!';
		return;
	}

	// for(var i = 0; i < deck.length; i++) {
	// 	textArea.innerText += '\n' + getCardString(deck[i]);
	// }

	let dealerCardString = '';
	for(let dealerCard of dealerCards) {
		dealerCardString += getCardString(dealerCard) + '\n';
		// console.log(dealerCardString);
		// console.log(dealerCard);
	}

	let playerCardString = '';
	for (let playerCard of playerCards) {
		playerCardString += getCardString(playerCard) + '\n';
		// console.log(playerCardString);
	}

	updateScores();

	textArea.innerText = 
	'Dealer has: \n' +
	dealerCardString + 
	'(score: '+ dealerScore +')\n\n' +

	'Player has: \n' +
	playerCardString +
	'(score: '+ playerScore +')\n\n';

	if(gameOver) {
		if(playerWon){
			textArea.innerText += 'YOU WIN!';
		}

		// TIE
		else if(tie) {
			textArea.innerText += 'A TIE!'
		}

		// else if (blackJack) {
		// 	textArea.innerText += 'BLACKJACK! YOU WIN!'
		// }

		else {
			textArea.innerText += 'DEALER WINS';
		}
		newGame.style.display = 'inline';
		hitButton.style.display = 'none';
		stayButton.style.display = 'none';
	}
}

function updateScores() {
	dealerScore = getScore(dealerCards);
	playerScore = getScore(playerCards);
	// console.log(dealerScore);
}

// getting the scores based on the card numeric value
function getScore(cardArray) {
	let score = 0;
	let hasAce = false;
	for(let card of cardArray) {
		// console.log(card);
		score += getCardNumericValue(card);
		if(card.value === 'Ace') {
			hasAce = true;
		}
	}
	if(hasAce && score + 10 <= 21) {
		return score +10;
	}
	return score;
}

// Setting numeric values for each card
function getCardNumericValue(card) {
	switch(card.value) {
		case 'Ace': 
			return 1;
		case 'Two':
			return 2;
		case 'Three':
			return 3;
		case 'Four':
			return 4;
		case 'Five':
			return 5;
		case 'Six': 
			return 6;
		case 'Seven':
			return 7;
		case 'Eight':
			return 8;
		case 'Nine':
			return 9;
		default:
			return 10;
	}
}

function checkForGameEnd() {
	updateScores();

	if(gameOver) {
		// let dealer take cards
		while(dealerScore < playerScore
				&& playerScore <=21
				&& dealerScore <= 21) {
			dealerCards.push(getNextCard());
			updateScores();
		}
	}

	if(playerScore > 21) {
		playerWon = false;
		gameOver = true;
	}
	else if(dealerScore > 21) {
		playerWon = true;
		gameOver = true;
	} 
	// else if (playerScore === dealerScore) {
	// 	gameOver = true;
	// 	tie = true;
	// }

	// // BLACKJACK
	// else if(playerScore === 21) {
	// 	blackJack = true;
	// 	gameOver = true;
	// }
	// else if(dealerScore === 21) {
	// 	blackJack = true;
	// 	gameOver = true;
	// }
		// TIE
	// else if(playerScore === dealerScore) {
	// 	tie = true;
	// }

	else if(gameOver) {

		if(playerScore > dealerScore) {
			playerWon = true;
		}

		// else if(playerScore === dealerScore) {
		// 	tie = true;
		// 	playerWon = false;
		// }

		else {
			playerWon = false;
		}
	}
}




// playerCards = [getNextCard(), getNextCard()]; 
	
// console.log('Welcome to BlackJack');
// console.log('You are dealt:');
// console.log(" " + getCardString(playerCards[0]));
// console.log(" " + getCardString(playerCards[1]));
