// Handles input values
export const handleCodeChange = (
  colIndex: number,
  rowIndex: number,
  value: string,
  wordAttempts: string[][],
  setWordAttempts: React.Dispatch<React.SetStateAction<string[][]>>,
  setCurrentColIndex: React.Dispatch<React.SetStateAction<number>>,
  inputRefs: React.MutableRefObject<(HTMLInputElement | null)[]>
) => {
  const newGuess = [...wordAttempts];
  newGuess[rowIndex][colIndex] = value.toUpperCase();
  setWordAttempts(newGuess);
  const next = colIndex + 1;

  // If we're not at the end of the row, focus on the next input
  if (colIndex !== 7) {
    setCurrentColIndex(next);
    setTimeout(() => {
      inputRefs.current[rowIndex * 8 + next]?.focus();
    }, 50);
  }
};

// Handles deleting values
export const handleDelete = (
  colIndex: number,
  rowIndex: number,
  wordAttempts: string[][],
  setWordAttempts: React.Dispatch<React.SetStateAction<string[][]>>,
  setCurrentColIndex: React.Dispatch<React.SetStateAction<number>>,
  inputRefs: React.MutableRefObject<(HTMLInputElement | null)[]>
) => {
  const newGuess = [...wordAttempts];
  // If there's a character in the current cell, delete it
  if (colIndex > 0 && newGuess[rowIndex][colIndex]) {
    newGuess[rowIndex][colIndex] = '';
    setWordAttempts(newGuess);
  }
  // If the current cell is empty and not in the first column, move to the previous cell
  else if (colIndex > 0 && !newGuess[rowIndex][colIndex]) {
    newGuess[rowIndex][colIndex - 1] = '';
    setWordAttempts(newGuess);
    setCurrentColIndex(colIndex - 1);
    inputRefs.current[rowIndex * 8 + colIndex - 1]?.focus();
  }
  // If the current cell is the first cell and there's something in it, delete it.
  else if (colIndex === 0 && newGuess[rowIndex][colIndex]) {
    newGuess[rowIndex][colIndex] = '';
    setWordAttempts(newGuess);
  }
};

// Handles guessing the word
export const handleGuessWord = (
  rowIndex: number,
  wordAttempts: string[][],
  setNumberOfGuesses: React.Dispatch<React.SetStateAction<number>>,
  wordOfTheDay: string,
  setCorrectLetters: React.Dispatch<React.SetStateAction<string[]>>,
  setIncorrectlyPlacedLetters: React.Dispatch<React.SetStateAction<string[]>>,
  inputRefs: React.MutableRefObject<(HTMLInputElement | null)[]>,
  setIncorrectLetters: React.Dispatch<React.SetStateAction<string[]>>,
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
  setGuessedCorrectly: React.Dispatch<React.SetStateAction<boolean>>,
  setCurrentRowIndex: React.Dispatch<React.SetStateAction<number>>,
  setCurrentColIndex: React.Dispatch<React.SetStateAction<number>>,
  rowRefs: React.MutableRefObject<HTMLDivElement | null>[]
) => {
  const attempt = wordAttempts[rowIndex].join('');
  if (attempt !== wordOfTheDay) {
    // If the attempt isn't a complete word, shake ad don't go to the next row
    if (attempt.length !== 8) {
      const currentRowRef = rowRefs[rowIndex].current;
      if (currentRowRef) {
        currentRowRef.classList.add('animate-shake');
        setTimeout(() => {
          currentRowRef.classList.remove('animate-shake');
        }, 1000);
      }
      return;
    }
    // If the attempt is wrong, go to the next row.
    setNumberOfGuesses((prevState) => {
      return prevState + 1;
    });
    // Iterate through the guessed word
    wordAttempts[rowIndex].forEach((letter, colIndex) => {
      const isCorrect = letter.toUpperCase() === wordOfTheDay[colIndex];
      setTimeout(() => {
        if (isCorrect) {
          setCorrectLetters((prevState) => {
            if (prevState.includes(letter)) return prevState;
            return [...prevState, letter];
          });
          setIncorrectlyPlacedLetters((prevState) => {
            const removedCorrect = prevState.filter((current) => {
              if (current !== letter) return current;
            });
            return removedCorrect;
          });
          // If correct, set the background color to green

          inputRefs.current[rowIndex * 8 + colIndex]?.classList.add(
            'bg-[var(--olive-green)]',
            'text-white',
            'border-[var(--olive-green)]',
            'animate-flip'
          );
          // If the letter placement is incorrect but the letter exists in the word of the day
        } else if (wordOfTheDay.includes(letter)) {
          setIncorrectlyPlacedLetters((prevState) => {
            if (prevState.includes(letter)) return prevState;
            return [...prevState, letter];
          });
          inputRefs.current[rowIndex * 8 + colIndex]?.classList.add(
            'bg-[var(--mustard)]',
            'text-white',
            'border-[var(--mustard)]',
            'animate-flip'
          );
        } else {
          setIncorrectLetters((prevState) => {
            if (prevState.includes(letter)) return prevState;
            return [...prevState, letter];
          });
          inputRefs.current[rowIndex * 8 + colIndex]?.classList.add(
            'bg-slate-700',
            'text-white',
            'border-slate-700',
            'animate-flip'
          );
        }
      }, colIndex * 100);
    });

    const nextRowIndex = rowIndex + 1;
    if (nextRowIndex < wordAttempts.length) {
      setCurrentRowIndex(nextRowIndex);
      setCurrentColIndex(0);
      setTimeout(() => {
        inputRefs.current[nextRowIndex * 8]?.focus();
      }, 100);
    } else {
      setShowModal(true);
      setGuessedCorrectly(false);
    }
  }
  // If the attempt is correct
  else {
    wordAttempts[rowIndex].forEach((_, colIndex) => {
      setTimeout(() => {
        inputRefs.current[rowIndex * 8 + colIndex]?.classList.add(
          'bg-[var(--olive-green)]',
          'text-white',
          'border-[var(--olive-green)]',
          'animate-flip'
        );
      }, colIndex * 100);
    });
    setTimeout(() => {
      setShowModal(true);
      setGuessedCorrectly(true);
    }, 2800);
  }
};
