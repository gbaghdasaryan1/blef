export type CardType = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
export type CardTitle = "spades" | "hearts" | "diamonds" | "clubs"


export type Suit = '♠' | '♥' | '♦' | '♣';
export type Rank = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A';


export type GameState = {
    turn: "USER" | "BOT",
    lastStep: string[],
    answer: {
        rankOrSuit: Rank | Suit 
    }
}