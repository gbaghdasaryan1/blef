const suits = ['♠', '♥', '♦', '♣'];
const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
let playerHand = [];
let computerHand = [];
let table = [];

function createDeck() {
    const deck = [];
    for (let suit of suits) {
        for (let rank of ranks) {
            deck.push({ suit, rank });
        }
    }
    return deck;
}

function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

function dealCards(deck) {
    playerHand = deck.slice(0, 26);
    computerHand = deck.slice(26, 52);
    renderHands();
}

function renderHands() {
    document.getElementById('player-hand').innerHTML = 'Ваши карты: ' + playerHand.map(card => `${card.rank}${card.suit}`).join(', ');
    document.getElementById('computer-hand').innerHTML = 'Карты компьютера: ' + computerHand.length + ' карт';
    document.getElementById('table').innerHTML = 'Карты на столе: ' + table.map(card => `${card.rank}${card.suit}`).join(', ');
}

function playCard() {
    if (playerHand.length === 0 || computerHand.length === 0) return;

    const playerCard = playerHand.pop();
    const computerCard = computerHand.pop();
    table.push(playerCard, computerCard);

    renderHands();
    document.getElementById('message').textContent = `Вы сыграли ${playerCard.rank}${playerCard.suit}, компьютер сыграл ${computerCard.rank}${computerCard.suit}. Компьютер говорит: "Верю".`;
}

function callBluff() {
    if (table.length === 0) return;

    const lastCard = table[table.length - 1];
    if (lastCard.rank === 'A') {
        document.getElementById('message').textContent = "Вы были правы, компьютер блефовал!";
        playerHand.push(...table);
    } else {
        document.getElementById('message').textContent = "Компьютер не блефовал. Вы проиграли этот раунд.";
        computerHand.push(...table);
    }
    table = [];
    renderHands();
}

document.getElementById('play-button').addEventListener('click', playCard);
document.getElementById('call-bluff-button').addEventListener('click', callBluff);

const deck = createDeck();
shuffleDeck(deck);
dealCards(deck);