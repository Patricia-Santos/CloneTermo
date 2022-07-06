import { useState, createContext, useEffect } from 'react';
import { boardDefault, generateWordSet } from './Words';
import './App.css';
import Board from './components/Board';
import Keyboard from './components/Keyboard';

export const AppContext = createContext();

function App(keyValue) {
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({attempt: 0, letterPos: 0});
  const [wordSet, setWordSet] = useState(new Set());
  const [disabledLetters, setDisabledLetters] = useState([]);

  const correctWord = "DIGITE";

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
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
    /*if(wordSet.has(currWord.toLowerCase())){
      setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0 });
   } else {
      alert("Palavra não inclusa");
    }*/
    
    setCurrAttempt({attempt: currAttempt.attempt + 1, letterPos: 0});

    if(currWord === correctWord){
      alert("Fim de jogo!");
    }
  }

  return (
    <div className="App">
      <nav>
        <h1>DIGITE</h1>
      </nav>
      <AppContext.Provider value={{board, setBoard, currAttempt, setCurrAttempt, onSelectLetter, onDelete, onEnter, correctWord, setDisabledLetters, disabledLetters}}>
        <div className='game'>
          <Board />
          <Keyboard />
        </div>  
      </AppContext.Provider>
    </div>
  );
}

export default App;