import { useContext, useEffect } from 'react';
import { GameContext } from './Game';
import { handleDelete, handleGuessWord, handleCodeChange } from '../utils';

function Board(): JSX.Element {
  const {
    numberOfGuesses,
    setNumberOfGuesses,
    wordAttempts,
    setWordAttempts,
    setShowModal,
    setIncorrectLetters,
    setIncorrectlyPlacedLetters,
    setCorrectLetters,
    inputRefs,
    setCurrentColIndex,
    setCurrentRowIndex,
    rowRefs,
    wordOfTheDay,
    setGuessedCorrectly,
  } = useContext(GameContext)!;

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  return (
    <div>
      {rowRefs.map((currentRowRef, rowIndex) => (
        <div
          ref={currentRowRef}
          key={`row-${rowIndex}`}
          className='justify-center flex flex-row'
        >
          {wordAttempts[rowIndex].map((letter, colIndex) => {
            const index = rowIndex * 8 + colIndex;
            return (
              <input
                key={`input-${rowIndex}-${colIndex}`}
                className={`border-2 w-8 h-8 text-sm md:text-base md:w-12 md:h-12 rounded-sm text-center text-lg font-semibold focus:outline-none focus:border-slate-500 m-1`}
                style={{ caretColor: 'transparent' }}
                maxLength={1}
                disabled={
                  numberOfGuesses >= rowIndex + 1 ||
                  numberOfGuesses !== rowIndex
                }
                value={letter}
                ref={(input) => (inputRefs.current[index] = input)}
                onChange={(e) => {
                  handleCodeChange(
                    colIndex,
                    rowIndex,
                    e.target.value,
                    wordAttempts,
                    setWordAttempts,
                    setCurrentColIndex,
                    inputRefs
                  );
                }}
                onKeyDown={(e) => {
                  if (e.code === 'Backspace') {
                    e.preventDefault();
                    handleDelete(
                      colIndex,
                      rowIndex,
                      wordAttempts,
                      setWordAttempts,
                      setCurrentColIndex,
                      inputRefs
                    );
                  }
                  if (e.code === 'Enter') {
                    handleGuessWord(
                      rowIndex,
                      wordAttempts,
                      setNumberOfGuesses,
                      wordOfTheDay,
                      setCorrectLetters,
                      setIncorrectlyPlacedLetters,
                      inputRefs,
                      setIncorrectLetters,
                      setShowModal,
                      setGuessedCorrectly,
                      setCurrentRowIndex,
                      setCurrentColIndex,
                      rowRefs
                    );
                  }
                }}
              ></input>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default Board;
