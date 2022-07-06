import { useState, createContext } from 'react';
import { boardDefault } from './Words';
import './App.css';
import Board from './components/Board';
import Keyboard from './components/Keyboard';

export const AppContext = createContext();

function App(keyValue) {
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({attempt: 0, letterPos: 0});
  
  const correctWord = "DIGITE";

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
    setCurrAttempt({attempt: currAttempt.attempt + 1, letterPos: 0});
  }

  return (
    <div className="App">
      <nav>
        <h1>DIGITE</h1>
      </nav>
      <AppContext.Provider value={{board, setBoard, currAttempt, setCurrAttempt, onSelectLetter, onDelete, onEnter, correctWord}}>
        <div className='game'>
          <Board />
          <Keyboard />
        </div>  
      </AppContext.Provider>
    </div>
  );
}

export default App;