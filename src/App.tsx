import { Dispatch,  useState } from 'react';
import './App.css';
import { playingCards } from './shared/constants/constants';
import { createDeck, shuffleDeck } from './shared/utils';
import { GameState, Rank, Suit } from './shared/types/cards';

const App: React.FC = () => {
  const deckPartLength = shuffleDeck(createDeck(playingCards)).length / 2;
  const shuffle = shuffleDeck(createDeck(playingCards));

  const [tableCards, setTableCards] = useState<string[]>([]);
  const [bita, setBita] = useState<string[]>([]);
  const [userCards, setUserCards] = useState(shuffle.slice(0, deckPartLength));
  const [botCards, setBotCards] = useState(shuffle.slice(deckPartLength, 52));
  const [gameState, setGameState] = useState<GameState>({answer: {rankOrSuit: "♦"},lastStep: [],turn: "USER"})

  const [userSelectedCards, setUserSelectedCards] = useState<string[]>([]);
  const [botSelectedCards, setBotSelectedCards] = useState<string[]>([]);

  const hadleUserSelectedCards = (selectedCard: string) => {
    if(gameState.turn === "BOT") return;
    if (userSelectedCards.includes(selectedCard)) return;
    setUserSelectedCards(prev => [...prev, selectedCard]);
  }

  const hadleBotSelectedCards = (selectedCard: string) => {
    if(gameState.turn === "USER") return;
    if (botSelectedCards.includes(selectedCard)) return
    setBotSelectedCards(prev => [...prev, selectedCard]);

  }

  const handlePlaySelectedCards = () => {
    if (gameState.turn === "USER" && userSelectedCards.length) {
      setTableCards(prev => [...prev, ...userSelectedCards]);
      setGameState(prev => ({...prev, lastStep: userSelectedCards, turn: "BOT"}))
      findAndDelete(userCards, userSelectedCards, setUserCards)
      setBotSelectedCards([])
      return
    } else {
      setTableCards(prev => [...prev, ...botSelectedCards]);
      setGameState(prev => ({...prev, lastStep: botSelectedCards,turn: "USER"}))
      findAndDelete(botCards, botSelectedCards, setBotCards)
      setUserSelectedCards([])
    }

  }

  const findAndDelete = (arr: string[], selectedCards: string[], cb: Dispatch<React.SetStateAction<string[]>>) => {

    for(let i = 0; i < arr.length; i++){
      for(let j = 0; j < selectedCards.length; j++){
        if(selectedCards[j] === arr[i]){
          const idx = arr.indexOf(selectedCards[j]);
          arr.splice(idx,1);
          cb(arr)
        }
      }
    }
  }

  const believeOrNot = (type:boolean) => {
    const {turn, lastStep} = gameState;
    const isTrue = lastStep.filter(el => el.includes(gameState.answer.rankOrSuit));
    if(isTrue.length === lastStep.length && type){
      alert(`${turn} ~~~WIN~~~`)
      setBita(prev => [...prev,...lastStep]);
      setTableCards([])
    }else if(isTrue.length !== lastStep.length && type){
      alert(`${turn} ~~~FAIL~~~`)
      if(turn === "BOT") setBotCards(prev => [...prev, ...lastStep]);
      if(turn === "USER") setUserCards(prev => [...prev, ...lastStep]);
      setTableCards([])
    }else if(isTrue.length !== lastStep.length && !type){
      alert(`${turn} ~~~WIN~~~`)
      if(turn === "BOT") setUserCards(prev => [...prev, ...lastStep]);
      if(turn === "USER") setBotCards(prev => [...prev, ...lastStep]);
      setTableCards([])
    }
  }


  return (
    <div className="App">


      <div className='bita'>
        <h2>BITA</h2>
        <div>{bita.map(card => <span key={card} className={`card ${(card.includes("♦") || card.includes("♥")) && "red"} `}>{card}</span>)}</div>
      </div>
      {JSON.stringify(gameState)}

      <div className='selected-cards'>
        {botSelectedCards.map(card => <span key={card} className='card'>{card}</span>)}

        <button onClick={handlePlaySelectedCards}>Play</button>
        <button onClick={() => believeOrNot(true)}>True</button>
        <button onClick={() => believeOrNot(false)}>False</button>
      </div>

     

      <div className='bot-cards'>
        BOT

        {
          botCards.map(card => <span key={card} className={`card ${(card.includes("♦") || card.includes("♥")) && "red"} `} onClick={() => hadleBotSelectedCards(card)}>{card}</span>)
        }
      </div>
      <div className='table-cards'>
        {
          tableCards.map(card => <span key={card} className={`card ${(card.includes("♦") || card.includes("♥")) && "red"} `} onClick={() => hadleBotSelectedCards(card)}>{card}</span>)
        }
      </div>
      <div className='user-cards'>
        USER
        {userCards.map(card => <span key={card} className={`card ${(card.includes("♦") || card.includes("♥")) && "red"} `} onClick={() => hadleUserSelectedCards(card)}>{card}</span>)}
      </div>

      <div className='selected-cards'>
        {userSelectedCards.map(card => <span key={card} className='card'>{card}</span>)}
        <button onClick={handlePlaySelectedCards}>Play</button>
        <button onClick={() => believeOrNot(true)}>True</button>
        <button onClick={() => believeOrNot(false)}>False</button>
      </div>

      <div className='user-cards' >
        <select name="answer" id="answer" value={gameState.answer.rankOrSuit} onChange={e => setGameState(prev => ({...prev, answer: {rankOrSuit: e.target.value as Rank | Suit}}))} >
          <option value="♠">♠</option>
          <option value="♥">♥</option>
          <option value="♦">♦</option>
          <option value="♣">♣</option>
        </select>

        {/* <input type="number" value={count} onChange={({target}) => setCount(+target.value)} min={1} /> */}
      </div>
    </div>
  );
};

export default App;
