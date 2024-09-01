import { CardType, Suit } from "./types/cards";

export const createDeck = (playingCards:Record<Suit, CardType>) => {

    const spades = playingCards["♠"].map(el => el + '♠');
    const hearts = playingCards["♥"].map(el => el + '♥');
    const diamonds = playingCards["♦"].map(el => el + '♦');
    const clubs = playingCards["♣"].map(el => el + '♣');


    return [...spades, ...hearts, ...diamonds, ...clubs]
}


export const shuffleDeck = (deck: string[]): string[] => {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    return deck
  };