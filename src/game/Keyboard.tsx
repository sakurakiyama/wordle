import { useContext } from 'react';
import { GameContext } from './Game';
import { handleDelete, handleGuessWord, handleCodeChange } from '../utils';

function Keyboard() {
  const {
    setNumberOfGuesses,
    wordAttempts,
    setWordAttempts,
    setShowModal,
    setGuessedCorrectly,
    setIncorrectLetters,
    incorrectLetters,
    setIncorrectlyPlacedLetters,
    incorrectlyPlacedLetters,
    setCorrectLetters,
    correctLetters,
    inputRefs,
    setCurrentColIndex,
    setCurrentRowIndex,
    currentColIndex,
    currentRowIndex,
    rowRefs,
    wordOfTheDay,
  } = useContext(GameContext)!;

  const keyboardChars = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DELETE'],
  ];

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const buttonText = (e.target as HTMLButtonElement).innerText;
    if (buttonText === 'DELETE') {
      e.preventDefault();
      handleDelete(
        currentColIndex,
        currentRowIndex,
        wordAttempts,
        setWordAttempts,
        setCurrentColIndex,
        inputRefs
      );
    } else if (buttonText === 'ENTER')
      handleGuessWord(
        currentRowIndex,
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
    else {
      handleCodeChange(
        currentColIndex,
        currentRowIndex,
        buttonText,
        wordAttempts,
        setWordAttempts,
        setCurrentColIndex,
        inputRefs
      );
    }
  };

  return (
    <div className='flex flex-col items-center mt-4'>
      {keyboardChars.map((row, rowIndex) => (
        <div key={`row-${rowIndex}`}>
          {row.map((display, colIndex) => (
            <button
              className={`border p-2 rounded-md m-1 md:min-w-10 h-16 font-semibold shadow-sm ${
                incorrectLetters.includes(display)
                  ? 'bg-slate-700 text-white'
                  : incorrectlyPlacedLetters.includes(display)
                  ? 'bg-[var(--mustard)] text-white'
                  : correctLetters.includes(display)
                  ? 'bg-[var(--olive-green)]'
                  : 'bg-gray-300'
              }`}
              onClick={(e) => handleClick(e)}
              key={`button-${rowIndex}-${colIndex}`}
            >
              {display}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Keyboard;
