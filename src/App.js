import { useState, createContext, useEffect } from 'react';
import { boardDefault, generateWordSet } from './Words';
import './App.css';
import Board from './components/Board';
import Keyboard from './components/Keyboard';
import GameOver from './components/GameOver';

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({attempt: 0, letterPos: 0});
  const [wordSet, setWordSet] = useState(new Set());
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [correctWord, setCorrectWord] = useState("");
  const [gameOver, setGameOVer] = useState({gameOver: false, guessedWord: false});

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord);
    })
  }, []);

  const onSelectLetter = (keyValue) => {
    if (currAttempt.letterPos > 5) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos] = keyValue;
    setBoard(newBoard);
    setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos + 1});
  } 

  const onDelete = () => {
    if (currAttempt.letterPos === 0) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos -1] = "";
    setBoard(newBoard);
    setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos -1});
  }

  const onEnter = () => {
    if (currAttempt.letterPos !== 6) return;

    let currWord = "";
    for(let i=0; i<6; i++){
      currWord += board[currAttempt.attempt][i];
    }
    
    setCurrAttempt({attempt: currAttempt.attempt + 1, letterPos: 0});

    if(currWord === correctWord){
      setGameOVer({gameOver: true, guessedWord: true});
      return;
    }

    if(currAttempt.attempt === 5){
      setGameOVer({gameOver: true, guessedWord: false});
    }
  }

  return (
    <div className="App">
      <nav>
        <h1>DIGITE</h1>
      </nav>
      <AppContext.Provider 
        value={{
          board, 
          setBoard, 
          currAttempt, 
          setCurrAttempt, 
          onSelectLetter, 
          onDelete, 
          onEnter, 
          correctWord, 
          setDisabledLetters, 
          disabledLetters,
          gameOver,
          setGameOVer
        }}>
        <div className='game'>
          <Board />
          {gameOver.gameOver ? <GameOver /> : <Keyboard />}
        </div>  
      </AppContext.Provider>
    </div>
  );
}

export default App;