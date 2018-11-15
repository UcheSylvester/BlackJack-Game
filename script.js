/*
BlackJack!
By UcheSylvester
 */

"use strict"

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
	victory = false,
	playerCards = [],
	dealerCards = [],
	dealerScore = 0,
	playerScore = 0,
	deck;

// hitButton.classList.add('hide')
hitButton.style.display = 'none';
stayButton.style.display = 'none';
showStatus();

newGame.addEventListener('click', function() {
	gameStarted = true;
	victory = false;
	gameOver = false;

	if(gameStarted) {
		console.log('game started');
	};

	createDeck()
	playerCards = [getNextCard(), getNextCard()];	
	dealerCards = [getNextCard(), getNextCard()];

	newGame.style.display = 'none';
	// newGame.setAttribute('style', 'display: none');
	hitButton.style.display = 'inline';
	stayButton.style.display = 'inline';
	showStatus();

});


/*
creating our deck of cards
 */

function createDeck() {
	deck = [];

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

function getCardString(card) {
	let cardString = card.value + ' of ' + card.suit;
	return cardString;
}

// deck = createDeck();

/*
getting next card to be selected by the player
 */

function getNextCard() {
	let nextCard = deck.shift();
	return nextCard;
};

function showStatus() {
	if(gameStarted) {
		textArea.innerText = 'Game Started!';
		return;
	}
}



// playerCards = [getNextCard(), getNextCard()]; 
	
// console.log('Welcome to BlackJack');
// console.log('You are dealt:');
// console.log(" " + getCardString(playerCards[0]));
// console.log(" " + getCardString(playerCards[1]));
