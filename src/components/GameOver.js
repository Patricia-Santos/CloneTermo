import React, { useContext } from 'react';
import { AppContext } from '../App';

function GameOver() {
    const {gameOver, correctWord, currAttempt} = useContext(AppContext);
    return(
        <div className='gameOver'>
            <h3>{gameOver.guessedWord ? "Parabéns, você descobriu a palavra!" : "Você não conseguiu descobrir a palavra."}</h3>
            <h1>Resposta correta: {correctWord}</h1>
            {gameOver.guessedWord && (<h3>Você ganhou em {currAttempt.attempt} {currAttempt.attempt === 1 ? "tentativa" : "tentativas"}.</h3>)}
        </div>
    )
}

export default GameOver